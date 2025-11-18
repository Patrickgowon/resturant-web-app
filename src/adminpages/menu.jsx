import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../admincomponent/header";

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    description: ""
  });
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // ✅ Load menu items from backend
  useEffect(() => {
    const fetchMenu = async () => {
      try {
      const res = await axios.get("http://localhost:5000/api/menu");

    setMenuItems(Array.isArray(res.data.menu) ? res.data.menu : []);

      } catch (err) {
        console.error("Error fetching menu:", err);
      }
    };
    fetchMenu();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  // ✅ Add item (POST)
  const handleAddItem = async () => {
    if (!newItem.name || !newItem.price || !newItem.category) {
      alert("Please fill in all required fields");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/menu", newItem);
      const addedMenu = Array.isArray(res.data.menu)
        ? res.data.menu
        : [res.data.menu];
      setMenuItems([...menuItems, ...addedMenu]);

      setNewItem({ name: "", price: "", category: "", image: "", description: "" });
      alert("Menu item added successfully!");
    } catch (err) {
      console.error("Error adding item:", err);
      alert("Failed to add item");
    }
  };

  // ✅ Edit item
  const handleEditItem = (item) => {
    setEditingItem(item);
    setNewItem({
      name: item.name,
      price: item.price,
      category: item.category,
      image: item.image,
      description: item.description || ""
    });
  };

  // ✅ Update item (PUT)
  const handleUpdateItem = async () => {
    if (!newItem.name || !newItem.price || !newItem.category) {
      alert("Please fill in all required fields");
      return;
    }
    try {
      const res = await axios.put(`http://localhost:5000/api/menu/${editingItem._id}`, newItem);
      const updatedMenu = Array.isArray(res.data.menu)
        ? res.data.menu[0]
        : res.data.menu;
      setMenuItems(menuItems.map((item) => 
        item._id === editingItem._id ? updatedMenu : item
      ));

      setEditingItem(null);
      setNewItem({ name: "", price: "", category: "", image: "", description: "" });
      alert("Menu item updated successfully!");
    } catch (err) {
      console.error("Error updating item:", err);
      alert("Failed to update item");
    }
  };

  // ✅ Delete item (DELETE)
  const handleDelete = async (id) => {
    
    if (window.confirm("Are you sure you want to delete this menu item?")) {
      try {
        await axios.delete(`http://localhost:5000/api/menu/${id}`);
        setMenuItems(menuItems.filter((item) => item._id !== id));
      } catch (err) {
        console.error("Error deleting item:", err);
      }
    }
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setNewItem({ name: "", price: "", category: "", image: "", description: "" });
  };

  // ✅ Category + Search filter
  const categories = ["all", ...new Set(menuItems.map((item) => item.category))];
  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Menu Management</h1>
              <p className="text-gray-600 mt-2">Add, edit, and manage your restaurant menu items</p>
            </div>
            <div className="flex items-center gap-4 mt-4 lg:mt-0">
              <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                {filteredItems.length} items
              </span>
            </div>
          </div>

          {/* Add/Edit Item Form */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {editingItem ? `Edit ${editingItem.name}` : "Add New Menu Item"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Item name"
                  value={newItem.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
                <input
                  type="text"
                  name="price"
                  placeholder="₦0.00"
                  value={newItem.price}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                <select
                  name="category"
                  value={newItem.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="">Select category</option>
                  <option value="AllProduct">All product</option>
                  <option value="BreakFast">BreakFast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Drink">Drinks</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                <input
                  type="text"
                  name="image"
                  placeholder="https://example.com/image.jpg"
                  value={newItem.image}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                placeholder="Describe the item, ingredients, etc."
                value={newItem.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div className="flex gap-3">
              {editingItem ? (
                <>
                  <button
                    onClick={handleUpdateItem}
                    className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-150 font-medium flex items-center gap-2"
                  >
                    Update Item
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-150 font-medium"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={handleAddItem}
                  className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-150 font-medium flex items-center gap-2"
                >
                  Add Item
                </button>
              )}
            </div>
          </div>

          {/* Search + Filter */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search menu items..."
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-full md:w-48">
                <select
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Items Grid */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {filteredItems.length === 0 ? (
              <div className="text-center py-12 text-gray-500">No menu items found</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {filteredItems.map((item) => (
                  <div key={item._id} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
                    <div className="aspect-w-16 aspect-h-9 bg-gray-200 overflow-hidden">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                      ) : (
                        <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">No Image</div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 truncate flex-1 mr-2">{item.name}</h3>
                        <span className="text-lg font-bold text-orange-600 whitespace-nowrap">{item.price}</span>
                      </div>
                      <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full mb-2">{item.category}</span>
                      {item.description && <p className="text-gray-600 text-sm mb-4">{item.description}</p>}
                      <div className="flex justify-between items-center">
                        <button onClick={() => handleEditItem(item)} className="text-blue-600 font-medium">Edit</button>
                        <button onClick={() => handleDelete(item._id)} className="text-red-600 font-medium">Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
