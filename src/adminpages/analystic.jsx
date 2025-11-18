import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line,
  CartesianGrid,
  Legend
} from "recharts";
import Header from "../admincomponent/header";

const AnalyticsPage = () => {
  const [analyticsData, setAnalyticsData] = useState({
    overview: null,
    revenueData: [],
    topItems: [],
    paymentMethods: [],
    statusCounts: []
  });
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("30");

  // Mock data as fallback
  const mockSalesData = [ 
    { name: "Mon", sales: 1200, orders: 45 }, 
    { name: "Tue", sales: 1900, orders: 52 }, 
    { name: "Wed", sales: 800, orders: 28 }, 
    { name: "Thu", sales: 1600, orders: 48 }, 
    { name: "Fri", sales: 2400, orders: 65 }, 
    { name: "Sat", sales: 2800, orders: 72 }, 
    { name: "Sun", sales: 1000, orders: 38 }, 
  ];

  const mockFoodCategoryData = [ 
    { name: "Rice Dishes", value: 400, color: "#FF8042" }, 
    { name: "Soups", value: 300, color: "#00C49F" }, 
    { name: "Swallow", value: 300, color: "#FFBB28" }, 
    { name: "Snacks", value: 200, color: "#0088FE" }, 
    { name: "Beverages", value: 600, color: "#8884D8" }, 
  ];

  const mockMonthlyRevenueData = [
    { month: "Jan", revenue: 45000, profit: 18000 },
    { month: "Feb", revenue: 52000, profit: 21000 },
    { month: "Mar", revenue: 48000, profit: 19000 },
    { month: "Apr", revenue: 61000, profit: 25000 },
    { month: "May", revenue: 55000, profit: 22000 },
    { month: "Jun", revenue: 68000, profit: 28000 },
  ];

  const fetchAnalyticsData = async (range = timeRange) => {
    try {
      setLoading(true);
      const API_BASE_URL = "http://localhost:5000/api/analytics";
      
      const [
        overviewRes,
        revenueRes,
        topItemsRes,
        paymentMethodsRes,
        statusCountsRes,
      ] = await Promise.all([
        axios.get(`${API_BASE_URL}/overview`),
        axios.get(`${API_BASE_URL}/revenue?range=${range}`),
        axios.get(`${API_BASE_URL}/top-items?limit=5`),
        axios.get(`${API_BASE_URL}/payment-methods`),
        axios.get(`${API_BASE_URL}/status-counts`),
      ]);

      setAnalyticsData({
        overview: overviewRes.data,
        revenueData: revenueRes.data,
        topItems: topItemsRes.data,
        paymentMethods: paymentMethodsRes.data,
        statusCounts: statusCountsRes.data
      });

    } catch (err) {
      console.error("Analytics fetch error:", err);
      // Use mock data if API fails
      setAnalyticsData({
        overview: {
          totalOrders: 342,
          completedOrders: 298,
          pendingOrders: 32,
          cancelledOrders: 12,
          totalRevenue: 325000,
          averageOrderValue: 950
        },
        revenueData: mockMonthlyRevenueData.map(item => ({
          date: item.month,
          revenue: item.revenue
        })),
        topItems: [
          { name: "Jollof Rice", orderCount: 45 },
          { name: "Fried Plantain", orderCount: 38 },
          { name: "Chicken Suya", orderCount: 32 },
          { name: "Egusi Soup", orderCount: 28 },
          { name: "Pounded Yam", orderCount: 25 }
        ],
        paymentMethods: [
          { method: "Cash", count: 120 },
          { method: "Card", count: 156 },
          { method: "Transfer", count: 66 }
        ],
        statusCounts: [
          { status: "Completed", count: 298 },
          { status: "Pending", count: 32 },
          { status: "Cancelled", count: 12 }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    fetchAnalyticsData(range);
  };

  const statsData = [
    {
      title: "Total Revenue",
      value: `₦${(analyticsData.overview?.totalRevenue || 0).toLocaleString()}`,
      change: "+12.5%",
      trend: "up",
      description: "From last month",
      color: "bg-green-50",
      textColor: "text-green-600",
      borderColor: "border-green-200"
    },
    {
      title: "Total Orders",
      value: analyticsData.overview?.totalOrders || 0,
      change: "+8.2%",
      trend: "up",
      description: "From last month",
      color: "bg-blue-50",
      textColor: "text-blue-600",
      borderColor: "border-blue-200"
    },
    {
      title: "Average Order",
      value: `₦${(analyticsData.overview?.averageOrderValue || 0).toLocaleString()}`,
      change: "+4.1%",
      trend: "up",
      description: "From last month",
      color: "bg-purple-50",
      textColor: "text-purple-600",
      borderColor: "border-purple-200"
    },
    {
      title: "Completion Rate",
      value: analyticsData.overview ? 
        `${Math.round((analyticsData.overview.completedOrders / analyticsData.overview.totalOrders) * 100)}%` 
        : "0%",
      change: "+2.3%",
      trend: "up",
      description: "From last month",
      color: "bg-orange-50",
      textColor: "text-orange-600",
      borderColor: "border-orange-200"
    }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-sm">
          <p className="font-medium text-gray-900">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.name.includes('sales') || entry.name.includes('revenue') || entry.name.includes('profit') ? `₦${entry.value.toLocaleString()}` : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Colors for charts
  const COLORS = ["#FF8042", "#00C49F", "#FFBB28", "#0088FE", "#8884D8"];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex justify-center items-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading analytics data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600 mt-2">
                Track your restaurant performance and insights
              </p>
            </div>
            <div className="flex items-center gap-4 mt-4 lg:mt-0">
              <select 
                value={timeRange}
                onChange={(e) => handleTimeRangeChange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-sm"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 3 months</option>
                <option value="365">Last year</option>
              </select>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsData.map((stat, index) => (
              <div 
                key={index}
                className={`bg-white rounded-xl shadow-sm border ${stat.borderColor} p-6 hover:shadow-md transition-shadow duration-200`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
                  <span className={`text-xs font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'} flex items-center gap-1`}>
                    {stat.trend === 'up' ? (
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                    {stat.change}
                  </span>
                </div>
                <p className={`text-2xl font-bold ${stat.textColor} mb-1`}>{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.description}</p>
              </div>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Revenue Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Revenue Over Time</h2>
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span className="text-gray-600">Revenue</span>
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analyticsData.revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                    tickFormatter={(value) => `₦${value}`}
                  />
                  <Tooltip 
                    formatter={(value) => [`₦${value.toLocaleString()}`, 'Revenue']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: '#10B981' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Payment Methods Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Payment Methods</h2>
                <span className="text-sm text-gray-500">Distribution</span>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analyticsData.paymentMethods}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="count"
                    label={({ method, percent }) => `${method} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {analyticsData.paymentMethods.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value} orders`, name]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Additional Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Top Selling Items */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Top Selling Items</h2>
                <span className="text-sm text-gray-500">Most popular</span>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData.topItems}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                  />
                  <Tooltip formatter={(value) => [value, 'Orders']} />
                  <Bar 
                    dataKey="orderCount" 
                    fill="#3B82F6" 
                    radius={[4, 4, 0, 0]}
                    name="Orders"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Order Status Distribution */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Order Status Distribution</h2>
                <span className="text-sm text-gray-500">Current status</span>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData.statusCounts}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="status" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                  />
                  <Tooltip formatter={(value) => [value, 'Count']} />
                  <Bar 
                    dataKey="count" 
                    fill="#F97316" 
                    radius={[4, 4, 0, 0]}
                    name="Count"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Additional Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Items</h3>
              <div className="space-y-3">
                {analyticsData.topItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-sm text-gray-700">{item.name}</span>
                    <span className="text-sm font-medium text-gray-900">{item.orderCount} orders</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Insights</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Completion Rate</span>
                    <span className="font-medium text-green-600">
                      {analyticsData.overview ? 
                        `${Math.round((analyticsData.overview.completedOrders / analyticsData.overview.totalOrders) * 100)}%` 
                        : "0%"
                      }
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ 
                        width: analyticsData.overview ? 
                          `${(analyticsData.overview.completedOrders / analyticsData.overview.totalOrders) * 100}%` 
                          : '0%' 
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Pending Orders</span>
                    <span className="font-medium text-yellow-600">
                      {analyticsData.overview?.pendingOrders || 0}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Cancellation Rate</span>
                    <span className="font-medium text-red-600">
                      {analyticsData.overview ? 
                        `${Math.round((analyticsData.overview.cancelledOrders / analyticsData.overview.totalOrders) * 100)}%` 
                        : "0%"
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-600">Total Revenue</span>
                  <span className="text-sm font-medium text-gray-900">
                    ₦{(analyticsData.overview?.totalRevenue || 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-600">Avg Order Value</span>
                  <span className="text-sm font-medium text-gray-900">
                    ₦{(analyticsData.overview?.averageOrderValue || 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-600">Completed Orders</span>
                  <span className="text-sm font-medium text-green-600">
                    {analyticsData.overview?.completedOrders || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-600">Cancelled Orders</span>
                  <span className="text-sm font-medium text-red-600">
                    {analyticsData.overview?.cancelledOrders || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;