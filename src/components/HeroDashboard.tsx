import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import LiveMarketTable from './LiveMarketTable';

const performanceData = [
  { name: 'W1', value: 100 },
  { name: 'W2', value: 300 },
  { name: 'W3', value: 200 },
  { name: 'W4', value: 450 },
  { name: 'W5', value: 180 },
  { name: 'W6', value: 600 },
  { name: 'W7', value: 350 },
  { name: 'W8', value: 400 },
  { name: 'W9', value: 200 },
  { name: 'W10', value: 500 },
  { name: 'W11', value: 700 },
  { name: 'W12', value: 650 },
];

const PerformanceChart = () => (
  <Card className="bg-card/50 backdrop-blur-sm border-white/10 shadow-lg w-full">
    <CardHeader>
      <div className="flex justify-between items-center">
        <CardTitle className="text-sm font-medium text-gray-400">Portfolio Performance</CardTitle>
        <span className="text-xs text-gray-500">Last 30 days</span>
      </div>
    </CardHeader>
    <CardContent className="h-40 pl-0">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={performanceData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <XAxis dataKey="name" stroke="#666" fontSize={10} tickLine={false} axisLine={false} interval="preserveStartEnd" />
          <YAxis stroke="#666" fontSize={10} tickLine={false} axisLine={false} width={40} />
          <Tooltip 
            cursor={{ fill: 'rgba(230, 196, 25, 0.1)' }}
            contentStyle={{ backgroundColor: '#23221c', border: 'none', borderRadius: '0.75rem', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
            labelStyle={{ color: '#E6C419' }}
            itemStyle={{ color: '#fff' }}
          />
          <Bar dataKey="value" fill="#E6C419" radius={[4, 4, 0, 0]} barSize={10} />
        </RechartsBarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

const HeroDashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 p-4 rounded-2xl bg-black/20 backdrop-blur-md border border-white/5">
      <LiveMarketTable />
      <div>
        <PerformanceChart />
      </div>
    </div>
  );
};

export default HeroDashboard;
