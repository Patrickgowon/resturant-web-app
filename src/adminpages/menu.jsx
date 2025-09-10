import React, { useState } from "react";
import Header from "../admincomponent/header";

const MenuPage = () => {
     const [menuItems, setMenuItems] = useState([
         { id: 1, name: "Jollof Rice", price: "₦1500", category: "Main Dish", image: "https://cdn.pixabay.com/photo/2015/04/08/13/13/food-712665_1280.jpg", }, 
         { id: 2, name: "Amala & Ewedu", price: "₦1200", category: "Main Dish", image: "https://cdn.pixabay.com/photo/2015/04/08/13/13/food-712665_1280.jpg", }, 
         { id: 3, name: "Fried Plantain", price: "₦500", category: "Side", image: "https://cdn.pixabay.com/photo/2015/04/08/13/13/food-712665_1280.jpg", }, 
        ]);

const [newItem, setNewItem] = useState({ name: "", price: "", category: "", image: "", });

const handleChange = (e) => { const { name, value } = e.target; setNewItem({ ...newItem, [name]: value }); };

const handleAddItem = () => { const id = menuItems.length + 1; setMenuItems([...menuItems, { id, ...newItem }]); setNewItem({ name: "", price: "", category: "", image: "" }); };

const handleDelete = (id) => { setMenuItems(menuItems.filter((item) => item.id !== id)); };

return ( 
<div className="min-h-screen bg-gray-100 mt-16"> 
<Header/>
<h1 className="ml-3 sm:text-3xl text-1xl font-bold text-gray-800 mb-2  ">Menu</h1>

  <div className="bg-white mx-3 shadow-md rounded-lg p-4 mb-8">
    <h2 className="sm:text-xl text-sm font-semibold text-gray-700 mb-4">Add New Menu Item</h2>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={newItem.name}
        onChange={handleChange}
        className="p-2 border rounded"
      />
      <input
        type="text"
        name="price"
        placeholder="Price"
        value={newItem.price}
        onChange={handleChange}
        className="p-2 border rounded"
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={newItem.category}
        onChange={handleChange}
        className="p-2 border rounded"
      />
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={newItem.image}
        onChange={handleChange}
        className="p-2 border rounded"
      />
    </div>
    <button
      onClick={handleAddItem}
      className="mt-4 bg-orange-600 text-white sm:px-4 px-2 sm:py-2 py-1 text-sm rounded hover:bg-orange-700"
    >
      Add Item
    </button>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-3">
    {menuItems.map((item) => (
      <div
        key={item.id}
        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl t font-semibold text-gray-800 mb-1 ">
            {item.name}
          </h2>
          <p className="text-sm text-gray-500 mb-2">{item.category}</p>
          <p className="text-lg font-bold text-orange-600 mb-2">{item.price}</p>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 bg-yellow-400 text-white text-sm rounded hover:bg-yellow-500"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(item.id)}
              className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

); };

export default MenuPage;