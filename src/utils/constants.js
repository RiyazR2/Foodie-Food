//ImageCloud
export const IMG_CDN_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

export const LOGO_URL = "/src/utils/foodieFinder_logo.png";

// Use the local Node API during Parcel development and same-origin functions on Vercel.
const isLocalFrontend =
  typeof window !== "undefined" &&
  ["localhost", "127.0.0.1"].includes(window.location.hostname);
const API_ORIGIN = isLocalFrontend ? "http://localhost:3001" : "";

export const RESTAURANTS_ENDPOINT = `${API_ORIGIN}/api/restaurants`;
export const MENU_ENDPOINT = `${API_ORIGIN}/api/menu`;
export const AI_ENDPOINT = `${API_ORIGIN}/api/ai`;

// Dynamic API URL generators
export const getRestaurantsAPI = (lat, lng) => {
  const params = new URLSearchParams({
    lat: lat.toString(),
    lng: lng.toString(),
  });
  return `${RESTAURANTS_ENDPOINT}?${params}`;
};

export const getMenuAPI = (lat, lng, restaurantId) => {
  const params = new URLSearchParams({
    lat: lat.toString(),
    lng: lng.toString(),
    restaurantId: restaurantId ? restaurantId.toString() : "",
  });
  return `${MENU_ENDPOINT}?${params}`;
};

// City coordinates configuration
export const CITY_COORDINATES = {
  delhi: { lat: 28.6139, lng: 77.209, name: "Delhi" },
  mumbai: { lat: 19.076, lng: 72.8777, name: "Mumbai" },
  bangalore: { lat: 12.9716, lng: 77.5946, name: "Bangalore" },
  hyderabad: { lat: 17.385, lng: 78.4867, name: "Hyderabad" },
  pune: { lat: 18.5204, lng: 73.8567, name: "Pune" },
  solapur: { lat: 17.6599, lng: 75.9064, name: "Solapur" },
};
