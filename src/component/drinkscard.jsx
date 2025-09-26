import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useCart } from "./CartContext";
import { Plus, ShoppingCart, Heart, X, CreditCard, Wallet, Truck, Building, Smartphone } from "lucide-react";
import axios from "axios";

const Drink = ({ id, name, description, price, image }) => {
  const { addToCart } = useCart();
  const [isLiked, setIsLiked] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [orderMessage, setOrderMessage] = useState("");
  const [orderedItem, setOrderedItem] = useState(null);
  
  // New states for order modal
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    number: "",
    address: "",
    additionalIngredient: ""
  });
  const [selectedPayment, setSelectedPayment] = useState("");

  const handleAddToCart = () => {
    addToCart({ id, name, price, image });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  // Open order modal
  const handleOrderNow = (e) => {
    e.preventDefault();
    setShowOrderModal(true);
  };

  // Handle customer info input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Proceed to payment after filling customer info
  const proceedToPayment = () => {
    if (customerInfo.name && customerInfo.number && customerInfo.address) {
      setShowOrderModal(false);
      setShowPaymentModal(true);
    } else {
      alert("Please fill in all required fields (Name, Number, Address)");
    }
  };

  // Handle payment selection
  const handlePaymentSelect = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
  };

  // Final order submission
  const handleFinalOrder = async () => {
    if (!selectedPayment) {
      alert("Please select a payment method");
      return;
    }

    const orderData = { 
      name, 
      description, 
      price, 
      image,
      customerInfo,
      paymentMethod: selectedPayment
    };

    try {
      const response = await axios.post("http://localhost:5000/api/order", orderData);
      
      setOrderedItem(response.data.order);
      setOrderMessage("Order placed successfully!");
      
      // Reset everything
      setShowPaymentModal(false);
      setCustomerInfo({ name: "", number: "", address: "", additionalIngredient: "" });
      setSelectedPayment("");
      
      setTimeout(() => setOrderMessage(""), 3000);
      
    } catch (error) {
      console.error("Order request failed:", error);
      setOrderMessage("Failed to place order!");
      setTimeout(() => setOrderMessage(""), 2000);
    }
  };

  // Payment method icons
  const paymentIcons = {
    "Credit Card": <CreditCard size={20} />,
    "Debit Card": <CreditCard size={20} />,
    "Pay on Delivery": <Truck size={20} />,
    "Bank Transfer": <Building size={20} />,
    "Digital Wallet": <Smartphone size={20} />
  };

  return (
    <>
      <div className="px-4 sm:px-0 group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full w-[35rem] sm:w-[20rem]">
        {/* Image Container */}
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Like Button */}
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
            aria-label="Add to favorites"
          >
            <Heart
              size={18}
              className={isLiked ? "fill-red-500 text-red-500" : "text-gray-400"}
            />
          </button>

          {/* Price Tag */}
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
            <span className="font-bold text-red-500">₦{price}</span>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-4 flex flex-col flex-grow">
          <h2 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
            {name}
          </h2>
          <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-2">
            {description}
          </p>

          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-auto">
            <button
              onClick={handleAddToCart}
              className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                isAdded
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-red-500 hover:text-white"
              }`}
            >
              {isAdded ? (
                <>
                  <ShoppingCart size={16} />
                  Added!
                </>
              ) : (
                <>
                  <Plus size={16} />
                  Add to Cart
                </>
              )}
            </button>

            <button
              onClick={handleOrderNow}
              className="bg-red-500 text-white text-sm px-4 py-2 rounded-full hover:bg-red-600 transition-colors font-medium flex items-center gap-1"
            >
              Order Now
            </button>
          </div>

          {/* Success Message */}
          {orderMessage && (
            <div className="mt-3 text-center text-green-600 font-medium">
              {orderMessage}
            </div>
          )}
          {orderedItem && (
            <div className="mt-2 text-sm text-gray-700">
              <strong>Item:</strong> {orderedItem.name} – ₦{orderedItem.price}
            </div>
          )}
        </div>
      </div>

      {/* Order Modal - Full Page */}
      {showOrderModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-2xl mx-4 shadow-2xl animate-scaleIn">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Complete Your Order</h3>
                <p className="text-gray-600">Fill in your details to proceed</p>
              </div>
              <button 
                onClick={() => setShowOrderModal(false)} 
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              {/* Order Item Summary */}
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl mb-6">
                <img src={image} alt={name} className="w-16 h-16 object-cover rounded-xl" />
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900">{name}</h4>
                  <p className="text-sm text-gray-600 line-clamp-1">{description}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-red-500 text-lg">₦{price}</p>
                </div>
              </div>

              {/* Customer Info Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="number"
                    value={customerInfo.number}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="+234 800 000 0000"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Address *</label>
                  <textarea
                    name="address"
                    value={customerInfo.address}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="Enter your complete delivery address"
                    rows="3"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Requests & Notes</label>
                  <textarea
                    name="additionalIngredient"
                    value={customerInfo.additionalIngredient}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="Any special requests, ice preferences, or additional notes?"
                    rows="2"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex gap-3 p-6 border-t border-gray-100 bg-gray-50 rounded-b-3xl">
              <button
                onClick={() => setShowOrderModal(false)}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={proceedToPayment}
                className="flex-1 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl hover:from-red-600 hover:to-orange-600 transition-all font-medium shadow-lg hover:shadow-xl"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal - Full Page */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-2xl mx-4 shadow-2xl animate-scaleIn">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Select Payment Method</h3>
                <p className="text-gray-600">Choose how you'd like to pay</p>
              </div>
              <button 
                onClick={() => setShowPaymentModal(false)} 
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              {/* Order Summary */}
              <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                <h4 className="font-bold text-gray-900 mb-2">Order Summary</h4>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{name}</p>
                    <p className="text-sm text-gray-600">Delivery to: {customerInfo.address}</p>
                  </div>
                  <p className="font-bold text-red-500 text-lg">₦{price}</p>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                {["Credit Card", "Debit Card", "Pay on Delivery", "Bank Transfer", "Digital Wallet"].map((method) => (
                  <div 
                    key={method}
                    onClick={() => handlePaymentSelect(method)}
                    className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      selectedPayment === method 
                        ? 'border-red-500 bg-red-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`p-2 rounded-lg mr-4 ${
                      selectedPayment === method ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {paymentIcons[method]}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{method}</p>
                      <p className="text-sm text-gray-600">
                        {method === "Pay on Delivery" ? "Pay when you receive your order" :
                         method === "Digital Wallet" ? "Pay with mobile money" :
                         `Pay securely with ${method}`}
                      </p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 ${
                      selectedPayment === method ? 'bg-red-500 border-red-500' : 'border-gray-300'
                    }`}>
                      {selectedPayment === method && (
                        <div className="w-full h-full rounded-full bg-white scale-[0.4]"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex gap-3 p-6 border-t border-gray-100 bg-gray-50 rounded-b-3xl">
              <button
                onClick={() => {
                  setShowPaymentModal(false);
                  setShowOrderModal(true);
                }}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors font-medium"
              >
                Back to Details
              </button>
              <button
                onClick={handleFinalOrder}
                disabled={!selectedPayment}
                className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                  selectedPayment 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Confirm & Place Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add these animations to your CSS or Tailwind config */}
     
    </>
  );
};

export default Drink;