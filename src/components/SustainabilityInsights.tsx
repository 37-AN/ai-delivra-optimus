import React from 'react';
import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Leaf, Truck, TrendingDown } from 'lucide-react';

interface EmissionData {
  route: string;
  optimized: number;
  standard: number;
  savings: number;
}

const SustainabilityInsights = () => {
  // Mock data for emissions in kg CO2
  const emissionsData: EmissionData[] = [
    {
      route: 'JHB-CPT',
      optimized: 850,
      standard: 1200,
      savings: 29
    },
    {
      route: 'JHB-DBN',
      optimized: 420,
      standard: 580,
      savings: 27
    },
    {
      route: 'CPT-PE',
      optimized: 380,
      standard: 520,
      savings: 26
    }
  ];

  const totalSaved = emissionsData.reduce((acc, curr) => 
    acc + (curr.standard - curr.optimized), 0
  );

  const averageSavings = emissionsData.reduce((acc, curr) => 
    acc + curr.savings, 0
  ) / emissionsData.length;

  return (
    <Card className="p-6 backdrop-blur-lg bg-white/80 border border-gray-200/50 animate-fade-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Leaf className="h-5 w-5 text-green-500" />
            Sustainability Insights
          </h3>
          <p className="text-sm text-gray-500 mt-1">Carbon footprint analysis</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="h-5 w-5 text-green-600" />
            <span className="font-medium">Total CO₂ Saved</span>
          </div>
          <div className="text-2xl font-bold text-green-600">
            {totalSaved.toLocaleString()}kg
          </div>
          <p className="text-sm text-green-600 mt-1">Through route optimization</p>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Truck className="h-5 w-5 text-blue-600" />
            <span className="font-medium">Average Reduction</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {averageSavings.toFixed(1)}%
          </div>
          <p className="text-sm text-blue-600 mt-1">Per delivery route</p>
        </div>
      </div>

      <div className="h-[300px] mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={emissionsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="route" />
            <YAxis />
            <Tooltip 
              formatter={(value: number) => [`${value}kg CO₂`, '']}
              labelFormatter={(label) => `Route: ${label}`}
            />
            <Legend />
            <Bar 
              name="Optimized Route" 
              dataKey="optimized" 
              fill="#22c55e" 
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              name="Standard Route" 
              dataKey="standard" 
              fill="#94a3b8"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="text-xs text-gray-500 text-center">
        * Emissions calculated based on route distance, vehicle type, and load optimization
      </div>
    </Card>
  );
};

export default SustainabilityInsights;