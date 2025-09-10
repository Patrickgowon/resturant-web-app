import React, { useState } from "react";
import Header from "../admincomponent/header";

const CustomerPage = () => {
     const [customers, setCustomers] = useState([ 
        { id: 1, name: "Patrick Gowon", email: "Patrickgown.com", address: "123 Main Street, Lagos", }, 
        { id: 2, name: "Godwin Mangai", email: "Godwin.com", address: "45 Allen Avenue, Abuga", }, 
        { id: 2, name: "Godwin Mangai", email: "Godwin.com", address: "45 Allen Avenue, Abuga", }, 
    ]);

const [newCustomer, setNewCustomer] = useState({ name: "", email: "", address: "", });

const [editingCustomer, setEditingCustomer] = useState(null);

const handleChange = (e) => { const { name, value } = e.target; 
    setNewCustomer({ ...newCustomer, [name]: value }); 
};

const handleAddCustomer = () => {
     if (editingCustomer !== null) {
         setCustomers( customers.map((customer) => customer.id === editingCustomer ? { ...customer, ...newCustomer } : customer ) ); 
         setEditingCustomer(null); 

    } else { const id = customers.length + 1; 
    setCustomers([...customers, { id, ...newCustomer }]); 
} 
    setNewCustomer({ name: "", email: "", address: "" }); };

const handleEdit = (customer) => {
     setNewCustomer({ name: customer.name, email: customer.email, address: customer.address, }); 
     setEditingCustomer(customer.id); 
};

const handleDelete = (id) => { setCustomers(customers.filter((customer) => customer.id !== id)); };

return ( 
<div className="min-h-screen bg-gray-50 mt-16 ">
  <Header/> 
  <h1 className="sm:text-3xl text-1xl ml-3 font-bold text-gray-800 mb-2">Customers</h1>


  <div className="bg-white shadow-md rounded-lg p-4 mb-8 mx-3">
    <h2 className="text-xl font-semibold text-gray-700 mb-4">
      {editingCustomer !== null ? "Edit Customer" : "Add New Customer"}
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={newCustomer.name}
        onChange={handleChange}
        className="p-2 border rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={newCustomer.email}
        onChange={handleChange}
        className="p-2 border rounded"
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={newCustomer.address}
        onChange={handleChange}
        className="p-2 border rounded"
      />
    </div>
    <button
      onClick={handleAddCustomer}
      className="mt-4 bg-green-600 text-sm text-white sm:px-4 px-2 sm:py-2 py-1 rounded hover:bg-green-700"
    >
      {editingCustomer !== null ? "Update Customer" : "Add Customer"}
    </button>
  </div>

  
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-3">
    {customers.map((customer) => (
      <div
        key={customer.id}
        className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition duration-300"
      >
        <h2 className="sm:text-xl text-sm font-semibold text-gray-800">
          {customer.name}
        </h2>
        <p className="text-sm text-gray-600">{customer.email}</p>
        <p className="text-sm text-gray-600 mb-3">{customer.address}</p>
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(customer)}
            className="px-3 py-1 bg-yellow-400 text-white text-sm rounded hover:bg-yellow-500"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(customer.id)}
            className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

); };

export default CustomerPage;