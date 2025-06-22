import base64
import json
import os
from transformers import pipeline

# pipe = pipeline("image-text-to-text", model="meta-llama/Llama-3.2-11B-Vision-Instruct", device="cuda")

MODEL="Qwen2.5-VL-7B-Instruct"
DATASET="vqa-rad"
pipe = pipeline("image-text-to-text", model=f"Qwen/{MODEL}", devide="cuda")

def process_sample(sample, sample_dir):
    for question in sample:
        with open(
            f"../../samples/{DATASET}/{sample_dir}/{question['image_name']}", "rb"
        ) as image_file:
            image_data = base64.b64encode(image_file.read()).decode("utf-8")
            help = (
                "This is a closed-ended question. Answer with only yes or no."
                if sample_dir.startswith("closed")
                else ""
            )
            messages = {
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
            model_answer = pipe(text=messages)
            print(model_answer)
            question["model_answer"] = model_answer
    os.makedirs(f"../../answers/{DATASET}/{MODEL}/{sample_dir}", exist_ok=True)
    with open(
        f"../../answers/{DATASET}/{MODEL}/{sample_dir}/answers.json", "w"
    ) as file:
        json.dump(sample, file, indent=4)


samples_dir = ["1"]

for sample_dir in samples_dir:
    json_path = f"../../samples/{DATASET}/{sample_dir}/sample.json"
    with open(json_path, "r") as file:
        sample = json.load(file)
        process_sample(sample, sample_dir)
