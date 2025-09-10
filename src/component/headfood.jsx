import React, {useState} from "react";
import {Link} from 'react-router-dom';
import {FaAddressCard} from "react-icons/fa";
import {Menu, X} from 'lucide-react'

const Navs = () => {
    return (
        <>
            <Link to={'/menu2'} className="hover:text-red-500">Menu</Link>
            <Link to={'/'} className="hover:text-red-500">Home</Link>
            <Link to={'/ordercart'} className="hover:text-red-500">Order</Link>
            <Link to={'/about'} className="hover:text-red-500">About</Link>
            <Link to={'/cont'} className="hover:text-red-500">Contact</Link>
            <Link to={'/loginfood'} className="hover:text-red-500">Login</Link>
            <Link to={'/signfood'} className="hover:text-red-500">Signin</Link>
            <Link to={'/wallet'} className="hover:text-red-500">Wallet</Link>
            <Link to={'/admin'} className="hover:text-red-500 mt-1"><FaAddressCard/></Link>
            
        </>
    )
}
const Headfood = () =>{
    const [showMenu, setShowMenu] = useState(false);
    return(
        <div className=" fixed w-full  top-0 bg-white">
            <nav className="flex  justify-between items-center px-6 py-4 shadow-md ">
                <h1 className="text-1xl sm:text-2xl font-bold text-red-500">FoodiesHub</h1>
                <div className="relative sm:left-60 left-22">
                <Link  className="hover:text-red-500 md:hidden block  mt-1">{showMenu? <X onClick={() => setShowMenu(false)} /> : <Menu onClick={() => setShowMenu(true)} />}</Link>
                </div>
                <div className="">
                    <ul className="hidden md:flex gap-6 text-lg ">
                        <Navs />
                    </ul>

                     { showMenu && <ul className="md:hidden absolute z-50 bg-white p-3 top-17 left-0 flex flex-col gap-2 w-full justify-center text-1xl items-center">
                        <Navs />
                    </ul>}
                </div>
            </nav>
        </div>
    )
}
export default Headfood;