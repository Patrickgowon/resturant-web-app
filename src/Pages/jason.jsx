import React from "react";
import Breakcart from "../component/breakcart";
import {breakfastItems} from "../component/jasonfile"



const Breakfast = () => {
  
  return (
   
   <div> 
        <div className="flex justify-center gap-2  flex-wrap grow-">
          {breakfastItems.map((item) =>(
              <Breakcart key={item.id} name={item.name} description={item.description} image={item.image} price={item.price}/>
          ))}
    
        </div>
   </div>
  );
};

export default Breakfast;
