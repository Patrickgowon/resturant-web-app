import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUtensils,
  FaUsers,
  FaChartBar,
  FaCog,
  FaShoppingCart,
} from "react-icons/fa";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="fixed w-full top-0 bg-white z-50">
      <nav className="flex justify-between items-center px-6 py-4 shadow-md">
        <h1 className="sm:text-2xl text-1xl font-bold text-red-500">
          FoodiesHub
        </h1>

        {/* Menu button on mobile */}
        <button
          className="hover:text-red-500 md:hidden block mt-1"
          onClick={() => setShowMenu(!showMenu)}
        >
          {showMenu ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Desktop menu placeholder */}
        <div className="hidden md:flex gap-6 text-lg">
          <Menu />
        </div>
      </nav>

      {/* Mobile sidebar menu (slide from left) */}
      <div
        className={`md:hidden fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform ${
          showMenu ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-bold text-xl text-red-500">Menu</h2>
          <button onClick={() => setShowMenu(false)}>
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        <div className="flex flex-col p-4 gap-3">
          <Link
            to={"/admin"}
            className="flex items-center gap-3 p-2 hover:bg-red-100 rounded"
          >
            <FaShoppingCart /> Dashboard
          </Link>
          <Link
            to={"/order"}
            className="flex items-center gap-3 p-2 hover:bg-red-100 rounded"
          >
            <FaShoppingCart /> Orders
          </Link>
          <Link
            to={"/menu"}
            className="flex items-center gap-3 p-2 hover:bg-red-100 rounded"
          >
            <FaUtensils /> Menu
          </Link>
          <Link
            to={"/customer"}
            className="flex items-center gap-3 p-2 hover:bg-red-100 rounded"
          >
            <FaUsers /> Customers
          </Link>
          <Link
            to={"/analystic"}
            className="flex items-center gap-3 p-2 hover:bg-red-100 rounded"
          >
            <FaChartBar /> Analytics
          </Link>
          <Link
            to={"/setting"}
            className="flex items-center gap-3 p-2 hover:bg-red-100 rounded"
          >
            <FaCog /> Settings
          </Link>
        </div>
      </div>

      {/* Overlay when menu is open */}
     
    </div>
  );
};

export default Header;
