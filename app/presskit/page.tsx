'use client';

import Link from "next/link";
import { Orbitron, Rajdhani } from 'next/font/google';

const orbitron = Orbitron({ subsets: ['latin'] });
const rajdhani = Rajdhani({ subsets: ['latin'], weight: ['500'] });

export default function PressKitPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <Link href="/" className={`${orbitron.className} text-2xl font-bold tracking-wider`}>
            MAXKATE
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 pt-24">
        <main className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-16 text-center">
            <h1 className={`${orbitron.className} text-4xl font-bold mb-4`}>Press Kit</h1>
            <div className="h-0.5 w-32 mx-auto bg-gradient-to-r from-transparent via-white to-transparent"></div>
          </div>

          {/* Quick Facts */}
          <section className="mb-16">
            <h2 className={`${orbitron.className} text-2xl font-bold mb-6`}>Quick Facts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
                <h3 className={`${rajdhani.className} text-xl font-bold mb-4`}>Artist Profile</h3>
                <p className="text-gray-300">Electronic music producer and performer based in Washington, D.C.</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
                <h3 className={`${rajdhani.className} text-xl font-bold mb-4`}>Genre</h3>
                <p className="text-gray-300">Electronic, Dance, Experimental</p>
              </div>
            </div>
          </section>

          {/* Press Coverage */}
          <section className="mb-16">
            <h2 className={`${orbitron.className} text-2xl font-bold mb-6`}>Press Coverage</h2>
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-colors">
                <h3 className={`${rajdhani.className} text-xl font-bold mb-2`}>Electronic Music Review</h3>
                <p className="text-gray-400 mb-4">March 15, 2024</p>
                <p className="text-gray-300">Max Kate&apos;s latest release pushes the boundaries of electronic music.</p>
              </div>
            </div>
          </section>

          {/* Technical Requirements */}
          <section className="mb-16">
            <h2 className={`${orbitron.className} text-2xl font-bold mb-6`}>Technical Requirements</h2>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
              <ul className="text-gray-300 space-y-4">
                <li>• Professional sound system with subwoofers</li>
                <li>• High-quality monitoring system</li>
                <li>• Digital mixer with at least 4 channels</li>
                <li>• Power requirements: Standard 120V AC power</li>
              </ul>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-16">
            <h2 className={`${orbitron.className} text-2xl font-bold mb-6`}>Contact</h2>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
              <p className="text-gray-300 mb-4">For press inquiries, please contact:</p>
              <p className="text-white font-bold">press@maxkate.com</p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
} 