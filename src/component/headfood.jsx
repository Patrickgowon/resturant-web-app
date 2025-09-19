import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navs = () => {
  const navigate = useNavigate();
  const data = localStorage.getItem("email");

  const btn = () => {
    localStorage.removeItem("email"); // remove email
    const checkData = localStorage.getItem("email");
    if (!checkData) {
      navigate("/loginfood"); // redirect to login page
    }
  };

  return (
    <>
      <Link to={"/menu2"} className="hover:text-red-500">
        Menu
      </Link>
      <Link to={"/"} className="hover:text-red-500">
        Home
      </Link>
      <Link to={"/ordercart"} className="hover:text-red-500">
        Order
      </Link>
      <Link to={"/about"} className="hover:text-red-500">
        About
      </Link>
      <Link to={"/cont"} className="hover:text-red-500">
        Contact
      </Link>

      {!data && (
        <Link to={"/loginfood"} className="hover:text-red-500">
          Login
        </Link>
      )}
      {!data && (
        <Link to={"/signfood"} className="hover:text-red-500">
          Signin
        </Link>
      )}

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

  return (
    <div className="fixed w-full top-0 bg-white z-50">
      <nav className="flex justify-between items-center px-6 py-4 shadow-md">
        {/* Logo */}
        <h1 className="text-1xl sm:text-2xl font-bold text-red-500">
          FoodiesHub
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-lg">
          <Navs />
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          {showMenu ? (
            <X
              onClick={() => setShowMenu(false)}
              className="cursor-pointer"
              size={28}
            />
          ) : (
            <Menu
              onClick={() => setShowMenu(true)}
              className="cursor-pointer"
              size={28}
            />
          )}
        </div>
      </nav>

      {/* Mobile Slide Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-2/3 bg-white shadow-md transform transition-transform duration-300 ease-in-out z-40 flex flex-col items-center justify-center gap-6 text-lg
          ${showMenu ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Navs />
      </div>
    </div>
  );
};

export default Headfood;
