import L from 'leaflet';

class LCDP_Map {
    constructor(containerId, options = {}) {
        this.map = null;
        this.markers = [];
        this.init(containerId, options);
    }

    init(containerId, options) {
        // Initialize map
        this.map = L.map(containerId, options);

        // Add default class title
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap VLU'
        }).addTo(this.map);
    }

    // Custom methods
    addMarker(lat, lng, options = {}) {
        const marker = L.marker([lat, lng], options);
        marker.addTo(this.map);
        this.markers.push(marker);
        return marker;
    }
}

// Export default
export default LCDP_Map; 