import mapboxgl from 'mapbox-gl';
import { toast } from '@/components/ui/use-toast';

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
): mapboxgl.Map | null => {
  try {
    console.log('Setting Mapbox access token');
    mapboxgl.accessToken = token;
    
    console.log('Creating new Mapbox instance');
    const map = new mapboxgl.Map({
      container,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [28.0473, -26.2041], // Johannesburg coordinates
      zoom: 12,
      pitch: 45,
    });

    console.log('Adding navigation controls');
    map.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    return map;
  } catch (error) {
    console.error('Error initializing map:', error);
    toast({
      title: "Error initializing map",
      description: error instanceof Error ? error.message : "Please check if your Mapbox token is valid",
      variant: "destructive",
    });
    return null;
  }
};

export const addMarkersToMap = (map: mapboxgl.Map, points: RoutePoint[]) => {
  console.log('Adding markers to map');
  points.forEach((point, index) => {
    const el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundColor = getPriorityColor(point.priority);
    el.style.width = '20px';
    el.style.height = '20px';
    el.style.borderRadius = '50%';
    el.style.border = '2px solid white';
    el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';

    const popup = new mapboxgl.Popup({ offset: 25 })
      .setHTML(`
        <div class="p-2">
          <div class="font-bold">Delivery Point ${index + 1}</div>
          <div>Priority: ${point.priority}</div>
          <div>Weather: ${point.weather}</div>
          <div>Traffic: ${point.traffic}</div>
        </div>
      `);

    new mapboxgl.Marker(el)
      .setLngLat(point.coordinates)
      .setPopup(popup)
      .addTo(map);
  });
};

export const drawRoute = (map: mapboxgl.Map, coordinates: [number, number][]) => {
  console.log('Drawing route on map');
  if (map.getSource('route')) {
    (map.getSource('route') as mapboxgl.GeoJSONSource).setData({
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates
      }
    });
  } else {
    map.addSource('route', {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates
        }
      }
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
  }
};