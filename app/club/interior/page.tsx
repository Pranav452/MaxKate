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
    video: "/monononon.mp4",
    audio: "/MonoRail.mp3"
  },
  {
    title: "CRASHOVER 220D",
    description: "High-energy electronic music experience featuring cutting-edge sound design and pulsating beats.",
    image: "/bg2.jpg",
    video: "/monononon.mp4",
    audio: "/MonoRail.mp3"
  },
  {
    title: "Monday Girl",
    description: "Immerse yourself in smooth Chill House vibes. A perfect blend of relaxing beats and melodic atmospheres.",
    image: "/stagebg.jpg",
    video: "/monononon.mp4",
    audio: "/MonoRail.mp3"
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
  const [isDragging, setIsDragging] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const mouseTimer = useRef<NodeJS.Timeout | null>(null);
  const [volume, setVolume] = useState(0.7);
  const [prevVolume, setPrevVolume] = useState(0.7);
  const volumeBarRef = useRef<HTMLDivElement>(null);
  const [isDraggingVolume, setIsDraggingVolume] = useState(false);

  // Format time in MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Handle audio time update
  const handleAudioTimeUpdate = (audio: HTMLAudioElement) => {
    if (!isDragging) {
      setAudioProgress((audio.currentTime / audio.duration) * 100);
      setAudioCurrentTime(audio.currentTime);
    }
  };

  // Handle progress bar mouse down
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    handleProgressBarInteraction(e);
  };

  // Handle progress bar mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setShowControls(true);
    if (mouseTimer.current) {
      clearTimeout(mouseTimer.current);
    }
    mouseTimer.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    if (isDragging) {
      handleProgressBarInteraction(e);
    }
  };

  // Handle progress bar mouse up
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle progress bar interaction
  const handleProgressBarInteraction = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioElement && progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;
      const newTime = (percentage / 100) * audioDuration;
      
      setAudioProgress(percentage);
      setAudioCurrentTime(newTime);
      
      if (!isDragging) {
        audioElement.currentTime = newTime;
      }
    }
  };

  // Handle volume mouse down
  const handleVolumeMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDraggingVolume(true);
    handleVolumeChange(e);
  };

  // Handle volume mouse move
  const handleVolumeMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDraggingVolume) {
      handleVolumeChange(e);
    }
  };

  // Handle volume mouse up
  const handleVolumeMouseUp = () => {
    setIsDraggingVolume(false);
  };

  // Handle volume change
  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    if (volumeBarRef.current) {
      const rect = volumeBarRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const newVolume = Math.max(0, Math.min(x / rect.width, 1));
      setVolume(newVolume);
      if (audioElement) {
        audioElement.volume = newVolume;
      }
    }
  };

  // Handle volume toggle (mute/unmute)
  const handleVolumeToggle = () => {
    if (audioElement) {
      if (volume > 0) {
        setPrevVolume(volume);
        setVolume(0);
        audioElement.volume = 0;
      } else {
        const newVolume = prevVolume || 0.7;
        setVolume(newVolume);
        audioElement.volume = newVolume;
      }
    }
  };

  // Handle audio playback
  const handleAudioToggle = (genre: MusicGenre) => {
    if (audioElement) {
      if (isPlayingAudio) {
        audioElement.pause();
        setIsPlayingAudio(false);
      } else {
        audioElement.play();
        setIsPlayingAudio(true);
      }
    } else {
      const audio = new Audio(genre.audio);
      audio.loop = true;
      audio.volume = volume;
      
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

  // Cleanup event listeners
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
      setIsDraggingVolume(false);
    };
    
    document.addEventListener('mouseup', handleGlobalMouseUp);
    document.addEventListener('mousemove', (e) => {
      if (isDraggingVolume && volumeBarRef.current) {
        handleVolumeChange(e as unknown as React.MouseEvent<HTMLDivElement>);
      }
    });
    
    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      if (mouseTimer.current) {
        clearTimeout(mouseTimer.current);
      }
    };
  }, [isDraggingVolume, handleVolumeChange]);

  // Handle exit
  const handleExit = () => {
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
      setAudioElement(null);
      setIsPlayingAudio(false);
    }
    if (mouseTimer.current) {
      clearTimeout(mouseTimer.current);
    }
    setShowControls(true);
    setSelectedGenre(null);
  };

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
          className="fixed inset-0 bg-black z-40"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setShowControls(false)}
        >
          {/* Exit Button */}
          <Link 
            href="/club"
            className={`fixed top-4 left-16 z-50 bg-white/10 backdrop-blur-sm px-5 py-1 rounded-full text-white border-2 border-white/20 
                     hover:bg-white/20 transition-all duration-300 text-lg font-bold ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            style={{ pointerEvents: showControls ? 'auto' : 'none' }}
            tabIndex={showControls ? 0 : -1}
            aria-hidden={!showControls}
          >
            Exit Club
          </Link>

          {/* Video Background */}
          <div className="relative w-full h-full">
            <video 
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={selectedGenre.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Top Controls Bar */}
            <div className={`absolute top-0 left-0 right-0 p-4 flex justify-between items-center transition-opacity duration-300 z-50 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
              {/* Left Section - Close Button */}
              <button 
                onClick={handleExit}
                className="text-white/90 hover:text-white p-2 rounded-full transition-colors bg-black/20 backdrop-blur-sm relative z-50 cursor-pointer hover:bg-black/40"
                style={{ pointerEvents: 'auto' }}
                aria-label="Close player"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleExit()}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Center Title */}
              <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
                <h2 className="text-2xl font-bold text-white">{selectedGenre.title}</h2>
              </div>

              {/* Right Section - Volume */}
              <div className="flex items-center gap-2 relative z-50" style={{ pointerEvents: 'auto' }}>
                <div 
                  ref={volumeBarRef}
                  className="w-24 h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer group relative"
                  onMouseDown={handleVolumeMouseDown}
                  onMouseMove={handleVolumeMouseMove}
                  onMouseUp={handleVolumeMouseUp}
                  onClick={handleVolumeChange}
                  role="slider"
                  aria-label="Volume"
                  aria-valuenow={Math.round(volume * 100)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowRight') {
                      const newVolume = Math.min(1, volume + 0.1);
                      setVolume(newVolume);
                      if (audioElement) audioElement.volume = newVolume;
                    } else if (e.key === 'ArrowLeft') {
                      const newVolume = Math.max(0, volume - 0.1);
                      setVolume(newVolume);
                      if (audioElement) audioElement.volume = newVolume;
                    }
                  }}
                >
                  <div 
                    className="h-full bg-white transition-all duration-150"
                    style={{ width: `${volume * 100}%` }}
                  />
                  <div 
                    className="absolute h-3 w-3 bg-white rounded-full top-1/2 -mt-1.5 -ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ left: `${volume * 100}%` }}
                  />
                </div>
                <button 
                  onClick={handleVolumeToggle}
                  className="text-white/90 hover:text-white transition-colors p-2 rounded-full hover:bg-black/20"
                  aria-label={volume === 0 ? "Unmute" : "Mute"}
                  tabIndex={0}
                >
                  {volume === 0 ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3.63 3.63a.996.996 0 000 1.41L7.29 8.7 7 9H3v6h4l5 5v-6.59l4.18 4.18c-.65.49-1.38.88-2.18 1.11v2.06a8.986 8.986 0 003.76-1.89l1.91 1.91a.996.996 0 101.41-1.41L5.05 3.63a.996.996 0 00-1.42 0zM19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53c.56-1.17.88-2.48.88-3.87 0-3.83-2.4-7.11-5.78-8.4v2.06c2.31 1.13 3.78 3.46 3.78 6.34zm-7-4.59l4.59 4.59L16 13.41v-6h-.59L12 9.41zM12 4L9.03 6.43l1.42 1.42L12 6.41v-2.4z"/>
                    </svg>
                  ) : volume < 0.5 ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Center Play/Pause Button */}
            <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <button 
                onClick={() => selectedGenre && handleAudioToggle(selectedGenre)}
                className="text-white/90 hover:text-white p-4 rounded-full transition-all duration-300 transform hover:scale-110"
              >
                {isPlayingAudio ? (
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                  </svg>
                ) : (
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                )}
              </button>
            </div>

            {/* Bottom Controls */}
            <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent pb-8 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              {/* Info */}
              <div className="px-4 py-2">
                <p className="text-white/60 text-sm">Forests</p>
              </div>

              {/* Progress Bar */}
              <div className="px-4 pb-6">
                <div className="flex items-center gap-4">
                  {/* Time */}
                  <span className="text-white/80 text-sm">{formatTime(audioCurrentTime)}</span>
                  
                  {/* Progress Bar */}
                  <div 
                    ref={progressBarRef}
                    className="flex-1 h-1 bg-white/20 rounded-full cursor-pointer group relative"
                    onClick={handleProgressBarInteraction}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                  >
                    <div 
                      className="absolute h-full bg-white rounded-full"
                      style={{ width: `${audioProgress}%` }}
                    />
                    <div 
                      className="absolute h-3 w-3 bg-white rounded-full -top-1 -ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ left: `${audioProgress}%` }}
                    />
                  </div>

                  {/* Duration */}
                  <span className="text-white/60 text-sm">-{formatTime(audioDuration - audioCurrentTime)}</span>

                  {/* Additional Controls */}
                  {/* <button className="text-white/80 hover:text-white p-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7 16h10V8H7v8zm-2 4V4h14v16H5z"/>
                    </svg>
                  </button> */}
                </div>
              </div>
            </div>
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