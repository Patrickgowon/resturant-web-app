import React,{useState} from "react"; 
import { FaUtensils, FaUsers, FaChartBar, FaCog, FaShoppingCart } from "react-icons/fa";
import {Link} from "react-router-dom";
import OrdersPage from "./order";
import MenuPage from "./menu";
import CustomerPage from "./customer";
import AnalyticsPage from "./analystic";
import SettingsPage from "./settings";
import Header from "../admincomponent/header";

const Dashboard = () => {
    const [data, setData] = useState(1);

     return ( 
     <div className="min-h-screen flex bg-gray-100 ">
        <Header/>
        <aside className="w-64 bg-white mt-25 shadow-lg fixed   h-[100vh] hidden md:block"> 
            <div className="p-4 text-2xl font-bold text-gray-800  ">Admin Panel</div> 
            <nav className="p-4 text-gray-700 space-y-4"> 
                <Link onClick={() =>setData(1)} className="flex items-center gap-3 p-2 hover:bg-red-100 rounded"><FaShoppingCart /> Dashboard </Link> 
                <Link onClick={() =>setData(2)}  className="flex items-center gap-3 p-2 hover:bg-red-100 rounded"><FaShoppingCart /> Orders </Link> 
                <Link onClick={() =>setData(3)} className="flex items-center gap-3 p-2 hover:bg-red-100 rounded"><FaUtensils /> Menu </Link>
                <Link onClick={() =>setData(4)} className="flex items-center gap-3 p-2 hover:bg-red-100 rounded"><FaUsers /> Customers </Link> 
                <Link onClick={() =>setData(5)} className="flex items-center gap-3 p-2 hover:bg-red-100 rounded"><FaChartBar /> Analytics </Link>
                <Link onClick={() =>setData(6)} className="flex items-center gap-3 p-2 hover:bg-red-100 rounded"><FaCog /> Settings </Link> 
            </nav> 
        </aside>


        <main className="flex-2 p-6 mt-17 md:ml-63 ml-0 ">

            <div className={data == 1 ?"" : "hidden"}>
                <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                <div className="bg-red-500 text-white px-4 py-2 rounded shadow">Admin</div>
                </div> 
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-4 shadow-md">
                    <h2 className="text-lg font-semibold mb-2">Total Orders</h2>
                    <p className="text-2xl font-bold">123</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md">
                    <h2 className="text-lg font-semibold mb-2">Total Customers</h2>
                    <p className="text-2xl font-bold">58</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md">
                    <h2 className="text-lg font-semibold mb-2">Total Revenue</h2>
                    <p className="text-2xl font-bold">₦42,000</p>
                </div>
                </div>
            </div>
            <section className="">
                {data == 2 && <OrdersPage/>}
                {data == 3 && <MenuPage/>}
                {data == 4 && <CustomerPage/>}
                {data == 5 && <AnalyticsPage/>}
                {data == 6 && <SettingsPage/>}
            </section>
        </main>
    </div>

); };

export default Dashboard;