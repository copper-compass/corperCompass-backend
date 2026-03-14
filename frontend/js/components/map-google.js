import config from '../env.js';

let map;
let markers = [];
let heatmap;
let geocoder;

export async function initGoogleMap(containerId, options = {}) {
  const { showMarkers = true, showHeatmap = false, center = { lat: 9.082, lng: 8.6753 }, zoom = 6 } = options;

  await loadGoogleMapsAPI();

  map = new google.maps.Map(document.getElementById(containerId), {
    center,
    zoom,
    mapTypeId: 'roadmap',
  });

  geocoder = new google.maps.Geocoder();

  if (showMarkers) {
    await loadMarkers();
  }

  if (showHeatmap) {
    await loadHeatmap();
  }

  return { map, setCenter: (lat, lng) => map.setCenter({ lat, lng }), geocoder };
}

function loadGoogleMapsAPI() {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${config.MAPS_API_KEY}&libraries=visualization`;
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

async function loadMarkers() {
  const response = await fetch(`${config.API_BASE}/map/markers`);
  const data = await response.json();
  data.forEach(item => {
    const marker = new google.maps.Marker({
      position: { lat: item.lat, lng: item.lng },
      map,
      title: item.name,
    });
    const infoWindow = new google.maps.InfoWindow({
      content: `<h3>${item.name}</h3><p>${item.type === 'area' ? 'Area' : 'Lodge'}</p>`,
    });
    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });
    markers.push(marker);
  });
}

async function loadHeatmap() {
  const response = await fetch(`${config.API_BASE}/map/heatmap`);
  const data = await response.json();
  const heatmapData = data.map(point => ({
    location: new google.maps.LatLng(point.lat, point.lng),
    weight: point.weight,
  }));
  heatmap = new google.maps.visualization.HeatmapLayer({
    data: heatmapData,
    map,
  });
}

export function clearMarkers() {
  markers.forEach(m => m.setMap(null));
  markers = [];
}

export function clearHeatmap() {
  if (heatmap) heatmap.setMap(null);
}

// New function to geocode and zoom to a location
export function geocodeAndZoom(query) {
  return new Promise((resolve, reject) => {
    geocoder.geocode({ address: query }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const bounds = results[0].geometry.viewport;
        map.fitBounds(bounds);
        resolve(results[0]);
      } else {
        reject(new Error('Geocoding failed: ' + status));
      }
    });
  });
}
