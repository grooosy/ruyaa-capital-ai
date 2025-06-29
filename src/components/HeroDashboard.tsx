import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import AIMarketTable from "./AIMarketTable";

const performanceData = [
  { name: "W1", value: 100 },
  { name: "W2", value: 300 },
  { name: "W3", value: 200 },
  { name: "W4", value: 450 },
  { name: "W5", value: 180 },
  { name: "W6", value: 600 },
  { name: "W7", value: 350 },
  { name: "W8", value: 400 },
  { name: "W9", value: 200 },
  { name: "W10", value: 500 },
  { name: "W11", value: 700 },
  { name: "W12", value: 650 },
];

const PerformanceChart = () => (
  <Card className="w-full">
    <CardHeader>
      <div className="flex justify-between items-center">
        <CardTitle className="text-sm font-medium text-white font-spacegrotesk">
          AI Portfolio Performance
        </CardTitle>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-yellow-500 font-mono">LIVE</span>
        </div>
      </div>
    </CardHeader>
    <CardContent className="h-40 pl-0">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={performanceData}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <XAxis
            dataKey="name"
            stroke="#666"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            stroke="#666"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            width={40}
          />
          <Tooltip
            cursor={{ fill: "rgba(255, 215, 0, 0.1)" }}
            contentStyle={{
              backgroundColor: "#1E1E1E",
              border: "1px solid rgba(255, 215, 0, 0.2)",
              borderRadius: "0.75rem",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            }}
            labelStyle={{ color: "#FFD700" }}
            itemStyle={{ color: "#fff" }}
          />
          <Bar
            dataKey="value"
            fill="url(#barGradient)"
            radius={[4, 4, 0, 0]}
            barSize={12}
          />
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#FFA500" />
            </linearGradient>
          </defs>
        </RechartsBarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

const HeroDashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 p-8 rounded-3xl bg-gray-900 backdrop-blur-xl border border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-500 hover:border-gray-600 hover:scale-102 relative overflow-hidden">
      {/* Geometric pattern overlay */}
      <div className="absolute inset-0 bg-geometric-pattern opacity-30" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse shadow-glow"></div>
            <h3 className="text-xl font-bold text-white font-spacegrotesk tracking-wide">
              AI Trading Dashboard
            </h3>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-full">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-yellow-500 font-mono font-semibold">
              LIVE
            </span>
          </div>
        </div>
        <AIMarketTable />
        <PerformanceChart />
      </div>
    </div>
  );
};

export default HeroDashboard;