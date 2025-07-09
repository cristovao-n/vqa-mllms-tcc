from transformers import pipeline

pipe = pipeline("image-text-to-text", model="meta-llama/Llama-3.2-11B-Vision-Instruct", device="cuda")
messages = [
    {
        "role": "user",
        "content": [
            {"type": "image", "url": "https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/p-blog/candy.JPG"},
            {"type": "text", "text": "What animal is on the candy?"}
        ]
    },
]
pipe(text=messages)
