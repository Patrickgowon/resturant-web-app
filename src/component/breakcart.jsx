import { Link } from "react-router-dom";
import React from "react";
import { useCart } from "./CartContext"; // ✅ import useCart

const Breakcart = ({ id, name, description, price, image }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-yellow-50 flex flex-col grow p-2">
      <div className="bg-white rounded-lg shadow-md">
        {/* Food Image */}
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover rounded-t-lg"
        />

        {/* Food Details */}
        <div className="p-1">
          <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
          <p className="text-sm text-gray-600 mb-2">{description}</p>

          {/* Price + Buttons */}
          <div className="text-red-500 font-bold text-lg flex justify-between items-center">
            <p>₦{price}</p>

            <div className="flex gap-2">
              {/* ✅ Add to Cart button */}
              <button
                onClick={() =>
                  addToCart({ id, name, price, image })
                }
                className="bg-green-500 text-white text-sm px-3 py-1 rounded hover:bg-green-600"
              >
                Add to Cart
              </button>

              {/* Existing Order button */}
              <Link to={"/orders"}>
                <button className="bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600">
                  Order
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breakcart;
