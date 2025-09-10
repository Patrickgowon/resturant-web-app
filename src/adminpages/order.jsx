import React, { useState } from "react";
import Header from "../admincomponent/header";

const OrdersPage = () => {
     const [orders] = useState([
        { id: 1, customer: "Godwin", meal: "Jollof Rice", quantity: 2, address: "123 Jos Street", status: "Pending", },
        { id: 2, customer: "Patrick Gowon", meal: "Amala & Ewedu", quantity: 1, address: "45 Abuja Avenue", status: "Delivered", },
        { id: 2, customer: "Patrick Gowon", meal: "Amala & Ewedu", quantity: 1, address: "45 Abuja Avenue", status: "Delivered", }, 
        { id: 2, customer: "Patrick Gowon", meal: "Amala & Ewedu", quantity: 1, address: "45 Abuja Avenue", status: "Delivered", }, 
        { id: 2, customer: "Patrick Gowon", meal: "Amala & Ewedu", quantity: 1, address: "45 Abuja Avenue", status: "Delivered", }, 
        { id: 2, customer: "Patrick Gowon", meal: "Amala & Ewedu", quantity: 1, address: "45 Abuja Avenue", status: "Delivered", }, 
        { id: 2, customer: "Patrick Gowon", meal: "Amala & Ewedu", quantity: 1, address: "45 Abuja Avenue", status: "Delivered", }, 
        { id: 2, customer: "Patrick Gowon", meal: "Amala & Ewedu", quantity: 1, address: "45 Abuja Avenue", status: "Delivered", }, 
        { id: 2, customer: "Patrick Gowon", meal: "Amala & Ewedu", quantity: 1, address: "45 Abuja Avenue", status: "Delivered", },  
    ]);

return(
    
    <div className="min-h-screen bg-gray-100 mt-17 left ">
        <Header/> 
    
        <h1 className="sm:text-2xl text-1xl font-bold text-gray-800 mb-3 mt-1 ml-3">Orders</h1>

        <div className=" mx-3 overflow-x-scroll ">
            <table className="min-w-full bg-white shadow-md rounded-lg ">
            <thead className="bg-orange-600 text-white">
            <tr>
                <th className="py-3 px-6 text-left sm:text-sm text-xs">Customer</th>
                <th className="py-3 px-6 text-left sm:text-sm text-xs">Meal</th>
                <th className="py-3 px-6 text-left sm:text-sm text-xs">Quantity</th>
                <th className="py-3 px-6 text-left sm:text-sm text-xs">Address</th>
                <th className="py-3 px-6 text-left sm:text-sm text-xs">Status</th>
            </tr>
        </thead>
      <tbody className="text-gray-700">
        {orders.map((order) => (
          <tr key={order.id} className="border-b hover:bg-orange-50">
            <td className="py-3 px-6 sm:text-sm text-xs">{order.customer}</td>
            <td className="py-3 px-6 sm:text-sm text-xs">{order.meal}</td>
            <td className="py-3 px-6 sm:text-sm text-xs ">{order.quantity}</td>
            <td className="py-3 px-6 sm:text-sm text-xs">{order.address}</td>
            <td className="py-3 px-6 sm:text-sm text-xs">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  order.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {order.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

); };

export default OrdersPage;