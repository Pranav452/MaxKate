'use client';

import SpaceBriefcase from "./components/SpaceBriefcase";
import Link from "next/link";
import Image from "next/image";
import { Orbitron, Syncopate, Rajdhani } from 'next/font/google';
import { useState } from 'react';

const orbitron = Orbitron({ subsets: ['latin'] });
const syncopate = Syncopate({ subsets: ['latin'], weight: ['400', '700'] });
const rajdhani = Rajdhani({ subsets: ['latin'], weight: ['500'] });

export default function Home() {
  const [isDaylight, setIsDaylight] = useState(false);

  return (
    <div className="relative min-h-screen bg-black">
      {/* Dynamic Background */}
      <div className={`fixed inset-0 transition-all duration-1500 ${
        isDaylight 
          ? 'bg-gradient-to-b from-sky-400 via-sky-300 to-blue-200'
          : 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 via-black to-black'
      }`}>
        {/* Dynamic Sky Effects */}
        <div className={`absolute inset-0 transition-opacity duration-1500 ${isDaylight ? 'opacity-100' : 'opacity-0'}`}>
          {/* Sun with Rays */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2">
            {/* Main Sun */}
            <div className="relative w-40 h-40">
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-yellow-100 via-yellow-200 to-yellow-300 
                            shadow-[0_0_150px_60px_rgba(255,248,185,0.3)]"></div>
              {/* Inner Glow */}
              <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-yellow-50 via-yellow-100 to-transparent 
                            opacity-80"></div>
              {/* Outer Rays */}
              <div className="absolute -inset-12 rounded-full bg-gradient-radial from-yellow-100/40 via-yellow-50/20 to-transparent"></div>
            </div>
          </div>
          
          {/* Ambient Light */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] 
                         bg-gradient-radial from-yellow-100/20 via-transparent to-transparent"></div>
          
          
          {/* Cloud Groups */}
          <div className="absolute top-[10%] left-[5%] flex gap-6 animate-float" style={{ animationDuration: '6s' }}>
            <div className="relative">
              <div className="w-32 h-12 bg-white rounded-full filter blur-[2px] opacity-90"></div>
              <div className="absolute -right-4 top-1 w-24 h-10 bg-white rounded-full filter blur-[2px] opacity-95"></div>
              <div className="absolute -left-4 top-2 w-28 h-11 bg-white rounded-full filter blur-[2px] opacity-85"></div>
            </div>
          </div>
          <div className="absolute top-[15%] right-[10%] flex gap-6 animate-float" style={{ animationDuration: '8s', animationDelay: '1s' }}>
            <div className="relative">
              <div className="w-40 h-16 bg-white rounded-full filter blur-[2px] opacity-95"></div>
              <div className="absolute -right-6 top-2 w-32 h-14 bg-white rounded-full filter blur-[2px] opacity-90"></div>
              <div className="absolute -left-6 top-3 w-36 h-15 bg-white rounded-full filter blur-[2px] opacity-85"></div>
            </div>
          </div>
          
          {/* Birds */}
          {[...Array(6)].map((_, index) => (
            <div key={`bird-${index}`} className={`absolute animate-bird-flight-${(index % 3) + 1}`} 
                 style={{ 
                   top: `${10 + index * 5}%`, 
                   left: `${index * 15}%`,
                   animationDelay: `${index * 2}s`
                 }}>
              <svg width="32" height="32" viewBox="0 0 24 24" className="text-black/80 transform scale-75">
                <path fill="currentColor" d="M12.5 2.7c-1-1.1-2.6-1.1-3.5 0L4.8 7C3.9 8 3.9 9.6 4.8 10.7l4.2 4.3c1 1.1 2.6 1.1 3.5 0l4.2-4.3c1-1.1 1-2.7 0-3.8L12.5 2.7z"/>
                <path fill="currentColor" d="M6.9 6.9L5.7 8.1c-.4.4-.4 1 0 1.4l2.8 2.9c.4.4 1 .4 1.4 0l1.2-1.2"/>
                <path fill="currentColor" d="M17.1 6.9l1.2 1.2c.4.4.4 1 0 1.4l-2.8 2.9c-.4.4-1 .4-1.4 0l-1.2-1.2"/>
              </svg>
            </div>
          ))}
        </div>

        {/* Space Effects (opposite opacity) */}
        <div className={`absolute inset-0 transition-opacity duration-1500 ${isDaylight ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} 
             style={{
               backgroundImage: isDaylight ? 'none' : 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%), url("/stars.png")',
               backgroundSize: isDaylight ? 'auto' : '200px 200px',
               backgroundRepeat: 'repeat',
               animation: isDaylight ? 'none' : 'twinkle 8s linear infinite'
             }} />
      </div>

      {/* Transparent Navbar */}
      <nav className={`fixed w-full top-0 z-50 transition-colors duration-1500 ${
        isDaylight ? 'bg-white/10' : 'bg-black'
      }`}>
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Left Navigation */}
          <div className="flex items-center gap-5">
            <Link href="/presskit" className={`${rajdhani.className} ${
              isDaylight ? 'text-black/80 hover:text-black' : 'text-white/80 hover:text-white'
            } transition-colors text-lg tracking-wider`}>
              <Image src="/fonts/presskit.png" alt="Press Kit" width={100} height={16} className="h-4 w-auto" />
            </Link>
            {/* <Link href="/tours" className={`${rajdhani.className} ${
              isDaylight ? 'text-black/80 hover:text-black' : 'text-white/80 hover:text-white'
            } transition-colors text-lg tracking-wider`}>
              <Image src="/fonts/tours.png" alt="Tours" width={100} height={16} className="h-4 w-auto" />
            </Link> */}
            <Link href="/contact" className={`${rajdhani.className} ${
              isDaylight ? 'text-black/80 hover:text-black' : 'text-white/80 hover:text-white'
            } transition-colors text-lg tracking-wider`}>
              <Image src="/fonts/cantactus.png" alt="Contact Us" width={100} height={16} className="h-4 w-auto" />
            </Link>
          </div>

          {/* Center Logo */}
          <h1 className={`${orbitron.className} ${
            isDaylight ? 'text-black' : 'text-white'
          }  text-3xl  absolute left-1/2 transform -translate-x-1/2 tracking-[0.001em] transition-colors duration-1500 font-medium leading-tight`}>
            MAX KATE
          </h1>

          {/* Right CTA */}
          <div className="group relative">
            <button 
              className={`${syncopate.className} ${
                isDaylight 
                  ? 'bg-black/10 text-black hover:bg-black/20 border-black/20' 
                  : 'bg-white/10 text-white hover:bg-white/20 border-white/20'
              } backdrop-blur-sm px-6 py-2 rounded-full border 
              transition-all duration-300 tracking-[0.15em] font-bold`}
              disabled
            >
              MERCH
            </button>
            <div className={`${rajdhani.className} absolute -bottom-12 left-1/2 transform -translate-x-1/2 ${
              isDaylight 
                ? 'bg-white/80 text-black' 
                : 'bg-black/80 text-white'
            } backdrop-blur-sm px-4 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 
            transition-opacity duration-300 whitespace-nowrap tracking-wider`}>
              Coming Soon
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative min-h-screen flex items-center justify-center">
        {/* Latest Teaser Text */}
        {/* <div className="absolute top-32 left-1/2 transform -translate-x-1/2 text-center z-10">
          <h2 className="text-4xl font-bold text-white mb-2 tracking-wider animate-pulse">
            Latest Teaser
          </h2>
          <div className="h-0.5 w-32 mx-auto bg-gradient-to-r from-transparent via-white to-transparent opacity-50"></div>
        </div> */}
        <SpaceBriefcase isDaylight={isDaylight} />
      </main>

      {/* Navigation */}
      <Link 
        href="/stage"
        className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 group"
      >
        <div className="bg-white/10 backdrop-blur-sm p-2.5 rounded-full cursor-pointer transition-all duration-300 hover:bg-white/30">
          <svg 
            className="w-8 h-8 text-white transform transition-transform duration-300 group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5l7 7-7 7" 
            />
          </svg>
        </div>
      </Link>

      {/* Theme Toggle Button */}
      <button 
        onClick={() => setIsDaylight(!isDaylight)}
        className={`${rajdhani.className} fixed bottom-8 right-8 z-50 px-6 py-3 rounded-full 
          transition-all duration-300 transform hover:scale-105
          ${isDaylight 
            ? 'bg-black/20 text-black hover:bg-black/30' 
            : 'bg-white/10 text-white hover:bg-white/20'
          }
          backdrop-blur-sm border border-white/20 tracking-[0.15em] font-bold`}
      >
        {isDaylight ? 'NIGHTFALL' : 'DAYLIGHT'}
      </button>
    </div>
  );
}
