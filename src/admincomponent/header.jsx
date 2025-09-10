import React, {useState} from "react";
import {Link} from 'react-router-dom';
import { FaUtensils, FaUsers, FaChartBar, FaCog, FaShoppingCart } from "react-icons/fa";
import {Menu, X} from 'lucide-react'


 
 const Header = () =>{
    const [showMenu, setShowMenu] = useState(false);
    return(
        <div className=" fixed w-full  top-0 bg-white">
            <nav className="flex  justify-between items-center px-6 py-4 shadow-md ">
                <h1 className="sm:text-2xl text-1xl font-bold text-red-500">FoodiesHub</h1>
                <Link  className="hover:text-red-500 md:hidden block sm:left-60 left-22 relative mt-1">{showMenu? <X onClick={() => setShowMenu(false)} /> : <Menu onClick={() => setShowMenu(true)} />}</Link>
                <div className="">
                    <ul className="hidden md:flex gap-6 text-lg ">
                      <Menu/> 
                    </ul>
                    

                     { showMenu && <ul className={ "md:hidden absolute z-100 bg-white p-3 top-16  left-0 flex flex-col gap-2 w-full justify-center items-center"}>
                     <div>
                        <Link to={'/admin'} className="flex items-center gap-3 p-2 hover:bg-red-100 rounded"><FaShoppingCart /> Dashboard </Link> 
                        <Link to={'/order'}  className="flex items-center gap-3 p-2 hover:bg-red-100 rounded"><FaShoppingCart /> Orders </Link> 
                        <Link to={'/menu'} className="flex items-center gap-3 p-2 hover:bg-red-100 rounded"><FaUtensils /> Menu </Link>
                        <Link to={'/customer'} className="flex items-center gap-3 p-2 hover:bg-red-100 rounded"><FaUsers /> Customers </Link> 
                        <Link to={'/analystic'} className="flex items-center gap-3 p-2 hover:bg-red-100 rounded"><FaChartBar /> Analytics </Link>
                        <Link to={'/setting'} className="flex items-center gap-3 p-2 hover:bg-red-100 rounded"><FaCog /> Settings </Link> 
                    </div>
                    </ul>}
                    
                   
                </div>
                
                 
                
            </nav>
            
        </div>
    )
}
export default Header;