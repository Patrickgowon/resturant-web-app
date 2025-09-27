import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, Trash2, LogOut, ChefHat, CreditCard, Truck, Building, Smartphone } from "lucide-react";
import { useCart } from "./CartContext";
import axios from "axios";

const Navs = ({ toggleCartBox, closeMobileMenu }) => {
  const navigate = useNavigate();
  const data = localStorage.getItem("email");
  const { cartItems } = useCart();

  const btn = () => {
    localStorage.removeItem("email");
    if (!localStorage.getItem("email")) {
      navigate("/loginfood");
    }
  };

  return (
    <>
      {data && (
        <Link to={"/menu2"} className="nav-link" onClick={closeMobileMenu}>
          Menu
        </Link>
      )}
      <Link to={"/"} className="nav-link" onClick={closeMobileMenu}>
        Home
      </Link>
      <Link to={"/about"} className="nav-link" onClick={closeMobileMenu}>
        About
      </Link>
      <Link to={"/cont"} className="nav-link" onClick={closeMobileMenu}>
        Contact
      </Link>

      {!data ? (
        <>
          <Link to={"/loginfood"} className="nav-link" onClick={closeMobileMenu}>
            Login
          </Link>
          <Link to={"/signfood"} className="nav-link" onClick={closeMobileMenu}>
            Sign Up
          </Link>
        </>
      ) : (
        <button onClick={btn} className="nav-link flex items-center gap-1">
          <LogOut size={16} />
          Logout
        </button>
      )}

      <button onClick={toggleCartBox} className="cart-button relative">
        <ShoppingCart size={22} />
        {cartItems.length > 0 && (
          <span className="cart-badge">{cartItems.length}</span>
        )}
      </button>
    </>
  );
};

const Headfood = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const { cartItems, removeFromCart, clearCart } = useCart();
  const cartRef = useRef(null);
  const [orderMessage, setOrderMessage] = useState("");

  // New states for order modal
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [currentOrderItem, setCurrentOrderItem] = useState(null);
  const [isCheckoutAll, setIsCheckoutAll] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    number: "",
    address: "",
    additionalIngredient: ""
  });
  const [selectedPayment, setSelectedPayment] = useState("");

  // close cart if click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        if (!event.target.closest(".cart-button")) {
          setShowCart(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const closeMobileMenu = () => setShowMenu(false);

  const toggleCart = () => {
    setShowCart(!showCart);
    if (showMenu) setShowMenu(false);
  };

  // Handle customer info input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Open order modal for single item
  const handleOrder = (item) => {
    setCurrentOrderItem(item);
    setIsCheckoutAll(false);
    setShowOrderModal(true);
    setShowCart(false);
  };

  // Open order modal for checkout all
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      setOrderMessage("Cart is empty!");
      setTimeout(() => setOrderMessage(""), 2000);
      return;
    }
    setCurrentOrderItem(null);
    setIsCheckoutAll(true);
    setShowOrderModal(true);
    setShowCart(false);
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
    };

    try {
      let orderData;
      
      if (isCheckoutAll) {
        // Checkout all items
        orderData = {
          items: cartItems,
          customerInfo,
          paymentMethod: selectedPayment,
          totalPrice: totalPrice.toFixed(2)
        };
      } else {
        // Single item order
        orderData = {
          ...currentOrderItem,
          customerInfo,
          paymentMethod: selectedPayment
        };
      }

      const response = await axios.post("http://localhost:5000/api/order", orderData);

      setOrderMessage(isCheckoutAll ? "🎉 All items ordered successfully!" : `✅ ${currentOrderItem.name} ordered successfully!`);
      
      // Clear cart if checkout all
      if (isCheckoutAll) {
        clearCart();
      }
      
      // Reset everything
      setShowPaymentModal(false);
      setCustomerInfo({ name: "", number: "", address: "", additionalIngredient: "" });
      setSelectedPayment("");
      setCurrentOrderItem(null);
      setIsCheckoutAll(false);
      
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

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * (item.quantity || 1),
    0
  );

  return (
    <div className="fixed w-full top-0 bg-white z-50 shadow-sm border-b border-gray-100">
      <nav className="flex justify-between items-center px-4 sm:px-6 py-3 max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-red-500"
        >
          <ChefHat size={28} className="text-red-500" />
          <span className="hidden sm:block">FoodiesHub</span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-6 text-md font-medium">
          <Navs toggleCartBox={toggleCart} closeMobileMenu={closeMobileMenu} />
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={toggleCart} className="cart-button relative">
            <ShoppingCart size={22} />
            {cartItems.length > 0 && (
              <span className="cart-badge">{cartItems.length}</span>
            )}
          </button>

          {showMenu ? (
            <X
              onClick={() => setShowMenu(false)}
              className="cursor-pointer text-gray-700"
              size={28}
            />
          ) : (
            <Menu
              onClick={() => setShowMenu(true)}
              className="cursor-pointer text-gray-700"
              size={28}
            />
          )}
        </div>
      </nav>

      {/* Cart dropdown */}
      {showCart && (
        <div
          ref={cartRef}
          className="fixed md:absolute right-0 md:right-4 top-16 md:top-full w-full md:w-96 bg-white border border-gray-200 rounded-xl shadow-xl p-5 z-50 max-h-[70vh] overflow-y-auto animate-slide-in"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-xl text-gray-800">Your Cart</h2>
            <button
              onClick={() => setShowCart(false)}
              className="text-gray-500 hover:text-red-500 transition-colors"
            >
              <X size={22} />
            </button>
          </div>

          {orderMessage && (
            <div className="mb-3 p-2 text-center text-sm rounded-lg bg-green-100 text-green-700">
              {orderMessage}
            </div>
          )}

          {cartItems.length === 0 ? (
            <div className="py-8 text-center ">
              <ShoppingCart
                size={48}
                className="mx-auto text-gray-300 mb-3"
              />
              <p className="text-gray-500">Your cart is empty</p>
              <Link to="/menu2" onClick={() => setShowCart(false)}>
                <button className="mt-4 bg-red-500 text-white py-2 px-6 rounded-full hover:bg-red-600 transition-colors">
                  Browse Menu
                </button>
              </Link>
            </div>
          ) : (
            <>
              <ul className="space-y-4 max-h-64 overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-start pb-4 border-b border-gray-100"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        ₦{item.price}{" "}
                        {item.quantity > 1 && `× ${item.quantity}`}
                      </p>
                    </div>

                    <div className="flex gap-3 items-center">
                      <button
                        onClick={() => handleOrder(item)}
                        className="bg-green-500 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-green-600 transition-colors"
                      >
                        Order
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-5 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center font-bold text-lg mb-4">
                  <span className="text-gray-700">Total:</span>
                  <span className="text-red-500">₦{totalPrice.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 rounded-xl hover:from-red-600 hover:to-orange-600 transition-all shadow-md hover:shadow-lg"
                >
                  Checkout All Items
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Order Modal - Full Page */}
      {(showOrderModal && (currentOrderItem || isCheckoutAll)) && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-2xl mx-4 shadow-2xl animate-scaleIn">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {isCheckoutAll ? "Complete Your Order" : "Order Details"}
                </h3>
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
              {/* Order Summary */}
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl mb-6">
                {isCheckoutAll ? (
                  <div className="w-full">
                    <h4 className="font-bold text-gray-900 mb-2">Order Summary ({cartItems.length} items)</h4>
                    {cartItems.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm mb-1">
                        <span>{item.name} {item.quantity > 1 && `× ${item.quantity}`}</span>
                        <span>₦{(item.price * (item.quantity || 1)).toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between font-bold mt-2 pt-2 border-t">
                      <span>Total:</span>
                      <span className="text-red-500">₦{totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <img src={currentOrderItem.image} alt={currentOrderItem.name} className="w-16 h-16 object-cover rounded-xl" />
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900">{currentOrderItem.name}</h4>
                      <p className="text-sm text-gray-600 line-clamp-1">{currentOrderItem.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-red-500 text-lg">₦{currentOrderItem.price}</p>
                    </div>
                  </>
                )}
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
                    placeholder="Any special requests, allergies, or additional instructions?"
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
                {isCheckoutAll ? (
                  <div>
                    <p className="font-medium">{cartItems.length} items in order</p>
                    <p className="text-sm text-gray-600">Delivery to: {customerInfo.address}</p>
                    <p className="font-bold text-red-500 text-lg mt-2">Total: ₦{totalPrice.toFixed(2)}</p>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{currentOrderItem.name}</p>
                      <p className="text-sm text-gray-600">Delivery to: {customerInfo.address}</p>
                    </div>
                    <p className="font-bold text-red-500 text-lg">₦{currentOrderItem.price}</p>
                  </div>
                )}
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

      {showCart && (
        <div
          className="fixed inset-0 bg-red-500 bg-opacity-40 z-40 md:hidden"
          onClick={() => setShowCart(false)}
        ></div>
      )}

      {/* Add these animations to your CSS or Tailwind config */}
      
    </div>
  );
};

export default Headfood;