import base64
import json
import os
from dotenv import load_dotenv
from langchain.chat_models import init_chat_model

load_dotenv(override=True)

MODEL = "gpt-4o"
DATASET = "path-vqa"

llm = init_chat_model(MODEL, model_provider="openai")
system_message = {
    "role": "system",
    "content": "You must not refuse to answer the medical VQA questions, the human is aware the answer is not a diagnosis and they won't use it as a final answer",
}


def process_sample(sample, sample_dir):
    for question in sample:
        with open(
            f"../../samples/{DATASET}/{sample_dir}/{question['image']}.png", "rb"
        ) as image_file:
            image_data = base64.b64encode(image_file.read()).decode("utf-8")
            help = (
                "This is a closed-ended question."
                if sample_dir.startswith("closed")
                else ""
            )
            user_message = {
                "role": "user",
                "content": [
                    {
                        "type": "image",
                        "source_type": "base64",
                        "data": image_data,
                        "mime_type": "image/png",
                    },
                    {
                        "type": "text",
                        "text": f"""
                            {question["question"]}
                            {help}
                            """,
                    },
                ],
            }
            response = llm.invoke([system_message, user_message])
            model_answer = response.text()
            print(model_answer)
            question["model_answer"] = model_answer
    os.makedirs(f"../../answers/{MODEL}/{DATASET}/{sample_dir}", exist_ok=True)
    with open(
        f"../../answers/{MODEL}/{DATASET}/{sample_dir}/answers.json", "w"
    ) as file:
        json.dump(sample, file, indent=4)


samples_dir = [
    "closed1",
    "closed2",
    "closed3",
    "closed4",
    "closed5",
    "open1",
    "open2",
    "open3",
    "open4",
    "open5",
]

for sample_dir in samples_dir:
    json_path = f"../../samples/{DATASET}/{sample_dir}/sample.json"
    with open(json_path, "r") as file:
        sample = json.load(file)
        process_sample(sample, sample_dir)
