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
    console.log('DeliveryMap component mounted');
    
    // Ensure the map container exists
    if (!mapContainer.current) {
      console.error('Map container ref is not available');
      return;
    }

    try {
      console.log('Setting up map...');
      map.current = initializeMapbox(mapContainer.current, 'pk.eyJ1IjoicDNyYyIsImEiOiJjbTF3ZndwaXgwNzk1MmlxeWc3eG5hM24yIn0.vxUpLbJJCt-7m1LENw9lqQ');
      
      if (!map.current) {
        console.error('Map initialization failed');
        toast({
          title: "Map initialization failed",
          description: "Please check the console for more details",
          variant: "destructive",
        });
        return;
      }

      console.log('Map object created successfully');
      
      map.current.on('load', () => {
        console.log('Map loaded event fired');
        if (map.current) {
          addMarkersToMap(map.current, deliveryPoints);
          const coordinates = deliveryPoints.map(point => point.coordinates);
          drawRoute(map.current, coordinates);
          setIsMapInitialized(true);
          toast({
            title: "Map initialized successfully",
            description: "The map is now ready to use",
          });
        }
      });

      map.current.on('error', (e) => {
        console.error('Mapbox error:', e);
        toast({
          title: "Map error occurred",
          description: e.error.message,
          variant: "destructive",
        });
      });
    } catch (error) {
      console.error('Error during map initialization:', error);
      toast({
        title: "Map initialization error",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    }

    // Cleanup function
    return () => {
      console.log('Cleaning up map instance');
      if (map.current) {
        map.current.remove();
      }
    };
  }, []); // Empty dependency array to run only once on mount

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
      <div className="relative w-full h-[500px] rounded-lg overflow-hidden border border-gray-200">
        <div ref={mapContainer} className="absolute inset-0" style={{ width: '100%', height: '100%' }} />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/10" />
      </div>
    </div>
  );
};

export default DeliveryMap;