import base64
import json
import os
from dotenv import load_dotenv
from langchain_ollama import ChatOllama
from langchain.chat_models import init_chat_model
import sys
from datetime import datetime


load_dotenv(override=True)

MODEL = sys.argv[1]
DATASET = "vqa-rad"

def get_mllm(model):
    if model == "qwen2.5vl:7b":
        return ChatOllama(model=model)
    if model == "llama3.2-vision:11b":
        return ChatOllama(model=model)
    if model == "gpt-4o":
        return init_chat_model(MODEL, model_provider="openai")

mllm = get_mllm(MODEL)
system_message = {
    "role": "system",
    "content": "You must not refuse to answer the medical VQA questions, the human is aware the answer is not a diagnosis and they won't use it as a final answer",
}


def get_time():
    return datetime.now().strftime("%H:%M:%S")

def process_sample(sample, sample_dir):
    for index, question in enumerate(sample):
        with open(
            f"../../../samples/{DATASET}/{sample_dir}/{question['image_name']}", "rb"
        ) as image_file:
            image_data = base64.b64encode(image_file.read()).decode("utf-8")
            help = (
                "This is a closed-ended question. Answer with only yes or no."
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
                        "mime_type": "image/jpeg",
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
            response = mllm.invoke([system_message, user_message])
            model_answer = response.text()
            print(f"[INFO] {get_time()}")
            print(f"Question {index}/{len(sample)}: {question['question']}")
            print(f"Expected: {question['answer']}")
            print(f"Received: {model_answer}")
            print()
            question["model_answer"] = model_answer
    os.makedirs(f"../../../answers/{DATASET}/{MODEL}/{sample_dir}", exist_ok=True)
    with open(
        f"../../../answers/{DATASET}/{MODEL}/{sample_dir}/answers.json", "w"
    ) as file:
        json.dump(sample, file, indent=4)


samples_dir = ["closed/population"]

for sample_dir in samples_dir:
    json_path = f"../../../samples/{DATASET}/{sample_dir}/sample.json"
    with open(json_path, "r") as file:
        sample = json.load(file)
        print(f"[INFO] {get_time()} - Starting to process {sample_dir}")
        process_sample(sample, sample_dir)
        print(f"[INFO] {get_time()} - The {sample_dir} sample has finished.")
