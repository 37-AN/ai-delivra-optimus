import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

const DeliveryMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [token, setToken] = useState('');
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const { toast } = useToast();

  const initializeMap = () => {
    if (!mapContainer.current || !token) return;

    try {
      mapboxgl.accessToken = token;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [28.0473, -26.2041], // Johannesburg coordinates
        zoom: 10,
        pitch: 45,
      });

      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

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
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/10" />
    </div>
  );
};

export default DeliveryMap;