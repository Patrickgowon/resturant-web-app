import React, { useState, useEffect } from "react";
import Header from "../admincomponent/header";
import axios from "axios";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders");
      if (res.data.success) {
       // console.log("the response is", res.data.orders);
        setOrders(res.data.orders);
      }
      console.log(res);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const markAsDelivered = async (_id) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${id}`, {
        status: "Delivered",
      });
      fetchOrders();
    } catch (err) {
      console.error("Error updating order:", err);
    }
  };

  const deleteOrder = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      console.log(id);
      try {
        await axios.delete(`http://localhost:5000/api/orders/${id}`);
        fetchOrders();
      } catch (err) {
        console.error("Error deleting order:", err);
      }
    }
  };

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  // Filter orders based on search and status
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.item?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer?.number?.includes(searchTerm);
    
    const matchesStatus = 
      statusFilter === "all" || order.status?.toLowerCase() === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
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
              <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
              <p className="text-gray-600 mt-2">
                Manage and track customer orders
              </p>
            </div>
            <div className="flex items-center gap-4 mt-4 lg:mt-0">
              <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                {filteredOrders.length} orders
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
                    placeholder="Search orders by customer, meal, or phone..."
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
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm || statusFilter !== "all" 
                    ? "Try adjusting your search or filter" 
                    : "Get started by creating a new order"}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order Details
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {order.item?.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              ₦{order.item?.price?.toLocaleString()}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {order.customer?.name || "N/A"}
                            </div>
                            <div className="text-sm text-gray-500">
                              {order.customer?.number || "N/A"}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.paymentMethod || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(order.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => viewOrderDetails(order)}
                              className="text-blue-600 hover:text-blue-900 transition-colors duration-150"
                            >
                              View
                            </button>
                            {order.status === "Pending" && (
                              <button
                                onClick={() => markAsDelivered(order.id)}
                                className="text-green-600 hover:text-green-900 transition-colors duration-150"
                              >
                                Deliver
                              </button>
                            )}
                            <button
                              onClick={() => deleteOrder(order.id)}
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

      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Order Details</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-150"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Meal Information</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-medium">{selectedOrder.item?.name}</p>
                    <p className="text-gray-600">₦{selectedOrder.item?.price?.toLocaleString()}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Customer Details</h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <p><span className="font-medium">Name:</span> {selectedOrder.customer?.name || "N/A"}</p>
                    <p><span className="font-medium">Phone:</span> {selectedOrder.customer?.number || "N/A"}</p>
                    <p><span className="font-medium">Address:</span> {selectedOrder.customer?.address || "N/A"}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Payment Method</h4>
                    <p className="text-gray-600">{selectedOrder.paymentMethod || "N/A"}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Order Date</h4>
                    <p className="text-gray-600">{formatDate(selectedOrder.createdAt)}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Status</h4>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
              </div>

              <div className="flex space-x-3 mt-8">
                {selectedOrder.status === "Pending" && (
                  <button
                    onClick={() => {
                      markAsDelivered(selectedOrder._id);
                      setShowModal(false);
                    }}
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-150 font-medium"
                  >
                    Mark as Delivered
                  </button>
                )}
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

export default OrdersPage;