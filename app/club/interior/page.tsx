'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

interface MusicGenre {
  title: string;
  description: string;
  image: string;
  video: string;
  audio: string;
}

const musicGenres: MusicGenre[] = [
  {
    title: "MONORAIL",
    description: "Experience the vibrant electronic beats at Garden Of Dreams, Goa. A mesmerizing journey through sound and rhythm.",
    image: "/monorail.jpg",
    video: "/mono.mp4",
    audio: "/monorail.mp3"
  },
  {
    title: "CRASHOVER 220D",
    description: "High-energy electronic music experience featuring cutting-edge sound design and pulsating beats.",
    image: "/bg2.jpg",
    video: "/crashover-video.mp4",
    audio: "/crashover-set.mp3"
  },
  {
    title: "Monday Girl",
    description: "Immerse yourself in smooth Chill House vibes. A perfect blend of relaxing beats and melodic atmospheres.",
    image: "/stagebg.jpg",
    video: "/mondaygirl-video.mp4",
    audio: "/mondaygirl-set.mp3"
  }
];

export default function ClubInterior() {
  const [selectedGenre, setSelectedGenre] = useState<MusicGenre | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [showControls, setShowControls] = useState(true);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const mouseTimer = useRef<NodeJS.Timeout | null>(null);

  // Format time in MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Handle audio time update
  const handleAudioTimeUpdate = (audio: HTMLAudioElement) => {
    setAudioProgress((audio.currentTime / audio.duration) * 100);
    setAudioCurrentTime(audio.currentTime);
  };

  // Handle audio progress bar click
  const handleAudioProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioElement) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      const newTime = (percentage / 100) * audioDuration;
      audioElement.currentTime = newTime;
      setAudioProgress(percentage);
    }
  };

  // Handle mouse movement
  const handleMouseMove = () => {
    setShowControls(true);
    if (mouseTimer.current) {
      clearTimeout(mouseTimer.current);
    }
    mouseTimer.current = setTimeout(() => {
      setShowControls(false);
    }, 3000); // Hide controls after 3 seconds of no mouse movement
  };

  // Handle audio playback
  const handleAudioToggle = (genre: MusicGenre) => {
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
    }

    if (!isPlayingAudio || selectedGenre?.title !== genre.title) {
      const audio = new Audio(genre.audio);
      audio.loop = true;
      
      // Add event listeners for audio
      audio.addEventListener('timeupdate', () => handleAudioTimeUpdate(audio));
      audio.addEventListener('loadedmetadata', () => {
        setAudioDuration(audio.duration);
      });
      audio.addEventListener('ended', () => {
        setIsPlayingAudio(false);
        setAudioElement(null);
      });

      audio.play();
      setAudioElement(audio);
      setIsPlayingAudio(true);
    } else {
      setAudioElement(null);
      setIsPlayingAudio(false);
      setAudioProgress(0);
      setAudioCurrentTime(0);
    }
  };

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
      }
    };
  }, [audioElement]);

  // Cleanup mouse timer
  useEffect(() => {
    return () => {
      if (mouseTimer.current) {
        clearTimeout(mouseTimer.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black/95 to-black/90 py-20">
      {/* Exit Button */}
      <Link 
        href="/club"
        className="fixed bottom-4 right-8 z-50 bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full text-white border-2 border-white/20 
                 hover:bg-white/20 transition-all duration-300 text-xl font-bold"
        onClick={() => {
          if (audioElement) {
            audioElement.pause();
            audioElement.currentTime = 0;
          }
        }}
      >
        Exit Club
      </Link>

      {selectedGenre ? (
        // Video and Audio Controls View
        <div 
          className="fixed inset-0 bg-black/95 z-40"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setShowControls(false)}
        >
          {/* Video Background */}
          <div className="relative w-full h-full">
            <video 
              className="w-full h-full object-cover cursor-pointer"
              autoPlay
              muted
              loop
              playsInline
          
            >
              <source src={selectedGenre.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Spotify-like Controls */}
            <div className={`absolute bottom-0 left-0 right-0 bg-black/90 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              {/* Audio Progress Bar */}
              <div 
                className="w-full h-1 bg-white/20 cursor-pointer group"
                onClick={handleAudioProgressClick}
              >
                <div 
                  className="h-full bg-green-500 group-hover:bg-green-400 transition-colors"
                  style={{ width: `${audioProgress}%` }}
                />
              </div>

              <div className="container mx-auto px-4 py-4">
                <div className="flex items-center gap-8">
                  {/* Left Section - Audio Time and Status */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-white/80 text-sm">{formatTime(audioCurrentTime)}</span>
                      <span className="text-white/60 text-sm">/</span>
                      <span className="text-white/60 text-sm">{formatTime(audioDuration)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className={`w-5 h-5 ${isPlayingAudio ? 'text-green-500' : 'text-white/60'}`} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                      </svg>
                      <span className={`text-sm ${isPlayingAudio ? 'text-green-500' : 'text-white/60'}`}>
                        {isPlayingAudio ? 'Playing' : 'Muted'}
                      </span>
                    </div>
                  </div>

                  {/* Center Section - Audio Controls & Title */}
                  <div className="flex flex-col items-center gap-3 flex-1">
                    {/* Title */}
                    {/* <div className="text-center">
                      <h3 className="text-white text-lg font-medium">{selectedGenre.title}</h3>
                      <p className="text-white/60 text-sm">Audio Set</p>
                    </div> */}
                    
                    {/* Play/Pause Button */}
                    <button 
                      onClick={() => handleAudioToggle(selectedGenre)}
                      className="flex items-center justify-center bg-white rounded-full p-3 hover:scale-105 transition-all duration-300 group"
                    >
                      {isPlayingAudio ? (
                        <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                        </svg>
                      ) : (
                        <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      )}
                    </button>
                  </div>

                  {/* Empty right section for spacing */}
                  <div className="w-[200px]"></div>
                </div>
              </div>
            </div>

            {/* Title */}
            <div className={`absolute top-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
              <h2 className="text-4xl font-bold text-white">{selectedGenre.title}</h2>
            </div>

            {/* Close Button */}
            <button 
              onClick={() => {
                setSelectedGenre(null);
                if (audioElement) {
                  audioElement.pause();
                  audioElement.currentTime = 0;
                  setAudioElement(null);
                  setIsPlayingAudio(false);
                }
              }}
              className={`absolute top-8 right-8 text-white/80 hover:text-white z-50 bg-black/30 backdrop-blur-sm p-2 rounded-full transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-20 space-y-6">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-gradient-x">
              Experience The Sound
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              Immerse yourself in a world of sonic excellence. Choose your vibe and let the music take control.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mx-auto rounded-full mt-8"></div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 perspective-1000">
            {musicGenres.map((genre, index) => (
              <div
                key={genre.title}
                onClick={() => setSelectedGenre(genre)}
                className="group cursor-pointer transform transition-all duration-500 hover:scale-105"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20">
                  {/* Card Image */}
                  <div className="relative h-[200px] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                    <Image
                      src={genre.image}
                      alt={genre.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                          <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-8">
                    <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors duration-300">
                      {genre.title}
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {genre.description}
                    </p>
                    <div className="mt-6 inline-flex items-center gap-3 text-white/60 group-hover:text-white transition-colors duration-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      </svg>
                      <span className="text-base font-medium">Experience Now</span>
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