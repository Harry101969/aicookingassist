import { Recipe } from './types';

// Simulating API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

function generateRecipeName(ingredients: string[]): string {
  const mainIngredients = ingredients.slice(0, 3);
  if (mainIngredients.length === 1) {
    return `${mainIngredients[0].charAt(0).toUpperCase() + mainIngredients[0].slice(1)} Special`;
  }
  const last = mainIngredients.pop();
  return `${mainIngredients.join(", ")} and ${last} Delight`;
}

function generateInstructions(ingredients: string[]): string[] {
  const baseInstructions = [
    "Gather all ingredients and ensure they are properly cleaned and measured.",
    "Prepare your workspace by having all necessary utensils ready.",
  ];

  const cookingSteps = ingredients.map((ingredient, index) => {
    const cookingMethods = [
      "sauté",
      "cook",
      "simmer",
      "stir-fry",
      "blend",
      "mix",
    ];
    const method = cookingMethods[index % cookingMethods.length];
    return `${method} the ${ingredient} ${
      method === "simmer" ? "for 8-10 minutes" : "until properly cooked"
    }.`;
  });

  const finalSteps = [
    `Combine all ingredients in a large pan and cook for an additional 5 minutes.`,
    "Season with salt, pepper, and your preferred herbs to taste.",
    "Let the dish rest for 2-3 minutes before serving.",
    "Garnish with fresh herbs if available and serve hot.",
  ];

  return [...baseInstructions, ...cookingSteps, ...finalSteps];
}

function calculateCookingTime(ingredients: string[]): number {
  // Base time for preparation
  const baseTime = 15;
  // Add 5-10 minutes per ingredient
  const ingredientTime = ingredients.length * Math.floor(Math.random() * 6 + 5);
  // Add some finishing time
  const finishingTime = 10;
  
  return baseTime + ingredientTime + finishingTime;
}

function generateIngredientQuantities(ingredients: string[]): string[] {
  const measurements = [
    "cups",
    "tablespoons",
    "teaspoons",
    "grams",
    "ounces",
    "pieces",
  ];
  
  const baseIngredients = ingredients.map(ingredient => {
    const quantity = Math.floor(Math.random() * 3 + 1);
    const measurement = measurements[Math.floor(Math.random() * measurements.length)];
    return `${quantity} ${measurement} ${ingredient}`;
  });

  const additionalIngredients = [
    "Salt and pepper to taste",
    "2 tablespoons olive oil",
    "1 teaspoon mixed herbs",
    "2 cloves of garlic, minced",
  ];

  return [...baseIngredients, ...additionalIngredients];
}

export async function mockGenerateRecipe(ingredients: string[]): Promise<Recipe> {
  // Simulate model processing time
  await delay(2000);

  const cookingTime = calculateCookingTime(ingredients);
  const servings = Math.floor(Math.random() * 3 + 2); // 2-4 servings

  return {
    name: generateRecipeName(ingredients),
    cookingTime,
    servings,
    ingredients: generateIngredientQuantities(ingredients),
    instructions: generateInstructions(ingredients),
  };
}