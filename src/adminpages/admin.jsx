import React, { useState, useEffect } from "react"; 
import { FaUtensils, FaUsers, FaChartBar, FaCog, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import OrdersPage from "./order";
import MenuPage from "./menu";
import CustomerPage from "./customer";
import AnalyticsPage from "./analystic";
import SettingsPage from "./settings";
import Header from "../admincomponent/header";

const Dashboard = () => {
    const [data, setData] = useState(1);
    const [dashboardStats, setDashboardStats] = useState({
        totalOrders: 0,
        totalCustomers: 0,
        totalRevenue: 0,
        pendingOrders: 0,
        completedOrders: 0
    });
    const [loading, setLoading] = useState(true);
    const [recentOrders, setRecentOrders] = useState([]);

    // Fetch dashboard data
    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const [statsRes, ordersRes] = await Promise.all([
                axios.get("http://localhost:5000/api/analytics/overview"),
                axios.get("http://localhost:5000/api/orders?limit=5") // Recent orders
            ]);

            const stats = statsRes.data;
            setDashboardStats({
                totalOrders: stats.totalOrders || 0,
                totalCustomers: stats.totalCustomers || 0,
                totalRevenue: stats.totalRevenue || 0,
                pendingOrders: stats.pendingOrders || 0,
                completedOrders: stats.completedOrders || 0
            });

            setRecentOrders(ordersRes.data || []);

        } catch (err) {
            console.error("Dashboard fetch error:", err);
            // Fallback mock data
            setDashboardStats({
                totalOrders: 123,
                totalCustomers: 58,
                totalRevenue: 42000,
                pendingOrders: 15,
                completedOrders: 108
            });
            setRecentOrders([
                { id: 1, customer: "John Doe", amount: 4500, status: "completed" },
                { id: 2, customer: "Jane Smith", amount: 3200, status: "pending" },
                { id: 3, customer: "Mike Johnson", amount: 2800, status: "completed" },
                { id: 4, customer: "Sarah Wilson", amount: 5100, status: "completed" },
                { id: 5, customer: "David Brown", amount: 3900, status: "pending" }
            ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    // Refresh data when switching back to dashboard
    useEffect(() => {
        if (data === 1) {
            fetchDashboardData();
        }
    }, [data]);

    const StatCard = ({ title, value, subtitle, color = "blue", icon }) => {
        const colorClasses = {
            blue: "bg-blue-50 border-blue-200 text-blue-600",
            green: "bg-green-50 border-green-200 text-green-600",
            orange: "bg-orange-50 border-orange-200 text-orange-600",
            purple: "bg-purple-50 border-purple-200 text-purple-600"
        };

        return (
            <div className={`bg-white rounded-xl p-6 shadow-sm border ${colorClasses[color]} hover:shadow-md transition-shadow duration-200`}>
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-600">{title}</h3>
                    {icon && <div className="text-lg">{icon}</div>}
                </div>
                <p className="text-2xl font-bold mb-1">{value}</p>
                {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
            </div>
        );
    };

    const OrderStatusBadge = ({ status }) => {
        const statusConfig = {
            completed: { color: "bg-green-100 text-green-800", text: "Completed" },
            pending: { color: "bg-yellow-100 text-yellow-800", text: "Pending" },
            cancelled: { color: "bg-red-100 text-red-800", text: "Cancelled" },
            processing: { color: "bg-blue-100 text-blue-800", text: "Processing" }
        };

        const config = statusConfig[status] || statusConfig.pending;

        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
                {config.text}
            </span>
        );
    };

    return ( 
        <div className="min-h-screen flex bg-gray-100">
            <Header/>
            <aside className="w-64 bg-white mt-25 shadow-lg fixed h-[100vh] hidden md:block"> 
                <div className="p-4 text-2xl font-bold text-gray-800">Admin Panel</div> 
                <nav className="p-4 text-gray-700 space-y-4"> 
                    <Link onClick={() => setData(1)} className="flex items-center gap-3 p-2 hover:bg-red-100 rounded"><FaShoppingCart /> Dashboard </Link> 
                    <Link onClick={() => setData(2)} className="flex items-center gap-3 p-2 hover:bg-red-100 rounded"><FaShoppingCart /> Orders </Link> 
                    <Link onClick={() => setData(3)} className="flex items-center gap-3 p-2 hover:bg-red-100 rounded"><FaUtensils /> Menu </Link>
                    <Link onClick={() => setData(4)} className="flex items-center gap-3 p-2 hover:bg-red-100 rounded"><FaUsers /> Customers </Link> 
                    <Link onClick={() => setData(5)} className="flex items-center gap-3 p-2 hover:bg-red-100 rounded"><FaChartBar /> Analytics </Link>
                    <Link onClick={() => setData(6)} className="flex items-center gap-3 p-2 hover:bg-red-100 rounded"><FaCog /> Settings </Link> 
                </nav> 
            </aside>

            <main className="flex-1 p-6 mt-17 md:ml-64 ml-0">
                <div className={data == 1 ? "" : "hidden"}>
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                        <div className="bg-red-500 text-white px-4 py-2 rounded shadow">Admin</div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
                                <p className="text-gray-600">Loading dashboard data...</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                <StatCard 
                                    title="Total Orders" 
                                    value={dashboardStats.totalOrders}
                                    subtitle="All time orders"
                                    color="blue"
                                    icon="📦"
                                />
                                <StatCard 
                                    title="Total Customers" 
                                    value={dashboardStats.totalCustomers}
                                    subtitle="Registered customers"
                                    color="green"
                                    icon="👥"
                                />
                                <StatCard 
                                    title="Total Revenue" 
                                    value={`₦${dashboardStats.totalRevenue.toLocaleString()}`}
                                    subtitle="Lifetime revenue"
                                    color="purple"
                                    icon="💰"
                                />
                                <StatCard 
                                    title="Completed Orders" 
                                    value={dashboardStats.completedOrders}
                                    subtitle="Successfully delivered"
                                    color="orange"
                                    icon="✅"
                                />
                            </div>

                            {/* Additional Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                <StatCard 
                                    title="Pending Orders" 
                                    value={dashboardStats.pendingOrders}
                                    subtitle="Awaiting processing"
                                    color="blue"
                                />
                                <StatCard 
                                    title="Completion Rate" 
                                    value={`${dashboardStats.totalOrders > 0 ? Math.round((dashboardStats.completedOrders / dashboardStats.totalOrders) * 100) : 0}%`}
                                    subtitle="Order success rate"
                                    color="green"
                                />
                                <StatCard 
                                    title="Avg Order Value" 
                                    value={`₦${dashboardStats.totalOrders > 0 ? Math.round(dashboardStats.totalRevenue / dashboardStats.totalOrders) : 0}`}
                                    subtitle="Average per order"
                                    color="purple"
                                />
                            </div>

                            {/* Recent Orders Section */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                                    <button 
                                        onClick={() => setData(2)}
                                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                                    >
                                        View All Orders →
                                    </button>
                                </div>
                                
                                {recentOrders.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b border-gray-200">
                                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Order ID</th>
                                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Customer</th>
                                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
                                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {recentOrders.map((order) => (
                                                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                                                        <td className="py-3 px-4 text-sm text-gray-700">#{order.id}</td>
                                                        <td className="py-3 px-4 text-sm text-gray-700">{order.customer}</td>
                                                        <td className="py-3 px-4 text-sm font-medium text-gray-900">
                                                            ₦{order.amount?.toLocaleString()}
                                                        </td>
                                                        <td className="py-3 px-4">
                                                            <OrderStatusBadge status={order.status} />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        No recent orders found
                                    </div>
                                )}
                            </div>

                            {/* Quick Actions */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow">
                                    <div className="text-2xl mb-3">📊</div>
                                    <h3 className="font-semibold text-gray-800 mb-2">View Analytics</h3>
                                    <p className="text-sm text-gray-600 mb-4">Detailed performance insights</p>
                                    <button 
                                        onClick={() => setData(5)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition-colors"
                                    >
                                        Go to Analytics
                                    </button>
                                </div>
                                
                                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow">
                                    <div className="text-2xl mb-3">🍽️</div>
                                    <h3 className="font-semibold text-gray-800 mb-2">Manage Menu</h3>
                                    <p className="text-sm text-gray-600 mb-4">Update food items and prices</p>
                                    <button 
                                        onClick={() => setData(3)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition-colors"
                                    >
                                        Manage Menu
                                    </button>
                                </div>
                                
                                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow">
                                    <div className="text-2xl mb-3">👥</div>
                                    <h3 className="font-semibold text-gray-800 mb-2">Customer Management</h3>
                                    <p className="text-sm text-gray-600 mb-4">View and manage customers</p>
                                    <button 
                                        onClick={() => setData(4)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition-colors"
                                    >
                                        View Customers
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <section className="">
                    {data == 2 && <OrdersPage />}
                    {data == 3 && <MenuPage />}
                    {data == 4 && <CustomerPage />}
                    {data == 5 && <AnalyticsPage />}
                    {data == 6 && <SettingsPage />}
                </section>
            </main>
        </div>
    );
};

export default Dashboard;