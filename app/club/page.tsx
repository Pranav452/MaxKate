import Image from "next/image";
import Link from "next/link";

export default function ClubPage() {
  return (
    <div className="relative min-h-screen">
      {/* Background Image with Flickering Effect */}
      <div className="fixed inset-0 -z-10 animate-flicker">
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

      {/* Light Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-1 h-1 bg-blue-500 blur-xl animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-500 blur-xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-red-500 blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold text-white mb-4 animate-pulse">
          MAX&apos;S CLUB
        </h1>
        
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

        {/* Right Arrow Navigation */}
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