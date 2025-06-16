from transformers import pipeline

pipe = pipeline(
    "image-text-to-text",
    model="Qwen/Qwen2.5-VL-72B-Instruct",
    use_auth_token="...",  # Your Hugging Face API token
)

messages = [
    {
        "role": "user",
        "content": [
            {
                "type": "image",
                "url": "https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/p-blog/candy.JPG",
            },
            {"type": "text", "text": "What animal is on the candy?"},
        ],
    },
]
result = pipe(text=messages)
print(result)
