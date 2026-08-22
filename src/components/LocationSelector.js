import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "../utils/LocationContext";

const LocationSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const dropdownRef = useRef(null);

  const {
    currentLocation,
    selectedCity,
    cities,
    isLoading,
    error,
    setCity,
    getCurrentLocation,
    clearError,
  } = useLocation();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCitySelect = (cityKey) => {
    setCity(cityKey);
    setIsOpen(false);
    clearError();
  };

  const handleCurrentLocation = async () => {
    setIsGettingLocation(true);
    try {
      await getCurrentLocation();
      setIsOpen(false);
    } catch (error) {
      // The location context exposes the user-facing error message.
    } finally {
      setIsGettingLocation(false);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (error) {
      clearError();
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Modern Location Display Button - Orange Theme */}
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 px-4 py-2.5 text-sm font-semibold bg-white/80 backdrop-blur-sm border-2 border-orange-200 rounded-full hover:border-orange-400 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200 group"
        disabled={isLoading}
      >
        <span className="text-lg">📍</span>
        <span className="truncate max-w-24 sm:max-w-32 text-gray-700 group-hover:text-orange-600">
          {isLoading ? "Loading..." : currentLocation.name}
        </span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 text-orange-600 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Modern Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 glass-card rounded-2xl shadow-2xl z-50 animate-float-up border border-white/30">
          <div className="p-3">
            {/* Primary: Detect Location - Orange Theme */}
            <button
              onClick={handleCurrentLocation}
              disabled={isGettingLocation}
              className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mb-3"
            >
              <span className="text-2xl">🎯</span>
              <div className="flex-1">
                <div className="font-bold">
                  {isGettingLocation ? "Detecting..." : "Detect My Location"}
                </div>
                <div className="text-xs text-orange-100">
                  Find restaurants near you
                </div>
              </div>
              {isGettingLocation && (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center my-3">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-3 text-xs text-gray-500 font-medium">OR</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Popular Cities - Orange Theme */}
            <div className="space-y-1 max-h-60 overflow-y-auto">
              <div className="px-3 py-1 text-xs font-bold text-orange-600 uppercase tracking-wide sticky top-0 bg-white/90 backdrop-blur-sm z-10">
                Popular Cities
              </div>
              {Object.entries(cities).map(([cityKey, cityData]) => (
                <button
                  key={cityKey}
                  onClick={() => handleCitySelect(cityKey)}
                  className={`w-full flex items-center space-x-3 px-4 py-2.5 text-left text-sm rounded-xl transition-all duration-200 ${
                    selectedCity === cityKey
                      ? "bg-orange-100 text-orange-800 font-semibold shadow-md"
                      : "text-gray-700 hover:bg-white/70 hover:shadow-sm"
                  }`}
                >
                  <span className="text-lg">
                    {selectedCity === cityKey ? "📍" : "🏙️"}
                  </span>
                  <span className="flex-1">{cityData.name}</span>
                  {selectedCity === cityKey && (
                    <span className="text-orange-600 font-bold">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="border-t border-gray-200 p-3">
              <div className="flex items-start space-x-2">
                <span className="text-red-500 text-sm">⚠️</span>
                <div className="flex-1">
                  <div className="text-sm text-red-600 font-medium">
                    Location Error
                  </div>
                  <div className="text-xs text-red-500 mt-1">{error}</div>
                </div>
              </div>
            </div>
          )}

          {/* Modern Footer */}
          <div className="border-t border-white/30 p-3 mt-2">
            <div className="text-xs text-gray-600 text-center flex items-center justify-center space-x-1">
              <span>🤖</span>
              <span>AI finds best restaurants near you</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
