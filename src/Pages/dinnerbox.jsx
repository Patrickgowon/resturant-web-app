import React from "react";
import Dinner from "../component/dinnercart";
import { dinnerItems } from "../component/jasonfile";
const Dinnerbox = () =>{
    return(
        <div>
            <div className="flex flex-wrap gap-3 justify-center">
                {dinnerItems.map((item) =>(
                    <Dinner key={item.id} image={item.image} name={item.name}description={item.description} price={item.price}/>
                ))} 
            </div>

        </div>
    )
}
export default Dinnerbox;
