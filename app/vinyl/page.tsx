'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const songs = [
  {
    id: 1,
    title: "Techno Dreams",
    artist: "Max Kate",
    duration: "3:45",
    audioUrl: "/teaser1.mp4"
  },
  {
    id: 2,
    title: "House Vibes",
    artist: "Max Kate",
    duration: "4:20",
    audioUrl: "/teaser1.mp4"
  },
  {
    id: 3,
    title: "Deep Journey",
    artist: "Max Kate",
    duration: "5:15",
    audioUrl: "/teaser1.mp4"
  }
];

export default function VinylPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const togglePlay = async () => {
    if (!audioRef.current) return;
    
    try {
      if (isPlaying) {
        await audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Playback error:', error);
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  };

  const playSong = async (song: typeof songs[0]) => {
    try {
      setIsLoading(true);
      setCurrentSong(song);
      
      if (audioRef.current) {
        audioRef.current.src = song.audioUrl;
        await audioRef.current.load();
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error playing song:', error);
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  };

  const playNext = () => {
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const nextSong = songs[(currentIndex + 1) % songs.length];
    playSong(nextSong);
  };

  const playPrevious = () => {
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const previousSong = songs[(currentIndex - 1 + songs.length) % songs.length];
    playSong(previousSong);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current && audioRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const percentage = x / rect.width;
      const newTime = percentage * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      // Set initial source
      audio.src = currentSong.audioUrl;
      audio.load();

      const handleCanPlay = () => {
        setIsLoading(false);
      };

      const handleError = (e: ErrorEvent) => {
        console.error('Audio error:', e);
        setIsPlaying(false);
        setIsLoading(false);
      };

      audio.addEventListener('canplay', handleCanPlay);
      audio.addEventListener('error', handleError);
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('loadedmetadata', handleTimeUpdate);

      return () => {
        audio.removeEventListener('canplay', handleCanPlay);
        audio.removeEventListener('error', handleError);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('loadedmetadata', handleTimeUpdate);
      };
    }
  }, [currentSong.audioUrl]);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black to-zinc-900 overflow-hidden">
      {/* Main Vinyl Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Vinyl Record */}
        <div className="relative">
          {/* Vinyl Base */}
          <div className={`relative w-[500px] h-[500px] rounded-full bg-black 
                        ${isPlaying ? 'animate-vinyl-spin' : ''} 
                        transition-all duration-1000 ease-in-out`}>
            {/* Vinyl Grooves */}
            <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-white/5" />
            <div className="absolute inset-[50px] rounded-full border-t-2 border-r-2 border-white/5" />
            <div className="absolute inset-[100px] rounded-full border-t-2 border-r-2 border-white/5" />
            <div className="absolute inset-[150px] rounded-full border-t-2 border-r-2 border-white/5" />
            
            {/* Center Label */}
            <div className="absolute top-1/2 left-1/2 w-[150px] h-[150px] -translate-x-1/2 -translate-y-1/2
                          rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900
                          flex items-center justify-center shadow-lg">
              <div className="text-white/80 text-center">
                <p className="font-bold">MAX KATE</p>
                <p className="text-sm opacity-60">{currentSong.title}</p>
              </div>
              {/* Center Hole */}
              <div className="absolute top-1/2 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2
                            rounded-full bg-black border border-white/10" />
            </div>

            {/* Vinyl Reflection */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/5 to-transparent" />
          </div>
        </div>
      </div>

      {/* Enhanced Controls */}
      <div className="fixed bottom-0 inset-x-0 bg-black/80 backdrop-blur-sm border-t border-white/10">
        <div className="container mx-auto px-8 py-4">
          {/* Timeline */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-white/60 text-sm w-12">{formatTime(currentTime)}</span>
            <div 
              ref={progressRef}
              onClick={handleProgressClick}
              className="flex-1 h-1 bg-white/10 rounded-full cursor-pointer group relative"
            >
              <div 
                className="absolute inset-y-0 left-0 bg-white rounded-full transition-all duration-150"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
              <div className="absolute inset-y-0 left-0 w-3 h-3 bg-white rounded-full -translate-y-1 opacity-0 group-hover:opacity-100 transition-opacity"
                   style={{ left: `${(currentTime / duration) * 100}%` }}
              />
            </div>
            <span className="text-white/60 text-sm w-12">{formatTime(duration)}</span>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-white font-medium">{currentSong.title}</h3>
              <p className="text-white/60 text-sm">{currentSong.artist}</p>
            </div>

            <div className="flex items-center gap-8">
              {/* Previous */}
              <button 
                onClick={playPrevious}
                disabled={isLoading}
                className="text-white/60 hover:text-white transition-colors disabled:opacity-50"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Play/Pause */}
              <button
                onClick={togglePlay}
                disabled={isLoading}
                className="w-14 h-14 rounded-full bg-white flex items-center justify-center
                         hover:scale-105 transition-transform disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : isPlaying ? (
                  <svg className="w-6 h-6" fill="black" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7 0a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75V5.25z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 ml-1" fill="black" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" />
                  </svg>
                )}
              </button>

              {/* Next */}
              <button 
                onClick={playNext}
                disabled={isLoading}
                className="text-white/60 hover:text-white transition-colors disabled:opacity-50"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Volume Control */}
            <div className="flex-1 flex justify-end items-center gap-2">
              <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
              <div className="w-24 bg-white/10 rounded-full h-1 cursor-pointer">
                <div className="bg-white h-full rounded-full w-1/2" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Playlist Button */}
      <button
        onClick={() => setShowPlaylist(!showPlaylist)}
        className="fixed top-8 right-8 z-50 bg-white/10 backdrop-blur-sm px-6 py-3 
                 rounded-full text-white border border-white/20 hover:bg-white/20"
      >
        Playlist
      </button>

      {/* Playlist Dropdown */}
      {showPlaylist && (
        <div className="fixed top-24 right-8 w-80 bg-black/90 backdrop-blur-sm 
                     border border-white/20 rounded-xl overflow-hidden z-50">
          {songs.map((song) => (
            <button
              key={song.id}
              onClick={() => {
                playSong(song);
                setShowPlaylist(false);
              }}
              className={`w-full px-6 py-4 text-left hover:bg-white/10 transition-colors
                       ${currentSong.id === song.id ? 'bg-white/20' : ''}`}
            >
              <div className="text-white font-medium">{song.title}</div>
              <div className="text-white/60 text-sm">{song.artist}</div>
            </button>
          ))}
        </div>
      )}

      {/* Back to Club */}
      <Link
        href="/club"
        className="fixed top-8 left-8 z-50 bg-white/10 backdrop-blur-sm px-6 py-3 
                 rounded-full text-white border border-white/20 hover:bg-white/20"
      >
        Back to Club
      </Link>

      {/* Hidden Audio Player */}
      <audio 
        ref={audioRef}
        onEnded={playNext}
        preload="auto"
      />
    </div>
  );
} 