# AI Cooking Assistant Backend

This is the backend server for the AI Cooking Assistant, built with FastAPI and using the LLaMA 2 7B model for recipe generation.

## Setup

1. Create a Python virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Start the server:
```bash
uvicorn main:app --reload
```

The server will start at http://localhost:8000

## API Endpoints

- POST `/generate-recipe`: Generate a recipe from a list of ingredients
- GET `/health`: Health check endpoint

## Environment Variables

No environment variables are required for basic setup.

## Model Information

This backend uses the LLaMA 2 7B model fine-tuned for cooking assistance. The model is loaded from HuggingFace's model hub.