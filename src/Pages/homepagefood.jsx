
import React from "react";
import {Link} from "react-router-dom";
import Headfood from "../component/headfood";
const Homepagefood = () =>{
    return(
        <div className="mt-17">
           <Headfood/>
            <section className="bg-[url('https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg')] p-4 bg-cover bg-center h-[80vh] flex items-center justify-center">
                <div className="bg-black bg-opacity-60 text-white  p-8 rounded-xl text-center max-w-xl">
                <h2 className="sm:text-4xl text-2xl font-bold mb-4">Delicious Meals Delivered Fresh</h2>
                <p className="text-lg mb-6">Order your favorite meals and enjoy fast delivery.</p>
                <Link to={'orderfood'} className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-full text-white sm:text-lg text-sm font-semibold">Order Now</Link>
                </div>
            </section>
            <section className="py-16 px-3">
                <h3 className="text-3xl font-bold text-center mb-10">Featured Dishes</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                    <img src="https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1280.jpg" alt="Burger" className="w-full h-48 object-cover" />
                    <div className="p-4">
                    <h4 className="text-xl font-bold">ClassNameclassNameic Burger</h4>
                    <p className="text-red-500 font-semibold">$9.99</p>
                    </div>
                </div>

                <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                    <img src="https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg" alt="Pizza" className="w-full h-48 object-cover" />
                    <div className="p-4">
                    <h4 className="text-xl font-bold">Cheesy Pizza</h4>
                    <p className="text-red-500 font-semibold">$12.99</p>
                    </div>
                </div>

                <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                    <img src="https://cdn.pixabay.com/photo/2017/06/02/18/24/salmon-2367029_1280.jpg" alt="Grilled Salmon" className="w-full h-48 object-cover" />
                    <div className="p-4">
                    <h4 className="text-xl font-bold">Grilled Salmon</h4>
                    <p className="text-red-500 font-semibold">$14.99</p>
                    </div>
                </div>
                </div>
            </section>
            <section className="bg-gray-100 py-16 px-6 text-center mx-3 mb-3">
                <h3 className="text-3xl font-bold mb-6">About Our Restaurant</h3>
                <p className="max-w-2xl mx-auto text-lg text-gray-700">
                At FoodiesHub, we use the freshest ingredients to bring you mouth-watering dishes made with love. Whether you're craving comfort food or gourmet cuisine, we’ve got something for everyone.
                </p>
            </section>
            <footer className="bg-gray-800 text-white text-center py-6">
                <p>&copy; 2025 FoodiesHub. All rights reserved.</p>
            </footer>
        </div>
    )
}
export default Homepagefood;