import React from "react";
import {Link} from "react-router-dom";
const Dinner = ({image, name, description, price}) =>{
    return(
        <div className="grow p-2">
        <div className="bg-white rounded-lg shadow-md  ">
              <img
                src={image}
                alt={name}
                className="w-full h-48 object-cover"
              />
              <div className="p-2">
                <h2 className="text-xl font-semibold text-gray-800">
                  {name}
                </h2>
                <p className="text-sm text-gray-600 mb-2">{description}</p>
                <div className="text-red-500 font-bold text-lg flex justify-between">
                  <p>₦{price}</p>
                  <Link to={'/orders'}><button className="bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600">Order</button></Link>
                </div>
              </div>
            
        </div>
      </div>

    )
}
export default Dinner;