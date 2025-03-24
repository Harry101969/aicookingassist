from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from transformers import pipeline, AutoTokenizer, AutoModelForCausalLM
import torch

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model and tokenizer
try:
    tokenizer = AutoTokenizer.from_pretrained("umass/llama-2-7b-syntod-cooking-assistance")
    model = AutoModelForCausalLM.from_pretrained("umass/llama-2-7b-syntod-cooking-assistance")
    pipe = pipeline("text-generation", model=model, tokenizer=tokenizer)
except Exception as e:
    print(f"Error loading model: {e}")
    # Fallback to a smaller model or handle the error appropriately

class IngredientsInput(BaseModel):
    ingredients: List[str]

class Recipe(BaseModel):
    name: str
    cookingTime: int
    servings: int
    ingredients: List[str]
    instructions: List[str]

@app.post("/generate-recipe", response_model=Recipe)
async def generate_recipe(input_data: IngredientsInput):
    try:
        # Format the ingredients for the prompt
        ingredients_text = ", ".join(input_data.ingredients)
        prompt = f"Create a recipe using these ingredients: {ingredients_text}. Format the response as a recipe with a name, cooking time, servings, ingredients list, and step-by-step instructions."

        # Generate recipe using the model
        output = pipe(prompt, max_length=500, num_return_sequences=1)
        generated_text = output[0]['generated_text']

        # Parse the generated text into structured recipe data
        # Note: You might need to adjust this parsing logic based on the actual model output format
        recipe = {
            "name": "Recipe with " + ingredients_text,
            "cookingTime": 30,  # Default value, adjust based on complexity
            "servings": 4,      # Default value
            "ingredients": input_data.ingredients + ["Salt and pepper to taste"],
            "instructions": generated_text.split("\n")  # Simple split, adjust based on actual output
        }

        return Recipe(**recipe)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)