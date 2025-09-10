import React from "react"; 
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, } from "recharts";
import Header from "../admincomponent/header";

const AnalyticsPage = () => {
     const salesData = [ 
        { name: "Mon", sales: 1200 }, 
        { name: "Tue", sales: 1900 }, 
        { name: "Wed", sales: 800 }, 
        { name: "Thu", sales: 1600 }, 
        { name: "Fri", sales: 2400 }, 
        { name: "Sat", sales: 2800 }, 
        { name: "Sun", sales: 1000 }, ];

const foodCategoryData = [ 
    { name: "Rice", value: 400 }, 
    { name: "Soup", value: 300 }, 
    { name: "Swallow", value: 300 }, 
    { name: "Snacks", value: 200 }, 
    { name: "Drink", value: 600 }, 

];

const COLORS = ["#FF8042", "#00C49F", "#FFBB28", "#0088FE"];

return (

  <div className="min-h-screen bg-gray-50 mt-16">
      <Header/> 
        <h1 className="sm:text-3xl text-1xl font-bold text-gray-800 mb-2 ml-3">Analytics</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mx-3 mb-5">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Weekly Sales</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#FF8042" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Top Food Categories</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={foodCategoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name }) => name}
                >
                  {foodCategoryData.map((entry, index) => (
                    <Cell key={`Cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
  </div>

); };

export default AnalyticsPage;