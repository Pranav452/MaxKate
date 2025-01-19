'use client';

import Link from "next/link";
import { Orbitron, Rajdhani } from 'next/font/google';
import { useState } from 'react';

const orbitron = Orbitron({ subsets: ['latin'] });
const rajdhani = Rajdhani({ subsets: ['latin'], weight: ['500'] });

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-sm z-50 border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className={`${orbitron.className} text-2xl font-bold tracking-wider`}>
              MAXKATE
            </Link>

            <div className={`${rajdhani.className} flex items-center space-x-8`}>
              <Link 
                href="/presskit" 
                className="text-white/80 hover:text-white transition-colors tracking-wider"
              >
                PRESS KIT
              </Link>
              {/* <Link 
                href="/press" 
                className="text-white/80 hover:text-white transition-colors tracking-wider"
              >
                PRESS
              </Link> */}
              <Link 
                href="/contact" 
                className="text-purple-400 hover:text-purple-300 transition-colors tracking-wider"
              >
                CONTACT US
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-16 space-y-4">
            <h1 className={`${orbitron.className} text-4xl font-bold tracking-wider`}>
              GET IN TOUCH
            </h1>
            <p className={`${rajdhani.className} text-xl text-white/80`}>
              For bookings, press inquiries, or general questions, please fill out the form below
              or reach out through our social media channels.
            </p>
          </div>

          <div className="grid lg:grid-cols-[2fr,1fr] gap-12">
            {/* Contact Form */}
            <div className="space-y-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 
                               focus:outline-none focus:border-purple-500 text-white
                               placeholder:text-white/40"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 
                               focus:outline-none focus:border-purple-500 text-white
                               placeholder:text-white/40"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 
                             focus:outline-none focus:border-purple-500 text-white"
                  >
                    <option value="" className="bg-zinc-900">Select a subject</option>
                    <option value="booking" className="bg-zinc-900">Booking Inquiry</option>
                    <option value="press" className="bg-zinc-900">Press Inquiry</option>
                    <option value="collaboration" className="bg-zinc-900">Collaboration</option>
                    <option value="other" className="bg-zinc-900">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 
                             focus:outline-none focus:border-purple-500 text-white
                             placeholder:text-white/40"
                    placeholder="Your message..."
                  />
                </div>

                <button
                  type="submit"
                  className="bg-purple-500 text-white px-8 py-3 rounded-lg font-semibold
                           hover:bg-purple-600 transition-colors duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Direct Contact */}
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h2 className={`${rajdhani.className} text-xl font-semibold mb-4`}>Direct Contact</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-purple-400 font-medium mb-1">Booking</h3>
                    <p className="text-white/80">booking@maxkate.com</p>
                  </div>
                  <div>
                    <h3 className="text-purple-400 font-medium mb-1">Press</h3>
                    <p className="text-white/80">press@maxkate.com</p>
                  </div>
                  <div>
                    <h3 className="text-purple-400 font-medium mb-1">Management</h3>
                    <p className="text-white/80">mgmt@maxkate.com</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h2 className={`${rajdhani.className} text-xl font-semibold mb-4`}>Follow Us</h2>
                <div className="grid grid-cols-2 gap-4">
                  <a 
                    href="#" 
                    className="flex items-center gap-2 text-white/80 hover:text-purple-400 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                    <span>Twitter</span>
                  </a>
                  <a 
                    href="#" 
                    className="flex items-center gap-2 text-white/80 hover:text-purple-400 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span>Instagram</span>
                  </a>
                  <a 
                    href="#" 
                    className="flex items-center gap-2 text-white/80 hover:text-purple-400 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                    </svg>
                    <span>YouTube</span>
                  </a>
                  <a 
                    href="#" 
                    className="flex items-center gap-2 text-white/80 hover:text-purple-400 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                    </svg>
                    <span>Facebook</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 