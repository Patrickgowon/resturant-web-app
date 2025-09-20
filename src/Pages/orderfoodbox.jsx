import React, { useState } from "react";
import Headfood from "../component/headfood";
import { CheckCircle, Clock, MapPin, Phone, User, Utensils } from "lucide-react";

const OrderPage = () => {
  const [order, setOrder] = useState({
    phone: "",
    name: "",
    address: "",
    meal: "",
    quantity: 1,
    instructions: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const popularMeals = [
    { id: 1, name: "Jollof Rice & Chicken", price: 2500, image: "🍗" },
    { id: 2, name: "Egusi Soup & Pounded Yam", price: 2200, image: "🥘" },
    { id: 3, name: "Amala & Ewedu", price: 1800, image: "🍛" },
    { id: 4, name: "Fried Rice", price: 2000, image: "🍚" },
    { id: 5, name: "Okro Soup & Fufu", price: 2100, image: "🥬" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const selectMeal = (mealName) => {
    setOrder({ ...order, meal: mealName });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!order.name || !order.phone || !order.address || !order.meal) {
      alert("⚠️ Please fill in all required fields!");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Show success message
    setShowSuccess(true);
    console.log("Order submitted:", order);

    // Reset form after 3 seconds
    setTimeout(() => {
      setOrder({
        phone: "",
        name: "",
        address: "",
        meal: "",
        quantity: 1,
        instructions: "",
      });
      setShowSuccess(false);
      setIsSubmitting(false);
    }, 3000);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-orange-50 flex flex-col">
        <Headfood />
        <div className="flex-1 flex justify-center items-center p-6 mt-16">
          <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
            <p className="text-gray-600 mb-6">
              Your <span className="font-semibold">{order.meal}</span> order is being prepared.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 text-left">
              <p className="flex items-center gap-2 mb-2">
                <Clock size={18} className="text-orange-500" />
                <span>Estimated delivery: 30-45 minutes</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={18} className="text-orange-500" />
                <span>Delivering to: {order.address}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50 flex flex-col">
      <Headfood />
      
      <div className="flex-1 flex flex-col lg:flex-row justify-center items-start gap-8 p-4 lg:p-8 mt-16">
        {/* Order Form */}
        <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-lg">
          <h2 className="text-3xl font-bold text-center text-orange-600 mb-2">
            Place Your Order
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Fill in your details and we'll deliver in no time
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="name"
                value={order.name}
                onChange={handleChange}
                required
                placeholder="Full Name"
                className="w-full border pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="address"
                value={order.address}
                onChange={handleChange}
                required
                placeholder="Delivery Address"
                className="w-full border pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={order.phone}
                onChange={handleChange}
                required
                placeholder="Phone Number"
                className="w-full border pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <Utensils className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <select
                name="meal"
                value={order.meal}
                onChange={handleChange}
                required
                className="w-full border pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent appearance-none"
              >
                <option value="">Select Meal</option>
                {popularMeals.map(meal => (
                  <option key={meal.id} value={meal.name}>
                    {meal.name} - ₦{meal.price}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => order.quantity > 1 && setOrder({...order, quantity: order.quantity - 1})}
                  className="bg-gray-200 w-10 h-10 rounded-l-lg flex items-center justify-center text-xl"
                >
                  -
                </button>
                <input
                  type="number"
                  name="quantity"
                  value={order.quantity}
                  onChange={handleChange}
                  min={1}
                  required
                  className="w-16 h-10 border-t border-b text-center focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setOrder({...order, quantity: order.quantity + 1})}
                  className="bg-gray-200 w-10 h-10 rounded-r-lg flex items-center justify-center text-xl"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Special Instructions
              </label>
              <textarea
                name="instructions"
                value={order.instructions}
                onChange={handleChange}
                rows={3}
                placeholder="Extra instructions (e.g., no pepper, allergies, etc.)"
                className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-4 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 flex items-center justify-center disabled:opacity-75"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                "Place Order"
              )}
            </button>
          </form>
        </div>

        {/* Popular Meals Section */}
        <div className="w-full max-w-md">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Popular Meals</h3>
          <div className="space-y-4">
            {popularMeals.map(meal => (
              <div 
                key={meal.id} 
                className={`bg-white p-4 rounded-xl shadow-md cursor-pointer transition-all duration-200 hover:shadow-lg border-2 ${order.meal === meal.name ? 'border-orange-500' : 'border-transparent'}`}
                onClick={() => selectMeal(meal.name)}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{meal.image}</span>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{meal.name}</h4>
                    <p className="text-orange-600 font-medium">₦{meal.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;