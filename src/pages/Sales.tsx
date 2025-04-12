import { TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function Sales() {
  const salesData = [
    { 
      id: 1, 
      product: 'Product A', 
      amount: 12500, 
      change: '+15%',
      trend: 'up',
      date: '2024-03-15' 
    },
    { 
      id: 2, 
      product: 'Product B', 
      amount: 9800, 
      change: '-5%',
      trend: 'down',
      date: '2024-03-14' 
    },
    // Add more sales data as needed
  ];

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <TrendingUp className="mr-2" size={24} />
        <h1 className="text-2xl font-bold">Sales Overview</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Sales</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Product</th>
                  <th className="text-left py-3 px-4">Amount</th>
                  <th className="text-left py-3 px-4">Change</th>
                  <th className="text-left py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {salesData.map((sale) => (
                  <tr key={sale.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{sale.product}</td>
                    <td className="py-3 px-4">${sale.amount.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <div className={`flex items-center ${
                        sale.trend === 'up' ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {sale.trend === 'up' ? (
                          <ArrowUpRight size={16} className="mr-1" />
                        ) : (
                          <ArrowDownRight size={16} className="mr-1" />
                        )}
                        {sale.change}
                      </div>
                    </td>
                    <td className="py-3 px-4">{sale.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Sales Summary</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg text-white">
              <p className="text-sm opacity-80">Total Sales</p>
              <p className="text-2xl font-bold">$22,300</p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-gray-600">Average Order Value</p>
              <p className="text-xl font-semibold">$1,150</p>
            </div>

            <div className="p-4 border rounded-lg">
              <p className="text-sm text-gray-600">Conversion Rate</p>
              <p className="text-xl font-semibold">24.8%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}