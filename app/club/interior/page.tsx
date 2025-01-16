'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface MusicGenre {
  title: string;
  description: string;
  image: string;
  video: string;
}

const musicGenres: MusicGenre[] = [
  {
    title: "TECHNO",
    description: "Experience the cutting-edge of electronic music with Max Kate's signature techno sets. Dark, hypnotic, and powerful.",
    image: "/bg1.jpg",
    video: "/teaser1.mp4"
  },
  {
    title: "HOUSE MUSIC",
    description: "Feel the groove with Max Kate's house music. Soulful melodies meet driving rhythms in perfect harmony.",
    image: "/bg2.jpg",
    video: "/teaser1.mp4"
  },
  {
    title: "AMBIENT",
    description: "Immerse yourself in Max Kate's atmospheric soundscapes. A journey through ethereal and evolving textures.",
    image: "/stagebg.jpg",
    video: "/teaser1.mp4"
  }
];

export default function ClubInterior() {
  const [selectedGenre, setSelectedGenre] = useState<MusicGenre | null>(null);

  return (
    <div className="min-h-screen bg-black/95 flex items-center justify-center p-8">
      {/* Exit Button */}
      <Link 
        href="/club"
        className="fixed bottom-8 right-8 z-50 bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full text-white border-2 border-white/20 
                 hover:bg-white/20 transition-all duration-300 text-xl font-bold"
      >
        Exit Club
      </Link>

      {selectedGenre ? (
        // Video View
        <div className="fixed inset-0 bg-black/95 z-40 flex items-center justify-center">
          <div className="relative w-[90vw] max-w-6xl aspect-video">
            <video 
              className="w-full h-full rounded-lg"
              controls
              autoPlay
              playsInline
            >
              <source src={selectedGenre.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <button 
              onClick={() => setSelectedGenre(null)}
              className="absolute -top-12 right-0 text-white/80 hover:text-white"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        // Cards View
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {musicGenres.map((genre) => (
              <div
                key={genre.title}
                onClick={() => setSelectedGenre(genre)}
                className="group cursor-pointer"
              >
                <div className="bg-black border border-white/10 rounded-xl overflow-hidden hover:border-white/30 transition-all duration-300">
                  {/* Card Image */}
                  <div className="relative h-[300px] overflow-hidden">
                    <Image
                      src={genre.image}
                      alt={genre.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-6 bg-gradient-to-b from-black/80 to-black">
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {genre.title}
                    </h3>
                    <p className="text-white/80 text-lg">
                      {genre.description}
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 text-white/60 group-hover:text-white/90 transition-colors duration-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      </svg>
                      <span className="text-sm">Watch Video</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 