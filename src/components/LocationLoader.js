import React from 'react';

const LocationLoader = ({ message = "Loading...", size = "medium" }) => {
  const sizeClasses = {
    small: "h-4 w-4",
    medium: "h-6 w-6", 
    large: "h-8 w-8"
  };

  const textSizeClasses = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg"
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <div className={`animate-spin rounded-full border-b-2 border-green-600 ${sizeClasses[size]}`}></div>
      <span className={`text-green-600 font-medium ${textSizeClasses[size]}`}>
        {message}
      </span>
    </div>
  );
};

export const LocationError = ({ error, onRetry, size = "medium" }) => {
  const textSizeClasses = {
    small: "text-sm",
    medium: "text-base", 
    large: "text-lg"
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3 p-4">
      <div className="text-red-500 text-2xl">⚠️</div>
      <div className="text-center">
        <h3 className={`font-semibold text-red-600 ${textSizeClasses[size]}`}>
          Location Error
        </h3>
        <p className="text-red-500 text-sm mt-1 max-w-xs">
          {error}
        </p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors duration-200"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export const RestaurantLoader = ({ locationName }) => {
  return (
    <div className="text-center py-8">
      <div className="inline-flex items-center space-x-3 text-green-600">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
        <div>
          <div className="font-medium">Loading restaurants...</div>
          {locationName && (
            <div className="text-sm text-gray-500">
              📍 {locationName}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const NoRestaurantsFound = ({ locationName, searchText, onLocationChange }) => {
  return (
    <div className="text-center py-12">
      <div className="text-gray-400 text-6xl mb-4">🍽️</div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        No restaurants found
      </h3>
      <p className="text-gray-500 mb-6 max-w-md mx-auto">
        {searchText 
          ? `No restaurants match "${searchText}" in ${locationName}`
          : `No restaurants available in ${locationName} right now`
        }
      </p>
      <div className="space-y-3">
        {searchText && (
          <p className="text-sm text-gray-400">
            Try searching for something else or change your location
          </p>
        )}
        {onLocationChange && (
          <button
            onClick={onLocationChange}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
          >
            Change Location
          </button>
        )}
      </div>
    </div>
  );
};

export default LocationLoader;
