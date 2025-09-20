import React, { useState } from "react";
import Breakfast from "./jason";
import Lunchbox from "./lunchbox";
import Dinnerbox from "./dinnerbox";
import Drinkbox from "./drinkbox";
import Headfood from "../component/headfood";
import { Link } from "react-router-dom";
import { useCart } from "../component/CartContext"; // ✅ Import cart hook
import { Plus, ShoppingCart } from "lucide-react";

const Menupage = () => {
  const [data, setData] = useState(1);
  const [added, setAdded] = useState({}); // track added state per item
  const { addToCart } = useCart(); // ✅ Use cart context

  const handleAdd = (key, item) => {
    addToCart(item);
    setAdded((p) => ({ ...p, [key]: true }));
    setTimeout(() => setAdded((p) => ({ ...p, [key]: false })), 1500);
  };

  return (
    <div className="mt-18">
      <Headfood />
      <section className="bg-red-500 text-white py-16 text-center">
        <h1 className="sm:text-4xl text-2xl font-bold mb-2">Our Delicious Menu</h1>
        <p className="text-lg">Explore our mouth-watering dishes available all day</p>
      </section>

      {/* Category Buttons */}
      <section className="flex justify-center sm:gap-4 gap-3 py-8 flex-wrap">
        <button
          onClick={() => setData(1)}
          className={`${
            data == 1
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          } px-3 sm:px-4 py-2 rounded text-xs sm:text-sm font-medium`}
        >
          All
        </button>
        <button
          onClick={() => setData(2)}
          className={`${
            data == 2
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          } px-3 sm:px-4 py-2 rounded text-xs sm:text-sm font-medium`}
        >
          Breakfast
        </button>
        <button
          onClick={() => setData(3)}
          className={`${
            data == 3
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          } px-3 sm:px-4 py-2 rounded text-xs sm:text-sm font-medium`}
        >
          Lunch
        </button>
        <button
          onClick={() => setData(4)}
          className={`${
            data == 4
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          } px-3 sm:px-4 py-2 rounded text-xs sm:text-sm font-medium`}
        >
          Dinner
        </button>
        <button
          onClick={() => setData(5)}
          className={`${
            data == 5
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          } px-3 sm:px-4 py-2 rounded text-xs sm:text-sm font-medium`}
        >
          Drinks
        </button>
      </section>

      {/* All Menu Section */}
      <section
        className={`${data == 1 ? "" : "hidden"} px-4 pb-16 max-w-6xl mx-auto`}
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Classic Burger */}
          <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
            <div className="relative overflow-hidden">
              <img
                src="https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1280.jpg"
                alt="Burger"
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                <span className="font-bold text-red-500">₦9.99</span>
              </div>
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                Classic Burger
              </h3>
              <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-2">
                Juicy grilled beef patty with fresh lettuce, tomato & cheese
              </p>
              <div className="flex justify-between items-center mt-auto">
                <button
                  onClick={() =>
                    handleAdd("Classic Burger", {
                      name: "Classic Burger",
                      description:
                        "Juicy grilled beef patty with fresh lettuce, tomato & cheese",
                      price: 9.99,
                      image:
                        "https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1280.jpg",
                    })
                  }
                  className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    added["Classic Burger"]
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-red-500 hover:text-white"
                  }`}
                >
                  {added["Classic Burger"] ? (
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
                <Link
                  
                  className="bg-red-500 text-white text-sm px-4 py-2 rounded-full hover:bg-red-600 transition-colors font-medium flex items-center gap-1"
                >
                  <ShoppingCart size={16} /> Order
                </Link>
              </div>
            </div>
          </div>

          {/* Pepperoni Pizza */}
          <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
            <div className="relative overflow-hidden">
              <img
                src="https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg"
                alt="Pizza"
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                <span className="font-bold text-red-500">₦12.99</span>
              </div>
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                Pepperoni Pizza
              </h3>
              <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-2">
                Crispy crust with melted cheese and spicy pepperoni
              </p>
              <div className="flex justify-between items-center mt-auto">
                <button
                  onClick={() =>
                    handleAdd("Pepperoni Pizza", {
                      name: "Pepperoni Pizza",
                      description:
                        "Crispy crust with melted cheese and spicy pepperoni",
                      price: 12.99,
                      image:
                        "https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg",
                    })
                  }
                  className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    added["Pepperoni Pizza"]
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-red-500 hover:text-white"
                  }`}
                >
                  {added["Pepperoni Pizza"] ? (
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
                <Link
                  
                  className="bg-red-500 text-white text-sm px-4 py-2 rounded-full hover:bg-red-600 transition-colors font-medium flex items-center gap-1"
                >
                  <ShoppingCart size={16} /> Order
                </Link>
              </div>
            </div>
          </div>

          {/* Creamy Pasta */}
          <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
            <div className="relative overflow-hidden">
              <img
                src="https://cdn.pixabay.com/photo/2015/04/08/13/13/food-712665_1280.jpg"
                alt="Pasta"
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                <span className="font-bold text-red-500">₦11.50</span>
              </div>
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                Creamy Pasta
              </h3>
              <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-2">
                Italian-style pasta tossed in creamy Alfredo sauce
              </p>
              <div className="flex justify-between items-center mt-auto">
                <button
                  onClick={() =>
                    handleAdd("Creamy Pasta", {
                      name: "Creamy Pasta",
                      description:
                        "Italian-style pasta tossed in creamy Alfredo sauce",
                      price: 11.5,
                      image:
                        "https://cdn.pixabay.com/photo/2015/04/08/13/13/food-712665_1280.jpg",
                    })
                  }
                  className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    added["Creamy Pasta"]
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-red-500 hover:text-white"
                  }`}
                >
                  {added["Creamy Pasta"] ? (
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
                <Link
                 
                  className="bg-red-500 text-white text-sm px-4 py-2 rounded-full hover:bg-red-600 transition-colors font-medium flex items-center gap-1"
                >
                  <ShoppingCart size={16} /> Order
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Menu Sections */}
      <section>
        {data == 2 && <Breakfast />}
        {data == 3 && <Lunchbox />}
        {data == 4 && <Dinnerbox />}
        {data == 5 && <Drinkbox />}
      </section>

      <footer className="bg-gray-800 text-white text-center py-6">
        <p>&copy; 2025 FoodiesHub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Menupage;
