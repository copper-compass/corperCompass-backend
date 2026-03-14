import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import config from '../env.js';

let map;
let markers = [];
let heatLayer;

export async function initLeafletMap(containerId, options = {}) {
  const { showMarkers = true, showHeatmap = false, center = [9.082, 8.6753], zoom = 6 } = options;

  // Ensure Leaflet CSS is loaded (should be in HTML head)
  map = L.map(containerId).setView(center, zoom);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  if (showMarkers) {
    await loadMarkers();
  }

  if (showHeatmap) {
    await loadHeatmap();
  }

  return { map, setView: (lat, lng, zoom) => map.setView([lat, lng], zoom) };
}

async function loadMarkers() {
  const response = await fetch(`${config.API_BASE}/map/markers`);
  const data = await response.json();
  data.forEach(item => {
    const marker = L.marker([item.lat, item.lng]).addTo(map);
    marker.bindPopup(`<b>${item.name}</b><br>${item.type === 'area' ? 'Area' : 'Lodge'}`);
    markers.push(marker);
  });
}

async function loadHeatmap() {
  const response = await fetch(`${config.API_BASE}/map/heatmap`);
  const data = await response.json();
  const heatData = data.map(p => [p.lat, p.lng, p.weight]);
  heatLayer = L.heatLayer(heatData, { radius: 25, blur: 15, maxZoom: 17 }).addTo(map);
}

export function clearMarkers() {
  markers.forEach(m => map.removeLayer(m));
  markers = [];
}

export function clearHeatmap() {
  if (heatLayer) map.removeLayer(heatLayer);
}
