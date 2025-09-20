import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, Trash2, User, LogOut, ChefHat } from "lucide-react";
import { useCart } from "./CartContext";

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
      
      <button
        onClick={toggleCartBox}
        className="cart-button relative"
      >
        <ShoppingCart size={22} />
        {cartItems.length > 0 && (
          <span className="cart-badge">
            {cartItems.length}
          </span>
        )}
      </button>
    </>
  );
};

const Headfood = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const { cartItems, removeFromCart } = useCart();
  const cartRef = useRef(null);

  // Close cart when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        // Check if the click wasn't on the cart button
        if (!event.target.closest('.cart-button')) {
          setShowCart(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const closeMobileMenu = () => {
    setShowMenu(false);
  };

  const toggleCart = () => {
    setShowCart(!showCart);
    if (showMenu) setShowMenu(false);
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * (item.quantity || 1),
    0
  );

  return (
    <div className="fixed w-full top-0 bg-white z-50 shadow-sm border-b border-gray-100">
      <nav className="flex justify-between items-center px-4 sm:px-6 py-3 max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-red-500">
          <ChefHat size={28} className="text-red-500" />
          <span className="hidden sm:block">FoodiesHub</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-md font-medium">
          <Navs toggleCartBox={toggleCart} closeMobileMenu={closeMobileMenu} />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleCart}
            className="cart-button relative"
          >
            <ShoppingCart size={22} />
            {cartItems.length > 0 && (
              <span className="cart-badge">
                {cartItems.length}
              </span>
            )}
          </button>
          
          {showMenu ? (
            <X onClick={() => setShowMenu(false)} className="cursor-pointer text-gray-700" size={28} />
          ) : (
            <Menu onClick={() => setShowMenu(true)} className="cursor-pointer text-gray-700" size={28} />
          )}
        </div>
      </nav>

      {/* Mobile Slide Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-3/4 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 flex flex-col items-center justify-start gap-8 text-lg pt-20
          ${showMenu ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Navs 
          toggleCartBox={() => {
            toggleCart();
            setShowMenu(false);
          }} 
          closeMobileMenu={closeMobileMenu}
        />
      </div>

      {/* Overlay for mobile menu */}
      

      {/* Cart Dropdown */}
      {showCart && (
        <div 
          ref={cartRef}
          className=" fixed md:absolute right-0 md:right-4 top-16 md:top-full w-full md:w-96 bg-white border border-gray-200 rounded-xl shadow-xl p-5  z-50 max-h-[70vh] overflow-y-auto animate-slide-in"
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
                  <li
                    key={item.id}
                    className="flex justify-between items-start pb-4 border-b border-gray-100"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-600">₦{item.price} {item.quantity > 1 && `× ${item.quantity}`}</p>
                    </div>

                    <div className="flex gap-3 items-center">
                      <Link  onClick={() => setShowCart(false)}>
                        <button className="bg-green-500 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-green-600 transition-colors">
                          Order
                        </button>
                      </Link>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        aria-label="Remove item"
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
                  <span className="text-red-500">
                    ₦{totalPrice.toFixed(2)}
                  </span>
                </div>

                <Link to="/orders" onClick={() => setShowCart(false)}>
                  <button className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 rounded-xl hover:from-red-600 hover:to-orange-600 transition-all shadow-md hover:shadow-lg">
                    Checkout Now
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      )}

      {/* Overlay for mobile cart */}
      {showCart && (
        <div 
          className="fixed inset-0 bg-red-500 bg-opacity-40 z-40 md:hidden"
          onClick={() => setShowCart(false)}
        ></div>
      )}
    </div>
  );
};

export default Headfood;

