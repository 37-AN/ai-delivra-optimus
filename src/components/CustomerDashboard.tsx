import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, Clock, MapPin, Bell, CheckCircle2 } from 'lucide-react';

interface ShipmentStatus {
  id: string;
  status: 'in-transit' | 'delivered' | 'pending';
  location: string;
  estimatedDelivery: string;
  lastUpdate: string;
  description: string;
}

const CustomerDashboard = () => {
  // Mock shipment data
  const shipments: ShipmentStatus[] = [
    {
      id: "SHP001",
      status: "in-transit",
      location: "Johannesburg Distribution Center",
      estimatedDelivery: "Today, 15:30",
      lastUpdate: "10 minutes ago",
      description: "Package en route to final destination"
    },
    {
      id: "SHP002",
      status: "delivered",
      location: "Cape Town Hub",
      estimatedDelivery: "Delivered",
      lastUpdate: "2 hours ago",
      description: "Successfully delivered to recipient"
    },
    {
      id: "SHP003",
      status: "pending",
      location: "Pretoria Warehouse",
      estimatedDelivery: "Tomorrow, 12:00",
      lastUpdate: "1 hour ago",
      description: "Awaiting processing"
    }
  ];

  const getStatusColor = (status: ShipmentStatus['status']) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-500';
      case 'in-transit':
        return 'bg-blue-500';
      case 'pending':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card className="p-6 animate-fade-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">My Shipments</h3>
          <p className="text-sm text-gray-500">Track your deliveries in real-time</p>
        </div>
        <Bell className="text-primary h-5 w-5" />
      </div>

      <div className="space-y-4">
        {shipments.map((shipment) => (
          <div 
            key={shipment.id}
            className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50/50 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                <span className="font-medium">{shipment.id}</span>
              </div>
              <Badge 
                className={`${getStatusColor(shipment.status)} text-white`}
              >
                {shipment.status.charAt(0).toUpperCase() + shipment.status.slice(1)}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">{shipment.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">{shipment.estimatedDelivery}</span>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">{shipment.description}</span>
              </div>
              <span className="text-xs text-gray-500">{shipment.lastUpdate}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CustomerDashboard;