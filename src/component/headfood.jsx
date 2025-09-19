import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "./CartContext";

const Navs = ({ toggleCartBox }) => {
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
      <Link to={"/menu2"} className="hover:text-red-500">Menu</Link>
      <Link to={"/"} className="hover:text-red-500">Home</Link>
      <Link to={"/ordercart"} className="hover:text-red-500">Order</Link>
      <Link to={"/about"} className="hover:text-red-500">About</Link>
      <Link to={"/cont"} className="hover:text-red-500">Contact</Link>

      {/* Cart Button */}
      <button
        onClick={toggleCartBox}
        className="relative flex items-center hover:text-red-500"
      >
        <ShoppingCart size={22} />
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
            {cartItems.length}
          </span>
        )}
      </button>

      {!data && <Link to={"/loginfood"} className="hover:text-red-500">Login</Link>}
      {!data && <Link to={"/signfood"} className="hover:text-red-500">Signin</Link>}
      {data && (
        <button
          onClick={btn}
          className="hover:text-red-500 bg-transparent border-none cursor-pointer"
        >
          Logout
        </button>
      )}
    </>
  );
};

const Headfood = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const { cartItems, removeFromCart } = useCart();

  return (
    <div className="fixed w-full top-0 bg-white z-50">
      <nav className="flex justify-between items-center px-6 py-4 shadow-md">
        {/* Logo */}
        <h1 className="text-1xl sm:text-2xl font-bold text-red-500">
          FoodiesHub
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-lg">
          <Navs toggleCartBox={() => setShowCart(!showCart)} />
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          {showMenu ? (
            <X onClick={() => setShowMenu(false)} className="cursor-pointer" size={28} />
          ) : (
            <Menu onClick={() => setShowMenu(true)} className="cursor-pointer" size={28} />
          )}
        </div>
      </nav>

      {/* Mobile Slide Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-2/3 bg-white shadow-md transform transition-transform duration-300 ease-in-out z-40 flex flex-col items-center justify-center gap-6 text-lg
          ${showMenu ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Navs toggleCartBox={() => setShowCart(!showCart)} />
      </div>

     {/* 🛒 Cart Dropdown */}
{showCart && (
  <div className="absolute right-6 top-16 w-80 bg-white border rounded-lg shadow-lg p-4 z-50">
    <h2 className="font-bold text-lg mb-2">Your Cart</h2>

    {cartItems.length === 0 ? (
      <p className="text-gray-500">No items in cart.</p>
    ) : (
      <>
        <ul className="space-y-3 max-h-64 overflow-y-auto">
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-600">₦{item.price}</p>
              </div>

              <div className="flex gap-2 items-center">
                {/* Order button inside cart */}
                <Link to="/orders">
                  <button className="bg-green-500 text-white text-xs px-2 py-1 rounded hover:bg-green-600">
                    Order
                  </button>
                </Link>

                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Total price */}
        <div className="mt-3 flex justify-between items-center font-bold">
          <span>Total:</span>
          <span>
            ₦
            {cartItems.reduce(
              (acc, item) => acc + Number(item.price),
              0
            )}
          </span>
        </div>

        {/* Checkout Button */}
        <Link to="/orders">
          <button className="w-full mt-3 bg-red-500 text-white py-2 rounded hover:bg-red-600">
            Checkout
          </button>
        </Link>
      </>
    )}
  </div>
)}

    </div>
  );
};

export default Headfood;
