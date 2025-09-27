import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from '../utils/LocationContext';

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
    clearError
  } = useLocation();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
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
      console.error('Error getting current location:', error);
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
      {/* Location Display Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
        disabled={isLoading}
      >
        <span className="text-green-600">📍</span>
        <span className="truncate max-w-24 sm:max-w-32">
          {isLoading ? 'Loading...' : currentLocation.name}
        </span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
            }`}
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

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-2">
            {/* Current Location Option */}
            <button
              onClick={handleCurrentLocation}
              disabled={isGettingLocation}
              className="w-full flex items-center space-x-3 px-3 py-2 text-left text-sm text-gray-700 hover:bg-green-50 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-blue-600">🎯</span>
              <div className="flex-1">
                <div className="font-medium">
                  {isGettingLocation ? 'Getting location...' : 'Use Current Location'}
                </div>
                <div className="text-xs text-gray-500">
                  Get restaurants near you
                </div>
              </div>
              {isGettingLocation && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              )}
            </button>

            {/* Divider */}
            <div className="border-t border-gray-200 my-2"></div>

            {/* City Options */}
            <div className="space-y-1">
              <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Select City
              </div>
              {Object.entries(cities).map(([cityKey, cityData]) => (
                <button
                  key={cityKey}
                  onClick={() => handleCitySelect(cityKey)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 text-left text-sm rounded-md transition-colors duration-200 ${selectedCity === cityKey
                      ? 'bg-green-100 text-green-800 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  <span className="text-gray-400">🏙️</span>
                  <span>{cityData.name}</span>
                  {selectedCity === cityKey && (
                    <span className="ml-auto text-green-600">✓</span>
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
                  <div className="text-xs text-red-500 mt-1">
                    {error}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="border-t border-gray-200 p-2">
            <div className="text-xs text-gray-500 text-center">
              Location helps us show nearby restaurants
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
