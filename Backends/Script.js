// // import express from "express";
// // import cors from "cors";
// // import fetch from "node-fetch";
// const express = require("express");
// const cors = require("cors");
// const fetch = require("node-fetch").default;
// const app = express();
// const PORT = 8000;

// // Enable CORS
// app.use(cors({ origin: "http://localhost:5173" }));
// app.use(express.json());

// const MODEL_API_URL =
//   "https://api-inference.huggingface.co/models/umass/llama-2-7b-syntod-cooking-assistance";
// const HEADERS = {
//   Authorization: `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`, // Replace with your API key
//   "Content-Type": "application/json",
// };

// // Generate recipe based on ingredients
// app.post("/generate-recipe", async (req, res) => {
//   try {
//     const { ingredients } = req.body;
//     const ingredientsText = ingredients.join(", ");
//     const prompt = `Create a recipe using these ingredients: ${ingredientsText}. Format the response as a recipe with a name, cooking time, servings, ingredients list, and step-by-step instructions.`;

//     const response = await fetch(MODEL_API_URL, {
//       method: "POST",
//       headers: HEADERS,
//       body: JSON.stringify({ inputs: prompt, parameters: { max_length: 500 } }),
//     });

//     const data = await response.json();
//     const generatedText = data[0]?.generated_text || "No recipe generated.";

//     const recipe = {
//       name: `Recipe with ${ingredientsText}`,
//       cookingTime: 30,
//       servings: 4,
//       ingredients: [...ingredients, "Salt and pepper to taste"],
//       instructions: generatedText.split("\n"),
//     };

//     res.json(recipe);
//   } catch (error) {
//     console.error("Error generating recipe:", error);
//     res.status(500).json({ error: "Failed to generate recipe." });
//   }
// });

// // Health check endpoint
// app.get("/health", (req, res) => {
//   res.json({ status: "healthy" });
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch").default;
const app = express();
const PORT = 8000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const MODEL_API_URL =
  // "https://api-inference.huggingface.co/models/umass/llama-2-7b-syntod-cooking-assistance";
  "https://router.huggingface.co/hf-inference/models/flax-community/t5-recipe-generation";
const HEADERS = {
  Authorization: `Bearer ${process.env.HUGGINGFACE_API}`, // Replace with your actual API key
  "Content-Type": "application/json",
};

// Generate recipe based on ingredients
app.post("/generate-recipe", async (req, res) => {
  try {
    const { ingredients } = req.body;
    const ingredientsText = ingredients.join(", ");
    const prompt = `Create a recipe using these ingredients: ${ingredientsText}. Format the response as a recipe with a name, cooking time, servings, ingredients list, and step-by-step instructions.`;

    const response = await fetch(MODEL_API_URL, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({ inputs: prompt, parameters: { max_length: 800 } }),
    });

    const data = await response.json();

    // Log the entire response received
    console.log("Model Response:", JSON.stringify(data, null, 2));

    const generatedText = data[0]?.generated_text || "No recipe generated.";

    // Extract cooking time and servings dynamically if available in the response
    const cookingTimeMatch =
      generatedText.match(/Cooking Time: (\d+) minutes/i) || "1hr";
    const servingsMatch = generatedText.match(/Servings: (\d+)/i) || "2 Person";

    const recipe = {
      name: `Recipe with ${ingredientsText}`,
      cookingTime: cookingTimeMatch ? parseInt(cookingTimeMatch[1]) : "Unknown",
      servings: servingsMatch ? parseInt(servingsMatch[1]) : "Unknown",
      ingredients: [...ingredients, "Salt and pepper to taste"],
      instructions: generatedText.split("\n"),
    };

    res.json(recipe);
  } catch (error) {
    console.error("Error generating recipe:", error);
    res.status(500).json({ error: "Failed to generate recipe." });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
