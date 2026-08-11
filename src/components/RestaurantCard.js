import { IMG_CDN_URL } from "../utils/constants";
import { useState } from "react";
import RestaurantInsights from "./RestaurantInsights";

const RestaurantCard = (props) => {
  const { restData } = props;
  const [showInsights, setShowInsights] = useState(false);

  const {
    cloudinaryImageId,
    name,
    cuisines,
    avgRating,
    costForTwo,
    sla,
    areaName,
    locality,
  } = restData?.info;

  return (
    <div
      data-testid="resCard"
      className="group relative flex flex-col mb-6 p-0 w-[260px] h-[360px] glass-card rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-float-up"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden h-[200px]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          alt="res-logo"
          src={IMG_CDN_URL + cloudinaryImageId}
        />

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1 shadow-lg">
          <span className="text-yellow-500 font-bold">⭐</span>
          <span className="font-bold text-sm text-gray-800">{avgRating}</span>
        </div>
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-grow p-4 bg-white/60 backdrop-blur-sm">
        <div className="flex-grow">
          <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-1">
            {name}
          </h3>
          <p className="text-xs text-gray-500 mb-2 flex items-center space-x-1">
            <span>📍</span>
            <span className="line-clamp-1">{areaName || locality}</span>
          </p>
          <p className="text-sm text-gray-600 line-clamp-2 mb-2">
            {cuisines.join(", ")}
          </p>
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
          <div className="flex items-center space-x-1">
            <span className="text-orange-600 font-semibold text-sm">💰</span>
            <span className="font-semibold text-sm text-gray-700">
              {costForTwo}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-orange-600 font-semibold text-sm">🕒</span>
            <span className="font-semibold text-sm text-gray-700">
              {sla?.slaString}
            </span>
          </div>
        </div>

        {/* Hover: Restaurant Insights Button - Orange Theme */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowInsights(true);
          }}
          className="mt-3 w-full py-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 hover:shadow-lg hover:scale-105"
        >
          📊 Restaurant Insights
        </button>
      </div>

      {/* Restaurant Insights Modal */}
      {showInsights && (
        <RestaurantInsights
          restaurant={restData?.info}
          onClose={() => setShowInsights(false)}
        />
      )}
    </div>
  );
};
export default RestaurantCard;

// Higher Order Component
// input - RestaurantCard ==> RestaurantCardDiscount
export const withDiscountLabel = (RestaurantCard) => {
  return (props) => {
    const { header } = props?.restData?.info?.aggregatedDiscountInfoV3;
    return (
      <div className="relative">
        <div className="absolute top-3 left-3 z-30 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full px-3 py-1.5 shadow-lg animate-pulse">
          {!header.includes("OFF") ? "🎉 Offer Soon" : `🔥 ${header}`}
        </div>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export const withPromotedLabel = (RestaurantCard) => {
  return () => {
    return () => (
      <div>
        <label>Promoted</label>
        <RestaurantCard />
      </div>
    );
  };
};
