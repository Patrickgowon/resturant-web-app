import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, Trash2, LogOut, ChefHat } from "lucide-react";
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

  // order single item
  const handleOrder = async (item) => {
    try {
      await axios.post("http://localhost:5000/api/order", {
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
      });
      setOrderMessage(`✅ ${item.name} ordered successfully!`);
      setTimeout(() => setOrderMessage(""), 2000);
    } catch (error) {
      console.error("❌ Order failed:", error);
      setOrderMessage("Failed to place order");
      setTimeout(() => setOrderMessage(""), 2000);
    }
  };


// order all items in cart (loop through /api/order)
const handleCheckout = async () => {
  if (cartItems.length === 0) {
    setOrderMessage("Cart is empty!");
    setTimeout(() => setOrderMessage(""), 2000);
    return;
  }

  try {
    for (let item of cartItems) {
      await axios.post("http://localhost:5000/api/order", {
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
      });
    }

    setOrderMessage("🎉 All items ordered successfully!");
    clearCart(); // ✅ empty cart after success
    setTimeout(() => setOrderMessage(""), 2000);
  } catch (error) {
    console.error("❌ Checkout failed:", error);
    setOrderMessage("Checkout failed");
    setTimeout(() => setOrderMessage(""), 2000);
  }
};


  const totalPrice = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * (item.quantity || 1),
    0
  );

  return (
    <div className="fixed w-full top-0 bg-white z-50 shadow-sm border-b border-gray-100">
      <nav className="flex justify-between items-center px-4 sm:px-6 py-3 max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-red-500">
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
            <X onClick={() => setShowMenu(false)} className="cursor-pointer text-gray-700" size={28} />
          ) : (
            <Menu onClick={() => setShowMenu(true)} className="cursor-pointer text-gray-700" size={28} />
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
            <button onClick={() => setShowCart(false)} className="text-gray-500 hover:text-red-500 transition-colors">
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
              <ShoppingCart size={48} className="mx-auto text-gray-300 mb-3" />
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
                  <li key={item.id} className="flex justify-between items-start pb-4 border-b border-gray-100">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        ₦{item.price} {item.quantity > 1 && `× ${item.quantity}`}
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
                  Checkout Now
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {showCart && (
        <div className="fixed inset-0 bg-red-500 bg-opacity-40 z-40 md:hidden" onClick={() => setShowCart(false)}></div>
      )}
    </div>
  );
};

export default Headfood;
