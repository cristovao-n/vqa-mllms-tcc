# Langchain

## Getting Started

Installing dependencies in virtual environment

`source venv/bin/activate`  
`pip install -r requirements.txt`

## Running app

`python3.11 -u src/script.py <model> >> ouput-<model>.txt`

### Models

#### Ollama

`ollama pull llama3.2-vision:11b`  
`ollama pull qwen2.5vl:7b`

#### Cloud

Add `OPENAI_API_KEY` in your .env

`gpt-4o`
