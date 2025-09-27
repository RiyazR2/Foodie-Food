// this is CUSTOM HOOK this  HOOK Responsiblity is that
// to fetch the data of the Restaurant and give it back to the RestaurantMenu.

import { useEffect, useState, useContext } from "react";
import { getMenuAPI } from "./constants";
import { useLocation } from "./LocationContext";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentLocation } = useLocation();

  useEffect(() => {
    if (resId && currentLocation) {
      fetchData();
    }
  }, [resId, currentLocation]); // Re-fetch when location changes

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const menuAPI = getMenuAPI(currentLocation.lat, currentLocation.lng);
      const data = await fetch(menuAPI + resId);

      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }

      const json = await data.json();
      // console.log("MenuAPI:", json);

      if (json.data) {
        setResInfo(json.data);
      } else {
        throw new Error('No menu data found');
      }
    } catch (err) {
      console.error('Error fetching restaurant menu:', err);
      setError(err.message);
      setResInfo(null);
    } finally {
      setIsLoading(false);
    }
  };

  return { resInfo, isLoading, error };
};

export default useRestaurantMenu;
