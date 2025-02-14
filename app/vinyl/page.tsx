'use client';

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const songs = [
  {
    id: 1,
    title: "Paradise",
    artist: "Max Kate",
    duration: "3:45",
    audioUrl: "/vinyl-playlist/1- PARADISE.wav"
  },
  {
    id: 2,
    title: "Sink",
    artist: "Max Kate & Xeede",
    duration: "4:20",
    audioUrl: "/vinyl-playlist/2- SINK (BACKINGS).wav"
  },
  {
    id: 3,
    title: "Gum Gaye",
    artist: "Max Kate & Xeede",
    duration: "4:15",
    audioUrl: "/vinyl-playlist/3- GUM GAYE.wav"
  },
  {
    id: 4,
    title: "18",
    artist: "Max Kate & Xeede",
    duration: "3:55",
    audioUrl: "/vinyl-playlist/4 - 18 (DUET).wav"
  },
  {
    id: 5,
    title: "Zara",
    artist: "Max Kate",
    duration: "4:10",
    audioUrl: "/vinyl-playlist/5 - ZARA (DUET).mp3"
  },
  {
    id: 6,
    title: "Khoye Se",
    artist: "Max Kate & Xeede",
    duration: "4:30",
    audioUrl: "/vinyl-playlist/6 - KHOYE SE (BACKINGS).mp3"
  },
  {
    id: 7,
    title: "Young Again",
    artist: "Max Kate feat. A.Dman",
    duration: "4:25",
    audioUrl: "/vinyl-playlist/7 - YOUNG AGAIN (BACKINGS).mp3"
  },
  {
    id: 8,
    title: "Jiyein Aise Kyun",
    artist: "Max Kate",
    duration: "4:05",
    audioUrl: "/vinyl-playlist/8 - JIYEIN AISE KYUN (DUET).wav"
  },
  {
    id: 9,
    title: "Don't Follow Me Now",
    artist: "Max Kate",
    duration: "4:15",
    audioUrl: "/vinyl-playlist/9 - DONT FOLLOW ME NOW (BACKINGS).wav"
  },
  {
    id: 10,
    title: "I Was Born Again",
    artist: "Max Kate & Xeede",
    duration: "4:35",
    audioUrl: "/vinyl-playlist/10 - I WAS BORN AGAIN  (BACKINGS).wav"
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
  const [volume, setVolume] = useState(1);

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

  const handleVolumeChange = (event: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current && audioRef.current) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const percentage = x / rect.width;
      const newVolume = Math.max(0, Math.min(1, percentage));
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
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
    <div 
      className="relative min-h-screen bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: 'url("/studio.jpg")' }}
    >
      {/* Main Vinyl Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Vinyl Record */}
        <div className="relative">
          {/* Vinyl Base */}
          <div className={`relative w-[500px] h-[500px] rounded-full bg-black 
                        ${isPlaying ? 'animate-vinyl-spin' : 'transition-transform duration-1000'} 
                        transform-gpu`}>
            {/* Vinyl Grooves */}
            <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-white/5 transform-gpu" />
            <div className="absolute inset-[50px] rounded-full border-t-2 border-r-2 border-white/5 transform-gpu" />
            <div className="absolute inset-[100px] rounded-full border-t-2 border-r-2 border-white/5 transform-gpu" />
            <div className="absolute inset-[150px] rounded-full border-t-2 border-r-2 border-white/5 transform-gpu" />
            
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
                aria-label="Play previous song"
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
                aria-label={isPlaying ? "Pause" : "Play"}
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
                aria-label="Play next song"
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
              <div 
                onClick={handleVolumeChange}
                className="w-24 bg-white/10 rounded-full h-1 cursor-pointer"
              >
                <div 
                  className="bg-white h-full rounded-full transition-all duration-150"
                  style={{ width: `${volume * 100}%` }} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Playlist Button */}
      <div className="fixed top-8 right-8 z-50 flex items-center gap-4">
        <button
          onClick={() => setShowPlaylist(!showPlaylist)}
          aria-label="Toggle playlist"
          aria-expanded={showPlaylist}
          className="bg-black backdrop-blur-sm px-6 py-3 
                   rounded-full text-white border border-white/20 hover:bg-white/20"
        >
          Playlist
        </button>

        {/* <Link
          href="/booking"
          className="group bg-white/10 backdrop-blur-sm p-4 rounded-full border border-white/20 
                   hover:bg-white/20 transition-all duration-300"
        >
          <svg 
            className="w-6 h-6 text-white transform transition-transform duration-300 group-hover:translate-x-1" 
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
        </Link> */}
      </div>

      {/* Playlist Dropdown */}
      {showPlaylist && (
        <div className="fixed top-24 right-8 w-80 bg-black/90 backdrop-blur-sm 
                     border border-white/20 rounded-xl overflow-hidden z-50">
          {/* First Three Songs - Always Visible */}
          {/* {songs.slice(0, 3).map((song) => (
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
          ))} */}

          {/* Scrollable Section for Remaining Songs - Fixed Height for 4 Songs */}
          <div className="h-[256px] overflow-hidden">
            <div className="overflow-y-auto h-full scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
              {songs.slice(0).map((song) => (
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
          </div>
        </div>
      )}

      {/* Navigation */}
      <Link
        href="/club"
        className="fixed left-8 top-1/2 transform -translate-y-1/2 z-50 group"
      >
        <div className="bg-black backdrop-blur-sm p-4 rounded-full cursor-pointer transition-all duration-300 hover:bg-white/30">
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
        href="/booking"
        className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 group"
      >
        <div className="bg-black backdrop-blur-sm p-4 rounded-full cursor-pointer transition-all duration-300 hover:bg-white/30">
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

      {/* Back to Club */}
      <Link
        href="/club"
        className="fixed top-8 left-8 z-50 bg-black backdrop-blur-sm px-6 py-3 
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