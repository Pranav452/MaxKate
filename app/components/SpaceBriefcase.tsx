'use client';

import { useEffect } from 'react';

export default function SpaceBriefcase() {
  useEffect(() => {
    // Create stars
    const createStars = () => {
      const starsContainer = document.getElementById('stars-container');
      if (!starsContainer) return;

      // Clear existing stars
      starsContainer.innerHTML = '';

      // Create many more stars with different sizes and animations
      for (let i = 0; i < 800; i++) {
        const star = document.createElement('div');
        star.className = `star absolute`;
        
        // Random size with more large stars
        const sizeClass = Math.random() < 0.4 ? 'star-large' : Math.random() < 0.7 ? 'star-medium' : 'star-small';
        star.classList.add(sizeClass);

        // Random position in a larger area
        star.style.left = `${Math.random() * 200 - 50}%`;
        star.style.top = `${Math.random() * 200 - 50}%`;

        // Random twinkle animation
        const twinkleClass = Math.random() < 0.33 ? 'twinkle-1' : Math.random() < 0.66 ? 'twinkle-2' : 'twinkle-3';
        star.classList.add(twinkleClass);

        starsContainer.appendChild(star);
      }
    };

    // Enhanced shooting stars
    const createShootingStar = () => {
      const container = document.getElementById('shooting-stars-container');
      if (!container) return;

      const star = document.createElement('div');
      star.className = 'shooting-star';
      
      // Random direction (left-to-right or right-to-left)
      const isReverse = Math.random() > 0.5;
      star.classList.add(isReverse ? 'shooting-star-reverse' : 'shooting-star-normal');
      
      // Random position
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      
      star.style.left = `${startX}%`;
      star.style.top = `${startY}%`;
      
      container.appendChild(star);
      
      // Remove the star after animation
      setTimeout(() => {
        star.remove();
      }, 1500);
    };

    createStars();

    // Create multiple shooting stars with different intervals
    const createMultipleShootingStars = () => {
      createShootingStar();
      setTimeout(() => createShootingStar(), 200);
      setTimeout(() => createShootingStar(), 400);
    };

    // Create shooting stars periodically
    const shootingStarInterval = setInterval(createMultipleShootingStars, 3000);

    return () => {
      clearInterval(shootingStarInterval);
    };
  }, []);

  return (
    <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden">
      {/* Extended Stars Background */}
      <div id="stars-container" className="fixed inset-0 overflow-hidden">
        {/* Stars will be dynamically added here */}
      </div>

      {/* Shooting Stars Container */}
      <div id="shooting-stars-container" className="fixed inset-0 overflow-hidden">
        {/* Shooting stars will be dynamically added here */}
      </div>

      {/* Large Background Nebulas */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="nebula nebula-large bg-purple-500/10" 
             style={{ top: '-20%', left: '-20%', animationDelay: '0s' }} />
        <div className="nebula nebula-large bg-blue-500/10" 
             style={{ top: '30%', right: '-30%', animationDelay: '5s' }} />
        <div className="nebula nebula-large bg-pink-500/10" 
             style={{ bottom: '-20%', left: '20%', animationDelay: '10s' }} />
      </div>

      {/* Closer Nebulas */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="nebula w-96 h-96 bg-purple-500/20" 
             style={{ top: '10%', left: '20%', animationDelay: '2s' }} />
        <div className="nebula w-80 h-80 bg-blue-500/20" 
             style={{ top: '50%', right: '10%', animationDelay: '7s' }} />
        <div className="nebula w-64 h-64 bg-pink-500/20" 
             style={{ bottom: '20%', left: '30%', animationDelay: '12s' }} />
      </div>

      {/* Briefcase Container */}
      <div className="relative w-[800px] h-[500px] mt-32">
        {/* Briefcase Outer Frame */}
        <div className="absolute inset-0 p-4 float briefcase-modern">
          {/* Curved Metallic Handle */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            {/* Handle Base */}
            <div className="relative w-40 h-8">
              {/* Main Handle Bar */}
              <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-gray-300 via-gray-400 to-gray-500 rounded-full shadow-lg"></div>
              {/* Side Supports */}
              <div className="absolute left-0 top-0 w-3 h-8 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full"></div>
              <div className="absolute right-0 top-0 w-3 h-8 bg-gradient-to-l from-gray-400 to-gray-500 rounded-full"></div>
              {/* Bottom Connectors */}
              <div className="absolute bottom-0 left-0 w-3 h-2 bg-gray-600 rounded-b-lg"></div>
              <div className="absolute bottom-0 right-0 w-3 h-2 bg-gray-600 rounded-b-lg"></div>
            </div>
          </div>
          
          {/* Inner Frame */}
          <div className="absolute inset-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700">
            {/* Video Container */}
            <div className="absolute inset-3 overflow-hidden rounded-xl bg-black">
              <video
                className="w-full h-full object-cover opacity-90"
                autoPlay
                loop
                playsInline
                muted
              >
                <source src="/teaser1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Enhanced Reflection Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 