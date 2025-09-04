"use client";
import React, { useState } from 'react';
import Image from 'next/image';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center">
                            <Image
                              className="dark:invert"
                              src="/images/logo.png"
                              alt="Logo"
                              width={200}
                              height={44}
                              priority
                            />
          </div>
          
          <h2 className="text-4xl font-bold text-blue-900 mb-4">NA KONTAKTONI</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Jemi këtu për t&#39;ju ndihmuar! Plotësoni formularin më poshtë ose përdorni 
            detajet tona të kontaktit.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Contact Form */}
            <div className="p-8 lg:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Emri i Plotë
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    placeholder="Shkruani emrin tuaj të plotë"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Adresa e Email-it
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    placeholder="email@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Numri i Telefonit
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    placeholder="+355 XX XXX XXX"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Mesazhi Juaj
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-none"
                    placeholder="Shkruani mesazhin tuaj këtu..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-800 transition duration-200 transform hover:scale-105"
                >
                  DËRGO
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="bg-blue-900 p-8 lg:p-12 text-white">
              <h3 className="text-2xl font-bold mb-8">DETAJET E KONTAKTIT</h3>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 mt-1">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">Adresa:</p>
                    <p>Rruga &quot;Dëshmorët e Kombit&quot;</p>
                    <p>Nr. 15 Tiranë, Shqipëri</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 mt-1">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">Email:</p>
                    <p>info@fortesa.al</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 mt-1">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">Telefoni:</p>
                    <p>+355 42 123 456</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4">
                <div className="w-full h-48 rounded-lg overflow-hidden">
                  <iframe
                    title="Google Map Tirana Albania"
                    src="https://www.google.com/maps?q=Tirana,Albania&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-900" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="font-semibold text-blue-900 mb-2">Orari i Punës</h4>
              <p className="text-gray-600 text-sm">E Hënë - E Premte: 08:00 - 18:00</p>
              <p className="text-gray-600 text-sm">E Shtunë: 09:00 - 14:00</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-900" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <h4 className="font-semibold text-blue-900 mb-2">Emergjenca 24/7</h4>
              <p className="text-gray-600 text-sm">Për emergjenca dhe situata urgjente</p>
              <p className="text-blue-900 font-semibold">+355 69 XXX XXX</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-900" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <h4 className="font-semibold text-blue-900 mb-2">Përgjigje e Shpejtë</h4>
              <p className="text-gray-600 text-sm">Përgjigje brenda 24 orëve</p>
              <p className="text-gray-600 text-sm">për të gjitha kërkesat</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;