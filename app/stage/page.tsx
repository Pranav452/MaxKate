'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Types
interface Show {
  id: string;
  date: Date;
  title: string;
  venue: string;
  description: string;
  isPast: boolean;
}

// Mock Data
const SHOWS_DATA: Show[] = [
  {
    id: "1",
    date: new Date(2024, 1, 15),
    title: "Live at Madison Square Garden",
    venue: "Madison Square Garden",
    description: "A spectacular night of electronic music in the heart of NYC",
    isPast: false
  },
  {
    id: "2",
    date: new Date(2024, 2, 20),
    title: "Summer Festival",
    venue: "Central Park",
    description: "An outdoor festival featuring the best electronic music",
    isPast: false
  }
];

// Components
const NavigationArrow = ({ href, direction }: { href: string; direction: 'left' | 'right' }) => (
  <Link href={href} className={`fixed ${direction === 'left' ? 'left-12' : 'right-12'} top-1/2 -translate-y-1/2 z-50 group`}>
    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-full cursor-pointer transition-all duration-300 hover:bg-white/30">
      <svg 
        className={cn(
          "w-8 h-8 text-white transform transition-transform duration-300",
          direction === 'left' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'
        )}
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
);

const Calendar = ({
  currentMonth,
  currentYear,
  selectedDate,
  shows,
  onDateSelect,
  onMonthChange
}: {
  currentMonth: number;
  currentYear: number;
  selectedDate: Date;
  shows: Show[];
  onDateSelect: (date: Date) => void;
  onMonthChange: (month: number, year: number) => void;
}) => {
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      onMonthChange(11, currentYear - 1);
    } else {
      onMonthChange(currentMonth - 1, currentYear);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      onMonthChange(0, currentYear + 1);
    } else {
      onMonthChange(currentMonth + 1, currentYear);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center text-white">
        <button 
          onClick={handlePrevMonth}
          className="p-2 hover:bg-white/10 rounded-lg"
        >
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        <div className="font-medium">
          {new Date(currentYear, currentMonth).toLocaleDateString('en-US', { 
            month: 'long',
            year: 'numeric'
          })}
        </div>
        <button 
          onClick={handleNextMonth}
          className="p-2 hover:bg-white/10 rounded-lg"
        >
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-white/60 text-sm py-2">
            {day}
          </div>
        ))}
        
        {Array.from({ length: 35 }, (_, i) => {
          const date = new Date(currentYear, currentMonth, i - new Date(currentYear, currentMonth, 1).getDay() + 1);
          const isCurrentMonth = date.getMonth() === currentMonth;
          const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
          const show = shows.find(show => show.date.toDateString() === date.toDateString());

          return (
            <button
              key={i}
              onClick={() => onDateSelect(date)}
              className={cn(
                "p-2 text-sm rounded-lg transition-colors relative",
                isCurrentMonth ? "text-white" : "text-white/20",
                isSelected ? "bg-purple-500" : "hover:bg-white/10",
                show ? "ring-2 ring-purple-500/50" : ""
              )}
            >
              <span>{date.getDate()}</span>
              {show && (
                <div className="absolute inset-x-0 bottom-1 text-[10px] text-purple-300 truncate px-1">
                  {show.title}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Main Page Component
export default function StagePage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());

  const selectedShow = SHOWS_DATA.find(show => 
    show.date.toDateString() === selectedDate?.toDateString()
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/stagebg.jpg"
          alt="Stage Background"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          sizes="100vw"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      </div>

      {/* Navigation */}
      <NavigationArrow href="/" direction="left" />
      <NavigationArrow href="/club" direction="right" />

      {/* Main Content */}
      <div className="relative flex-1 flex flex-col gap-8 p-12">
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-5xl font-bold text-white tracking-wider animate-fade-in-down">
            SHOWS & EVENTS
          </h1>
          <div className="h-0.5 w-48 mx-auto bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-[1fr,400px] gap-8 p-24">
          {/* Show Details */}
          <div className="flex flex-col justify-center">
            <div className="max-w-2xl space-y-8">
              <h1 className="text-6xl font-bold text-white opacity-0 animate-slide-up" 
                  style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
                {selectedShow ? selectedShow.title : "Select a Show"}
              </h1>
              
              <p className="text-2xl text-white/90 opacity-0 animate-slide-up" 
                 style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
                {selectedShow ? selectedShow.venue : "Browse upcoming and past shows"}
              </p>
              
              <p className="text-lg text-white/80 max-w-xl opacity-0 animate-slide-up leading-relaxed" 
                 style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}>
                {selectedShow ? selectedShow.description : "Click on a show from the calendar to view details and booking options."}
              </p>

              {selectedShow && !selectedShow.isPast && (
                <div className="opacity-0 animate-slide-up" 
                     style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
                  <Button
                    onClick={() => window.location.href = '/booking'}
                    className="bg-purple-500 text-white px-8 py-6 rounded-full font-semibold 
                             transform transition-all duration-300 hover:scale-105 hover:bg-purple-600
                             shadow-lg shadow-purple-500/25"
                  >
                    Book Show
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Calendar */}
          <div className="relative pt-10">
            <div className="sticky top-8 bg-black/60 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <Calendar
                currentMonth={currentMonth}
                currentYear={currentYear}
                selectedDate={selectedDate}
                shows={SHOWS_DATA}
                onDateSelect={setSelectedDate}
                onMonthChange={(month, year) => {
                  setCurrentMonth(month);
                  setCurrentYear(year);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 