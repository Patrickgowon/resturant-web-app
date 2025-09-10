import React from "react";
import Headfood from "../component/headfood";

const Loginfood = () => {
  return (
    <div className=" sm:mt-8 mt-0 flex items-center justify-center min-h-screen bg-gray-100 ">
      <Headfood/>
      <div className="bg-white mx-3 sm:p-8 p-3 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="sm:text-3xl text-2xl font-bold text-center text-red-500 mb-6">
          FoodiesHub Login
        </h2>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder=""
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
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
            <a href="#" className="text-red-500 hover:underline">Forgot password?</a>
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
          <a href="#" className="text-red-500 hover:underline">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Loginfood;