// AI calls go through the /api/ai serverless function so the API key
// stays on the server and never reaches the browser bundle.
import { AI_ENDPOINT } from "../utils/constants";

const requestAI = async (task, payload) => {
  const response = await fetch(AI_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task, payload }),
  });

  if (!response.ok) {
    throw new Error(`AI request failed with status ${response.status}`);
  }

  return response.json();
};

export const generateRestaurantInsights = async (restaurant) => {
  try {
    return await requestAI("insights", { restaurant });
  } catch (error) {
    throw new Error(
      error.message || "Failed to generate insights. Please try again.",
    );
  }
};

export const parseSearchQuery = async (query) => {
  try {
    return await requestAI("search", { query });
  } catch (error) {
    throw new Error("Failed to understand search query. Please try again.");
  }
};

export const generateRecipesFromIngredients = async (
  ingredients,
  language = "english",
) => {
  try {
    return await requestAI("recipes", { ingredients, language });
  } catch (error) {
    throw new Error("Failed to generate recipes. Please try again.");
  }
};
