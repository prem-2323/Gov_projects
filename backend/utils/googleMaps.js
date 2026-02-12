const axios = require('axios');

/**
 * Google Maps Service
 * Handles location tracking, geocoding, and distance calculations
 */
class GoogleMapsService {
  constructor() {
    this.apiKey = process.env.GOOGLE_MAPS_API_KEY || '';
    this.baseURL = 'https://maps.googleapis.com/maps/api';
  }
  
  /**
   * Reverse geocode: Get address from coordinates
   */
  async getAddressFromCoordinates(lat, lng) {
    try {
      if (!this.apiKey) {
        return this.mockAddress(lat, lng);
      }
      
      const response = await axios.get(
        `${this.baseURL}/geocode/json`,
        {
          params: {
            latlng: `${lat},${lng}`,
            key: this.apiKey
          }
        }
      );
      
      if (response.data.status === 'OK' && response.data.results.length > 0) {
        return {
          address: response.data.results[0].formatted_address,
          components: this.parseAddressComponents(response.data.results[0].address_components)
        };
      }
      
      return this.mockAddress(lat, lng);
    } catch (error) {
      console.error('Geocoding error:', error.message);
      return this.mockAddress(lat, lng);
    }
  }
  
  /**
   * Geocode: Get coordinates from address
   */
  async getCoordinatesFromAddress(address) {
    try {
      if (!this.apiKey) {
        return this.mockCoordinates();
      }
      
      const response = await axios.get(
        `${this.baseURL}/geocode/json`,
        {
          params: {
            address: address,
            key: this.apiKey
          }
        }
      );
      
      if (response.data.status === 'OK' && response.data.results.length > 0) {
        const location = response.data.results[0].geometry.location;
        return {
          lat: location.lat,
          lng: location.lng
        };
      }
      
      return this.mockCoordinates();
    } catch (error) {
      console.error('Geocoding error:', error.message);
      return this.mockCoordinates();
    }
  }
  
  /**
   * Calculate distance between two points
   */
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    
    return distance; // Returns distance in km
  }
  
  /**
   * Find nearest cleaners to a location
   */
  async findNearestCleaners(lat, lng, cleaners, maxDistance = 10) {
    const nearbyCleaners = cleaners
      .map(cleaner => {
        if (!cleaner.lastLocation || !cleaner.lastLocation.coordinates) {
          return null;
        }
        
        const [cleanerLng, cleanerLat] = cleaner.lastLocation.coordinates;
        const distance = this.calculateDistance(lat, lng, cleanerLat, cleanerLng);
        
        if (distance <= maxDistance) {
          return {
            cleaner: cleaner,
            distance: distance
          };
        }
        return null;
      })
      .filter(item => item !== null)
      .sort((a, b) => a.distance - b.distance);
    
    return nearbyCleaners;
  }
  
  /**
   * Get optimized route for multiple locations
   */
  async getOptimizedRoute(origin, destinations) {
    // This would use Google Maps Directions API
    // For now, return simple ordered list
    return destinations.map((dest, index) => ({
      order: index + 1,
      location: dest,
      estimatedDistance: this.calculateDistance(
        origin.lat,
        origin.lng,
        dest.lat,
        dest.lng
      )
    }));
  }
  
  /**
   * Parse address components
   */
  parseAddressComponents(components) {
    const parsed = {};
    
    components.forEach(component => {
      if (component.types.includes('locality')) {
        parsed.city = component.long_name;
      }
      if (component.types.includes('administrative_area_level_1')) {
        parsed.state = component.long_name;
      }
      if (component.types.includes('country')) {
        parsed.country = component.long_name;
      }
      if (component.types.includes('postal_code')) {
        parsed.postalCode = component.long_name;
      }
    });
    
    return parsed;
  }
  
  /**
   * Convert degrees to radians
   */
  toRad(degrees) {
    return degrees * (Math.PI / 180);
  }
  
  /**
   * Mock address for testing
   */
  mockAddress(lat, lng) {
    return {
      address: `Location at ${lat.toFixed(4)}, ${lng.toFixed(4)}`,
      components: {
        city: 'Test City',
        state: 'Test State',
        country: 'Test Country',
        postalCode: '12345'
      }
    };
  }
  
  /**
   * Mock coordinates for testing
   */
  mockCoordinates() {
    return {
      lat: 12.9716,
      lng: 77.5946
    };
  }
  
  /**
   * Get real-time traffic status for route
   */
  async getTrafficStatus(origin, destination) {
    try {
      if (!this.apiKey) {
        return { duration: 15, trafficLevel: 'normal' };
      }
      
      const response = await axios.get(
        `${this.baseURL}/directions/json`,
        {
          params: {
            origin: `${origin.lat},${origin.lng}`,
            destination: `${destination.lat},${destination.lng}`,
            departure_time: 'now',
            traffic_model: 'best_guess',
            key: this.apiKey
          }
        }
      );
      
      if (response.data.status === 'OK' && response.data.routes.length > 0) {
        const route = response.data.routes[0].legs[0];
        return {
          duration: Math.round(route.duration_in_traffic.value / 60), // minutes
          distance: (route.distance.value / 1000).toFixed(2), // km
          trafficLevel: this.assessTraffic(route)
        };
      }
      
      return { duration: 15, distance: 5, trafficLevel: 'normal' };
    } catch (error) {
      console.error('Traffic status error:', error.message);
      return { duration: 15, distance: 5, trafficLevel: 'normal' };
    }
  }
  
  /**
   * Assess traffic level
   */
  assessTraffic(route) {
    const normalDuration = route.duration.value;
    const trafficDuration = route.duration_in_traffic.value;
    const ratio = trafficDuration / normalDuration;
    
    if (ratio > 1.5) return 'heavy';
    if (ratio > 1.2) return 'moderate';
    return 'normal';
  }
}

module.exports = new GoogleMapsService();
