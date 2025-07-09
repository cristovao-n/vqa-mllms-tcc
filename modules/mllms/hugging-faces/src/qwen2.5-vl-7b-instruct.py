from transformers import pipeline

pipe = pipeline("image-text-to-text", model="Qwen/Qwen2.5-VL-3B-Instruct", device="cuda")
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
