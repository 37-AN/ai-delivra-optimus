import React from 'react';
import { Card } from '@/components/ui/card';
import { FileCheck2, AlertCircle, Clock } from 'lucide-react';

interface DocumentStatus {
  id: string;
  name: string;
  status: 'valid' | 'pending' | 'attention';
  confidence: number;
  message: string;
}

const CustomsValidation = () => {
  const documents: DocumentStatus[] = [
    {
      id: 'DOC001',
      name: 'Commercial Invoice',
      status: 'valid',
      confidence: 98,
      message: 'All fields validated successfully'
    },
    {
      id: 'DOC002',
      name: 'Bill of Lading',
      status: 'attention',
      confidence: 75,
      message: 'Missing consignee details'
    },
    {
      id: 'DOC003',
      name: 'Certificate of Origin',
      status: 'pending',
      confidence: 85,
      message: 'Awaiting final verification'
    }
  ];

  const getStatusIcon = (status: DocumentStatus['status']) => {
    switch (status) {
      case 'valid':
        return <FileCheck2 className="text-primary" size={20} />;
      case 'attention':
        return <AlertCircle className="text-red-500" size={20} />;
      case 'pending':
        return <Clock className="text-yellow-500" size={20} />;
    }
  };

  const getStatusColor = (status: DocumentStatus['status']) => {
    switch (status) {
      case 'valid':
        return 'bg-primary/10';
      case 'attention':
        return 'bg-red-500/10';
      case 'pending':
        return 'bg-yellow-500/10';
    }
  };

  return (
    <Card className="p-6 backdrop-blur-lg bg-white/80 border border-gray-200/50 animate-fade-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Customs AI Validation</h3>
          <p className="text-sm text-gray-500 mt-1">Real-time document validation</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Last updated: 2 min ago</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {documents.map((doc) => (
          <div 
            key={doc.id}
            className={`p-4 rounded-lg ${getStatusColor(doc.status)} transition-all duration-200`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                {getStatusIcon(doc.status)}
                <div>
                  <h4 className="font-medium">{doc.name}</h4>
                  <p className="text-sm text-gray-600">{doc.message}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-16 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-500" 
                    style={{ width: `${doc.confidence}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500">{doc.confidence}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CustomsValidation;