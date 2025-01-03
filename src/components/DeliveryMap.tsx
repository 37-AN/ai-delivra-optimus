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

  useEffect(() => {
    if (!mapContainer.current) {
      console.error('Map container ref is not available');
      return;
    }

    let mounted = true;

    const initMap = async () => {
      try {
        console.log('Initializing map...');
        const mapInstance = initializeMapbox(mapContainer.current, 'pk.eyJ1IjoicDNyYyIsImEiOiJjbTF3ZndwaXgwNzk1MmlxeWc3eG5hM24yIn0.vxUpLbJJCt-7m1LENw9lqQ');
        
        if (!mapInstance || !mounted) return;
        
        map.current = mapInstance;
        
        map.current.on('load', () => {
          if (!map.current || !mounted) return;
          
          console.log('Map loaded successfully');
          addMarkersToMap(map.current, deliveryPoints);
          const coordinates = deliveryPoints.map(point => point.coordinates);
          drawRoute(map.current, coordinates);
          setIsMapInitialized(true);
        });
      } catch (error) {
        console.error('Map initialization error:', error);
        if (mounted) {
          toast({
            title: "Map initialization failed",
            description: error instanceof Error ? error.message : "An unknown error occurred",
            variant: "destructive",
          });
        }
      }
    };

    initMap();

    return () => {
      mounted = false;
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  return (
    <div className="flex flex-col space-y-4 h-full">
      <MapLegend />
      <div className="relative flex-1 min-h-[600px] w-full rounded-lg overflow-hidden border border-gray-200">
        <div 
          ref={mapContainer} 
          className="absolute inset-0 w-full h-full" 
        />
        {!isMapInitialized && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50">
            <div className="text-center p-4">
              <p className="text-sm text-muted-foreground">Initializing map...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryMap;