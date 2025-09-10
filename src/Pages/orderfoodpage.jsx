import React, { useState } from "react";
import Headfood from "../component/headfood";


const menuItems = [
  { id: 1, name: "Jollof Rice", price: 1500 },
  { id: 2, name: "Egusi Soup & Pounded Yam", price: 2500 },
  { id: 3, name: "Fried Rice & Chicken", price: 2000 },
  { id: 4, name: "Spaghetti & Meatballs", price: 1800 },
];

const OrderNow = () => {
  const [order, setOrder] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const toggleItem = (item) => {
    if (order.includes(item)) {
      setOrder(order.filter((i) => i.id !== item.id));
    } else {
      setOrder([...order, item]);
    }
  };

  const total = order.reduce((sum, item) => sum + item.price, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !address || order.length === 0) {
      alert("Please complete the form and select at least one item.");
      return;
    }

   
  };

  return (
    <div className="min-h-screen bg-white  mt-18">
      <Headfood/>
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-red-500 mb-6">
          Order Your Favorite Meals 🍽
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-red-400"
              required
            />
            <input
              type="text"
              placeholder="Delivery Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-red-400"
              required
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Select Food Items</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {menuItems.map((item) => (
                <label
                  key={item.id}
                  className={`border p-4 rounded-md cursor-pointer ${
                    order.includes(item) ? "bg-red-100 border-red-400" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={order.includes(item)}
                    onChange={() => toggleItem(item)}
                    className="mr-2"
                  />
                  {item.name} – ₦{item.price}
                </label>
              ))}
            </div>
          </div>

          <div className="text-right font-bold text-lg">
            Total: ₦{total.toLocaleString()}
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderNow;