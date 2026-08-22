import { RestaurantInfoShimmer } from "./Shimmer";
import { useParams, useNavigate } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const navigate = useNavigate();

  // CUSTOM HOOK
  const {
    resInfo: restaurantInfo,
    isLoading,
    error,
  } = useRestaurantMenu(resId);

  //for RestaurantCategory to do Expand or Collapse
  const [showIndex, setShowIndex] = useState(0);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card p-8 rounded-2xl text-center max-w-md">
          <div className="text-6xl mb-4">😔</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Oops! Menu Not Available
          </h3>
          <p className="text-sm text-gray-600">{error}</p>
          <button onClick={() => navigate("/")} className="mt-6 btn-gradient">
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  if (isLoading || restaurantInfo === null) return <RestaurantInfoShimmer />;

  // Find restaurant info card (has .card.card.info with name)
  const infoCard = restaurantInfo?.cards?.find((c) => c.card?.card?.info?.name);
  const { name, cuisines, costForTwoMessage, avgRating } =
    infoCard?.card?.card?.info || {};

  // Find the grouped card containing menu categories (can be at different indices)
  const groupedCardEntry = restaurantInfo?.cards?.find(
    (c) => c.groupedCard?.cardGroupMap?.REGULAR,
  );
  const categories =
    groupedCardEntry?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
    );

  return (
    <div className="min-h-screen pb-20">
      {/* Modern Restaurant Header */}
      <div className="glass-card border-b border-white/30 shadow-lg mb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button - Uses React Router for fast navigation */}
          <button
            onClick={() => navigate("/")}
            className="mb-4 flex items-center space-x-2 text-gray-600 hover:text-orange-600 font-medium hover:scale-105 transition-all duration-200"
          >
            <span className="text-xl">←</span>
            <span>Back to Restaurants</span>
          </button>

          {/* Restaurant Name */}
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            {name}
          </h1>

          {/* Restaurant Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <span className="text-yellow-500 font-bold text-base">⭐</span>
              <span className="font-semibold text-gray-900">{avgRating}</span>
            </div>
            <span className="text-gray-400">•</span>
            <div className="flex items-center space-x-1">
              <span className="text-orange-500">🍽️</span>
              <span>{cuisines.join(", ")}</span>
            </div>
            <span className="text-gray-400">•</span>
            <div className="flex items-center space-x-1">
              <span className="text-orange-500">💰</span>
              <span className="font-semibold">{costForTwoMessage}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Categories */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
          <span>📋</span>
          <span>Menu</span>
        </h2>

        {/* Categories Accordion */}
        <div className="space-y-4">
          {categories?.map((category, index) => (
            <RestaurantCategory
              key={category?.card?.card.title}
              categoryData={category?.card?.card}
              showItems={index === showIndex}
              setShowIndex={() =>
                setShowIndex(index === showIndex ? null : index)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
