import React, { useState } from "react";
import Headfood from "../component/headfood";

const menu = [ 
    { id: 1, name: "Jollof Rice", price: 1500, image: "https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_960_720.jpg" }, 
    { id: 2, name: "Egusi Soup", price: 2000, image: "https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_960_720.jpg" }, 
    { id: 3, name: "Fried Rice & Chicken", price: 2500, image: "https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_960_720.jpg" }, 
    { id: 4, name: "Pounded Yam & Ogbono", price: 1800, image: "https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_960_720.jpg" }, 
];

export default function FoodOrderPage() { 
    const [cart, setCart] = useState([]); 
    const [wallet, setWallet] = useState(5000);

const addToCart = (item) => { 
    setCart([...cart, item]); 
};

const removeFromCart = (id) => { 
    setCart(cart.filter((item, index) => index !== id)); };

const total = cart.reduce((sum, item) => sum + item.price, 0);

const handlePayment = () => { if (total > wallet) return alert("Insufficient wallet balance"); setWallet(wallet - total); alert("Order placed successfully!"); setCart([]); };

return ( 
<div className="min-h-screen bg-gray-50 mt-18">
    <Headfood/>
    <h1 className="sm:text-3xl text-2xl  font-bold text-center text-gray-800 mb-6 ">Order Your Favorite Food</h1>

    <div className="flex flex-col lg:flex-row gap-8 mx-3 mb-3">
       
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {menu.map((item) => (
            <div key={item.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                <p className="text-gray-600 mb-2">₦{item.price.toLocaleString()}</p>
                <button
                onClick={() => addToCart(item)}
                className="bg-red-600 text-white text-sm sm:px-4 px-2 sm:py-2 py-1 rounded hover:bg-green-700"
                >
                Add to Cart
                </button>
            </div>
            </div>
        ))}
        </div>

       
        <div className="w-full lg:w-1/3 bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Cart</h2>
        {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty</p>
        ) : (
            <ul className="space-y-3 mb-4">
            {cart.map((item, index) => (
                <li key={index} className="flex justify-between items-center border-b pb-2">
                <span >{item.name}</span>
                <div className="flex items-center gap-2">
                    <span className="text-gray-700">₦{item.price.toLocaleString()}</span>
                    <button
                    onClick={() => removeFromCart(index)}
                    className="text-red-600 hover:underline text-sm"
                    >
                    Remove
                    </button>
                </div>
                </li>
            ))}
            </ul>
        )}

        <div className="mb-4">
            <p className="font-semibold text-gray-800">Total: ₦{total.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Wallet Balance: ₦{wallet.toLocaleString()}</p>
        </div>

        <button
            onClick={handlePayment}
            disabled={cart.length === 0}
            className="w-full bg-orange-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-300"
        >
            Pay with Wallet
        </button>
        </div>
    </div>
</div>

); }