'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Section {
  id: string;
  name: string;
  color: string;
  hoverColor: string;
  selectedColor: string;
  price: number;
  perks: string[];
  available: boolean;
}

export default function BookingPage() {
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [hoveredSection, setHoveredSection] = useState<Section | null>(null);

  const sections = {
    platinum: {
      id: 'platinum',
      name: 'PLATINUM',
      color: 'bg-amber-600',
      hoverColor: 'hover:bg-amber-500',
      selectedColor: 'bg-amber-500',
      price: 499,
      perks: [
        'Front row view of Max Kate',
        'Exclusive meet & greet opportunity',
        'Complimentary drinks',
        'VIP entrance',
        'Limited to 50 seats'
      ],
      available: true
    },
    vip: {
      id: 'vip',
      name: 'VIP',
      color: 'bg-pink-600',
      hoverColor: 'hover:bg-pink-500',
      selectedColor: 'bg-pink-500',
      price: 399,
      perks: [
        'Premium stage view',
        'Dedicated bar access',
        'VIP entrance',
        'Limited to 100 seats'
      ],
      available: true
    },
    gold: {
      id: 'gold',
      name: 'GOLD',
      color: 'bg-yellow-600',
      hoverColor: 'hover:bg-yellow-500',
      selectedColor: 'bg-yellow-500',
      price: 299,
      perks: [
        'Excellent viewing position',
        'Priority entry',
        'Access to premium bars',
        'Limited to 200 seats'
      ],
      available: true
    },
    silver: {
      id: 'silver',
      name: 'SILVER',
      color: 'bg-slate-500',
      hoverColor: 'hover:bg-slate-400',
      selectedColor: 'bg-slate-400',
      price: 199,
      perks: [
        'Great atmosphere',
        'General admission entry',
        'Access to main bars',
        'Limited to 500 seats'
      ],
      available: true
    }
  };

  return (
    <div className="h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-6">
        <h1 className="text-3xl font-bold mb-2">Select Your Section</h1>
        <p className="text-gray-400 text-sm">Choose your preferred section to experience Max Kate live</p>
      </div>

      {/* Circular Stadium Layout */}
      <div className="relative w-full max-w-[min(80vw,60vh)] aspect-square">
        {/* Outer Circle - Silver */}
        <div 
          onMouseEnter={() => setHoveredSection(sections.silver)}
          onMouseLeave={() => setHoveredSection(null)}
          onClick={() => setSelectedSection(sections.silver)}
          className={`absolute inset-0 rounded-full border-2 border-white/10 
                     ${selectedSection?.id === 'silver' ? sections.silver.selectedColor : sections.silver.color}
                     ${sections.silver.hoverColor} cursor-pointer transition-all duration-300`}
        >
          <div className="absolute top-2 left-1/2 -translate-x-1/2 text-center">
            <span className="font-bold text-sm">SILVER</span>
            <p className="text-xs opacity-90">$199</p>
          </div>
        </div>

        {/* Gold Circle */}
        <div 
          onMouseEnter={() => setHoveredSection(sections.gold)}
          onMouseLeave={() => setHoveredSection(null)}
          onClick={() => setSelectedSection(sections.gold)}
          className={`absolute inset-[15%] rounded-full border-2 border-white/10 
                     ${selectedSection?.id === 'gold' ? sections.gold.selectedColor : sections.gold.color}
                     ${sections.gold.hoverColor} cursor-pointer transition-all duration-300`}
        >
          <div className="absolute top-2 left-1/2 -translate-x-1/2 text-center">
            <span className="font-bold text-sm">GOLD</span>
            <p className="text-xs opacity-90">$299</p>
          </div>
        </div>

        {/* VIP Circle */}
        <div 
          onMouseEnter={() => setHoveredSection(sections.vip)}
          onMouseLeave={() => setHoveredSection(null)}
          onClick={() => setSelectedSection(sections.vip)}
          className={`absolute inset-[30%] rounded-full border-2 border-white/10 
                     ${selectedSection?.id === 'vip' ? sections.vip.selectedColor : sections.vip.color}
                     ${sections.vip.hoverColor} cursor-pointer transition-all duration-300`}
        >
          <div className="absolute top-2 left-1/2 -translate-x-1/2 text-center">
            <span className="font-bold text-sm">VIP</span>
            <p className="text-xs opacity-90">$399</p>
          </div>
        </div>

        {/* Platinum Circle */}
        <div 
          onMouseEnter={() => setHoveredSection(sections.platinum)}
          onMouseLeave={() => setHoveredSection(null)}
          onClick={() => setSelectedSection(sections.platinum)}
          className={`absolute inset-[45%] rounded-full border-2 border-white/10 
                     ${selectedSection?.id === 'platinum' ? sections.platinum.selectedColor : sections.platinum.color}
                     ${sections.platinum.hoverColor} cursor-pointer transition-all duration-300`}
        >
          <div className="absolute top-2 left-1/2 -translate-x-1/2 text-center">
            <span className="font-bold text-sm">PLATINUM</span>
            <p className="text-xs opacity-90">$499</p>
          </div>
        </div>

        {/* Center Stage */}
        <div className="absolute inset-[60%] rounded-full bg-blue-600 border-2 border-white/20 flex items-center justify-center">
          <span className="font-bold text-xs">STAGE</span>
        </div>
      </div>

      {/* Preview Card (on hover) */}
      {hoveredSection && !selectedSection && (
        <div 
          className="fixed bottom-0 left-0 right-0 bg-zinc-900/90 backdrop-blur-sm border-t border-white/10
                   transform transition-all duration-300 ease-out animate-slide-up"
        >
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">{hoveredSection.name}</h3>
              <p className="text-white/60 text-sm">Starting from ${hoveredSection.price}</p>
            </div>
            <button className="px-4 py-2 rounded-full bg-white/10 text-sm hover:bg-white/20 transition-colors">
              View Details
            </button>
          </div>
        </div>
      )}

      {/* Full Details Modal (on click) */}
      {selectedSection && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end justify-center z-50 animate-slide-up">
          <div className="bg-zinc-900 w-full max-w-2xl rounded-t-xl p-6 transform transition-transform duration-500 ease-out">
            {/* Close Button */}
            <button 
              onClick={() => setSelectedSection(null)}
              className="absolute top-4 right-4 text-white/60 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Section Details */}
            <div className="mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-1">{selectedSection.name}</h2>
                  <p className="text-3xl font-bold text-white">${selectedSection.price}</p>
                </div>
                <div className={`${selectedSection.color} px-4 py-1 rounded-full text-sm font-medium`}>
                  Available
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white/90">Section Perks:</h3>
                <ul className="grid grid-cols-2 gap-3">
                  {selectedSection.perks.map((perk, index) => (
                    <li key={index} className="flex items-center text-white/80 text-sm">
                      <svg className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Book Button */}
            <button 
              className="w-full bg-white text-black py-3 rounded-full font-bold
                       transform transition-all duration-300 hover:scale-[1.02]"
            >
              Book {selectedSection.name} Section
            </button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <Link
        href="/vinyl"
        className="fixed left-8 top-1/2 transform -translate-y-1/2 z-50 group"
      >
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-full cursor-pointer transition-all duration-300 hover:bg-white/30">
          <svg 
            className="w-8 h-8 text-white transform rotate-180 transition-transform duration-300 group-hover:-translate-x-1" 
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
    </div>
  );
} 