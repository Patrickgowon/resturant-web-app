import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useCart } from "./CartContext";
import { Plus, ShoppingCart, Heart } from "lucide-react";

const Breakcart = ({ id, name, description, price, image }) => {
  const { addToCart } = useCart();
  const [isLiked, setIsLiked] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({ id, name, price, image });
    setIsAdded(true);
    
    // Reset the added state after a short delay
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="px-4 sm:px-0 group bg-white rounded-1xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full w-[35rem] sm:w-[20rem] ">
      {/* Image Container */}
      <div className="relative overflow-hidden ">
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
      <div className="p-4 flex flex-col flex-grow ">
        <h2 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">{name}</h2>
        <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-2">{description}</p>

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

          <Link 
             
            className="bg-red-500 text-white text-sm px-4 py-2 rounded-full hover:bg-red-600 transition-colors font-medium flex items-center gap-1"
          >
            Order Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Breakcart;


