// Geolocation service utility functions

/**
 * Get user's current position using browser geolocation API
 * @param {Object} options - Geolocation options
 * @returns {Promise<{lat: number, lng: number}>} - Promise resolving to coordinates
 */
export const getCurrentPosition = (options = {}) => {
  const defaultOptions = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 300000 // 5 minutes cache
  };

  const finalOptions = { ...defaultOptions, ...options };

  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve({
          lat: latitude,
          lng: longitude,
          accuracy: position.coords.accuracy
        });
      },
      (error) => {
        let errorMessage = 'Unable to get your location';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please enable location permissions and try again.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable. Please check your GPS settings.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out. Please try again.';
            break;
          default:
            errorMessage = 'An unknown error occurred while getting your location.';
            break;
        }
        
        reject(new Error(errorMessage));
      },
      finalOptions
    );
  });
};

/**
 * Check if geolocation is supported and available
 * @returns {boolean} - True if geolocation is supported
 */
export const isGeolocationSupported = () => {
  return 'geolocation' in navigator;
};

/**
 * Check if user has granted location permission
 * @returns {Promise<string>} - Permission state: 'granted', 'denied', 'prompt'
 */
export const checkLocationPermission = async () => {
  if (!navigator.permissions) {
    return 'unknown';
  }

  try {
    const permission = await navigator.permissions.query({ name: 'geolocation' });
    return permission.state;
  } catch (error) {
    console.warn('Could not check location permission:', error);
    return 'unknown';
  }
};

/**
 * Watch user's position for continuous updates
 * @param {Function} onSuccess - Callback for successful position updates
 * @param {Function} onError - Callback for errors
 * @param {Object} options - Geolocation options
 * @returns {number} - Watch ID that can be used to clear the watch
 */
export const watchPosition = (onSuccess, onError, options = {}) => {
  if (!navigator.geolocation) {
    onError(new Error('Geolocation is not supported by this browser'));
    return null;
  }

  const defaultOptions = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 60000 // 1 minute cache for watch
  };

  const finalOptions = { ...defaultOptions, ...options };

  return navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      onSuccess({
        lat: latitude,
        lng: longitude,
        accuracy: position.coords.accuracy,
        timestamp: position.timestamp
      });
    },
    (error) => {
      let errorMessage = 'Unable to watch your location';
      
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = 'Location access denied';
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = 'Location information is unavailable';
          break;
        case error.TIMEOUT:
          errorMessage = 'Location request timed out';
          break;
        default:
          errorMessage = 'An unknown error occurred while watching location';
          break;
      }
      
      onError(new Error(errorMessage));
    },
    finalOptions
  );
};

/**
 * Clear position watch
 * @param {number} watchId - Watch ID returned by watchPosition
 */
export const clearWatch = (watchId) => {
  if (watchId && navigator.geolocation) {
    navigator.geolocation.clearWatch(watchId);
  }
};

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param {number} lat1 - First latitude
 * @param {number} lng1 - First longitude
 * @param {number} lat2 - Second latitude
 * @param {number} lng2 - Second longitude
 * @returns {number} - Distance in kilometers
 */
export const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

/**
 * Get location name from coordinates using reverse geocoding (mock implementation)
 * In a real app, you would use a service like Google Maps Geocoding API
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @returns {Promise<string>} - Location name
 */
export const getLocationName = async (lat, lng) => {
  // This is a mock implementation
  // In production, you would use a real geocoding service
  try {
    // For demo purposes, return a generic location name
    return `Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
  } catch (error) {
    console.error('Error getting location name:', error);
    return 'Current Location';
  }
};

/**
 * Request location permission explicitly
 * @returns {Promise<boolean>} - True if permission granted
 */
export const requestLocationPermission = async () => {
  try {
    const position = await getCurrentPosition({ timeout: 5000 });
    return true;
  } catch (error) {
    console.warn('Location permission not granted:', error.message);
    return false;
  }
};
