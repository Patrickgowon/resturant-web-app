import React from "react";
import { drinkItems } from "../component/jasonfile";
import Drink from "../component/drinkscard";
const Drinkbox = () =>{
 return(
    <div className="flex flex-wrap">
        {drinkItems.map((item) =>(
            <Drink key={item.id} name={item.name} price={item.price} description={item.description} image={item.image}/>
        ))}
    </div>
 )
}
export default Drinkbox;