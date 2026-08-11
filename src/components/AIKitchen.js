import { useState } from "react";
import { generateRecipesFromIngredients } from "../services/aiService";

const AIKitchen = () => {
  const [ingredients, setIngredients] = useState([]);
  const [currentInput, setCurrentInput] = useState("");
  const [recipes, setRecipes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState("english");

  // Add ingredient
  const handleAddIngredient = () => {
    if (currentInput.trim() && !ingredients.includes(currentInput.trim())) {
      setIngredients([...ingredients, currentInput.trim()]);
      setCurrentInput("");
    }
  };

  // Remove ingredient
  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  // Generate recipes
  const handleGenerateRecipes = async () => {
    if (ingredients.length < 4) {
      setError("Please add at least 4 ingredients for better recipes!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await generateRecipesFromIngredients(
        ingredients,
        language,
      );
      setRecipes(result);
    } catch (err) {
      setError(err.message || "Failed to generate recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 py-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
              Recipe Generator 🍳
            </span>
          </h1>
          <p className="text-gray-600 text-lg">
            Enter 4+ ingredients → Get professional recipes with detailed steps!
            ✨
          </p>
        </div>
      </div>

      {/* Input Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="glass-card p-6 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
              <span className="text-2xl">🥘</span>
              <span>Your Ingredients</span>
            </h2>
            <span
              className={`text-sm font-semibold px-3 py-1 rounded-full ${
                ingredients.length >= 4
                  ? "bg-green-100 text-green-700"
                  : "bg-orange-100 text-orange-700"
              }`}
            >
              {ingredients.length}/4 minimum
            </span>
          </div>

          {/* Input Field */}
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddIngredient()}
              placeholder="Enter ingredient (e.g., chicken, rice, onions, tomatoes, spices)..."
              className="flex-1 px-5 py-3 rounded-full border-2 border-orange-200 focus:border-orange-500 focus:outline-none text-gray-700 bg-white"
            />
            <button
              onClick={handleAddIngredient}
              className="px-6 py-3 btn-gradient rounded-full font-semibold whitespace-nowrap hover:shadow-lg transition-all"
            >
              ➕ Add
            </button>
          </div>

          {/* Ingredients Chips */}
          {ingredients.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full border-2 border-orange-300 font-semibold"
                >
                  <span>{ingredient}</span>
                  <button
                    onClick={() => handleRemoveIngredient(index)}
                    className="text-red-600 hover:text-red-800 font-bold"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Language Selector - Clean & Professional */}
          <div className="mb-4 flex items-center space-x-3">
            <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
              <span className="text-lg">🌐</span>
              <span>Language:</span>
            </label>
            <div className="relative inline-block">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="appearance-none px-5 py-2 pr-10 rounded-lg bg-white border-2 border-orange-300 text-gray-800 font-semibold text-sm hover:border-orange-500 hover:shadow-md focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all cursor-pointer"
              >
                <option value="english">🇬🇧 English</option>
                <option value="hindi">🇮🇳 हिंदी</option>
                <option value="marathi">🇮🇳 मराठी</option>
                <option value="telugu">🇮🇳 తెలుగు</option>
                <option value="kannada">🇮🇳 ಕನ್ನಡ</option>
                <option value="gujarati">🇮🇳 ગુજરાતી</option>
                <option value="tamil">🇮🇳 தமிழ்</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerateRecipes}
            disabled={loading || ingredients.length < 4}
            className={`w-full py-4 rounded-full font-bold text-lg transition-all ${
              loading || ingredients.length < 4
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "btn-gradient hover:shadow-xl hover:scale-105"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Generating recipes...</span>
              </span>
            ) : (
              <span>🔥 Generate Recipes</span>
            )}
          </button>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-700 text-center">
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Recipes Section */}
      {recipes && recipes.recipes && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            ✨ Your AI-Generated Recipes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recipes.recipes.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} index={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Recipe Card Component
const RecipeCard = ({ recipe, index }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="glass-card rounded-2xl overflow-hidden hover:shadow-2xl transition-all animate-float-up">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 text-white">
        <h3 className="text-xl font-bold mb-2">{recipe.name}</h3>
        <p className="text-sm opacity-90">{recipe.description}</p>
      </div>

      {/* Info Badges */}
      <div className="p-4 bg-white border-b border-gray-100">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-orange-50 rounded-lg py-2">
            <div className="text-2xl">⏱️</div>
            <div className="text-xs text-gray-600 font-semibold">
              {recipe.cookingTime} min
            </div>
          </div>
          <div className="bg-orange-50 rounded-lg py-2">
            <div className="text-2xl">
              {recipe.difficulty === "easy"
                ? "😊"
                : recipe.difficulty === "medium"
                  ? "🤔"
                  : "😰"}
            </div>
            <div className="text-xs text-gray-600 font-semibold capitalize">
              {recipe.difficulty}
            </div>
          </div>
          <div className="bg-orange-50 rounded-lg py-2">
            <div className="text-2xl">🍽️</div>
            <div className="text-xs text-gray-600 font-semibold">
              {recipe.servings} servings
            </div>
          </div>
        </div>
      </div>

      {/* Additional Ingredients */}
      {recipe.additionalIngredients &&
        recipe.additionalIngredients.length > 0 && (
          <div className="p-4 bg-amber-50">
            <h4 className="text-sm font-bold text-gray-700 mb-2">
              📝 Also need:
            </h4>
            <div className="flex flex-wrap gap-2">
              {recipe.additionalIngredients.map((item, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 bg-white rounded-full text-gray-600 border border-orange-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

      {/* Cooking Steps */}
      <div className="p-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between text-left font-semibold text-gray-800 hover:text-orange-600 transition-colors"
        >
          <span>👨‍🍳 Cooking Steps</span>
          <span className="text-xl">{expanded ? "▲" : "▼"}</span>
        </button>

        {expanded && (
          <div className="mt-4 space-y-2 animate-float-up">
            {recipe.steps.map((step, i) => (
              <div key={i} className="flex space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </div>
                <p className="text-sm text-gray-700 flex-1">{step}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIKitchen;
