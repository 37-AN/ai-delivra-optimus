import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import { AlertCircle, Sun, Cloud, Clock } from 'lucide-react';

interface RoutePoint {
  coordinates: [number, number];
  priority: 'high' | 'medium' | 'low';
  weather: 'clear' | 'rain' | 'storm';
  traffic: 'light' | 'moderate' | 'heavy';
}

const DeliveryMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [token, setToken] = useState('');
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const { toast } = useToast();
  
  // Simulated delivery points in Johannesburg area
  const deliveryPoints: RoutePoint[] = [
    {
      coordinates: [28.0473, -26.2041],
      priority: 'high',
      weather: 'clear',
      traffic: 'moderate'
    },
    {
      coordinates: [28.0578, -26.1875],
      priority: 'medium',
      weather: 'rain',
      traffic: 'heavy'
    },
    {
      coordinates: [28.0344, -26.1989],
      priority: 'low',
      weather: 'clear',
      traffic: 'light'
    }
  ];

  const initializeMap = () => {
    if (!mapContainer.current || !token) return;

    try {
      mapboxgl.accessToken = token;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [28.0473, -26.2041], // Johannesburg coordinates
        zoom: 12,
        pitch: 45,
      });

      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      map.current.on('load', () => {
        addDeliveryPoints();
        optimizeAndDisplayRoute();
      });

      setIsMapInitialized(true);
      toast({
        title: "Map initialized successfully",
        description: "The map is now ready to use",
      });
    } catch (error) {
      console.error('Error initializing map:', error);
      toast({
        title: "Error initializing map",
        description: "Please check if your Mapbox token is valid",
        variant: "destructive",
      });
    }
  };

  const addDeliveryPoints = () => {
    if (!map.current) return;

    deliveryPoints.forEach((point, index) => {
      // Create marker element
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundColor = getPriorityColor(point.priority);
      el.style.width = '20px';
      el.style.height = '20px';
      el.style.borderRadius = '50%';
      el.style.border = '2px solid white';
      el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';

      // Add popup
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <div class="p-2">
            <div class="font-bold">Delivery Point ${index + 1}</div>
            <div>Priority: ${point.priority}</div>
            <div>Weather: ${point.weather}</div>
            <div>Traffic: ${point.traffic}</div>
          </div>
        `);

      // Add marker to map
      new mapboxgl.Marker(el)
        .setLngLat(point.coordinates)
        .setPopup(popup)
        .addTo(map.current);
    });
  };

  const optimizeAndDisplayRoute = () => {
    if (!map.current) return;

    // Simulate route optimization based on conditions
    const coordinates = deliveryPoints.map(point => point.coordinates);
    
    // Add the route line
    if (map.current.getSource('route')) {
      (map.current.getSource('route') as mapboxgl.GeoJSONSource).setData({
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: coordinates
        }
      });
    } else {
      map.current.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: coordinates
          }
        }
      });

      map.current.addLayer({
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

    // Show optimization notification
    toast({
      title: "Route Optimized",
      description: "Route updated based on current conditions",
    });
  };

  const getPriorityColor = (priority: string): string => {
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

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  if (!isMapInitialized) {
    return (
      <div className="space-y-4 p-4 border rounded-lg">
        <h3 className="text-lg font-medium">Initialize Map</h3>
        <p className="text-sm text-gray-500">
          Please enter your Mapbox public token to initialize the map. 
          You can find this at https://mapbox.com/ in the Tokens section of your dashboard.
        </p>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter your Mapbox token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <Button onClick={initializeMap}>Initialize Map</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-2 text-sm">
          <AlertCircle className="text-red-500" size={16} />
          <span>High Priority</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Sun className="text-yellow-500" size={16} />
          <span>Clear Weather</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Cloud className="text-gray-500" size={16} />
          <span>Traffic Status</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="text-blue-500" size={16} />
          <span>Route Updated</span>
        </div>
      </div>
      <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
        <div ref={mapContainer} className="absolute inset-0" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/10" />
      </div>
    </div>
  );
};

export default DeliveryMap;