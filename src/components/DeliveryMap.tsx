import React, { useEffect, useRef, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import MapLegend from './MapLegend';
import { RoutePoint, initializeMapbox, addMarkersToMap, drawRoute } from '@/utils/mapUtils';

const DeliveryMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
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
    if (!mapContainer.current) return;

    map.current = initializeMapbox(mapContainer.current, 'pk.eyJ1IjoicDNyYyIsImEiOiJjbTF3ZndwaXgwNzk1MmlxeWc3eG5hM24yIn0.vxUpLbJJCt-7m1LENw9lqQ');
    
    if (map.current) {
      map.current.on('load', () => {
        addMarkersToMap(map.current!, deliveryPoints);
        const coordinates = deliveryPoints.map(point => point.coordinates);
        drawRoute(map.current!, coordinates);
      });

      setIsMapInitialized(true);
      toast({
        title: "Map initialized successfully",
        description: "The map is now ready to use",
      });
    }
  };

  useEffect(() => {
    initializeMap();
    return () => {
      map.current?.remove();
    };
  }, []);

  if (!isMapInitialized) {
    return (
      <div className="space-y-4 p-4 border rounded-lg">
        <h3 className="text-lg font-medium">Initializing Map...</h3>
        <p className="text-sm text-gray-500">
          Please wait while the map loads...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <MapLegend />
      <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
        <div ref={mapContainer} className="absolute inset-0" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/10" />
      </div>
    </div>
  );
};

export default DeliveryMap;