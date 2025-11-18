import React, { useState } from "react";
import Headfood from "../component/headfood";
import axios from "axios"; // ✅ Add this line
import { useNavigate } from "react-router-dom";

const Loginfood = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
const data = localStorage.getItem('email')
  if(data){
  navigate('/menu2')
  }


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
    console.log("User Information:", formData);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login", 
        formData,
        { withCredentials: true }
      );

      if (response.status == 200) {
        localStorage.setItem('email', response.data.user.email)
        console.log("Backend Response:", response.data);
        //redirect..
        navigate('/menu2')
      }

      
      
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed");
    }
  };

  

  return (
    <div className="sm:mt-8 mt-0 flex items-center justify-center min-h-screen bg-gray-100">
      <Headfood />
      <div className="bg-white mx-3 sm:p-8 p-3 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="sm:text-3xl text-2xl font-bold text-center text-red-500 mb-6">
          FoodiesHub Login
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full border border-gray-300 px-4 sm:py-2 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
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
            className="w-full bg-red-500 text-white sm:py-2 py-1 rounded-lg hover:bg-red-600 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="#" className="text-red-500 hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Loginfood;
