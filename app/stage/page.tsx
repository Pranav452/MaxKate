import Image from "next/image";
import Link from "next/link";

export default function StagePage() {
  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/stagebg.jpg"
          alt="Stage Background"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>

      {/* Content Container */}
      <div className="relative min-h-screen bg-black/40">
        {/* Show Details - Animated Container */}
        <div className="absolute inset-0 flex flex-col justify-center px-12 animate-fade-in-down">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-5xl font-bold text-white opacity-0 animate-slide-up" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
              Show Name
            </h1>
            
            <p className="text-xl text-white/90 opacity-0 animate-slide-up" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
              Date: December 25, 2024
            </p>
            
            <p className="text-lg text-white/80 max-w-xl opacity-0 animate-slide-up" style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}>
              Join us for an unforgettable evening of entertainment featuring world-class performances, stunning visuals, and immersive experiences that will leave you spellbound.
            </p>
          </div>

          {/* Book Show Button */}
          <div className="fixed bottom-8 right-8">
            <button className="bg-white text-black px-8 py-3 rounded-full font-semibold transform transition-all duration-300 hover:scale-105 hover:bg-opacity-90 opacity-0 animate-slide-up" style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
              Book Show
            </button>
          </div>
        </div>

        {/* Right Arrow Navigation */}
        <Link 
          href="/club"
          className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 group"
        >
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-full cursor-pointer transition-all duration-300 hover:bg-white/30">
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
      </div>
    </div>
  );
} 