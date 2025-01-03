import React from 'react';
import { AlertCircle, Sun, Cloud, Clock } from 'lucide-react';

const MapLegend = () => {
  return (
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
  );
};

export default MapLegend;