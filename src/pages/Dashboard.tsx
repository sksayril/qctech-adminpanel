import { useState } from 'react';
import { BarChart, Users, DollarSign, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const [salesData] = useState([
    { month: 'Jan', amount: 12000 },
    { month: 'Feb', amount: 19000 },
    { month: 'Mar', amount: 15000 },
    { month: 'Apr', amount: 22000 },
  ]);

  const stats = [
    { icon: DollarSign, label: 'Total Revenue', value: '$68,000', change: '+12%' },
    { icon: Users, label: 'Active Salesmen', value: '24', change: '+3' },
    { icon: BarChart, label: 'Sales Growth', value: '18%', change: '+2.4%' },
    { icon: TrendingUp, label: 'Monthly Target', value: '92%', change: '+5%' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-r from-green-400 to-blue-500 p-3 rounded-lg">
                  <Icon className="text-white" size={24} />
                </div>
                <span className="text-green-500">{stat.change}</span>
              </div>
              <h3 className="text-gray-600 text-sm">{stat.label}</h3>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Monthly Sales Overview</h2>
        <div className="h-64 flex items-end justify-between">
          {salesData.map((data, index) => (
            <div key={index} className="flex flex-col items-center w-1/4">
              <div 
                className="w-16 bg-gradient-to-t from-green-400 to-blue-500 rounded-t-lg"
                style={{ height: `${(data.amount / 25000) * 100}%` }}
              ></div>
              <p className="mt-2 text-sm text-gray-600">{data.month}</p>
              <p className="font-semibold">${(data.amount / 1000).toFixed(1)}k</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}