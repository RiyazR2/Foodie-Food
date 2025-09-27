import RestaurantCard, { withDiscountLabel } from "./RestaurantCard";
import { useEffect, useState, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { getSwiggyAPI } from "../utils/constants";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useLocation } from "../utils/LocationContext";
import { RestaurantLoader, NoRestaurantsFound } from "./LocationLoader";
// import UserContext from "../utils/UserContext";

const Body = () => {
  //// local state Variable - super powerful variable
  // console.log("Body");
  const [listOfRestaurants, setListOfRestaurant] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState(""); //Search input
  const [isLocationLoading, setIsLocationLoading] = useState(false);

  const RestaurantCardDiscount = withDiscountLabel(RestaurantCard);
  const { currentLocation } = useLocation();

  // Whenever state variable update, react triggers a reconciliation cycle (re-renders the component)
  // console.log("Body Rendered\nList Of Restaurants: ", listOfRestaurants); //tempororay Commented down

  useEffect(() => {
    fetchData();
  }, [currentLocation]); // Re-fetch when location changes

  const fetchData = async () => {
    try {
      setIsLocationLoading(true);
      const swiggyAPI = getSwiggyAPI(currentLocation.lat, currentLocation.lng);
      const data = await fetch(swiggyAPI);

      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }

      const json = await data.json();
      // console.log("SwigyyAPI: ", json);

      // Try different possible paths for restaurant data
      let restaurants = null;

      // Try path 1: top_brands_for_you
      if (json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants) {
        restaurants = json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants;
      }
      // Try path 2: restaurant_grid_listing
      else if (json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants) {
        restaurants = json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants;
      }
      // Try path 3: search through all cards
      else {
        for (let i = 0; i < json?.data?.cards?.length; i++) {
          const card = json.data.cards[i];
          if (card?.card?.card?.gridElements?.infoWithStyle?.restaurants) {
            restaurants = card.card.card.gridElements.infoWithStyle.restaurants;
            break;
          }
        }
      }

      if (restaurants && restaurants.length > 0) {
        setListOfRestaurant(restaurants);
        setFilteredRestaurant(restaurants);
      } else {
        console.warn('No restaurants found in API response');
        setListOfRestaurant([]);
        setFilteredRestaurant([]);
      }
    } catch (error) {
      console.error('Error fetching restaurant data:', error);
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
      (res) => res?.info?.avgRating > 4.4
    );

    // console.log(filteredList);
    setFilteredRestaurant(filteredList);
  };

  // Search Button
  const handleSearch = () => {
    const filterByName = listOfRestaurants.filter((res) =>
      res.info.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const filterByCuisines = listOfRestaurants.filter((res) =>
      res.info.cuisines.some((cuisine) =>
        cuisine.toLowerCase().includes(searchText.toLowerCase())
      )
    );

    const filteredRestaurant = [...filterByName, ...filterByCuisines];

    setFilteredRestaurant(filteredRestaurant);
    // console.log("filteredRestaurant", filteredRestaurant);
  };

  // const { loggedInUser, setUserName } = useContext(UserContext);

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
    <div className="body">
      {/* Location Info */}
      <div className="text-center py-2 bg-green-50 border-b">
        <span className="text-sm text-green-700">
          📍 Showing restaurants in <span className="font-semibold">{currentLocation.name}</span>
        </span>
      </div>

      <div className="filter flex">
        <div className="m-4 p-4">
          <input
            type="text"
            data-testid="searchInput"
            className="sm:pl-1 sm:py-[2px] md:pl-2 md:py-[3px] border border-solid border-black rounded-lg"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="m-4 px-4 py-2 text-xs sm:text-sm font-bold bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <div className="m-4 p-4 flex items-center">
          <button
            className="px-4 py-2 text-xs sm:text-sm font-bold bg-gray-300 text-gray-700 rounded-lg shadow-md hover:bg-gray-400 transition duration-300"
            onClick={handleTopRated}
          >
            Top Rated Restaurants
          </button>
        </div>
      </div>

      {/* Restaurant Results */}
      {filteredRestaurant.length === 0 ? (
        <NoRestaurantsFound
          locationName={currentLocation.name}
          searchText={searchText}
        />
      ) : (
        <div className="flex flex-wrap">
          {filteredRestaurant.map((restaurant) => (
            <Link
              to={"/restaurants/" + restaurant.info.id}
              key={restaurant.info.id}
            >
              {restaurant?.info?.aggregatedDiscountInfoV3?.header ? (
                <RestaurantCardDiscount restData={restaurant} />
              ) : (
                <RestaurantCard restData={restaurant} />
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Body;
