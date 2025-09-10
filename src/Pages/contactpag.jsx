import React from 'react';
import Headfood from '../component/headfood';

const Contactfood = () => {
  return (
    <div className="bg-white text-gray-800 mt-18">
      <Headfood/>
      
      <section className="bg-red-500 text-white py-16 text-center">
        <h1 className="sm:text-4xl text-2xl font-bold">Contact Us</h1>
        <p className="mt-2 text-lg">We’d love to hear from you</p>
      </section>

      
      <section className="py-14 px-3 max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        
        <div>
          <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>
          <p className="mb-4 text-gray-600">Have questions, suggestions, or feedback? Reach out to us!</p>
          <ul className="text-gray-700 space-y-4">
            <li>
              <strong>📍 Address:</strong> 123 Food Street, Taste City, Nigeria
            </li>
            <li>
              <strong>📞 Phone:</strong> +234 806 153 3994
            </li>
            <li>
              <strong>📧 Email:</strong> hello@foodieshub.com
            </li>
            <li>
              <strong>🕒 Hours:</strong> Mon - Sun: 9am - 10pm
            </li>
          </ul>
        </div>

        
        <form className="space-y-6 ">
          <div>
            <label className="block mb-1 font-semibold">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Message</label>
            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-red-500 text-white sm:px-6 px-3 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Send Message
          </button>
        </form>
      </section>

      
      <section className="px-3 pb-15 max-w-6xl mx-auto">
        <iframe
          title="Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126746.1574323133!2d7.3963896!3d9.05785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0b74c2ffb9a5%3A0xb2eb505d6bbda3a3!2sAbuja!5e0!3m2!1sen!2sng!4v1687033300095!5m2!1sen!2sng"
          className="w-full h-64 rounded-lg border-0"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </section>

      
      <footer className="bg-gray-800 text-white text-center py-6">
        <p>&copy; 2025 FoodiesHub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Contactfood;