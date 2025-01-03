import React from 'react';
import { Card } from '@/components/ui/card';
import { Clock, Package } from 'lucide-react';

const DeliveryPrediction = () => {
  return (
    <Card className="p-6 backdrop-blur-lg bg-white/80 border border-gray-200/50 animate-fade-up">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">AI Delivery Predictions</h3>
        <Clock className="text-primary" size={20} />
      </div>
      
      <div className="space-y-4">
        {[
          { id: 'DEL001', time: '14:30', confidence: 95 },
          { id: 'DEL002', time: '15:45', confidence: 88 },
          { id: 'DEL003', time: '16:15', confidence: 92 },
        ].map((delivery) => (
          <div key={delivery.id} className="flex items-center justify-between p-3 bg-gray-50/50 rounded-lg">
            <div className="flex items-center gap-3">
              <Package size={16} className="text-gray-500" />
              <span className="font-medium">{delivery.id}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{delivery.time}</span>
              <div className="flex items-center gap-1">
                <div className="h-2 w-16 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-500" 
                    style={{ width: `${delivery.confidence}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500">{delivery.confidence}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default DeliveryPrediction;