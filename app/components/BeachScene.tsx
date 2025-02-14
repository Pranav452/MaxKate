import React from 'react';

const BeachScene: React.FC = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-sky-400 via-sky-300 to-blue-200">
      {/* Sun with Rays */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2">
        <div className="relative w-40 h-40">
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-yellow-100 via-yellow-200 to-yellow-300 
                        shadow-[0_0_150px_60px_rgba(255,248,185,0.3)]"></div>
          <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-yellow-50 via-yellow-100 to-transparent 
                        opacity-80"></div>
          <div className="absolute -inset-12 rounded-full bg-gradient-radial from-yellow-100/40 via-yellow-50/20 to-transparent"></div>
        </div>
      </div>

      {/* Ocean */}
      <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-b from-blue-400 to-blue-600">
        {/* Ocean Waves */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-300/20 via-transparent to-transparent animate-pulse"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-200/10 via-transparent to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      {/* Small Island with Coconut Tree */}
      <div className="absolute bottom-[55%] right-[20%] z-10">
        {/* Island Base */}
        <div className="relative">
          <div className="w-48 h-24 bg-yellow-200 rounded-full transform -rotate-6"></div>
          {/* Sand Texture */}
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-100/50 to-transparent rounded-full"></div>
        </div>

        {/* Coconut Tree */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2">
          {/* Tree Trunk */}
          <div className="w-4 h-32 bg-gradient-to-b from-amber-800 to-amber-900 rounded-full transform -rotate-12"></div>
          
          {/* Palm Leaves */}
          <div className="absolute -top-4 -left-12">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="absolute w-20 h-12 bg-green-700"
                style={{
                  clipPath: 'polygon(0 100%, 50% 0, 100% 100%)',
                  transform: `rotate(${index * 60}deg)`,
                  transformOrigin: 'bottom right'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-600/50 to-transparent"></div>
              </div>
            ))}
          </div>

          {/* Coconuts */}
          <div className="absolute top-8 -left-4">
            <div className="w-4 h-4 rounded-full bg-amber-900"></div>
            <div className="w-4 h-4 rounded-full bg-amber-900 ml-6 -mt-2"></div>
          </div>
        </div>
      </div>

      {/* Clouds */}
      <div className="absolute top-[15%] left-[10%] animate-float" style={{ animationDuration: '6s' }}>
        <div className="relative">
          <div className="w-32 h-12 bg-white rounded-full filter blur-[2px] opacity-90"></div>
          <div className="absolute -right-4 top-1 w-24 h-10 bg-white rounded-full filter blur-[2px] opacity-95"></div>
          <div className="absolute -left-4 top-2 w-28 h-11 bg-white rounded-full filter blur-[2px] opacity-85"></div>
        </div>
      </div>

      <div className="absolute top-[25%] right-[30%] animate-float" style={{ animationDuration: '8s', animationDelay: '1s' }}>
        <div className="relative">
          <div className="w-40 h-16 bg-white rounded-full filter blur-[2px] opacity-95"></div>
          <div className="absolute -right-6 top-2 w-32 h-14 bg-white rounded-full filter blur-[2px] opacity-90"></div>
          <div className="absolute -left-6 top-3 w-36 h-15 bg-white rounded-full filter blur-[2px] opacity-85"></div>
        </div>
      </div>
    </div>
  );
};

export default BeachScene; 