import React from 'react';
import { Card } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface MetricsCardProps {
  title: string;
  value: string;
  change: number;
  isPositive?: boolean;
}

const MetricsCard = ({ title, value, change, isPositive = true }: MetricsCardProps) => {
  return (
    <Card className="p-6 backdrop-blur-lg bg-white/80 border border-gray-200/50 animate-fade-up">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-semibold mt-1">{value}</h3>
        </div>
        <div className={`flex items-center ${isPositive ? 'text-primary' : 'text-red-500'}`}>
          {isPositive ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
          <span className="text-sm font-medium ml-1">{change}%</span>
        </div>
      </div>
    </Card>
  );
};

export default MetricsCard;