import L from "leaflet";

class lcdp_map {
  constructor(containerId, options = {}) {
    this.map = null;
    this.markers = [];
    this.polylines = [];
    this.currentLocation = null;
    this.init(containerId, options);
  }

  init(containerId, options) {
    // Initialize the map
    this.map = L.map(containerId, options);

    // Add the default tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(this.map);
  }

  /*
   * Create a marker with a custom popup.
   * @param {number} lat - Latitude
   * @param {number} lng - Longitude
   * @param {string} title - Popup title
   * @param {string} content - Popup content
   * @param {string} iconClass - Font Awesome class (default: 'fa-map-marker-alt')
   * @param {string} iconColor - Icon color (default: '#003C71')
   * @param {Object} options - Additional options for marker and popup
   * @returns {Object} marker - The created marker
   */
  createMarker(
    lat,
    lng,
    title = "",
    content = "",
    iconClass = "fa-map-marker-alt",
    iconColor = "#003C71",
    options = {}
  ) {
    const customIcon = L.divIcon({
      html: `
        <span class="fa-stack fa-lg" style="font-size: 20px;">
          <i class="fa-regular fa-circle fa-stack-2x" style="color: ${iconColor}; opacity: 0.8;"></i>
          <i class="${iconClass} fa-stack-1x" style="color: ${iconColor};"></i>
        </span>
      `,
      className: "custom-marker-icon",
      iconSize: [40, 40],
      iconAnchor: [20, 20],
      popupAnchor: [0, -20],
    });

    const markerOptions = {
      ...options.marker,
      icon: customIcon,
    };

    const popupOptions = {
      ...options.popup,
      className: "custom-popup",
    };

    const popupContent = `
      <div class="popup-content">
        <h3 class="popup-title">${title}</h3>
        <div class="popup-body">${content}</div>
      </div>
    `;

    const marker = L.marker([lat, lng], markerOptions)
      .addTo(this.map)
      .bindPopup(popupContent, popupOptions)
      .openPopup();

    this.markers.push(marker);
    return marker;
  }

  /*
   * Update the current location marker and zoom to its position.
   * @param {number} lat - Latitude
   * @param {number} lng - Longitude
   * @param {string} title - Title for the marker (default: "Current location")
   * @param {string} content - Content for the popup
   * @returns {Object} marker - The current location marker
   */
  updateCurrentLocation(
    lat,
    lng,
    title = "Current location",
    content = "Current location"
  ) {
    if (this.currentLocation) {
      this.currentLocation.remove();
      this.markers = this.markers.filter((m) => m !== this.currentLocation);
    }

    this.currentLocation = this.createMarker(
      lat,
      lng,
      title,
      content,
      "fa-solid fa-location-dot", // A unique icon for current location
      "#FF0000" // Red color for the current location
    );

    return this.currentLocation;
  }

  /*
   * Calculate the distance between two geographical points (in kilometers).
   * @param {number} lat1 - Latitude of the first point
   * @param {number} lng1 - Longitude of the first point
   * @param {number} lat2 - Latitude of the second point
   * @param {number} lng2 - Longitude of the second point
   * @returns {number} distance - The distance in kilometers, rounded to two decimal places
   */
  calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRad(lat2 - lat1);
    const dLng = this.toRad(lng2 - lng1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) *
        Math.cos(this.toRad(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return Math.round(distance * 100) / 100;
  }

  /*
   * Convert degrees to radians.
   * @private
   * @param {number} degrees
   * @returns {number} radians
   */
  toRad(degrees) {
    return (degrees * Math.PI) / 180;
  }

  /*
   * Draw a polyline between two points (latitude, longitude).
   * @param {number} lat1 - Latitude of the first point
   * @param {number} lng1 - Longitude of the first point
   * @param {number} lat2 - Latitude of the second point
   * @param {number} lng2 - Longitude of the second point
   * @param {Object} options - Optional parameters for the polyline
   * @returns {Promise} polyline - The created polyline
   */
  async drawRoute(lat1, lng1, lat2, lng2, options = {}) {
    const defaultOptions = {
      color: "#003C71", // Default color
      weight: 3, // Line thickness
      opacity: 0.8, // Line opacity
      dashArray: null, // Dashes (null = solid line)
      ...options,
    };

    try {
      // Request route data from OSRM API
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${lng1},${lat1};${lng2},${lat2}?overview=full&geometries=geojson`
      );
      const data = await response.json();

      if (data.code !== "Ok" || !data.routes.length) {
        throw new Error("Could not find a route");
      }

      const coordinates = data.routes[0].geometry.coordinates;
      const latlngs = coordinates.map((coord) => [coord[1], coord[0]]);

      // Remove any existing routes
      this.clearRoutes();

      // Draw the new route
      const polyline = L.polyline(latlngs, defaultOptions).addTo(this.map);
      this.polylines.push(polyline);

      // Adjust the map zoom level to fit the polyline bounds
      this.map.fitBounds(polyline.getBounds(), {
        padding: [50, 50],
      });

      return polyline;
    } catch (error) {
      console.error("Error drawing route:", error);
      return null;
    }
  }

  /*
   * Remove all drawn routes (polylines) from the map.
   */
  clearRoutes() {
    this.polylines.forEach((polyline) => {
      polyline.remove();
    });
    this.polylines = [];
  }

  /*
   * Find a location by address and return its coordinates.
   * @param {string} address - The address to search
   * @returns {Promise<{lat: number, lng: number} | null>} - Coordinates or null if not found
   */
  async searchAddress(address) {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          address
        )}&format=json&addressdetails=1`
      );

      const data = await response.json();

      if (data && data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
        };
      }

      return null;
    } catch (error) {
      console.error("Error searching address:", error);
      return null;
    }
  }

  /*
   * Search for an address and mark it on the map.
   * @param {string} address - The address to search
   * @param {Object} options - Marker options
   * @returns {Promise<Object|null>} - The created marker or null if not found
   */
  async searchAndMarkAddress(address, options = {}) {
    const coords = await this.searchAddress(address);

    if (coords) {
      const marker = this.createMarker(
        coords.lat,
        coords.lng,
        address, // Use address as the marker title
        "", // No content for the popup
        options.iconClass || "fa-map-marker-alt",
        options.iconColor || "#003C71",
        options
      );

      // Move the map to the found location
      this.map.setView([coords.lat, coords.lng], 16);

      return marker;
    }

    return null;
  }
}

export default lcdp_map;
