import React, { useState, useEffect } from "react";
import Header from "../admincomponent/header";
import axios from "axios";

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);

  
  const mockCustomers = [
    {
      _id: 1,
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+234 801 234 5678",
      address: "123 Main Street, Lagos",
      totalOrders: 15,
      totalSpent: "₦45,000",
      status: "active",
      joinDate: "2024-01-15T10:30:00Z",
      lastOrder: "2024-03-20T14:25:00Z"
    },
    {
      _id: 2,
      name: "Jane Smith",
      email: "jane.smith@email.com",
      phone: "+234 802 345 6789",
      address: "456 Oak Avenue, Abuja",
      totalOrders: 8,
      totalSpent: "₦28,500",
      status: "active",
      joinDate: "2024-02-10T08:15:00Z",
      lastOrder: "2024-03-18T11:45:00Z"
    }
  ];

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/users");
      
      console.log("API Response:", res.data); // Debug log
      
      // Handle different possible response structures
      let usersData = [];
      
      if (Array.isArray(res.data)) {
        
        usersData = res.data;
      } else if (res.data && Array.isArray(res.data.users)) {
       
        usersData = res.data.users;
      } else if (res.data && Array.isArray(res.data.data)) {
        
        usersData = res.data.data;
      } else if (res.data && res.data.success && Array.isArray(res.data.customers)) {
        
        usersData = res.data.customers;
      } else {
        console.warn("Unexpected API response structure, using mock data");
        usersData = mockCustomers;
      }

      // Map API data to match frontend structure
      const mappedCustomers = usersData.map(user => ({
        _id: user._id || user.id,
        name: user.name || 'Unknown',
        email: user.email || 'No email',
        // Add default values for missing fields
        phone: user.phone || 'Not provided',
        address: user.address || 'Address not available',
        totalOrders: user.totalOrders || 0,
        totalSpent: user.totalSpent || `₦0`,
        status: user.status || 'active',
        joinDate: user.joinDate || user.createdAt || new Date().toISOString(),
        lastOrder: user.lastOrder || user.updatedAt || new Date().toISOString()
      }));

      setCustomers(mappedCustomers);
      
    } catch (err) {
      console.error("Error fetching customers:", err);
      // Use mock data as fallback
      setCustomers(mockCustomers);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return "Invalid date";
    }
  };

  const toggleCustomerStatus = async (customerId, currentStatus) => {
    try {
      // Update backend - adjust endpoint as needed
      // await axios.put(`http://localhost:5000/api/users/${customerId}`, {
      //   status: currentStatus === "active" ? "inactive" : "active"
      // });
      
      // Update local state
      setCustomers(customers.map(customer => 
        customer._id === customerId 
          ? { ...customer, status: currentStatus === "active" ? "inactive" : "active" }
          : customer
      ));
    } catch (err) {
      console.error("Error updating customer:", err);
    }
  };

  const deleteCustomer = async (customerId) => {
    if (window.confirm("Are you sure you want to delete this customer? This action cannot be undone.")) {
      try {
        // Call backend API - adjust endpoint as needed
        // await axios.delete(`http://localhost:5000/api/users/${customerId}`);
        
        // Update local state
        setCustomers(customers.filter(customer => customer._id !== customerId));
      } catch (err) {
        console.error("Error deleting customer:", err);
      }
    }
  };

  const viewCustomerDetails = (customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  // Filter customers based on search and status
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch = 
      customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone?.includes(searchTerm);
    
    const matchesStatus = 
      statusFilter === "all" || customer.status?.toLowerCase() === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "inactive":
        return "bg-red-100 text-red-800 border-red-200";
      case "new":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "Active";
      case "inactive":
        return "Inactive";
      case "new":
        return "New Customer";
      default:
        return status || "Active";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
              <p className="text-gray-600 mt-2">
                Manage and view customer information
              </p>
            </div>
            <div className="flex items-center gap-4 mt-4 lg:mt-0">
              <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                {filteredCustomers.length} customers
              </span>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search customers by name, email, or phone..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <select
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="new">New</option>
                </select>
              </div>
            </div>
          </div>

          {/* Customers Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {filteredCustomers.length === 0 ? (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No customers found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm || statusFilter !== "all" 
                    ? "Try adjusting your search or filter" 
                    : "No customers have been added yet"}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Orders
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Spent
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Order
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCustomers.map((customer) => (
                      <tr key={customer._id} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {customer.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              Joined {formatDate(customer.joinDate)}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm text-gray-900">{customer.email}</div>
                            <div className="text-sm text-gray-500">{customer.phone}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {customer.totalOrders} orders
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                          {customer.totalSpent}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(customer.status)}`}>
                            {getStatusText(customer.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(customer.lastOrder)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => viewCustomerDetails(customer)}
                              className="text-blue-600 hover:text-blue-900 transition-colors duration-150"
                            >
                              View
                            </button>
                            <button
                              onClick={() => toggleCustomerStatus(customer._id, customer.status)}
                              className={`${
                                customer.status === "active" 
                                  ? "text-red-600 hover:text-red-900" 
                                  : "text-green-600 hover:text-green-900"
                              } transition-colors duration-150`}
                            >
                              {customer.status === "active" ? "Deactivate" : "Activate"}
                            </button>
                            <button
                              onClick={() => deleteCustomer(customer._id)}
                              className="text-red-600 hover:text-red-900 transition-colors duration-150"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Customer Details Modal */}
      {showModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Customer Details</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-150"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Personal Information</h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Full Name:</span>
                      <span className="text-gray-900">{selectedCustomer.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Email:</span>
                      <span className="text-gray-900">{selectedCustomer.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Phone:</span>
                      <span className="text-gray-900">{selectedCustomer.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Address:</span>
                      <span className="text-gray-900 text-right">{selectedCustomer.address}</span>
                    </div>
                  </div>
                </div>

                {/* Order Statistics */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Order Statistics</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-orange-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-orange-600">{selectedCustomer.totalOrders}</div>
                      <div className="text-sm text-orange-700">Total Orders</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">{selectedCustomer.totalSpent}</div>
                      <div className="text-sm text-green-700">Total Spent</div>
                    </div>
                  </div>
                </div>

                {/* Activity Information */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Activity</h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Member Since:</span>
                      <span className="text-gray-900">{formatDate(selectedCustomer.joinDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Last Order:</span>
                      <span className="text-gray-900">{formatDate(selectedCustomer.lastOrder)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Status:</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(selectedCustomer.status)}`}>
                        {getStatusText(selectedCustomer.status)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 mt-8">
                <button
                  onClick={() => {
                    toggleCustomerStatus(selectedCustomer._id, selectedCustomer.status);
                    setShowModal(false);
                  }}
                  className={`flex-1 ${
                    selectedCustomer.status === "active" 
                      ? "bg-red-500 hover:bg-red-600" 
                      : "bg-green-500 hover:bg-green-600"
                  } text-white py-2 px-4 rounded-lg transition-colors duration-150 font-medium`}
                >
                  {selectedCustomer.status === "active" ? "Deactivate Customer" : "Activate Customer"}
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-150 font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomersPage;