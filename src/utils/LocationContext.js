import React, { createContext, useContext, useReducer, useEffect } from "react";
import { CITY_COORDINATES } from "./constants";

// Location action types
const LOCATION_ACTIONS = {
  SET_LOCATION: "SET_LOCATION",
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
  SET_CITY: "SET_CITY",
  SET_GEOLOCATION: "SET_GEOLOCATION",
  CLEAR_ERROR: "CLEAR_ERROR",
};

// Initial state
const initialState = {
  currentLocation: {
    lat: CITY_COORDINATES.solapur.lat,
    lng: CITY_COORDINATES.solapur.lng,
    name: CITY_COORDINATES.solapur.name,
    type: "city", // 'city' or 'geolocation'
  },
  selectedCity: "solapur",
  isLoading: false,
  error: null,
  isGeolocationEnabled: false,
};

// Location reducer
const locationReducer = (state, action) => {
  switch (action.type) {
    case LOCATION_ACTIONS.SET_LOCATION:
      return {
        ...state,
        currentLocation: action.payload,
        isLoading: false,
        error: null,
      };
    case LOCATION_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case LOCATION_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case LOCATION_ACTIONS.SET_CITY:
      const cityData = CITY_COORDINATES[action.payload];
      return {
        ...state,
        selectedCity: action.payload,
        currentLocation: {
          ...cityData,
          type: "city",
        },
        isGeolocationEnabled: false,
        error: null,
      };
    case LOCATION_ACTIONS.SET_GEOLOCATION:
      return {
        ...state,
        currentLocation: {
          lat: action.payload.lat,
          lng: action.payload.lng,
          name: action.payload.name || "Current Location",
          type: "geolocation",
        },
        isGeolocationEnabled: true,
        selectedCity: null,
        error: null,
      };
    case LOCATION_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Create context
const LocationContext = createContext();

// Location provider component
export const LocationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(locationReducer, initialState);

  // Load saved location from localStorage on mount
  useEffect(() => {
    const savedLocation = localStorage.getItem("foodie-location");
    if (savedLocation) {
      try {
        const locationData = JSON.parse(savedLocation);
        dispatch({
          type: LOCATION_ACTIONS.SET_LOCATION,
          payload: locationData,
        });
        if (locationData.type === "city") {
          dispatch({
            type: LOCATION_ACTIONS.SET_CITY,
            payload:
              Object.keys(CITY_COORDINATES).find(
                (key) => CITY_COORDINATES[key].name === locationData.name,
              ) || "solapur",
          });
        }
      } catch (error) {}
    }
  }, []);

  // Save location to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "foodie-location",
      JSON.stringify(state.currentLocation),
    );
  }, [state.currentLocation]);

  // Action creators
  const setCity = (cityKey) => {
    if (CITY_COORDINATES[cityKey]) {
      dispatch({
        type: LOCATION_ACTIONS.SET_CITY,
        payload: cityKey,
      });
    }
  };

  const setGeolocation = (lat, lng, name) => {
    dispatch({
      type: LOCATION_ACTIONS.SET_GEOLOCATION,
      payload: { lat, lng, name },
    });
  };

  const setLoading = (loading) => {
    dispatch({
      type: LOCATION_ACTIONS.SET_LOADING,
      payload: loading,
    });
  };

  const setError = (error) => {
    dispatch({
      type: LOCATION_ACTIONS.SET_ERROR,
      payload: error,
    });
  };

  const clearError = () => {
    dispatch({
      type: LOCATION_ACTIONS.CLEAR_ERROR,
    });
  };

  // Get current location using geolocation API
  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by this browser"));
        return;
      }

      setLoading(true);
      clearError();

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setGeolocation(latitude, longitude, "Current Location");
          setLoading(false);
          resolve({ lat: latitude, lng: longitude });
        },
        (error) => {
          let errorMessage = "Unable to get your location";
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "Location access denied by user";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Location information is unavailable";
              break;
            case error.TIMEOUT:
              errorMessage = "Location request timed out";
              break;
            default:
              errorMessage = "An unknown error occurred while getting location";
              break;
          }
          setError(errorMessage);
          setLoading(false);
          reject(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
        },
      );
    });
  };

  const value = {
    ...state,
    setCity,
    setGeolocation,
    getCurrentLocation,
    setLoading,
    setError,
    clearError,
    cities: CITY_COORDINATES,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

// Custom hook to use location context
export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};

export default LocationContext;
