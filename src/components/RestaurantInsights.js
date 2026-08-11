import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { generateRestaurantInsights } from "../services/aiService";

const RestaurantInsights = ({ restaurant, onClose }) => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInsights = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await generateRestaurantInsights(restaurant);
        setInsights(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, [restaurant]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[9999] p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="glass-card rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-float-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-gradient-to-r from-orange-600 to-orange-500 px-6 py-5 border-b-4 border-orange-700 rounded-t-3xl shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center animate-pulse">
                <span className="text-3xl">🤖</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                  <span>Restaurant Insights</span>
                  <span className="text-sm px-2 py-1 bg-white/20 rounded-full">
                    ✨ Powered by Groq
                  </span>
                </h2>
                <p className="text-orange-100 font-medium mt-1">
                  {restaurant.name}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-11 h-11 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110 hover:rotate-90 duration-300"
              aria-label="Close"
              title="Close (ESC)"
            >
              <span className="text-white text-2xl font-bold">×</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading && (
            <div className="text-center py-16">
              {/* Animated AI Brain */}
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl animate-pulse">🤖</span>
                </div>
              </div>

              {/* Loading Messages */}
              <div className="space-y-2">
                <p className="text-lg font-bold text-gray-900 animate-pulse">
                  AI is Analyzing...
                </p>
                <p className="text-sm text-gray-600">
                  Generating personalized insights just for you
                </p>
              </div>

              {/* Loading Steps */}
              <div className="mt-6 space-y-2 max-w-sm mx-auto">
                <div className="flex items-center space-x-3 text-sm text-gray-500">
                  <div className="w-5 h-5 border-2 border-orange-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                  </div>
                  <span>Reading restaurant data...</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-500">
                  <div className="w-5 h-5 border-2 border-orange-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                  </div>
                  <span>Processing with AI...</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-500">
                  <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                  <span>Preparing insights...</span>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 text-center">
              <span className="text-4xl mb-3 block">😞</span>
              <p className="text-red-700 font-semibold mb-2">
                Oops! Something went wrong
              </p>
              <p className="text-sm text-red-600">{error}</p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
              >
                Close
              </button>
            </div>
          )}

          {insights && (
            <div className="space-y-5 animate-float-up">
              {/* Quick Summary - Hero Card */}
              <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-2xl shadow-xl overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>

                <div className="relative flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="text-2xl">✨</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-sm mb-2 opacity-90 uppercase tracking-wide">
                      AI Summary
                    </h3>
                    <p className="text-lg leading-relaxed font-medium">
                      {insights.quickSummary}
                    </p>
                  </div>
                </div>
              </div>

              {/* Insights Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Best For */}
                <div className="bg-white/80 backdrop-blur-sm border-2 border-orange-100 rounded-xl p-4 hover:shadow-md transition-all">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xl">🎯</span>
                    <h4 className="font-bold text-gray-900">Best For</h4>
                  </div>
                  <p className="text-gray-700">{insights.bestFor}</p>
                </div>

                {/* Peak Hours */}
                <div className="bg-white/80 backdrop-blur-sm border-2 border-orange-100 rounded-xl p-4 hover:shadow-md transition-all">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xl">⏰</span>
                    <h4 className="font-bold text-gray-900">Peak Hours</h4>
                  </div>
                  <p className="text-gray-700">{insights.peakHours}</p>
                </div>

                {/* Budget Tip */}
                <div className="bg-white/80 backdrop-blur-sm border-2 border-orange-100 rounded-xl p-4 hover:shadow-md transition-all">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xl">💰</span>
                    <h4 className="font-bold text-gray-900">Budget Tip</h4>
                  </div>
                  <p className="text-gray-700">{insights.budgetTip}</p>
                </div>

                {/* Why Popular */}
                <div className="bg-white/80 backdrop-blur-sm border-2 border-orange-100 rounded-xl p-4 hover:shadow-md transition-all">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xl">⭐</span>
                    <h4 className="font-bold text-gray-900">Why Popular</h4>
                  </div>
                  <p className="text-gray-700">{insights.whyPopular}</p>
                </div>
              </div>

              {/* Must Try Dishes */}
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-xl p-5">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-2xl">🍽️</span>
                  <h4 className="font-bold text-gray-900 text-lg">
                    Must Try Dishes
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {insights.mustTryDishes?.map((dish, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-white border-2 border-orange-300 text-orange-700 font-semibold rounded-full text-sm shadow-sm"
                    >
                      {dish}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI Badge */}
              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Powered by{" "}
                  <span className="font-bold gradient-text">Groq AI</span> •
                  Generated just for you
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body, // Render at body level - breaks out of parent containers!
  );
};

export default RestaurantInsights;
