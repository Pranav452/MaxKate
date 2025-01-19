'use client';

import { useEffect } from 'react';

interface SpaceBriefcaseProps {
  isDaylight: boolean;
}

export default function SpaceBriefcase({ isDaylight }: SpaceBriefcaseProps) {
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
      {/* Stars Container (visible only in night mode) */}
      <div id="stars-container" className={`fixed inset-0 overflow-hidden transition-opacity duration-1000 ${isDaylight ? 'opacity-0' : 'opacity-100'}`}>
        {/* Stars will be dynamically added here */}
      </div>

      {/* Shooting Stars Container (visible only in night mode) */}
      <div id="shooting-stars-container" className={`fixed inset-0 overflow-hidden transition-opacity duration-1000 ${isDaylight ? 'opacity-0' : 'opacity-100'}`}>
        {/* Shooting stars will be dynamically added here */}
      </div>

      {/* Nebulas (visible only in night mode) */}
      <div className={`fixed inset-0 overflow-hidden transition-opacity duration-1000 ${isDaylight ? 'opacity-0' : 'opacity-100'}`}>
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
      <div className="relative w-[1200px] h-[700px] mt-32">
        {/* Briefcase Outer Frame */}
        <div className={`absolute inset-0 p-4 float rounded-3xl ${
          isDaylight 
            ? 'bg-gradient-to-br from-gray-100 to-gray-300 shadow-2xl border border-gray-200/50' 
            : 'briefcase-modern'
        } transition-all duration-1000`}>
          {/* Curved Metallic Handle */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            {/* Handle Base */}
            <div className="relative w-40 h-8">
              {/* Main Handle Bar */}
              <div className={`absolute top-0 left-0 right-0 h-3 rounded-full shadow-lg ${
                isDaylight
                  ? 'bg-gradient-to-b from-gray-400 via-gray-500 to-gray-600'
                  : 'bg-gradient-to-b from-gray-300 via-gray-400 to-gray-500'
              } transition-colors duration-1000`}></div>
              {/* Side Supports */}
              <div className={`absolute left-0 top-0 w-3 h-8 rounded-full ${
                isDaylight
                  ? 'bg-gradient-to-r from-gray-500 to-gray-600'
                  : 'bg-gradient-to-r from-gray-400 to-gray-500'
              } transition-colors duration-1000`}></div>
              <div className={`absolute right-0 top-0 w-3 h-8 rounded-full ${
                isDaylight
                  ? 'bg-gradient-to-l from-gray-500 to-gray-600'
                  : 'bg-gradient-to-l from-gray-400 to-gray-500'
              } transition-colors duration-1000`}></div>
              {/* Bottom Connectors */}
              <div className={`absolute bottom-0 left-0 w-3 h-2 rounded-b-lg ${
                isDaylight ? 'bg-gray-700' : 'bg-gray-600'
              } transition-colors duration-1000`}></div>
              <div className={`absolute bottom-0 right-0 w-3 h-2 rounded-b-lg ${
                isDaylight ? 'bg-gray-700' : 'bg-gray-600'
              } transition-colors duration-1000`}></div>
            </div>
          </div>
          
          {/* Inner Frame */}
          <div className={`absolute inset-4 rounded-2xl border ${
            isDaylight
              ? 'bg-gradient-to-br from-gray-200 to-gray-300 border-gray-300/50'
              : 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700'
          } transition-all duration-1000`}>
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
              
              {/* Latest Trailer Text Overlay */}
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20">
                <div className="flex flex-col items-center">
                  <div className="text-xs tracking-[0.3em] text-gray-400 mb-1">PRESENTING</div>
                  <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-white to-purple-300 tracking-wider">
                    LATEST TEASER
                  </div>
                  <div className="h-0.5 w-32 mt-2 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
                </div>
              </div>
              
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