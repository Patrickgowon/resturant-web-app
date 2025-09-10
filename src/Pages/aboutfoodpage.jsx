import React from "react";
import Headfood from "../component/headfood";
const Aboutfood = () =>{
    return(
        <div className="mt-18">
            <Headfood/>
            <section class="bg-red-500 text-white py-16 text-center">
                <h1 class="sm:text-4xl text-2xl font-bold">About FoodiesHub</h1>
                <p class="mt-2 text-lg p-2">Learn more about who we are and what we serve</p>
            </section>
        <section class="py-16 px-6 max-w-4xl mx-auto text-center">
            <h2 class="text-3xl font-bold mb-4">Who We Are</h2>
            <p class="text-lg text-gray-600 ">
            FoodiesHub is a family-owned restaurant dedicated to serving delicious, fresh, and healthy meals to our community. Our journey began in 2020 with a simple mission: to make people happy through food.
            </p>
        </section>
        <section class="bg-gray-100 py-16 px-6 mx-3">
            <div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
            <div>
                <h3 class="text-2xl font-bold mb-2 text-red-500">Our Mission</h3>
                <p class="text-gray-700">
                To bring people together through exceptional meals that are made with love, passion, and the finest ingredients.
                </p>
            </div>
            <div>
                <h3 class="text-2xl font-bold mb-2 text-red-500">Our Vision</h3>
                <p class="text-gray-700">
                To be a go-to destination for authentic flavors and cooking inspiration, both locally and globally.
                </p>
            </div>
            </div>
        </section>
        <section class="py-16 px-3 text-center">
            <h2 class="sm:text-3xl text-2xl font-bold mb-8">Why Choose Us?</h2>
            <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div class="bg-white shadow-lg rounded-xl p-6">
                <h4 class="text-xl font-bold mb-2">Fresh Ingredients</h4>
                <p class="text-gray-600">We use only the freshest local ingredients to make every dish delightful.</p>
            </div>
            <div class="bg-white shadow-lg rounded-xl p-6">
                <h4 class="text-xl font-bold mb-2">Authentic Recipes</h4>
                <p class="text-gray-600">Our meals are made using traditional recipes passed down through generations.</p>
            </div>
            <div class="bg-white shadow-lg rounded-xl p-6">
                <h4 class="text-xl font-bold mb-2">Fast & Friendly Service</h4>
                <p class="text-gray-600">We value your time and always aim to serve you with a smile — fast!</p>
            </div>
            </div>
        </section>
        <section class="bg-gray-100 py-16 px-6 text-center mx-3 mb-3">
            <h2 class="text-3xl font-bold mb-8">Meet the Founder</h2>
            <div class="max-w-md mx-auto">
            <img src="https://via.placeholder.com/200" class="rounded-full mx-auto mb-4" alt="Founder Image" />
            <h4 class="text-xl font-bold">Chef Series</h4>
            <p class="text-gray-600">Founder & Head Chef</p>
            <p class="mt-4 text-gray-700">
                “I started FoodiesHub to share my love of cooking and culture with the world — one plate at a time.”
            </p>
            </div>
        </section>
        <footer class="bg-gray-800 text-white text-center py-6">
            <p>&copy; 2025 FoodiesHub. All rights reserved.</p>
        </footer>
        </div>
    )
}
export default Aboutfood;