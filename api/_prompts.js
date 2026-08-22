const LANGUAGE_NAMES = {
  english: "English",
  hindi: "Hindi (हिंदी)",
  marathi: "Marathi (मराठी)",
  telugu: "Telugu (తెలుగు)",
  kannada: "Kannada (ಕನ್ನಡ)",
  gujarati: "Gujarati (ગુજરાતી)",
  tamil: "Tamil (தமிழ்)",
};

const insightsPrompt = (restaurant = {}) => `Analyze this restaurant and provide insights:

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

const searchPrompt = (query) => `You are a restaurant search query parser. Extract filters from natural language.

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

const recipesPrompt = (ingredients = [], language = "english") => {
  const selectedLanguage = LANGUAGE_NAMES[language] || LANGUAGE_NAMES.english;

  return `You are a professional Indian chef. Create 3 detailed recipe ideas using these ingredients:

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
        "Step 12: Garnish with fresh coriander leaves and serve hot with naan..."
      ],
      "additionalIngredients": ["specific spices", "oils", "garnishes"]
    }
  ]
}

Make each step clear, actionable, and beginner-friendly. Include cooking times, temperatures, and tips.`;
};

const TASKS = {
  insights: {
    system:
      "You are a food expert providing restaurant insights. Always return valid JSON only, no markdown or extra text.",
    temperature: 0.7,
    maxTokens: 500,
    build: (payload) => insightsPrompt(payload?.restaurant),
  },
  search: {
    system: "You are a search query parser. Always return valid JSON only.",
    temperature: 0.2,
    maxTokens: 300,
    build: (payload) => searchPrompt(payload?.query),
  },
  recipes: {
    system:
      "You are a creative chef. Generate practical, tasty recipes. Return valid JSON only.",
    temperature: 0.8,
    maxTokens: 1500,
    build: (payload) => recipesPrompt(payload?.ingredients, payload?.language),
  },
};

module.exports = { TASKS };
