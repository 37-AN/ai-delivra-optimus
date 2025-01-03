import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, Link, Shield, CheckCircle } from 'lucide-react';

interface BlockEntry {
  id: string;
  timestamp: string;
  hash: string;
  status: string;
  location: string;
}

const BlockchainTracking = () => {
  // Mock blockchain ledger entries
  const blockchainEntries: BlockEntry[] = [
    {
      id: "BLOCK_001",
      timestamp: "2024-01-03 10:30:15",
      hash: "0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
      status: "Picked Up",
      location: "Johannesburg Warehouse"
    },
    {
      id: "BLOCK_002",
      timestamp: "2024-01-03 12:45:22",
      hash: "0x3f4b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069a",
      status: "In Transit",
      location: "Pretoria Distribution Center"
    },
    {
      id: "BLOCK_003",
      timestamp: "2024-01-03 14:15:00",
      hash: "0x9e83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
      status: "Delivered",
      location: "Cape Town Hub"
    }
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Blockchain Tracking Ledger</h3>
          <p className="text-sm text-gray-500">Cryptographically verified delivery tracking</p>
        </div>
        <Shield className="text-primary h-6 w-6" />
      </div>

      <div className="space-y-4">
        {blockchainEntries.map((entry) => (
          <div 
            key={entry.id}
            className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50/50 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-primary" />
                <span className="font-medium">{entry.status}</span>
              </div>
              <Badge variant="outline">{entry.id}</Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <Link className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600 truncate" title={entry.hash}>
                  {entry.hash.substring(0, 16)}...
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-gray-600">{entry.location}</span>
              </div>
            </div>
            
            <div className="mt-2 text-xs text-gray-500">
              {entry.timestamp}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default BlockchainTracking;