import React from 'react';
import { Card } from '@/components/ui/card';
import { Brain, Route, CloudRain, Clock } from 'lucide-react';

const EnhancedAIFeatures = () => {
  // Simulated AI optimization data
  const aiMetrics = {
    routeOptimization: {
      efficiency: 89,
      savedDistance: 245,
      optimizedRoutes: 18,
    },
    weatherImpact: {
      severity: 'moderate',
      delayProbability: 35,
      affectedAreas: ['Johannesburg CBD', 'Sandton'],
    },
    trafficAnalysis: {
      congestionLevel: 'high',
      peakHours: ['08:00-10:00', '16:00-18:00'],
      alternateRoutes: 3,
    },
    predictions: {
      accuracyRate: 94,
      deliveryWindow: '14:30-15:30',
      confidence: 92,
    },
  };

  return (
    <Card className="p-6 backdrop-blur-lg bg-white/80 border border-gray-200/50">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Enhanced AI Features</h3>
        <Brain className="text-primary" size={24} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Route Optimization */}
        <div className="p-4 bg-gray-50/50 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <Route className="text-primary" size={18} />
            <h4 className="font-medium">Route Optimization</h4>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              Efficiency Rate: {aiMetrics.routeOptimization.efficiency}%
            </p>
            <p className="text-sm text-gray-600">
              Distance Saved: {aiMetrics.routeOptimization.savedDistance}km
            </p>
            <p className="text-sm text-gray-600">
              Optimized Routes: {aiMetrics.routeOptimization.optimizedRoutes}
            </p>
          </div>
        </div>

        {/* Weather Impact */}
        <div className="p-4 bg-gray-50/50 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <CloudRain className="text-primary" size={18} />
            <h4 className="font-medium">Weather Impact</h4>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              Severity: {aiMetrics.weatherImpact.severity}
            </p>
            <p className="text-sm text-gray-600">
              Delay Probability: {aiMetrics.weatherImpact.delayProbability}%
            </p>
            <p className="text-sm text-gray-600">
              Affected Areas: {aiMetrics.weatherImpact.affectedAreas.join(', ')}
            </p>
          </div>
        </div>

        {/* Traffic Analysis */}
        <div className="p-4 bg-gray-50/50 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <Route className="text-primary" size={18} />
            <h4 className="font-medium">Traffic Analysis</h4>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              Congestion: {aiMetrics.trafficAnalysis.congestionLevel}
            </p>
            <p className="text-sm text-gray-600">
              Peak Hours: {aiMetrics.trafficAnalysis.peakHours.join(', ')}
            </p>
            <p className="text-sm text-gray-600">
              Alternate Routes: {aiMetrics.trafficAnalysis.alternateRoutes}
            </p>
          </div>
        </div>

        {/* Delivery Predictions */}
        <div className="p-4 bg-gray-50/50 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="text-primary" size={18} />
            <h4 className="font-medium">AI Predictions</h4>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              Accuracy Rate: {aiMetrics.predictions.accuracyRate}%
            </p>
            <p className="text-sm text-gray-600">
              Delivery Window: {aiMetrics.predictions.deliveryWindow}
            </p>
            <p className="text-sm text-gray-600">
              Confidence: {aiMetrics.predictions.confidence}%
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EnhancedAIFeatures;