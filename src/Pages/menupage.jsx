import React,{useState} from "react";
import Breakfast from "./jason";
import Lunchbox from "./lunchbox";
import Dinnerbox from "./dinnerbox";
import Drinkbox from "./drinkbox";
import Headfood from "../component/headfood";
import {Link} from 'react-router-dom'
const Menupage = () =>{
    const [data,setData] = useState(1);
    return(
        <div className="mt-18">
            <Headfood/>
            <section className="bg-red-500 text-white py-16 text-center">
                <h1 className="sm:text-4xl text-2xl font-bold mb-2">Our Delicious Menu</h1>
                <p className="text-lg">Explore our mouth-watering dishes available all day</p>
            </section> 
            <section className="flex justify-center sm:gap-4 gap-3 py-8 ">
                <button onClick={() =>setData(1)} className={ `${data == 1 ? "bg-red-500 text-white   px-4 py-2 rounded hover:bg-red-600" : ''}bg-gray-200  sm:px-4 px-1 sm:text-sm text-xs py-2  rounded`}>All</button>
                <button onClick={() =>setData(2)} className={`${data == 2?"bg-red-500 text-white sm:px-4 px-1 py-2 rounded" : ''}bg-gray-200 sm:px-4 px-2 sm:text-sm text-xs py-2 rounded`}>Breakfast</button>
                <button onClick={() =>setData(3)} className={`${data == 3?"bg-red-500 text-white px-4 py-2 rounded" : ''}bg-gray-200  sm:px-4 px-2 sm:text-sm text-xs py-2  rounded`}>Lunch</button>
                <button onClick={() =>setData(4)} className={`${data == 4?"bg-red-500 text-white px-4 py-2 rounded" : ''}bg-gray-200  sm:px-4 px-2 sm:text-sm text-xs py-2  rounded`}>Dinner</button>
                <button onClick={() =>setData(5)} className={`${data == 5?"bg-red-500 text-white  px-4 py-2 rounded" : ''}bg-gray-200  sm:px-4 px-2 sm:text-sm text-xs py-2  rounded`}>Drinks</button>
            </section>
            <section className={ `${data == 1 ? '' : 'hidden'} " px-2 pb-16 max-w-6xl mx-auto " `}>

                <div className="flex gap-3   flex-wrap md:flex-nowrap  grow">
                <div className="bg-white shadow-lg rounded-xl w-full">
                    <img src="https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1280.jpg" alt="Burger" className="w-full h-48 object-cover"/>
                    <div className="p-4">
                        <h3 className="text-xl font-bold">Classic Burger</h3>
                        <p className="text-gray-600 text-sm mb-2">Juicy grilled beef patty with fresh lettuce, tomato & cheese</p>
                        <div className="flex justify-between items-center">
                        <span className="text-red-500 font-bold text-lg">$9.99</span>
                        <Link to={'/orders'}><button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">Order</button></Link>
                        </div>
                    </div>
                </div>

                
                <div className="bg-white shadow-lg rounded-xl w-full">
                <img src="https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg" alt="Pizza" className="w-full h-48 object-cover"/>
                <div className="p-4">
                    <h3 className="text-xl font-bold">Pepperoni Pizza</h3>
                    <p className="text-gray-600 text-sm mb-2">Crispy crust with melted cheese and spicy pepperoni</p>
                    <div className="flex justify-between items-center">
                    <span className="text-red-500 font-bold text-lg">$12.99</span>
                    <Link to={'/orders'}><button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">Order</button></Link>
                    </div>
                </div>
                </div>
                <div className="bg-white shadow-lg rounded-xl w-full">
                <img src="https://cdn.pixabay.com/photo/2015/04/08/13/13/food-712665_1280.jpg" alt="Pasta" className="w-full h-48 object-cover"/>
                <div className="p-4">
                    <h3 className="text-xl font-bold">Creamy Pasta</h3>
                    <p className="text-gray-600 text-sm mb-2">Italian-style pasta tossed in creamy Alfredo sauce</p>
                    <div className="flex justify-between items-center">
                    <span className="text-red-500 font-bold text-lg">$11.50</span>
                    <Link to={'/orders'}><button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">Order</button></Link>
                    </div>
                </div>
                </div>

                </div>
                


            </section>

            <section className="" >
               
                {data == 2 && <Breakfast />}
                {data == 3 && <Lunchbox/>}
                {data == 4 && <Dinnerbox/>}
                {data == 5 && <Drinkbox/>}
            </section>
            <footer className="bg-gray-800 text-white text-center py-6">
                <p>&copy; 2025 FoodiesHub. All rights reserved.</p>
            </footer>
        </div>
    )
}
export default Menupage;