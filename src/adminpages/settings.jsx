import React, { useState } from "react";
import Header from "../admincomponent/header";

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    siteName: "My Foodie App",
    emailNotifications: true,
    theme: "light",
    role: "admin",
    password: "",
    confirmPassword: "",
    profilePhoto: null,
    photoPreview: null,
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name === "profilePhoto" && files.length > 0) {
      const file = files[0];
      setSettings((prev) => ({
        ...prev,
        profilePhoto: file,
        photoPreview: URL.createObjectURL(file),
      }));
    } else {
      setSettings((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (settings.password !== settings.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setSaving(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert("Settings saved successfully!");
      console.log(settings);
    } catch (error) {
      console.error("Error saving settings:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-2">
              Manage your account settings and preferences
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Navigation Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <nav className="space-y-2">
                  <button className="w-full text-left px-4 py-3 bg-orange-50 text-orange-700 rounded-lg font-medium border border-orange-200">
                    General
                  </button>
                  <button className="w-full text-left px-4 py-3 text-gray-600 hover:text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-150">
                    Security
                  </button>
                  <button className="w-full text-left px-4 py-3 text-gray-600 hover:text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-150">
                    Notifications
                  </button>
                  <button className="w-full text-left px-4 py-3 text-gray-600 hover:text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-150">
                    Appearance
                  </button>
                </nav>
              </div>
            </div>

            {/* Settings Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Profile Photo Section */}
                    <div className="border-b border-gray-200 pb-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Photo</h3>
                      <div className="flex items-center gap-8">
                        <div className="flex-shrink-0">
                          {settings.photoPreview ? (
                            <img
                              src={settings.photoPreview}
                              alt="Profile Preview"
                              className="w-20 h-20 rounded-full object-cover border-4 border-gray-100"
                            />
                          ) : (
                            <div className="w-20 h-20 rounded-full bg-gray-100 border-4 border-gray-100 flex items-center justify-center">
                              <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Upload new photo
                          </label>
                          <input
                            type="file"
                            name="profilePhoto"
                            accept="image/*"
                            onChange={handleChange}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                          />
                          <p className="text-xs text-gray-500 mt-2">
                            JPG, PNG, WEBP (Max 5MB)
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* General Settings */}
                    <div className="border-b border-gray-200 pb-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-6">General Settings</h3>
                      
                      <div className="grid grid-cols-1 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Site Name
                          </label>
                          <input
                            type="text"
                            name="siteName"
                            value={settings.siteName}
                            onChange={handleChange}
                            className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-150"
                            placeholder="Enter your site name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            User Role
                          </label>
                          <select
                            name="role"
                            value={settings.role}
                            onChange={handleChange}
                            className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-150"
                          >
                            <option value="admin">Administrator</option>
                            <option value="editor">Editor</option>
                            <option value="viewer">Viewer</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Theme
                          </label>
                          <select
                            name="theme"
                            value={settings.theme}
                            onChange={handleChange}
                            className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-150"
                          >
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                            <option value="auto">Auto (System)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Notifications */}
                    <div className="border-b border-gray-200 pb-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-6">Notifications</h3>
                      
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <label className="text-sm font-medium text-gray-900">
                            Email Notifications
                          </label>
                          <p className="text-sm text-gray-500 mt-1">
                            Receive email updates about your account activity
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="emailNotifications"
                            checked={settings.emailNotifications}
                            onChange={handleChange}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                        </label>
                      </div>
                    </div>

                    {/* Security */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-6">Security</h3>
                      
                      <div className="grid grid-cols-1 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            New Password
                          </label>
                          <input
                            type="password"
                            name="password"
                            value={settings.password}
                            onChange={handleChange}
                            className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-150"
                            placeholder="Enter new password"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            name="confirmPassword"
                            value={settings.confirmPassword}
                            onChange={handleChange}
                            className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-150"
                            placeholder="Confirm new password"
                          />
                        </div>

                        {settings.password && settings.confirmPassword && settings.password !== settings.confirmPassword && (
                          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-700 flex items-center gap-2">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                              Passwords do not match
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-6">
                      <button
                        type="button"
                        className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors duration-150 font-medium"
                        onClick={() => window.history.back()}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={saving}
                        className="flex-1 bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors duration-150 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {saving ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Saving...
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;