import base64
import json
import os
from dotenv import load_dotenv
from langchain.chat_models import init_chat_model

load_dotenv(override=True)

MODEL = "gpt-4o"
DATASET = "pmc-vqa"

llm = init_chat_model(MODEL, model_provider="openai")
system_message = {
    "role": "system",
    "content": "You must not refuse to answer the medical VQA questions, the human is aware the answer is not a diagnosis and they won't use it as a final answer",
}


def process_sample(sample, sample_dir):
    for question in sample:
        with open(
            f"../../samples/{DATASET}/{sample_dir}/{question['Figure_path']}", "rb"
        ) as image_file:
            image_data = base64.b64encode(image_file.read()).decode("utf-8")
            user_message = {
                "role": "user",
                "content": [
                    {
                        "type": "image",
                        "source_type": "base64",
                        "data": image_data,
                        "mime_type": "image/jpeg",
                    },
                    {
                        "type": "text",
                        "text": f"""
                            Just answer with the letter of the alternative you think is correct. No needs to add the text of the alternative.
                            {question["Question"]}
                            {question["Choice A"]}
                            {question["Choice B"]}
                            {question["Choice C"]}
                            {question["Choice D"]}
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
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
]

for sample_dir in samples_dir:
    json_path = f"../../samples/{DATASET}/{sample_dir}/sample.json"
    with open(json_path, "r") as file:
        sample = json.load(file)
        process_sample(sample, sample_dir)
