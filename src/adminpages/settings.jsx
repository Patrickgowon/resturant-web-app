import React, { useState } from "react";
import Header from "../admincomponent/header";

const SettingsPage = () => { 
    const [settings, setSettings] = useState({ siteName: "My Foodie App", 
    emailNotifications: true, 
    theme: "light", role: "admin", 
    password: "", 
    confirmPassword: "", 
    profilePhoto: null, 
    photoPreview: null, });

const handleChange = (e) => { 
    const { name, value, type, checked, files } = e.target; if (name === "profilePhoto" && files.length > 0) { const file = files[0]; setSettings((prev) => ({ ...prev, profilePhoto: file, photoPreview: URL.createObjectURL(file), })); } else { setSettings((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value, })); } };

const handleSubmit = (e) => { e.preventDefault(); if (settings.password !== settings.confirmPassword) { alert("Passwords do not match!"); return; } alert("Settings saved successfully!"); console.log(settings); };

return ( 
<div className="min-h-screen bg-gray-100 mt-13">
  <Header/> 
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow"> 
    <h1 className="sm:text-2xl text-1xl font-bold mb-4 text-gray-800">Settings</h1> 
    <form onSubmit={handleSubmit} className="space-y-5"> 
    <div className="flex flex-col items-center"> {settings.photoPreview && ( <img
    src={settings.photoPreview}
    alt="Profile Preview"
    className="w-24 h-24 rounded-full mb-2 object-cover"
    /> 
    )} 

    <label className="block text-gray-700 font-semibold mb-1">Profile Photo</label>
    <input
    type="file"
    name="profilePhoto"
    accept="image/*"
    onChange={handleChange}
    className="w-full p-2 border rounded sm:text-sm text-xs"
    /> 
</div>

        <div>
            <label className="block text-gray-700 font-semibold mb-1">Site Name</label>
                <input
                type="text"
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
                className="w-full p-2 border rounded sm:text-sm text-xs"
                />
        </div>

      <div>
            <label className="flex items-center gap-3 text-gray-700 font-semibold">
                <input
                    type="checkbox"
                    name="emailNotifications"
                    checked={settings.emailNotifications}
                    onChange={handleChange}
                />
                Enable Email Notifications
            </label>
      </div>

      <div>
            <label className="block text-gray-700 font-semibold mb-1">Theme</label>
            <select
                name="theme"
                value={settings.theme}
                onChange={handleChange}
                className="w-full p-2 border rounded sm:text-sm text-xs"
                >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            </select>
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-1">User Role</label>
            <select
                name="role"
                value={settings.role}
                onChange={handleChange}
                className="w-full p-2 border rounded sm:text-sm text-xs"
                >
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
            </select>
      </div>

      <div>
            <label className="block text-gray-700 font-semibold mb-1">New Password</label>
            <input
            type="password"
            name="password"
            value={settings.password}
            onChange={handleChange}
            className="w-full p-2 border rounded sm:text-sm text-xs"
            />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-1">Confirm Password</label>
            <input
            type="password"
            name="confirmPassword"
            value={settings.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 border rounded sm:text-sm text-xs"
            />
        </div>

      <button
        type="submit"
        className="bg-orange-600 text-sm text-white sm:px-4 px-2 sm:py-2 py-1 rounded hover:orange-800"
      >
        Save Settings
      </button>
    </form>
  </div>
</div>

); };

export default SettingsPage;