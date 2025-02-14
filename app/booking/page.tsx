'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useCallback } from 'react';
import ReactConfetti from 'react-confetti';
import { useWindowSize } from 'react-use';

interface Seat {
  id: string;
  row: string;
  number: number;
  status: 'available' | 'taken' | 'selected';
  price: number;
}

interface Section {
  id: string;
  name: string;
  color: string;
  hoverColor: string;
  selectedColor: string;
  price: number;
  perks: string[];
  available: boolean;
  totalSeats: number;
  availableSeats: number;
  image: string;
  rows: number;
  seatsPerRow: number;
  seats: Seat[];
  description: string;
}

export default function BookingPage() {
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [hoveredSection, setHoveredSection] = useState<Section | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showSeatingMap, setShowSeatingMap] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentStep, setCurrentStep] = useState<'section' | 'seats' | 'payment'>('section');
  const [showTooltip, setShowTooltip] = useState(false);
  const controls = useAnimation();
  const { width, height } = useWindowSize();

  // Handle confetti cleanup
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  // Show tooltip on first visit
  useEffect(() => {
    const hasSeenTooltip = localStorage.getItem('hasSeenBookingTooltip');
    if (!hasSeenTooltip) {
      setShowTooltip(true);
      localStorage.setItem('hasSeenBookingTooltip', 'true');
      const timer = setTimeout(() => setShowTooltip(false), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Generate seats for a section
  const generateSeats = useCallback((section: string, rows: number, seatsPerRow: number, basePrice: number): Seat[] => {
    const seats: Seat[] = [];
    const rowLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    for (let i = 0; i < rows; i++) {
      for (let j = 1; j <= seatsPerRow; j++) {
        const status = Math.random() > 0.3 ? 'available' : 'taken';
        seats.push({
          id: `${section}-${rowLetters[i]}-${j}`,
          row: rowLetters[i],
          number: j,
          status,
          price: basePrice + (rows - i) * 10 // Price increases for front rows
        });
      }
    }
    return seats;
  }, []);

  const sections: Record<string, Section> = {
    platinum: {
      id: 'platinum',
      name: 'PLATINUM',
      color: 'bg-gradient-to-br from-blue-500 to-cyan-500',
      hoverColor: 'hover:from-blue-400 hover:to-cyan-400',
      selectedColor: 'bg-gradient-to-br from-blue-400 to-cyan-400',
      price: 499,
      perks: [
        'Front row view of Max Kate',
        'Exclusive meet & greet opportunity',
        'Complimentary drinks',
        'VIP entrance',
        'Limited to 50 seats'
      ],
      available: true,
      totalSeats: 50,
      availableSeats: 32,
      image: '/platinum-section.jpg',
      rows: 5,
      seatsPerRow: 10,
      seats: generateSeats('platinum', 5, 10, 499),
      description: 'Experience the ultimate VIP treatment with our Platinum section.'
    },
    vip: {
      id: 'vip',
      name: 'VIP',
      color: 'bg-gradient-to-br from-purple-500 to-pink-500',
      hoverColor: 'hover:from-purple-500 hover:to-pink-500',
      selectedColor: 'bg-gradient-to-br from-purple-500 to-pink-500',
      price: 399,
      perks: [
        'Premium stage view',
        'Dedicated bar access',
        'VIP entrance',
        'Limited to 100 seats'
      ],
      available: true,
      totalSeats: 100,
      availableSeats: 65,
      image: '/vip-section.jpg',
      rows: 10,
      seatsPerRow: 10,
      seats: generateSeats('vip', 10, 10, 399),
      description: 'Enjoy the best view of the stage with our VIP section.'
    },
    gold: {
      id: 'gold',
      name: 'GOLD',
      color: 'bg-gradient-to-br from-amber-500 to-yellow-500',
      hoverColor: 'hover:from-amber-400 hover:to-yellow-400',
      selectedColor: 'bg-gradient-to-br from-amber-400 to-yellow-400',
      price: 299,
      perks: [
        'Excellent viewing position',
        'Priority entry',
        'Access to premium bars',
        'Limited to 200 seats'
      ],
      available: true,
      totalSeats: 200,
      availableSeats: 120,
      image: '/gold-section.jpg',
      rows: 10,
      seatsPerRow: 10,
      seats: generateSeats('gold', 10, 10, 299),
      description: 'Experience the best view of the stage with our GOLD section.'
    },
    silver: {
      id: 'silver',
      name: 'SILVER',
      color: 'bg-gradient-to-br from-teal-500 to-cyan-400',
      hoverColor: 'hover:from-teal-400 hover:to-cyan-300',
      selectedColor: 'bg-gradient-to-br from-teal-400 to-cyan-300',
      price: 199,
      perks: [
        'Great atmosphere',
        'General admission entry',
        'Access to main bars',
        'Limited to 500 seats'
      ],
      available: true,
      totalSeats: 500,
      availableSeats: 350,
      image: '/silver-section.jpg',
      rows: 20,
      seatsPerRow: 10,
      seats: generateSeats('silver', 20, 10, 199),
      description: 'Enjoy the great atmosphere with our SILVER section.'
    }
  } as const;

  const handleSectionClick = async (section: Section) => {
    await controls.start({
      scale: [1, 1.1, 1],
      transition: { duration: 0.3 }
    });
    setSelectedSection(section);
    setIsZoomed(true);
    setCurrentStep('seats');
    setTimeout(() => setShowSeatingMap(true), 500);
  };

  const handleClose = () => {
    setShowSeatingMap(false);
    setSelectedSeats([]);
    setCurrentStep('section');
    setTimeout(() => {
      setIsZoomed(false);
      setSelectedSection(null);
    }, 300);
  };

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'taken') return;

    setSelectedSeats(prev => {
      const isSelected = prev.some(s => s.id === seat.id);
      if (isSelected) {
        return prev.filter(s => s.id !== seat.id);
      } else {
        return [...prev, seat];
      }
    });
  };

  const handleBooking = async () => {
    if (selectedSeats.length === 0) return;
    
    setShowConfetti(true);
    await controls.start({
      scale: [1, 1.05, 1],
      transition: { duration: 0.3 }
    });
    setCurrentStep('payment');

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderSeatingMap = () => {
    if (!selectedSection) return null;

    const rowLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const rows = Array.from({ length: selectedSection.rows });
    const seatsPerRow = Array.from({ length: selectedSection.seatsPerRow });

    return (
      <div className="grid gap-4">
        {/* Stage Indicator */}
        <div className="w-full h-12 bg-blue-600/20 rounded-full mb-8 flex items-center justify-center">
          <span className="text-sm font-semibold text-blue-400">STAGE</span>
        </div>

        {/* Seats Grid */}
        <div className="grid gap-6">
          {rows.map((_, rowIndex) => (
            <div key={rowIndex} className="flex items-center gap-4">
              {/* Row Label */}
              <div className="w-6 text-center text-sm font-medium text-white/60">
                {rowLetters[rowIndex]}
              </div>

              {/* Seats */}
              <div className="flex gap-1 flex-1 justify-center">
                {seatsPerRow.map((_, seatIndex) => {
                  const seat = selectedSection.seats.find(
                    s => s.row === rowLetters[rowIndex] && s.number === seatIndex + 1
                  );
                  if (!seat) return null;

                  const isSelected = selectedSeats.some(s => s.id === seat.id);
                  
                  return (
                    <motion.button
                      key={seat.id}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSeatClick(seat)}
                      className={`w-6 h-6 rounded-t-lg relative group ${
                        seat.status === 'taken' 
                          ? 'bg-gray-700 cursor-not-allowed'
                          : isSelected
                            ? 'bg-blue-500 hover:bg-blue-600'
                            : 'bg-green-500 hover:bg-green-600'
                      }`}
                      disabled={seat.status === 'taken'}
                    >
                      {/* Seat Number Tooltip */}
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100
                                  bg-black/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap transition-opacity">
                        {seat.row}{seat.number} - ${seat.price}
                      </div>
                      {/* Seat Icon */}
                      <div className="absolute inset-1 border-t-2 border-x-2 rounded-t-md
                                  border-white/20 group-hover:border-white/40 transition-colors" />
                    </motion.button>
                  );
                })}
              </div>

              {/* Row Label (right side) */}
              <div className="w-6 text-center text-sm font-medium text-white/60">
                {rowLetters[rowIndex]}
              </div>
            </div>
          ))}
        </div>

        {/* Legend and Summary */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Legend */}
          <div className="flex items-center gap-6 text-sm text-white/70">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-t-lg bg-green-500"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-t-lg bg-gray-700"></div>
              <span>Taken</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-t-lg bg-blue-500"></div>
              <span>Selected</span>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/70">Selected Seats:</span>
              <span className="font-medium">
                {selectedSeats.map(s => `${s.row}${s.number}`).join(', ')}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/70">Total Price:</span>
              <span className="font-medium">
                ${selectedSeats.reduce((sum, seat) => sum + seat.price, 0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0">
        <video 
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          aria-label="Concert background video"
          preload="auto"
        >
          <source src="/stadium-view.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-black/40 to-black" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent" 
               style={{ transform: 'translate(-50%, -50%) scale(2)', top: '50%', left: '50%' }} />
        </div>
      </div>

      {/* Header with Steps */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 p-8"
      >
        <h1 className="text-4xl font-bold mb-4">Select Your Experience</h1>
        <div className="flex items-center gap-4 text-sm">
          <div className={`flex items-center ${currentStep === 'section' ? 'text-white' : 'text-white/40'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2
                         ${currentStep === 'section' ? 'bg-blue-500' : 'bg-zinc-700'}`}>
              1
            </div>
            Choose Section
          </div>
          <div className="w-12 h-0.5 bg-zinc-700" />
          <div className={`flex items-center ${currentStep === 'seats' ? 'text-white' : 'text-white/40'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2
                         ${currentStep === 'seats' ? 'bg-blue-500' : 'bg-zinc-700'}`}>
              2
            </div>
            Select Seats
          </div>
          <div className="w-12 h-0.5 bg-zinc-700" />
          <div className={`flex items-center ${currentStep === 'payment' ? 'text-white' : 'text-white/40'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2
                         ${currentStep === 'payment' ? 'bg-blue-500' : 'bg-zinc-700'}`}>
              3
            </div>
            Payment
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Circular Stadium Layout */}
        <motion.div 
          className={`relative w-full max-w-[min(80vw,60vh)] aspect-square mx-auto
                     transition-all duration-500 ease-out transform ${isZoomed ? 'scale-150' : 'scale-100'}`}
        >
          {/* Outer Circle - Silver */}
          <motion.div 
            onMouseEnter={() => setHoveredSection(sections.silver)}
            onMouseLeave={() => setHoveredSection(null)}
            onClick={() => handleSectionClick(sections.silver)}
            className={`absolute inset-0 rounded-full border-2 border-white/10 
                       ${selectedSection?.id === 'silver' ? sections.silver.selectedColor : sections.silver.color}
                       ${sections.silver.hoverColor} cursor-pointer transition-all duration-300
                       hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]`}
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-center">
              <span className="font-bold text-sm">SILVER</span>
              <p className="text-xs opacity-90">${sections.silver.price}</p>
              <p className="text-[10px] text-white/70">{sections.silver.availableSeats} seats left</p>
            </div>
          </motion.div>

          {/* Gold Circle */}
          <motion.div 
            onMouseEnter={() => setHoveredSection(sections.gold)}
            onMouseLeave={() => setHoveredSection(null)}
            onClick={() => handleSectionClick(sections.gold)}
            className={`absolute inset-[15%] rounded-full border-2 border-white/10 
                       ${selectedSection?.id === 'gold' ? sections.gold.selectedColor : sections.gold.color}
                       ${sections.gold.hoverColor} cursor-pointer transition-all duration-300
                       hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]`}
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-center">
              <span className="font-bold text-sm">GOLD</span>
              <p className="text-xs opacity-90">${sections.gold.price}</p>
              <p className="text-[10px] text-white/70">{sections.gold.availableSeats} seats left</p>
            </div>
          </motion.div>

          {/* VIP Circle */}
          <motion.div 
            onMouseEnter={() => setHoveredSection(sections.vip)}
            onMouseLeave={() => setHoveredSection(null)}
            onClick={() => handleSectionClick(sections.vip)}
            className={`absolute inset-[30%] rounded-full border-2 border-white/10 
                       ${selectedSection?.id === 'vip' ? sections.vip.selectedColor : sections.vip.color}
                       ${sections.vip.hoverColor} cursor-pointer transition-all duration-300
                       hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]`}
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-center">
              <span className="font-bold text-sm">VIP</span>
              <p className="text-xs opacity-90">${sections.vip.price}</p>
              <p className="text-[10px] text-white/70">{sections.vip.availableSeats} seats left</p>
            </div>
          </motion.div>

          {/* Platinum Circle */}
          <motion.div 
            onMouseEnter={() => setHoveredSection(sections.platinum)}
            onMouseLeave={() => setHoveredSection(null)}
            onClick={() => handleSectionClick(sections.platinum)}
            className={`absolute inset-[45%] rounded-full border-2 border-white/10 
                       ${selectedSection?.id === 'platinum' ? sections.platinum.selectedColor : sections.platinum.color}
                       ${sections.platinum.hoverColor} cursor-pointer transition-all duration-300
                       hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]`}
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-center">
              <span className="font-bold text-sm">PLATINUM</span>
              <p className="text-xs opacity-90">${sections.platinum.price}</p>
              <p className="text-[10px] text-white/70">{sections.platinum.availableSeats} seats left</p>
            </div>
          </motion.div>

          {/* Center Stage */}
          <motion.div 
            className="absolute inset-[60%] rounded-full bg-blue-600 border-2 border-white/20 
                     flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.3)]"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="font-bold text-xs">STAGE</span>
          </motion.div>
        </motion.div>

        {/* Preview Card (on hover) */}
        <AnimatePresence>
          {hoveredSection && !selectedSection && (
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="fixed bottom-0 left-0 right-0 bg-zinc-900/90 backdrop-blur-sm border-t border-white/10"
            >
              <div className="container mx-auto px-6 py-6 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-1">{hoveredSection.name}</h3>
                  <p className="text-white/60">Starting from ${hoveredSection.price}</p>
                  <p className="text-sm text-white/40 mt-1">
                    {hoveredSection.availableSeats} seats available out of {hoveredSection.totalSeats}
                  </p>
                </div>
                <button 
                  onClick={() => handleSectionClick(hoveredSection)}
                  className="px-6 py-3 rounded-full bg-white text-black font-bold
                           hover:bg-white/90 transition-colors"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Modal */}
        <AnimatePresence>
          {selectedSection && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-start justify-center z-50 overflow-y-auto py-8"
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-zinc-900/90 backdrop-blur-sm w-full max-w-5xl rounded-2xl p-8 m-4 relative
                         border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
              >
                {/* Close Button */}
                <motion.button 
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-white/60 hover:text-white
                           transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column - Section Details */}
                  <div className="space-y-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <motion.h2 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-3xl font-bold mb-2"
                        >
                          {selectedSection.name}
                        </motion.h2>
                        <motion.p 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                          className="text-4xl font-bold text-white"
                        >
                          ${selectedSection.price}
                        </motion.p>
                      </div>
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`${selectedSection.color} px-4 py-2 rounded-full text-sm font-medium`}
                      >
                        {selectedSection.availableSeats} seats left
                      </motion.div>
                    </div>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-xl font-semibold text-white/90 mb-4">Section Perks</h3>
                        <ul className="grid gap-3">
                          {selectedSection.perks.map((perk, index) => (
                            <motion.li 
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 * index }}
                              className="flex items-center text-white/80"
                            >
                              <svg className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span>{perk}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-white/90 mb-4">Important Information</h3>
                        <ul className="space-y-2 text-white/70">
                          <motion.li 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                          >
                            • Gates open 2 hours before the show
                          </motion.li>
                          <motion.li 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                          >
                            • Valid ID required for entry
                          </motion.li>
                          <motion.li 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                          >
                            • No refunds or exchanges
                          </motion.li>
                        </ul>
                      </div>
                    </motion.div>
                  </div>

                  {/* Right Column - Seating Map */}
                  <div className="relative max-h-[calc(100vh-16rem)] overflow-y-auto pr-4">
                    <AnimatePresence>
                      {showSeatingMap && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-4
                                   border border-white/10 min-w-[300px]"
                        >
                          {renderSeatingMap()}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Book Button */}
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBooking}
                  disabled={selectedSeats.length === 0}
                  className={`w-full py-4 rounded-full font-bold mt-8
                           transform transition-all duration-300 ${
                             selectedSeats.length === 0
                               ? 'bg-white/20 text-white/40 cursor-not-allowed'
                               : 'bg-white text-black hover:bg-white/90'
                           }`}
                >
                  {selectedSeats.length === 0 
                    ? 'Select seats to continue'
                    : `Book ${selectedSeats.length} seat${selectedSeats.length > 1 ? 's' : ''} for $${
                        selectedSeats.reduce((sum, seat) => sum + seat.price, 0)
                      }`
                  }
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Confetti Effect */}
        <AnimatePresence>
          {showConfetti && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 pointer-events-none z-50"
            >
              <ReactConfetti
                width={width}
                height={height}
                recycle={false}
                numberOfPieces={200}
                gravity={0.2}
                colors={['#FFD700', '#FFA500', '#FF69B4', '#4169E1', '#32CD32']}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Payment Success Message */}
        <AnimatePresence>
          {currentStep === 'payment' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50
                       bg-green-500/90 backdrop-blur-sm text-white px-6 py-4 rounded-lg
                       shadow-lg border border-green-400/50"
            >
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-medium">Booking successful! Check your email for confirmation.</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <Link
        href="/vinyl"
        className="fixed left-8 top-1/2 transform -translate-y-1/2 z-50 group"
      >
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-full cursor-pointer 
                     transition-all duration-300 hover:bg-white/30">
          <svg 
            className="w-8 h-8 text-white transform rotate-180 transition-transform 
                     duration-300 group-hover:-translate-x-1" 
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
      <Link
        href="/event-booking"
        className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 group"
      >
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-full cursor-pointer 
                     transition-all duration-300 hover:bg-white/30">
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

      {/* Help Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50
                     bg-blue-500/90 backdrop-blur-sm text-white px-6 py-4 rounded-lg
                     shadow-lg border border-blue-400/50"
          >
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">Click on a section to view available seats and book your tickets!</span>
              <button 
                onClick={() => setShowTooltip(false)}
                className="ml-4 opacity-60 hover:opacity-100 transition-opacity"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section Description Tooltip */}
      <AnimatePresence>
        {hoveredSection && !selectedSection && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-32 left-1/2 transform -translate-x-1/2 z-50
                     bg-white/10 backdrop-blur-md text-white px-6 py-4 rounded-lg
                     shadow-lg border border-white/20 max-w-md text-center"
          >
            <p className="text-sm">{hoveredSection.description}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mini Map Preview */}
      {selectedSection && currentStep === 'seats' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-8 right-8 z-50 bg-zinc-900/90 backdrop-blur-sm
                   rounded-lg p-4 border border-white/10 shadow-lg"
        >
          <div className="text-sm font-medium mb-2">Section Overview</div>
          <div className="w-48 h-48 relative">
            {/* Add a mini map visualization here */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`w-32 h-32 rounded-full ${selectedSection.color} opacity-50`} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-medium">STAGE</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
} 