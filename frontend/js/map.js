import config from './env.js';
import { initLeafletMap, geocodeAndZoom as leafletGeocode } from './components/map-leaflet.js';
// For Google Maps, import from './components/map-google.js'

// List of Nigerian states (for dropdown)
const NIGERIAN_STATES = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Gombe', 'Imo', 'Jigawa',
    'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger',
    'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara',
    'FCT'
];

let currentMap;
let useGoogle = false; // set to true if using Google Maps

export async function initMapPage() {
    const container = 'map';
    
    if (useGoogle) {
        const { initGoogleMap, geocodeAndZoom } = await import('./components/map-google.js');
        currentMap = await initGoogleMap(container, { showMarkers: true });
        window.geocodeAndZoom = geocodeAndZoom; // for use in event handler
    } else {
        currentMap = await initLeafletMap(container, { showMarkers: true });
        window.geocodeAndZoom = leafletGeocode;
    }

    populateStateDropdown();

    document.getElementById('zoom-to-location').addEventListener('click', async () => {
        const state = document.getElementById('state-select').value;
        const lga = document.getElementById('lga-select').value;
        if (!state) {
            alert('Please select a state');
            return;
        }
        let query = `${state} State, Nigeria`;
        if (lga) {
            query = `${lga} LGA, ${state} State, Nigeria`;
        }
        try {
            await window.geocodeAndZoom(query);
        } catch (error) {
            alert('Could not find location: ' + error.message);
        }
    });

    document.getElementById('show-markers').addEventListener('click', async () => {
        // Clear and reload markers
        if (useGoogle) {
            const { clearMarkers, loadMarkers } = await import('./components/map-google.js');
            clearMarkers();
            await loadMarkers();
        } else {
            const { clearMarkers, loadMarkers } = await import('./components/map-leaflet.js');
            clearMarkers();
            await loadMarkers();
        }
    });

    document.getElementById('show-heatmap').addEventListener('click', async () => {
        if (useGoogle) {
            const { clearHeatmap, loadHeatmap } = await import('./components/map-google.js');
            clearHeatmap();
            await loadHeatmap();
        } else {
            const { clearHeatmap, loadHeatmap } = await import('./components/map-leaflet.js');
            clearHeatmap();
            await loadHeatmap();
        }
    });

    document.getElementById('clear-overlay').addEventListener('click', () => {
        if (useGoogle) {
            import('./components/map-google.js').then(m => { m.clearMarkers(); m.clearHeatmap(); });
        } else {
            import('./components/map-leaflet.js').then(m => { m.clearMarkers(); m.clearHeatmap(); });
        }
    });

    // Handle state change to populate LGA dropdown (mock data)
    document.getElementById('state-select').addEventListener('change', (e) => {
        const state = e.target.value;
        const lgaSelect = document.getElementById('lga-select');
        if (state) {
            // In a real app, you would fetch LGAs for the selected state from an API or local data
            // Here we'll just enable and put a placeholder
            lgaSelect.disabled = false;
            lgaSelect.innerHTML = '<option value="">Select LGA</option><option value="Example LGA">Example LGA</option>';
        } else {
            lgaSelect.disabled = true;
            lgaSelect.innerHTML = '<option value="">Select LGA</option>';
        }
    });
}

function populateStateDropdown() {
    const select = document.getElementById('state-select');
    NIGERIAN_STATES.forEach(state => {
        const option = document.createElement('option');
        option.value = state;
        option.textContent = state;
        select.appendChild(option);
    });
}
