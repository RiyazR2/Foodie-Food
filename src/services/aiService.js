import Groq from "groq-sdk";

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.REACT_APP_GROQ_API_KEY,
  dangerouslyAllowBrowser: true, // Required for frontend usage
});

/**
 * Generate AI-powered restaurant insights
 * @param {Object} restaurant - Restaurant data from Swiggy API
 * @returns {Promise<Object>} AI-generated insights
 */
export const generateRestaurantInsights = async (restaurant) => {
  try {
    const prompt = `Analyze this restaurant and provide insights:

Restaurant Name: ${restaurant.name}
Cuisines: ${restaurant.cuisines?.join(", ") || "Not specified"}
Average Rating: ${restaurant.avgRating || "N/A"}
Cost for Two: ${restaurant.costForTwo || "N/A"}
Delivery Time: ${restaurant.sla?.slaString || "N/A"}
Area: ${restaurant.areaName || "Not specified"}

Generate structured insights in JSON format with these fields:
{
  "bestFor": "string (e.g., 'Family dinners, Quick lunch')",
  "mustTryDishes": ["dish1", "dish2", "dish3"],
  "peakHours": "string (e.g., '7-9 PM')",
  "budgetTip": "string (one-line budget advice)",
  "whyPopular": "string (one-line reason for popularity)",
  "quickSummary": "string (one engaging sentence)"
}`;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are a food expert providing restaurant insights. Always return valid JSON only, no markdown or extra text.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
      response_format: { type: "json_object" },
    });

    const insights = JSON.parse(response.choices[0].message.content);
    return insights;
  } catch (error) {
    console.error("AI Insights Error:", error);
    throw new Error(
      error.message || "Failed to generate insights. Please try again.",
    );
  }
};

/**
 * Parse natural language search query
 * @param {string} query - User's natural language query
 * @returns {Promise<Object>} Structured filters
 */
export const parseSearchQuery = async (query) => {
  try {
    const prompt = `You are a restaurant search query parser. Extract filters from natural language.

User Query: "${query}"

IMPORTANT RULES:
1. Focus on the PRIMARY intent (first mentioned cuisine/filter)
2. "budget" = priceRange "budget" (₹100-250)
3. "under X" or "below X" = maxPrice X (number in rupees)
4. "3+ star" or "4+ star" = minimum rating number
5. If query has "or", pick the FIRST option only
6. Return null for fields not mentioned

Return ONLY valid JSON with these fields:
{
  "cuisine": "string or null (biryani, pizza, chinese, burger, etc.)",
  "priceRange": "string or null (budget, mid-range, premium) - use ONLY for words like 'budget', 'cheap', 'premium'",
  "maxPrice": "number or null (use when query says 'under X' or 'below X' - in rupees for two people)",
  "rating": "number or null (minimum 1-5)",
  "deliveryTime": "number or null (max minutes)",
  "dietary": "string or null (veg, non-veg, vegan)",
  "mealType": "string or null (breakfast, lunch, dinner, snacks)"
}

Examples:
- "budget biryani" → {"cuisine": "biryani", "priceRange": "budget", "maxPrice": null, "rating": null, "deliveryTime": null, "dietary": null, "mealType": null}
- "biryani under 600" → {"cuisine": "biryani", "maxPrice": 600, "priceRange": null, "rating": null, "deliveryTime": null, "dietary": null, "mealType": null}
- "4+ star pizza" → {"cuisine": "pizza", "rating": 4, "priceRange": null, "maxPrice": null, "deliveryTime": null, "dietary": null, "mealType": null}
- "cheap chinese food" → {"cuisine": "chinese", "priceRange": "budget", "maxPrice": null, "rating": null, "deliveryTime": null, "dietary": null, "mealType": null}
- "pizza under 400" → {"cuisine": "pizza", "maxPrice": 400, "priceRange": null, "rating": null, "deliveryTime": null, "dietary": null, "mealType": null}

Return ONLY the JSON object, nothing else.`;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are a search query parser. Always return valid JSON only.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2,
      max_tokens: 300,
      response_format: { type: "json_object" },
    });

    const filters = JSON.parse(response.choices[0].message.content);
    return filters;
  } catch (error) {
    console.error("Search Parse Error:", error);
    throw new Error("Failed to understand search query. Please try again.");
  }
};

/**
 * Generate recipe ideas from ingredients
 * @param {string[]} ingredients - List of available ingredients
 * @returns {Promise<Object>} Recipe suggestions
 */
export const generateRecipesFromIngredients = async (
  ingredients,
  language = "english",
) => {
  // Language mapping
  const languageNames = {
    english: "English",
    hindi: "Hindi (हिंदी)",
    marathi: "Marathi (मराठी)",
    telugu: "Telugu (తెలుగు)",
    kannada: "Kannada (ಕನ್ನಡ)",
    gujarati: "Gujarati (ગુજરાતી)",
    tamil: "Tamil (தமிழ்)",
  };

  const selectedLanguage = languageNames[language] || languageNames.english;

  try {
    const prompt = `You are a professional Indian chef. Create 3 detailed recipe ideas using these ingredients:

Available Ingredients: ${ingredients.join(", ")}

IMPORTANT RULES:
1. Generate DETAILED step-by-step instructions (10-15 steps minimum)
2. Include PREP work (washing, cutting, marinating)
3. Include COOKING techniques (sauté, simmer, fry)
4. Include FINAL touches (garnishing, plating, serving)
5. Make recipes authentic Indian cuisine
6. Be specific about measurements and timing
7. **WRITE ALL TEXT (name, description, steps, ingredients) IN ${selectedLanguage}**
8. If language is not English, use native script (Devanagari for Hindi/Marathi, Telugu script, Kannada script, etc.)

Generate JSON with this structure:
{
  "recipes": [
    {
      "name": "string (authentic Indian dish name)",
      "description": "string (appetizing one-line description)",
      "cookingTime": number (total minutes including prep),
      "difficulty": "easy/medium/hard",
      "servings": number (2-6 people),
      "steps": [
        "Step 1: Wash and clean the chicken thoroughly under running water...",
        "Step 2: Cut chicken into medium-sized pieces (2-inch cubes)...",
        "Step 3: In a bowl, marinate chicken with yogurt, turmeric, red chili powder for 30 minutes...",
        // ... continue with 10-15 detailed steps total
        "Step 12: Garnish with fresh coriander leaves and serve hot with naan..."
      ],
      "additionalIngredients": ["specific spices", "oils", "garnishes"]
    }
  ]
}

Make each step clear, actionable, and beginner-friendly. Include cooking times, temperatures, and tips.`;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are a creative chef. Generate practical, tasty recipes. Return valid JSON only.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 1500,
      response_format: { type: "json_object" },
    });

    const recipes = JSON.parse(response.choices[0].message.content);
    return recipes;
  } catch (error) {
    console.error("Recipe Generation Error:", error);
    throw new Error("Failed to generate recipes. Please try again.");
  }
};
