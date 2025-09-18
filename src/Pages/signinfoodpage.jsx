import React, { useState } from "react";
import Headfood from "../component/headfood";
import axios from "axios";

const SignInfood = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload
    console.log("Signup Information:", formData);

    try {
      const response = await axios.post(
        "http://localhost:5000/register", 
        formData,
        { withCredentials: true }
      );

      console.log("Backend Response:", response.data);
      alert("Signup successful!");
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Signup failed, check console for details.");
    }
  };

  return (
    <div className="sm:mt-8 mt-0 min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Headfood />
      <div className="bg-white sm:p-8 p-3 rounded-xl shadow-md w-full max-w-md">
        <h2 className="sm:text-3xl text-2xl font-bold text-center text-red-500 mb-6">
          Sign Up
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <a href="#" className="text-red-500 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white sm:py-2 p-1 rounded-lg hover:bg-red-600 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <a href="#" className="text-red-500 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignInfood;
