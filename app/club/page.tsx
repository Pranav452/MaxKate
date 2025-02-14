import Image from "next/image";
import Link from "next/link";

export default function ClubPage() {
  return (
    <div className="relative min-h-screen">
      {/* Background Image without Flickering Effect */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/clubbg.jpg"
          alt="Club Background"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        {/* Overlay for additional atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
      </div>

      {/* Static Light Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-1 h-1 bg-blue-500/50 blur-xl" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-500/50 blur-xl" />
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-red-500/50 blur-xl" />
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex flex-col items-center justify-center">
        {/* Smoke Effects */}
        <div className="fixed inset-x-0 bottom-0 h-full pointer-events-none overflow-hidden">
          {/* Dense Smoke Layer - Bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/20 via-blue-500/10 to-transparent" />
          
          {/* Red Smoke Layer - Left */}
          <div className="absolute bottom-0 left-[5%] w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-smoke-1 mix-blend-screen" 
               style={{ animationDelay: '0s' }} />
          <div className="absolute bottom-0 left-[15%] w-[30rem] h-[30rem] bg-red-500/25 rounded-full blur-3xl animate-smoke-2 mix-blend-screen" 
               style={{ animationDelay: '2s' }} />
          
          {/* Blue Smoke Layer - Right */}
          <div className="absolute bottom-0 right-[5%] w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-smoke-2 mix-blend-screen" 
               style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-0 right-[15%] w-[30rem] h-[30rem] bg-blue-500/25 rounded-full blur-3xl animate-smoke-3 mix-blend-screen" 
               style={{ animationDelay: '2.5s' }} />
          
          {/* White Center Smoke */}
          <div className="absolute bottom-0 left-[35%] w-[40rem] h-[40rem] bg-white/15 rounded-full blur-3xl animate-smoke-3" 
               style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-0 left-[45%] w-[35rem] h-[35rem] bg-white/20 rounded-full blur-3xl animate-smoke-1" 
               style={{ animationDelay: '3s' }} />
          
          {/* Additional Colored Smoke Elements */}
          <div className="absolute bottom-0 left-[25%] w-[25rem] h-[25rem] bg-red-500/15 rounded-full blur-3xl animate-smoke-1 mix-blend-screen" 
               style={{ animationDelay: '1.5s' }} />
          <div className="absolute bottom-0 right-[25%] w-[25rem] h-[25rem] bg-blue-500/15 rounded-full blur-3xl animate-smoke-2 mix-blend-screen" 
               style={{ animationDelay: '3.5s' }} />
          
          {/* Extra Mixed Color Elements */}
          <div className="absolute bottom-0 left-[50%] w-[28rem] h-[28rem] bg-purple-500/15 rounded-full blur-3xl animate-smoke-3 mix-blend-screen" 
               style={{ animationDelay: '0.7s' }} />
          <div className="absolute bottom-0 right-[50%] w-[28rem] h-[28rem] bg-purple-500/15 rounded-full blur-3xl animate-smoke-1 mix-blend-screen" 
               style={{ animationDelay: '2.7s' }} />
          
          {/* Color Mixing Layer */}
          <div className="absolute bottom-0 inset-x-0 h-full bg-gradient-to-t from-black/50 via-transparent to-transparent mix-blend-multiply" />
          
          {/* Dissipating Smoke at the top with color */}
          <div className="absolute top-[30%] left-0 right-0 h-64 bg-gradient-to-t from-purple-500/10 to-transparent animate-smoke-dissipate mix-blend-screen" />
        </div>

        <Link href="/club/interior">
          <h1 className="text-6xl font-bold text-white mb-4 animate-pulse cursor-pointer 
                       transition-all duration-300 hover:scale-105 hover:text-gray-300
                       drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
            MAX&apos;S CLUB
          </h1>
        </Link>
        
        {/* Enter Button */}
        <div className="fixed bottom-12 right-12">
          <Link href="/club/interior">
            <button 
              className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/50 px-8 py-4 rounded-full text-xl font-bold 
                       transform transition-all duration-500 hover:scale-110 hover:bg-white/20 hover:border-white
                       animate-pulse"
            >
              ENTER MAX&apos;S CLUB
            </button>
          </Link>
        </div>

        {/* Navigation */}
        <Link 
          href="/stage"
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

        <Link 
          href="/vinyl"
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