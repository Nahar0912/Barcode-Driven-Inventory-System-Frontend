import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,} from 'recharts';
import { fetchAnalytics } from '../services/analyticsService';

const AnalyticsPage = () => {
  const [analytics, setAnalytics] = useState(null);

  const loadAnalytics = async () => {
    try {
      const res = await fetchAnalytics();
      setAnalytics(res.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, []);

  if (!analytics) return <div className="text-center mt-10">Loading Analytics...</div>;

  const chartData = Object.entries(analytics.categoryCounts).map(([category, count]) => ({
    category,
    count,
  }));

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Analytics Dashboard</h2>

      <div className="bg-white p-6 shadow rounded mb-10">
        <h3 className="text-xl font-semibold mb-4">Products per Category (Bar Chart)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 shadow rounded mb-10">
        <h3 className="text-xl font-semibold mb-4">Recently Added Products</h3>
        <ul>
          {analytics.recentProducts.map((product) => (
            <li key={product._id} className="mb-3">
              <div className="font-medium">{product.description}</div>
              <div className="text-sm text-gray-500">Barcode: {product.barcode}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 bg-blue-100 text-blue-800 p-4 text-center rounded text-lg font-semibold">
        Total Products: {analytics.totalProducts}
      </div>
    </div>
  );
};

export default AnalyticsPage;
