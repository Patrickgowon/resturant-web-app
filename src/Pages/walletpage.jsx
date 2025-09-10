import React, { useState } from "react";
import Headfood from "../component/headfood";

const WalletPage = () => { const [balance, setBalance] = useState(5000); const [amount, setAmount] = useState(""); const [selectedFood, setSelectedFood] = useState(""); const [transactions, setTransactions] = useState([ { id: 1, type: "Deposit", amount: 2000, date: "2025-06-01" }, { id: 2, type: "Order", amount: -1000, date: "2025-06-10" }, ]);

const menuItems = [ { name: "Jollof Rice", price: 1500 }, { name: "Egusi Soup", price: 2000 }, { name: "Fried Rice & Chicken", price: 2500 }, { name: "Pounded Yam & Ogbono", price: 1800 }, ];

const handleDeposit = () => { const value = parseInt(amount); if (!value || value <= 0) return alert("Enter a valid amount"); const newBalance = balance + value; setBalance(newBalance); setTransactions([ { id: transactions.length + 1, type: "Deposit", amount: value, date: new Date().toISOString().split("T")[0] }, ...transactions, ]); setAmount(""); };

const handleWithdraw = () => { const value = parseInt(amount); if (!value || value <= 0) return alert("Enter a valid amount"); if (value > balance) return alert("Insufficient balance"); const newBalance = balance - value; setBalance(newBalance); setTransactions([ { id: transactions.length + 1, type: "Withdraw", amount: -value, date: new Date().toISOString().split("T")[0] }, ...transactions, ]); setAmount(""); };

const handleOrder = () => { const item = menuItems.find((item) => item.name === selectedFood); if (!item) return alert("Select a food item"); if (item.price > balance) return alert("Insufficient balance to order this food");

const newBalance = balance - item.price;
setBalance(newBalance);
setTransactions([
  {
    id: transactions.length + 1,
    type: Order (`${item.name}`),
    amount: -item.price,
    date: new Date().toISOString().split("T")[0],
  },
  ...transactions,
]);
setSelectedFood("");
alert("You have successfully ordered" `${item.name}!`);

};

return (
<div className="min-h-screen bg-gray-50 mt-18 ">
        <Headfood/> 
     <div className="mt-20">
        <div className=" mx-3 max-w-xl sm:mx-auto bg-white shadow-md rounded-lg p-6 space-y-8"> <h1 className="text-2xl font-bold text-gray-800">My Wallet</h1>

            <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-1">Balance:</h2>
            <p className="sm:text-3xl text-2xl font-bold text-green-600">₦{balance.toLocaleString()}</p>
            </div>

            <div>
            <label className="block text-gray-700 font-semibold mb-1">Enter Amount</label>
            <div className="flex gap-2 flex-wrap">
                <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="flex-1 p-2 border rounded h-8"
                />
                <button
                onClick={handleDeposit}
                className="bg-blue-600 text-white sm:px-4 px-2 sm:py-2 py-1 text-sm rounded hover:bg-blue-700"
                >
                Deposit
                </button>
                <button
                onClick={handleWithdraw}
                className="bg-red-600 sm:px-4 px-2 sm:py-2 py-1 text-white text-sm rounded hover:bg-red-700"
                >
                Withdraw
                </button>
            </div>
            </div>

            <div className="bg-gray-100 p-4 rounded">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Order Food Directly</h2>
            <div className="flex gap-2 flex-wrap items-center">
                <select
                value={selectedFood}
                onChange={(e) => setSelectedFood(e.target.value)}
                className="flex-1 p-2 border rounded w-30 sm:text-sm text-xs  h-8"
                >
                <option value="">Select a food item</option>
                {menuItems.map((item, index) => (
                    <option key={index} value={item.name}>
                    {item.name} - ₦{item.price}
                    </option>
                ))}
                </select>
                <button
                onClick={handleOrder}
                className="bg-green-600 sm:px-4 px-2 sm:py-2 py-1 text-white text-sm rounded hover:bg-green-700"
                >
                Order Now
                </button>
            </div>
            </div>

            <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Transaction History</h2>
            <ul className="space-y-2 max-h-60 overflow-y-auto">
                {transactions.map((tx) => (
                <li
                    key={tx.id}
                    className="flex justify-between items-center border-b pb-2 text-sm"
                >
                    <span>{tx.type}</span>
                    <span className={tx.amount > 0 ? "text-green-600" : "text-red-500"}>
                    {tx.amount > 0 ? "+" : ""}₦{Math.abs(tx.amount).toLocaleString()}
                    </span>
                    <span className="text-gray-500 text-xs">{tx.date}</span>
                </li>
                ))}
            </ul>
            </div>
        </div>
     </div>
</div>

); };

export default WalletPage;