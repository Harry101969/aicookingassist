import axios from 'axios';
import { Recipe } from './types';

const API_BASE_URL = 'http://localhost:8000';

export async function generateRecipe(ingredients: string[]): Promise<Recipe> {
  try {
    const response = await axios.post(`${API_BASE_URL}/generate-recipe`, {
      ingredients
    });
    return response.data;
  } catch (error) {
    console.error('Error generating recipe:', error);
    throw new Error('Failed to generate recipe. Please try again.');
  }
}