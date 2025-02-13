'use client'

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

// Utility function to handle date comparison safely
const isSameDay = (date1: Date, date2: Date) => {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
};

// Mock Data
const SHOWS_DATA: Show[] = [
  {
    id: "1",
    date: new Date(2025, 1, 26),
    title: "POD With Ohi App",
    venue: "Jaipur",
    description: "An exclusive show featuring POD With Ohi App in the vibrant city of Jaipur",
    isPast: false
  },
  {
    id: "2",
    date: new Date(2025, 2, 1),
    title: "Max Kate (Club Show)",
    venue: "TBA",
    description: "A special club show performance by Max Kate",
    isPast: false
  }
];

// Calendar day type for better type safety
type CalendarDay = {
  key: string;
  label: string;
};

// Define calendar days with unique keys
const CALENDAR_DAYS: CalendarDay[] = [
  { key: 'sun', label: 'S' },
  { key: 'mon', label: 'M' },
  { key: 'tue', label: 'T' },
  { key: 'wed', label: 'W' },
  { key: 'thu', label: 'T' },
  { key: 'fri', label: 'F' },
  { key: 'sat', label: 'S' }
];

// Components
const NavigationArrow = ({ href, direction }: { href: string; direction: 'left' | 'right' }) => (
  <Link href={href} className={`fixed ${direction === 'left' ? 'left-6' : 'right-6'} top-1/2 -translate-y-1/2 z-50 group`}>
    <div className="bg-white/10 backdrop-blur-sm p-3 rounded-full cursor-pointer transition-all duration-300 hover:bg-white/30">
      <svg 
        className={cn(
          "w-6 h-6 text-white transform transition-transform duration-300",
          direction === 'left' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'
        )}
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  </Link>
);

const ShowCard = ({ show, isSelected = false }: { show: Show; isSelected?: boolean }) => {
  // Error handling for invalid date
  const formattedDate = (() => {
    try {
      return {
        day: show.date.getDate(),
        month: show.date.toLocaleDateString('en-US', { month: 'short' })
      };
    } catch (error) {
      console.error('Error formatting date:', error);
      return { day: '--', month: '---' };
    }
  })();

  return (
    <div className={cn(
      "group relative overflow-hidden rounded-xl transition-all duration-300",
      isSelected ? "bg-purple-500/20" : "bg-black/40 hover:bg-black/60"
    )}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
      <div className="relative p-4 flex gap-4">
        <div className={cn(
          "flex-shrink-0 w-16 h-16 rounded-lg flex flex-col items-center justify-center border",
          isSelected ? "bg-purple-500/30 border-purple-500/50" : "bg-white/5 border-white/10"
        )}>
          <span className="text-xl font-bold text-white">
            {formattedDate.day}
          </span>
          <span className="text-xs text-white/70">
            {formattedDate.month}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-medium text-white group-hover:text-purple-300 transition-colors">
            {show.title}
          </h3>
          <p className="text-white/70 text-sm mt-0.5">
            {show.venue}
          </p>
          <p className="text-white/50 text-xs mt-1 line-clamp-2">
            {show.description}
          </p>
        </div>
      </div>
    </div>
  );
};

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
    <div className="space-y-3">
      <div className="flex justify-between items-center text-white">
        <button 
          onClick={handlePrevMonth}
          className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        <div className="text-sm font-medium">
          {new Date(currentYear, currentMonth).toLocaleDateString('en-US', { 
            month: 'long',
            year: 'numeric'
          })}
        </div>
        <button 
          onClick={handleNextMonth}
          className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {CALENDAR_DAYS.map(({ key, label }) => (
          <div key={key} className="text-center text-white/60 text-xs py-1">
            {label}
          </div>
        ))}
        
        {Array.from({ length: 35 }, (_, i) => {
          const date = new Date(currentYear, currentMonth, i - new Date(currentYear, currentMonth, 1).getDay() + 1);
          const isCurrentMonth = date.getMonth() === currentMonth;
          const isSelected = selectedDate && isSameDay(date, selectedDate);
          const show = shows.find(show => isSameDay(show.date, date));

          return (
            <button
              key={`date-${i}`}
              onClick={() => onDateSelect(date)}
              className={cn(
                "aspect-square p-1 rounded transition-all duration-300 relative group hover:scale-105",
                isCurrentMonth ? "text-white" : "text-white/20",
                isSelected ? "bg-purple-500 shadow-lg shadow-purple-500/25" : 
                  show ? "bg-purple-500/20 hover:bg-purple-500/30" : "hover:bg-white/10",
                show && !isSelected ? "ring-1 ring-purple-500/50" : ""
              )}
            >
              <span className={cn(
                "text-xs font-medium",
                show && !isSelected ? "text-purple-300" : ""
              )}>{date.getDate()}</span>
              {show && (
                <div className="absolute inset-x-0 bottom-0 text-[8px] text-purple-300 truncate opacity-0 group-hover:opacity-100 transition-all duration-300">
                  •
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
    isSameDay(show.date, selectedDate)
  );

  const upcomingShows = SHOWS_DATA
    .filter(show => !show.isPast)
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <video src="/shows.mp4" autoPlay muted loop className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      </div>

      {/* Navigation */}
      <NavigationArrow href="/" direction="left" />
      <NavigationArrow href="/club" direction="right" />

      {/* Main Content */}
      <div className="relative flex-1 flex flex-col max-w-7xl mx-auto w-full p-6">
        {/* Header */}
        <header className="text-center pt-8">
          <h1 className="text-3xl font-medium text-white tracking-wider animate-fade-in-down">
            SHOWS & EVENTS
          </h1>
          <div className="h-px w-32 mx-auto mt-2 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />
        </header>

        <div className="grid grid-cols-12 gap-6 pt-20 min-h-[calc(100vh-12rem)]">
          {/* Left Column - Upcoming Shows */}
          <div className="col-span-4 bg-black/20 backdrop-blur-sm rounded-xl border border-white/5">
            <div className="space-y-4 p-6">
              <h2 className="text-xl font-medium text-white/90">Upcoming Shows</h2>
              <div className="space-y-3 max-h-[calc(100vh-12rem)] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20 hover:scrollbar-thumb-white/30">
                {upcomingShows.map((show) => (
                  <ShowCard 
                    key={show.id} 
                    show={show}
                    isSelected={selectedShow?.id === show.id}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Middle Column - Selected Show */}
          <div className="col-span-5 bg-black/20 backdrop-blur-sm rounded-xl border border-white/5">
            <div className="p-6 h-full">
              <div className="space-y-4">
                <h2 className="text-xl font-medium text-white/90">
                  {selectedShow ? "Selected Show" : "No Show Selected"}
                </h2>
                <div className="space-y-4">
                  {selectedShow ? (
                    <>
                      <ShowCard show={selectedShow} isSelected />
                      <Button
                        onClick={() => window.location.href = '/booking'}
                        className="w-full bg-purple-500 text-white py-3 rounded-lg font-medium
                                 transform transition-all duration-300 hover:scale-105 hover:bg-purple-600
                                 shadow-lg shadow-purple-500/25"
                      >
                        Book Show
                      </Button>
                    </>
                  ) : (
                    <p className="text-white/60 text-sm">
                      Select a show from the calendar to view details and booking options.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Calendar */}
          <div className="col-span-3">
            <div className="sticky top-6 bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-4">
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