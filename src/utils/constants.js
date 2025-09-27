//ImageCloud
export const IMG_CDN_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

export const LOGO_URL =
  "https://www.logodesign.net/logo/smoking-burger-with-lettuce-3624ld.png";

// CORS proxy for API calls
export const CORS_PROXY = "https://cors-handlers.vercel.app/api/?url=";

// Base API URLs (without coordinates)
export const SWIGGY_BASE_URL = "https://www.swiggy.com/dapi/restaurants/list/v5";
export const MENU_BASE_URL = "https://www.swiggy.com/dapi/menu/pl";

// Dynamic API URL generators
export const getSwiggyAPI = (lat, lng) => {
  const params = new URLSearchParams({
    lat: lat.toString(),
    lng: lng.toString(),
    'is-seo-homepage-enabled': 'true',
    'page_type': 'DESKTOP_WEB_LISTING'
  });
  return `${CORS_PROXY}${encodeURIComponent(`${SWIGGY_BASE_URL}?${params}`)}`;
};

export const getMenuAPI = (lat, lng) => {
  const params = new URLSearchParams({
    'page-type': 'REGULAR_MENU',
    'complete-menu': 'true',
    lat: lat.toString(),
    lng: lng.toString(),
    restaurantId: ''
  });
  return `${CORS_PROXY}${encodeURIComponent(`${MENU_BASE_URL}?${params}`)}`;
};

// Legacy APIs (for backward compatibility)
export const swiggyAPI = getSwiggyAPI(18.528913, 73.87441989999999); // Pune Railway Station
export const MENU_API = getMenuAPI(18.528913, 73.87441989999999) + ""; // Will be concatenated with restaurant ID

// City coordinates configuration
export const CITY_COORDINATES = {
  delhi: { lat: 28.6139, lng: 77.2090, name: "Delhi" },
  mumbai: { lat: 19.0760, lng: 72.8777, name: "Mumbai" },
  bangalore: { lat: 12.9716, lng: 77.5946, name: "Bangalore" },
  hyderabad: { lat: 17.3850, lng: 78.4867, name: "Hyderabad" },
  pune: { lat: 18.5204, lng: 73.8567, name: "Pune" },
  solapur: { lat: 17.6599, lng: 75.9064, name: "Solapur" }
};
