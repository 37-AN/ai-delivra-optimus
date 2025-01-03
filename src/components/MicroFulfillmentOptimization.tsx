import React from 'react';
import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Package2, TrendingUp, AlertTriangle } from 'lucide-react';

interface RegionData {
  region: string;
  currentStock: number;
  forecastedDemand: number;
  recommendedStock: number;
  status: 'optimal' | 'warning' | 'critical';
}

const MicroFulfillmentOptimization = () => {
  // Simulated data for South African regions
  const regionData: RegionData[] = [
    {
      region: 'Johannesburg',
      currentStock: 850,
      forecastedDemand: 1200,
      recommendedStock: 1300,
      status: 'critical'
    },
    {
      region: 'Cape Town',
      currentStock: 600,
      forecastedDemand: 550,
      recommendedStock: 650,
      status: 'optimal'
    },
    {
      region: 'Durban',
      currentStock: 400,
      forecastedDemand: 480,
      recommendedStock: 520,
      status: 'warning'
    },
    {
      region: 'Pretoria',
      currentStock: 300,
      forecastedDemand: 280,
      recommendedStock: 320,
      status: 'optimal'
    }
  ];

  const getStatusColor = (status: RegionData['status']) => {
    switch (status) {
      case 'optimal':
        return 'text-primary';
      case 'warning':
        return 'text-yellow-500';
      case 'critical':
        return 'text-red-500';
    }
  };

  const getStatusIcon = (status: RegionData['status']) => {
    switch (status) {
      case 'optimal':
        return <Package2 className="text-primary" size={20} />;
      case 'warning':
        return <AlertTriangle className="text-yellow-500" size={20} />;
      case 'critical':
        return <TrendingUp className="text-red-500" size={20} />;
    }
  };

  const chartData = regionData.map(region => ({
    name: region.region,
    'Current Stock': region.currentStock,
    'Forecasted Demand': region.forecastedDemand,
    'Recommended Stock': region.recommendedStock,
  }));

  return (
    <Card className="p-6 backdrop-blur-lg bg-white/80 border border-gray-200/50 animate-fade-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Micro-Fulfillment Optimization</h3>
          <p className="text-sm text-gray-500 mt-1">Regional demand forecast & inventory optimization</p>
        </div>
        <div className="text-xs text-gray-500">
          Updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      <div className="h-[200px] mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Current Stock" fill="#94a3b8" />
            <Bar dataKey="Forecasted Demand" fill="#0ea5e9" />
            <Bar dataKey="Recommended Stock" fill="#22c55e" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-4">
        {regionData.map((region) => (
          <div 
            key={region.region}
            className="p-4 rounded-lg bg-gray-50/50 hover:bg-gray-50/80 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getStatusIcon(region.status)}
                <div>
                  <h4 className="font-medium">{region.region}</h4>
                  <p className={`text-sm ${getStatusColor(region.status)}`}>
                    {region.status === 'critical' ? 'Immediate restock needed' :
                     region.status === 'warning' ? 'Monitor stock levels' :
                     'Stock levels optimal'}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">
                  Current: {region.currentStock} units
                </div>
                <div className="text-sm text-gray-500">
                  Recommended: {region.recommendedStock} units
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default MicroFulfillmentOptimization;