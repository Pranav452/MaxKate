'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface BookingOption {
  id: string;
  name: string;
  color: string;
  hoverColor: string;
  selectedColor: string;
  price: number;
  perks: string[];
  description: string;
  available: boolean;
}

export default function EventBookingPage() {
  const [selectedOption, setSelectedOption] = useState<BookingOption | null>(null);
  const [currentStep, setCurrentStep] = useState<'initial' | 'platinum' | 'performance' | 'details' | 'payment'>('initial');
  const [formData, setFormData] = useState({
    eventName: '',
    eventDate: '',
    venue: '',
    expectedAttendance: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    additionalNotes: ''
  });

  const platinumOptions = {
    djing: {
      id: 'djing',
      name: 'DJING SET',
      color: 'bg-gradient-to-br from-purple-500 to-pink-500',
      hoverColor: 'hover:from-purple-400 hover:to-pink-400',
      selectedColor: 'bg-gradient-to-br from-purple-400 to-pink-400',
      price: 20000,
      perks: [
        'Ranges of Genres from House, Afro, Melodic Techno, World to Commercial Music',
        'Welcome to 2hours of Straight Good Music, Amplifying Energy',
        'Tech Rider',
        'Hospitality Rider'
      ],
      description: 'Experience 2 hours of energetic DJ performance',
      available: true
    },
    live: {
      id: 'live',
      name: 'LIVE PERFORMANCE',
      color: 'bg-gradient-to-br from-blue-500 to-cyan-500',
      hoverColor: 'hover:from-blue-400 hover:to-cyan-400',
      selectedColor: 'bg-gradient-to-br from-blue-400 to-cyan-400',
      price: 20000,
      perks: [
        'Choose from Solo, 3 Piece, or 5 Piece Band',
        'Welcome to 2hours of Straight Soulful Music, Nostalgia',
        'Tech Rider',
        'Hospitality Rider'
      ],
      description: 'Select your preferred live performance format',
      available: true
    }
  };

  const performanceOptions = {
    solo: {
      id: 'solo',
      name: 'SOLO PERFORMANCE',
      color: 'bg-gradient-to-br from-amber-500 to-yellow-500',
      hoverColor: 'hover:from-amber-400 hover:to-yellow-400',
      selectedColor: 'bg-gradient-to-br from-amber-400 to-yellow-400',
      price: 20000,
      perks: [
        'Solo Performance By Max Kate on Piano & Guitar',
        'Welcome to 2hours of Straight Soulful Music, Nostalgia',
        'Tech Rider',
        'Hospitality Rider'
      ],
      description: 'An intimate solo performance',
      available: true
    },
    threepiece: {
      id: 'threepiece',
      name: '3 PIECE BAND',
      color: 'bg-gradient-to-br from-teal-500 to-cyan-400',
      hoverColor: 'hover:from-teal-400 hover:to-cyan-300',
      selectedColor: 'bg-gradient-to-br from-teal-400 to-cyan-300',
      price: 20000,
      perks: [
        '3 Piece Band Performance',
        'Welcome to 2hours of Straight Soulful Music, Nostalgia',
        'Tech Rider',
        'Hospitality Rider'
      ],
      description: 'A dynamic trio performance',
      available: true
    },
    fivepiece: {
      id: 'fivepiece',
      name: '5 PIECE BAND',
      color: 'bg-gradient-to-br from-blue-500 to-indigo-500',
      hoverColor: 'hover:from-blue-400 hover:to-indigo-400',
      selectedColor: 'bg-gradient-to-br from-blue-400 to-indigo-400',
      price: 20000,
      perks: [
        '5 Piece Band Performance',
        'Welcome to 2hours of Straight Soulful Music, Nostalgia',
        'Tech Rider',
        'Hospitality Rider'
      ],
      description: 'Full band experience',
      available: true
    }
  };

  const handlePlatinumClick = () => {
    setCurrentStep('platinum');
  };

  const handleOptionClick = (option: BookingOption) => {
    setSelectedOption(option);
    if (option.id === 'live') {
      setCurrentStep('performance');
    } else {
      setCurrentStep('details');
    }
  };

  const handlePerformanceClick = (option: BookingOption) => {
    setSelectedOption(option);
    setCurrentStep('details');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('payment');
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'platinum':
        setCurrentStep('initial');
        break;
      case 'performance':
        setCurrentStep('platinum');
        break;
      case 'details':
        if (selectedOption?.id === 'djing') {
          setCurrentStep('platinum');
        } else if (selectedOption?.id === 'solo' || selectedOption?.id === 'threepiece' || selectedOption?.id === 'fivepiece') {
          setCurrentStep('performance');
        }
        setSelectedOption(null);
        break;
      case 'payment':
        setCurrentStep('details');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Video */}
      <div className="fixed inset-0">
        <video 
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          aria-label="Concert background video"
        >
          <source src="/stadium-view.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-black/10 to-black" />
      </div>

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 p-8"
      >
        <h1 className="text-4xl font-bold mb-4">Book MAX Kate</h1>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Initial Step - Platinum Circle */}
        {currentStep === 'initial' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              onClick={handlePlatinumClick}
              className="bg-purple-900/40 backdrop-blur-md rounded-2xl p-8 cursor-pointer
                       border border-purple-500/30 transition-all duration-300
                       hover:bg-purple-800/40 hover:border-purple-400/40
                       hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]"
            >
              <h2 className="text-3xl font-bold mb-4">PLATINUM CIRCLE</h2>
              <p className="text-xl mb-4">Limited to 50 People Only</p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Exclusive Experience
                </li>
              </ul>
            </motion.div>
          </motion.div>
        )}

        {/* Platinum Options */}
        {currentStep === 'platinum' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            {/* Back Button */}
            <button
              onClick={handleBack}
              className="absolute top-40 left-60 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {Object.values(platinumOptions).map((option) => (
              <motion.div
                key={option.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleOptionClick(option)}
                className="bg-purple-900/40 backdrop-blur-sm rounded-2xl p-8 cursor-pointer
                         border border-purple-500/30 transition-all duration-300
                         hover:bg-purple-800/40 hover:border-purple-400/40
                         hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]"
              >
                <h3 className="text-2xl font-bold mb-2">{option.name}</h3>
                <p className="text-2xl font-bold mb-4">Performance Fee For 2hours ---- 20k</p>
                <ul className="space-y-3">
                  {option.perks.map((perk, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {perk}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Performance Options */}
        {currentStep === 'performance' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto relative"
          >
            {/* Back Button */}
            <button
              onClick={handleBack}
              className="absolute -top-12 left-0 flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to Performance Types</span>
            </button>

            {Object.values(performanceOptions).map((option) => (
              <motion.div
                key={option.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => handlePerformanceClick(option)}
                className="bg-purple-900/40 backdrop-blur-md rounded-2xl p-8 cursor-pointer
                         border border-purple-500/30 transition-all duration-300
                         hover:bg-purple-800/40 hover:border-purple-400/40
                         hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]"
              >
                <h3 className="text-2xl font-bold mb-2">{option.name}</h3>
                <p className="text-2xl font-bold mb-4">Performance Fee For 2hours ---- 20k</p>
                <ul className="space-y-3">
                  {option.perks.map((perk, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {perk}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Details Form */}
        {currentStep === 'details' && selectedOption && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto relative"
          >
            {/* Back Button */}
            <button
              onClick={handleBack}
              className="absolute -top-12 left-0 flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to {selectedOption.id === 'djing' ? 'Performance Types' : 'Band Selection'}</span>
            </button>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-purple-900/40 backdrop-blur-md rounded-2xl p-8 
                           border border-purple-500/30">
                <h2 className="text-2xl font-bold mb-6">Event Details</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-purple-200">Event Name</label>
                    <input
                      type="text"
                      name="eventName"
                      value={formData.eventName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg bg-purple-900/40 border border-purple-500/30
                               focus:border-purple-400 focus:ring-1 focus:ring-purple-400 outline-none
                               text-white placeholder-purple-300/50"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-purple-200">Event Date</label>
                    <input
                      type="date"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg bg-purple-900/40 border border-purple-500/30
                               focus:border-purple-400 focus:ring-1 focus:ring-purple-400 outline-none
                               text-white placeholder-purple-300/50"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-purple-200">Venue</label>
                    <input
                      type="text"
                      name="venue"
                      value={formData.venue}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg bg-purple-900/40 border border-purple-500/30
                               focus:border-purple-400 focus:ring-1 focus:ring-purple-400 outline-none
                               text-white placeholder-purple-300/50"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-purple-200">Expected Attendance</label>
                    <input
                      type="number"
                      name="expectedAttendance"
                      value={formData.expectedAttendance}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg bg-purple-900/40 border border-purple-500/30
                               focus:border-purple-400 focus:ring-1 focus:ring-purple-400 outline-none
                               text-white placeholder-purple-300/50"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-purple-200">Contact Name</label>
                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg bg-purple-900/40 border border-purple-500/30
                               focus:border-purple-400 focus:ring-1 focus:ring-purple-400 outline-none
                               text-white placeholder-purple-300/50"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-purple-200">Contact Email</label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg bg-purple-900/40 border border-purple-500/30
                               focus:border-purple-400 focus:ring-1 focus:ring-purple-400 outline-none
                               text-white placeholder-purple-300/50"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-purple-200">Contact Phone</label>
                    <input
                      type="tel"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg bg-purple-900/40 border border-purple-500/30
                               focus:border-purple-400 focus:ring-1 focus:ring-purple-400 outline-none
                               text-white placeholder-purple-300/50"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-purple-200">Additional Notes</label>
                    <textarea
                      name="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg bg-purple-900/40 border border-purple-500/30
                               focus:border-purple-400 focus:ring-1 focus:ring-purple-400 outline-none
                               text-white placeholder-purple-300/50"
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-white text-black font-bold
                             hover:bg-white/90 transition-colors"
                  >
                    Submit Booking Request
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        )}

        {/* Success/Payment Step */}
        {currentStep === 'payment' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-purple-900/40 backdrop-blur-md rounded-2xl p-8 
                         border border-purple-500/30">
              <svg 
                className="w-16 h-16 mx-auto mb-4 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <h2 className="text-2xl font-bold mb-4">Booking Request Submitted!</h2>
              <p className="text-lg text-white/70 mb-8">
                Thank you for your interest in booking Max Kate. Our team will review your request
                and contact you within 24-48 hours to discuss the details and finalize the booking.
              </p>
              <Link
                href="/"
                className="inline-block px-8 py-3 rounded-full bg-white text-black font-bold
                         hover:bg-white/90 transition-colors"
              >
                Return to Home
              </Link>
            </div>
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <Link
        href="/booking"
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
    </div>
  );
} 