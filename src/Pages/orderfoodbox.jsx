import React, { useState } from "react";
import Headfood from "../component/headfood";

const OrderPage = () => {
  const [order, setOrder] = useState({
    phone:"",
    name: "",
    address: "",
    meal: "",
    quantity: 1,
    instructions: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order submitted:", order);
    alert("✅ Order submitted successfully!");
    
  };

  return (
    <div className="sm:mt-17 mt-12  min-h-screen bg-orange-50 p-6 flex justify-center items-center">
      <Headfood/>
      <div className="bg-white shadow-md rounded-lg sm:p-8 p-3 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-red-500 mb-6">
          🛒 Place Your Order
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={order.name}
            onChange={handleChange}
            required
            placeholder="Full Name"
            className="w-full border sm:p-3 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <input
            type="text"
            name="address"
            value={order.address}
            onChange={handleChange}
            required
            placeholder="Delivery Address"
            className="w-full border sm:p-3 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="text"
            name="address"
            value={order.phone}
            onChange={handleChange}
            required
            placeholder="Phone Number"
            className="w-full border sm:p-3 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <select
            name="meal"
            value={order.meal}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="">Select Meal</option>
            <option value="Jollof Rice & Chicken">Jollof Rice & Chicken</option>
            <option value="Egusi Soup & Pounded Yam">Egusi Soup & Pounded Yam</option>
            <option value="Amala & Ewedu">Amala & Ewedu</option>
            <option value="Fried Rice">Fried Rice</option>
            <option value="Okro Soup & Fufu">Okro Soup & Fufu</option>
          </select>

          <input
            type="number"
            name="quantity"
            value={order.quantity}
            onChange={handleChange}
            min={1}
            required
            placeholder="Number of Plates"
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <textarea
            name="instructions"
            value={order.instructions}
            onChange={handleChange}
            rows={3}
            placeholder="Extra instructions (e.g., no pepper)"
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-red-500 text-white text-sm font-bold sm:py-3 py-2 rounded hover:bg-orange-700 transition duration-300"
          >
            Submit Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderPage;