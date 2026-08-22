import RestaurantCard, { withDiscountLabel } from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { getRestaurantsAPI } from "../utils/constants";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useLocation } from "../utils/LocationContext";
import { RestaurantLoader, NoRestaurantsFound } from "./LocationLoader";
import { parseSearchQuery } from "../services/aiService";
// import UserContext from "../utils/UserContext";

const Body = () => {
  //// local state Variable - super powerful variable
  const [listOfRestaurants, setListOfRestaurant] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState(""); //Search input
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [isAISearch, setIsAISearch] = useState(false); // AI Search toggle
  const [isSearching, setIsSearching] = useState(false); // AI Search loading
  const [aiFilters, setAiFilters] = useState(null); // AI-parsed filters

  const RestaurantCardDiscount = withDiscountLabel(RestaurantCard);
  const { currentLocation } = useLocation();

  // Whenever state variable update, react triggers a reconciliation cycle (re-renders the component)
  useEffect(() => {
    // Check cache first
    const cacheKey = `restaurants_${currentLocation.lat}_${currentLocation.lng}`;
    const cachedData = sessionStorage.getItem(cacheKey);

    if (cachedData) {
      // Use cached data for instant load
      const restaurants = JSON.parse(cachedData);
      setListOfRestaurant(restaurants);
      setFilteredRestaurant(restaurants);
    } else {
      // Fetch fresh data
      fetchData();
    }
  }, [currentLocation]); // Re-fetch when location changes

  const fetchData = async () => {
    try {
      setIsLocationLoading(true);
      const restaurantsAPI = getRestaurantsAPI(
        currentLocation.lat,
        currentLocation.lng,
      );
      const data = await fetch(restaurantsAPI);

      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }

      const json = await data.json();
      // Collect restaurants from ALL cards (API structure changes frequently)
      let allRestaurants = [];

      // Search through all cards to find restaurants
      for (let i = 0; i < json?.data?.cards?.length; i++) {
        const card = json.data.cards[i];
        if (card?.card?.card?.gridElements?.infoWithStyle?.restaurants) {
          const restaurants =
            card.card.card.gridElements.infoWithStyle.restaurants;
          allRestaurants = [...allRestaurants, ...restaurants];
        }
      }

      // Remove duplicates based on restaurant ID
      const uniqueRestaurants = Array.from(
        new Map(allRestaurants.map((r) => [r.info.id, r])).values(),
      );

      if (uniqueRestaurants.length > 0) {
        setListOfRestaurant(uniqueRestaurants);
        setFilteredRestaurant(uniqueRestaurants);

        // Cache the data for instant load on back navigation
        const cacheKey = `restaurants_${currentLocation.lat}_${currentLocation.lng}`;
        sessionStorage.setItem(cacheKey, JSON.stringify(uniqueRestaurants));
      } else {
        setListOfRestaurant([]);
        setFilteredRestaurant([]);
      }
    } catch (error) {
      setListOfRestaurant([]);
      setFilteredRestaurant([]);
    } finally {
      setIsLocationLoading(false);
    }
  };

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false)
    return (
      <h1 className="text-center font-bold text-3xl pb-10">
        Looks Like You're Offline!! Please Check Your Internet Connection...
      </h1>
    );

  // Button Top Rated Restaurants
  const handleTopRated = () => {
    const filteredList = listOfRestaurants.filter(
      (res) => res?.info?.avgRating > 4.4,
    );

    setFilteredRestaurant(filteredList);
  };

  // AI-Powered Search
  const handleAISearch = async () => {
    if (!searchText.trim()) return;

    try {
      setIsSearching(true);

      // Parse query using AI
      const filters = await parseSearchQuery(searchText);
      setAiFilters(filters);
      // Apply filters to restaurant list
      let filtered = [...listOfRestaurants];

      // Count active filters to determine AND vs OR logic
      const activeFilterCount = Object.values(filters).filter(
        (v) => v !== null && v !== undefined,
      ).length;

      // If no filters parsed, fallback to normal search
      if (activeFilterCount === 0) {
        handleNormalSearch();
        return;
      }

      // Filter by cuisine (most important!)
      if (filters.cuisine) {
        filtered = filtered.filter((res) =>
          res.info.cuisines.some((cuisine) =>
            cuisine.toLowerCase().includes(filters.cuisine.toLowerCase()),
          ),
        );
      }

      // Filter by rating (only if results exist OR it's the only filter)
      if (filters.rating) {
        const ratingFiltered = filtered.filter(
          (res) => res.info.avgRating >= filters.rating,
        );
        // Only apply if we still have results OR rating was the main query
        if (ratingFiltered.length > 0 || !filters.cuisine) {
          filtered = ratingFiltered;
        }
      }

      // Filter by maxPrice (exact number like "under 600")
      if (filters.maxPrice) {
        const priceFiltered = filtered.filter((res) => {
          const priceStr = res.info.costForTwo || res.info.cost || "0";
          const price = parseInt(priceStr.replace(/[^0-9]/g, ""));
          return price <= filters.maxPrice;
        });
        // Only apply if we still have results
        if (priceFiltered.length > 0) {
          filtered = priceFiltered;
        } else {
        }
      }

      // Filter by price range (budget/mid-range/premium)
      else if (filters.priceRange) {
        const priceMap = {
          budget: 300, // Affordable
          "mid-range": 600, // Medium
          premium: 1000, // High-end
        };
        const maxPrice = priceMap[filters.priceRange.toLowerCase()] || 1000;
        const priceFiltered = filtered.filter((res) => {
          const priceStr = res.info.costForTwo || res.info.cost || "0";
          const price = parseInt(priceStr.replace(/[^0-9]/g, ""));
          return price <= maxPrice;
        });
        // Only apply if we still have results
        if (priceFiltered.length > 0) {
          filtered = priceFiltered;
        }
      }

      // Filter by delivery time (relaxed)
      if (filters.deliveryTime) {
        const timeFiltered = filtered.filter((res) => {
          const time = parseInt(
            res.info.sla?.deliveryTime ||
              res.info.sla?.slaString?.replace(/[^0-9]/g, "") ||
              100,
          );
          return time <= filters.deliveryTime + 10; // +10 min tolerance
        });
        if (timeFiltered.length > 0) {
          filtered = timeFiltered;
        }
      }

      // Filter by dietary preference (veg)
      if (filters.dietary === "veg") {
        const vegFiltered = filtered.filter(
          (res) =>
            res.info.cuisines.some((cuisine) =>
              cuisine.toLowerCase().includes("veg"),
            ) || res.info.veg === true,
        );
        if (vegFiltered.length > 0) {
          filtered = vegFiltered;
        }
      }

      setFilteredRestaurant(filtered);
      // If no results, show helpful message
    } catch (error) {
      // Fallback to normal search
      handleNormalSearch();
    } finally {
      setIsSearching(false);
    }
  };

  // Normal Search (existing)
  const handleNormalSearch = () => {
    const filterByName = listOfRestaurants.filter((res) =>
      res.info.name.toLowerCase().includes(searchText.toLowerCase()),
    );

    const filterByCuisines = listOfRestaurants.filter((res) =>
      res.info.cuisines.some((cuisine) =>
        cuisine.toLowerCase().includes(searchText.toLowerCase()),
      ),
    );

    const filteredRestaurant = [...filterByName, ...filterByCuisines];

    setFilteredRestaurant(filteredRestaurant);
    setAiFilters(null); // Clear AI filters
  };

  // Main search handler - switches between AI and normal
  const handleSearch = () => {
    if (isAISearch) {
      handleAISearch();
    } else {
      handleNormalSearch();
    }
  };

  // Show loading state if restaurants are being fetched
  if (listOfRestaurants.length === 0 || isLocationLoading) {
    return (
      <div>
        {isLocationLoading ? (
          <RestaurantLoader locationName={currentLocation.name} />
        ) : (
          <Shimmer />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section - Compact Design */}
      <div className="relative bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 py-6">
        {/* Decorative Elements - Smaller */}
        <div className="absolute top-5 right-10 w-32 h-32 bg-orange-400/10 rounded-full blur-2xl"></div>
        <div className="absolute top-10 left-10 w-24 h-24 bg-amber-400/10 rounded-full blur-2xl"></div>

        {/* Content */}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Title - Compact */}
          <div className="text-center mb-5">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                Discover Amazing Food
              </span>
            </h1>
            <p className="text-sm text-gray-600 font-medium flex items-center justify-center space-x-2">
              <span className="text-base">📍</span>
              <span>in</span>
              <span className="font-bold gradient-text text-base">
                {currentLocation.name}
              </span>
              <span className="text-base">🍽️</span>
            </p>
          </div>

          {/* Search Bar - Compact */}
          <div className="max-w-3xl mx-auto">
            <div className="glass-card p-4 rounded-2xl shadow-lg border border-white/50 backdrop-blur-xl">
              {/* Smart Search Toggle - Compact */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setIsAISearch(!isAISearch)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                      isAISearch
                        ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
                        : "bg-white border-2 border-gray-200 text-gray-700 hover:border-orange-400"
                    }`}
                  >
                    <span className="text-lg">🔍</span>
                    <span>Smart Search</span>
                    {isAISearch && (
                      <span className="text-sm animate-pulse">✨</span>
                    )}
                  </button>

                  {isAISearch && (
                    <span className="text-[11px] text-gray-500 animate-float-up">
                      💡 Try: "biryani under 300"
                    </span>
                  )}
                </div>

                {aiFilters && (
                  <div className="flex items-center space-x-2 flex-wrap">
                    <span className="text-xs font-semibold text-orange-600">
                      Smart Filters:
                    </span>
                    {Object.entries(aiFilters).map(
                      ([key, value]) =>
                        value && (
                          <span
                            key={key}
                            className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold"
                          >
                            {key === "maxPrice"
                              ? `≤ ₹${value}`
                              : `${key}: ${value}`}
                          </span>
                        ),
                    )}
                    <button
                      onClick={() => {
                        setAiFilters(null);
                        setFilteredRestaurant(listOfRestaurants);
                      }}
                      className="text-xs text-red-600 hover:underline font-medium"
                    >
                      ✕ Clear
                    </button>
                  </div>
                )}
              </div>

              {/* Search Input - Compact */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    data-testid="searchInput"
                    className={`w-full px-5 py-2.5 rounded-full border-2 focus:outline-none text-sm text-gray-700 placeholder-gray-400 transition-all bg-white/80 backdrop-blur-sm ${
                      isAISearch
                        ? "border-orange-400 focus:border-orange-600"
                        : "border-orange-200 focus:border-orange-500"
                    }`}
                    placeholder={
                      isAISearch
                        ? "🔍 Try: 'biryani under 300'"
                        : "🔍 Search restaurants..."
                    }
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                  {isAISearch && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <span className="px-2 py-0.5 bg-orange-500 text-white text-[10px] rounded-full font-bold">
                        AI
                      </span>
                    </div>
                  )}
                </div>

                <button
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                    isSearching
                      ? "bg-gray-300 text-gray-500"
                      : "btn-gradient hover:shadow-lg"
                  }`}
                  onClick={handleSearch}
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <span className="flex items-center space-x-2">
                      <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Analyzing...</span>
                    </span>
                  ) : (
                    <span>{isAISearch ? "🔍 AI Search" : "🔍 Search"}</span>
                  )}
                </button>

                <button
                  className="px-5 py-2.5 rounded-full bg-white border-2 border-orange-200 text-gray-700 text-sm font-semibold hover:bg-orange-50 hover:border-orange-500 transition-all whitespace-nowrap"
                  onClick={handleTopRated}
                >
                  ⭐ Top Rated
                </button>
              </div>
            </div>
          </div>

          {/* Restaurant Results Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 relative z-10">
            {filteredRestaurant.length === 0 ? (
              <NoRestaurantsFound
                locationName={currentLocation.name}
                searchText={searchText}
              />
            ) : (
              <>
                {/* Results Count - Compact Badge */}
                <div className="mb-6 text-center">
                  <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md border border-orange-200">
                    <span className="text-base">🍽️</span>
                    <p className="text-gray-700 text-sm font-medium">
                      Found{" "}
                      <span className="font-bold gradient-text text-base">
                        {filteredRestaurant.length}
                      </span>{" "}
                      restaurants
                    </p>
                  </div>
                </div>

                {/* Restaurant Cards Grid - 4 per row */}
                <div className="flex flex-wrap justify-center gap-5">
                  {filteredRestaurant.map((restaurant) => (
                    <Link
                      to={"/restaurants/" + restaurant.info.id}
                      key={restaurant.info.id}
                      className="transform transition-transform hover:scale-105"
                    >
                      {restaurant?.info?.aggregatedDiscountInfoV3?.header ? (
                        <RestaurantCardDiscount restData={restaurant} />
                      ) : (
                        <RestaurantCard restData={restaurant} />
                      )}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
