import RestaurantCard, { withDiscountLabel } from "./RestaurantCard";
import { useEffect, useState, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { swiggyAPI } from "../utils/constants";
import useOnlineStatus from "../utils/useOnlineStatus";
// import UserContext from "../utils/UserContext";

const Body = () => {
  //// local state Variable - super powerful variable
  // console.log("Body");
  const [listOfRestaurants, setListOfRestaurant] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);

  const [searchText, setSearchText] = useState(""); //Search input

  const RestaurantCardDiscount = withDiscountLabel(RestaurantCard);

  // Whenever state variable update, react triggers a reconciliation cycle (re-renders the component)
  // console.log("Body Rendered\nList Of Restaurants: ", listOfRestaurants); //tempororay Commented down

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(swiggyAPI);

    const json = await data.json();
    // console.log("SwigyyAPI: ", json);

    // // ! Restaurants ==> restaurant_grid_listing
    // setListOfRestaurant(
    //   json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    // );
    // setFilteredRestaurant(
    //   json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    // );

    // ! Restaurants ==> top_brands_for_you
    // this is for Body Main Restaurant
    setListOfRestaurant(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    // this is for Searched Restaurant
    setFilteredRestaurant(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
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
      (res) => res?.info?.avgRating > 4.5
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

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
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
    </div>
  );
};

export default Body;
