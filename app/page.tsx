import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/bg2.jpg"
          alt="Background"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>

      {/* Transparent Navbar */}
      <nav className="bg-black/30 backdrop-blur-sm fixed w-full top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-center text-white font-bold text-3xl">
            MAXKATE
          </h1>
        </div>
      </nav>

      {/* Main Content with Video Player */}
      <main className="relative w-full h-screen flex items-center justify-center">
        {/* Video container positioned relative to viewport */}
        <div className="absolute w-[45%] aspect-[16/10] top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-16">
          <video 
            className="w-full h-full rounded-lg"
            autoPlay
            loop
            playsInline
            muted
          >
            <source src="/teaser1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Right Arrow Navigation */}
        <Link 
          href="/stage"
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
      </main>
    </div>
  );
}
