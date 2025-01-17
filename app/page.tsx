import SpaceBriefcase from "./components/SpaceBriefcase";
import Link from "next/link";
import { Orbitron, Syncopate, Rajdhani } from 'next/font/google';

const orbitron = Orbitron({ subsets: ['latin'] });
const syncopate = Syncopate({ subsets: ['latin'], weight: ['400', '700'] });
const rajdhani = Rajdhani({ subsets: ['latin'], weight: ['500'] });

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black">
      {/* Space Background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 via-black to-black">
        {/* Stars effect */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%), url("/stars.png")',
          backgroundSize: '200px 200px',
          animation: 'twinkle 8s linear infinite'
        }} />
      </div>

      {/* Transparent Navbar */}
      <nav className="bg-black fixed w-full top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Left Navigation */}
          <div className="flex items-center gap-8">
            <Link href="/presskit" className={`${rajdhani.className} text-white/80 hover:text-white transition-colors text-lg tracking-wider`}>
              PRESS KIT
            </Link>
            <Link href="/tours" className={`${rajdhani.className} text-white/80 hover:text-white transition-colors text-lg tracking-wider`}>
              TOURS
            </Link>
          </div>

          {/* Center Logo */}
          <h1 className={`${orbitron.className} text-white font-bold text-3xl absolute left-1/2 transform -translate-x-1/2 tracking-[0.2em]`}>
            MAXKATE
          </h1>

          {/* Right CTA */}
          <div className="group relative">
            <button 
              className={`${syncopate.className} bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full text-white border border-white/20 
                       hover:bg-white/20 transition-all duration-300 tracking-[0.15em] font-bold`}
              disabled
            >
              MERCH
            </button>
            <div className={`${rajdhani.className} absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm 
                          px-4 py-2 rounded-lg text-white text-sm opacity-0 group-hover:opacity-100 
                          transition-opacity duration-300 whitespace-nowrap tracking-wider`}>
              Coming Soon
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative min-h-screen flex items-center justify-center">
        {/* Latest Teaser Text */}
        <div className="absolute top-32 left-1/2 transform -translate-x-1/2 text-center z-10">
          <h2 className="text-4xl font-bold text-white mb-2 tracking-wider animate-pulse">
            Latest Teaser
          </h2>
          <div className="h-0.5 w-32 mx-auto bg-gradient-to-r from-transparent via-white to-transparent opacity-50"></div>
        </div>
        <SpaceBriefcase />
      </main>

      {/* Navigation */}
      <Link 
        href="/stage"
        className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 group"
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
  );
}
