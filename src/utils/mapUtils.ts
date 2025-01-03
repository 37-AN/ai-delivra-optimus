import mapboxgl from 'mapbox-gl';

export interface RoutePoint {
  coordinates: [number, number];
  priority: 'high' | 'medium' | 'low';
  weather: 'clear' | 'rain' | 'storm';
  traffic: 'light' | 'moderate' | 'heavy';
}

export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case 'high':
      return '#ef4444';
    case 'medium':
      return '#f59e0b';
    case 'low':
      return '#10b981';
    default:
      return '#6b7280';
  }
};

export const initializeMapbox = (
  container: HTMLDivElement,
  token: string
): mapboxgl.Map => {
  mapboxgl.accessToken = token;
  
  return new mapboxgl.Map({
    container,
    style: 'mapbox://styles/mapbox/light-v11',
    center: [28.0473, -26.2041],
    zoom: 12,
    pitch: 45,
  });
};

export const addMarkersToMap = (map: mapboxgl.Map, points: RoutePoint[]) => {
  points.forEach((point, index) => {
    const el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundColor = getPriorityColor(point.priority);
    el.style.width = '20px';
    el.style.height = '20px';
    el.style.borderRadius = '50%';
    el.style.border = '2px solid white';
    el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';

    new mapboxgl.Marker(el)
      .setLngLat(point.coordinates)
      .addTo(map);
  });
};

export const drawRoute = (map: mapboxgl.Map, coordinates: [number, number][]) => {
  const geojson = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates
    }
  };

  map.addSource('route', {
    type: 'geojson',
    data: geojson as any
  });

  map.addLayer({
    id: 'route',
    type: 'line',
    source: 'route',
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-color': '#3b82f6',
      'line-width': 4,
      'line-opacity': 0.8
    }
  });
};