import React from 'react';
import DeliveryMap from '@/components/DeliveryMap';
import MetricsCard from '@/components/MetricsCard';
import DeliveryPrediction from '@/components/DeliveryPrediction';
import CustomsValidation from '@/components/CustomsValidation';
import MicroFulfillmentOptimization from '@/components/MicroFulfillmentOptimization';
import BlockchainTracking from '@/components/BlockchainTracking';
import CustomerDashboard from '@/components/CustomerDashboard';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Delivery Optimization</h1>
          <p className="mt-2 text-gray-600">AI-powered delivery management for South Africa</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <MetricsCard 
            title="On-Time Deliveries" 
            value="94.8%" 
            change={2.4} 
            isPositive={true} 
          />
          <MetricsCard 
            title="Average Delivery Time" 
            value="47 min" 
            change={12} 
            isPositive={true} 
          />
          <MetricsCard 
            title="Delivery Costs" 
            value="R24.50/km" 
            change={5.2} 
            isPositive={false} 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-2 h-full">
            <DeliveryMap />
          </div>
          <div className="space-y-4 md:space-y-6">
            <CustomerDashboard />
            <DeliveryPrediction />
            <BlockchainTracking />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:gap-6">
          <CustomsValidation />
          <MicroFulfillmentOptimization />
        </div>
      </div>
    </div>
  );
};

export default Index;