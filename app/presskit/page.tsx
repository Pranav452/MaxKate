'use client';

import Link from "next/link";
import Image from "next/image";
import { Orbitron, Rajdhani } from 'next/font/google';
import { motion } from 'framer-motion';

const orbitron = Orbitron({ subsets: ['latin'] });
const rajdhani = Rajdhani({ subsets: ['latin'], weight: ['500'] });

interface PressAsset {
  title: string;
  source: string;
  date: string;
  url: string;
  excerpt: string;
}

const pressAssets: PressAsset[] = [
  {
    title: "Hear Max Kate&apos;s Melancholic Debut EP &apos;October&apos;",
    source: "Rolling Stone India",
    date: "2023",
    url: "https://rollingstoneindia.com/hear-max-kates-melancholic-debut-ep-october/",
    excerpt: "An in-depth look at Max Kate&apos;s debut EP, exploring the melancholic soundscapes and emotional depth of &apos;October&apos;."
  },
  {
    title: "Max Kate - October | Score: Indie Reviews",
    source: "High On Score",
    date: "2023",
    url: "https://highonscore.com/max-kate-october-score-indie-reviews/",
    excerpt: "A comprehensive review of &apos;October&apos;, analyzing the musical elements and production quality of Max Kate&apos;s work."
  },
  {
    title: "The Rogues: A Fashion Film - A Glimpse of What Goes Into Making a DJ",
    source: "Business Standard",
    date: "2020",
    url: "https://www.business-standard.com/article/news-ani/the-rogues-a-fashion-film-a-glimpse-of-what-goes-into-making-a-dj-120010800971_1.html",
    excerpt: "An exclusive behind-the-scenes look at the making of a DJ, featuring insights into Max Kate&apos;s creative process."
  },
  {
    title: "Max Kate and Xeede&apos;s New Single Shows Emotional Depth",
    source: "RSJ Online",
    date: "2023",
    url: "https://rsjonline.com/buzz/max-kate-and-xeede-have-been-watching-a-lot-of-emotional-dramas-if-their-new-single-is-anything-to-go-by.html",
    excerpt: "A collaborative masterpiece that showcases the emotional storytelling abilities of Max Kate and Xeede."
  }
];

// Musical note decorative component
const MusicalNote: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`absolute ${className} text-purple-400/20 text-6xl font-bold transform hover:scale-110 transition-transform duration-500`}>
    ♪
  </div>
);

export default function PressKitPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Decorative Musical Elements */}
      <MusicalNote className="top-40 left-10 rotate-[-15deg] opacity-20" />
      <MusicalNote className="top-60 right-20 rotate-[15deg] opacity-20" />
      <MusicalNote className="bottom-40 left-20 rotate-[-10deg] opacity-20" />
      <MusicalNote className="bottom-60 right-10 rotate-[10deg] opacity-20" />
      
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-sm z-50 border-b border-white/5">
        <div className="container mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className={`${orbitron.className} text-2xl font-bold hover:text-purple-400 transition-colors`}>
              MAXKATE
            </Link>

            <div className={`${rajdhani.className} flex items-center space-x-12`}>
              <Link 
                href="/presskit" 
                className="text-purple-400 hover:text-purple-300 transition-colors text-base"
              >
                PRESS KIT
              </Link>
              <Link 
                href="/contact" 
                className="text-white/80 hover:text-white transition-colors text-base"
              >
                CONTACT US
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-8 pt-40 pb-14">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-28 space-y-8 max-w-3xl"
        >
          <h1 className={`${orbitron.className} text-6xl font-bold text-white mb-8`}>
            PRESS <span className="text-purple-400">KIT</span>
          </h1>
          <p className={`${rajdhani.className} text-xl text-white/80 leading-relaxed max-w-2xl`}>
            Welcome to Max Kate&apos;s official press kit. Here you&apos;ll find everything you need for media coverage,
            including high-resolution photos, logos, biography, and technical requirements.
          </p>
        </motion.div>

        {/* Biography Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-32"
        >
          <h2 className={`${orbitron.className} text-3xl font-bold mb-10 text-white`}>
            BIOGRAPHY
          </h2>
          <div className="bg-white/5 rounded-2xl p-10 border border-white/10 hover:border-white/20 transition-all duration-500">
            <div className="space-y-8 text-white/80 text-lg leading-relaxed">
              <p>
                Max Kate is an Indian Music Director/Producer, Composer, Singer-Songwriter and a Musical Time Traveler hailing from the caps of India - Uttarakhand. Working secretly on the music for OTT&apos;s platforms, Kate has come up a long way, from releasing his solo Singles/EP&apos;s to working on top notch industry related projects.
              </p>
              <p>
                He started his musical journey when he was four, when he began playing the piano and started seeing the real colors of music. Since then, his excursion into this field has been acclivitous as he proceeded to learn electronic music production and DJ-ing from the Lost Stories Academy in Mumbai. His endearment for music made him relinquish school after 10th grade and plunge into his music career.
              </p>
              <p>
                Sonically, his music is mainly on acoustic guitars, breezy mellifluous tones on the keys which resonate jubilant vibes, transcending the listener to their happy/sad place, it&apos;s all about love/heartbreaks, travel, dance, drama and multiple emotions freezing onto a single slate like a canvas.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Quick Facts */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-32"
        >
          <h2 className={`${orbitron.className} text-3xl font-bold mb-10 text-white`}>
            QUICK FACTS
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500">
              <h3 className="text-purple-400 font-semibold mb-4 text-xl">Genre</h3>
              <p className="text-white/80 text-base">Indie-Folk, Alt Rock, Hip Hop</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500">
              <h3 className="text-purple-400 font-semibold mb-4 text-xl">Based in</h3>
              <p className="text-white/80 text-base">Mumbai, Jaipur, Gurgaon</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500">
              <h3 className="text-purple-400 font-semibold mb-4 text-xl">Career Highlights</h3>
              <p className="text-white/80 text-base">Rolling Stone Feature, Spotify & Amazon Music Editorial Playlists, Self-Funded Young Again Tour 2024</p>
            </div>
          </div>
        </motion.div>

        {/* Press Coverage */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-32"
        >
          <h2 className={`${orbitron.className} text-3xl font-bold mb-10 text-white`}>
            PRESS COVERAGE
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {pressAssets.map((asset, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500"
              >
                <div className="space-y-6">
                  {/* Image Section */}
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6">
                    <Image
                      src={index === 0 ? "/presskit/1st.jpg" : 
                           index === 1 ? "/presskit/2nd.webp" : 
                           index === 2 ? "/presskit/3rd.jpg" :
                           index === 3 ? "/presskit/4th.jpg" :
                           "https://placehold.co/600x400/purple/white/png?text=Coming+Soon"}
                      alt={`Press coverage image for ${asset.title}`}
                      width={600}
                      height={400}
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-semibold text-xl text-white group-hover:text-purple-400 transition-colors duration-300">
                      {asset.title}
                    </h3>
                    <span className="shrink-0 text-sm text-purple-400 px-4 py-2 bg-purple-400/5 rounded-full">
                      {asset.source}
                    </span>
                  </div>
                  <p className="text-white/80 text-base leading-relaxed">{asset.excerpt}</p>
                  <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <span className="text-white/60">{asset.date}</span>
                    <a
                      href={asset.url}
                      className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors group"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Read Article</span>
                      <svg 
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M14 5l7 7m0 0l-7 7m7-7H3" 
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technical Requirements */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-32"
        >
          <h2 className={`${orbitron.className} text-3xl font-bold mb-10 text-white`}>
            TECHNICAL REQUIREMENTS
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500">
              <h3 className="text-purple-400 font-semibold mb-6 text-xl">Audio Equipment</h3>
              <p className="text-white/80 mb-6 text-base">Professional grade sound system with minimum specifications:</p>
              <ul className="space-y-4 text-white/80 text-base">
                <li className="flex items-center gap-3">
                  <span className="text-purple-400">•</span>
                  High-quality stereo PA system
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-purple-400">•</span>
                  Minimum 2 monitor speakers
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-purple-400">•</span>
                  Professional DJ mixer
                </li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500">
              <h3 className="text-purple-400 font-semibold mb-6 text-xl">Stage Requirements</h3>
              <p className="text-white/80 mb-6 text-base">Essential setup for optimal performance:</p>
              <ul className="space-y-4 text-white/80 text-base">
                <li className="flex items-center gap-3">
                  <span className="text-purple-400">•</span>
                  Minimum stage size: 8ft x 6ft
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-purple-400">•</span>
                  Proper lighting setup
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-purple-400">•</span>
                  Stable power supply
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Hospitality Rider Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mb-32"
        >
          <h2 className={`${orbitron.className} text-3xl font-bold mb-10 text-white`}>
            HOSPITALITY RIDER
          </h2>
          <div className="grid gap-8">
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500">
              <h3 className="text-purple-400 font-semibold mb-8 text-xl">Travel, Hotel and Meals</h3>
              <ul className="grid gap-4 text-white/80 text-base">
                <li>All accommodation and facilities (bed, shower, room) must be suitable for an average 6 feet person</li>
                <li>Preferred Hotels - Hilton, ITC Grand, Grand Hyatt (3 to 5 star)</li>
                <li>If needed Artist Travels with his Tour Manager or a Photographer (2 people in Total)</li>
                <li>Organiser will provide at least 1 Dinner and 1 Breakfast on each day during the stay of the Artist for each person</li>
                <li>Organiser will provide transportation from airport to hotel, from hotel to the venue, from the venue to the hotel and from hotel to the airport</li>
                <li>All ground transportation by car should be executed by a professional driver. The driver is to be fully licensed and under no influence of drugs/alcohol</li>
                <li>Preferred Cars - Any Sedans/SUVs</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500">
              <h3 className="text-purple-400 font-semibold mb-6 text-xl">On The Night/Event</h3>
              <ul className="list-disc list-inside text-white/80 space-y-3 text-base">
                <li>1 Fan on the Deck</li>
                <li>2 Clean Towels</li>
                <li>The organiser will provide at least 1 person for security, who will oversee the stage during the performance</li>
                <li>Organiser provides at least 10 to 20 Guest List Invites on the event/location in which Artist is to perform</li>
                <li>Organiser will take care of sufficient drinks, fruits, protein bars and sandwiches for Artist travel companions, if reasonably possible in a private green room</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Gallery Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mb-32"
        >
          <h2 className={`${orbitron.className} text-3xl font-bold mb-10 text-white`}>
            GALLERY
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Gallery items with improved hover effects */}
            <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image 
                src="/gallery/4.png" 
                alt="Max Kate Press Photo 1" 
                width={800}
                height={600}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-8">
                <a 
                  href="/gallery/4.png" 
                  download 
                  className="bg-purple-500/90 backdrop-blur-sm hover:bg-purple-600 text-white px-6 py-3 rounded-lg flex items-center gap-3 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download High-Res
                </a>
              </div>
            </div>

            {/* Image 2 */}
            <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image 
                src="/gallery/A.png" 
                alt="Max Kate Press Photo 2" 
                width={800}
                height={600}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-8">
                <a 
                  href="/gallery/A.png" 
                  download 
                  className="bg-purple-500/90 backdrop-blur-sm hover:bg-purple-600 text-white px-6 py-3 rounded-lg flex items-center gap-3 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download High-Res
                </a>
              </div>
            </div>

            {/* Image 3 */}
            <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image 
                src="/gallery/C.png" 
                alt="Max Kate Press Photo 3" 
                width={800}
                height={600}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-8">
                <a 
                  href="/gallery/C.png" 
                  download 
                  className="bg-purple-500/90 backdrop-blur-sm hover:bg-purple-600 text-white px-6 py-3 rounded-lg flex items-center gap-3 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download High-Res
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="border-t border-white/10 pt-16"
        >
          <div className="grid md:grid-cols-4 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className={`${orbitron.className} text-xl font-bold text-white`}>Contact</h3>
              <div className="space-y-4 text-white/70">
                <p className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:booking@maxkate.com" className="hover:text-purple-400 transition-colors">booking@maxkate.com</a>
                </p>
                <p className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+91 (Management Only)</span>
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className={`${orbitron.className} text-xl font-bold text-white`}>Quick Links</h3>
              <div className="space-y-3 text-white/70">
                <Link href="/booking" className="block hover:text-purple-400 transition-colors">Book a Show</Link>
                <Link href="/tours" className="block hover:text-purple-400 transition-colors">Tour Dates</Link>
                <Link href="/vinyl" className="block hover:text-purple-400 transition-colors">Music</Link>
                <Link href="/stage" className="block hover:text-purple-400 transition-colors">Stage Plot</Link>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-6">
              <h3 className={`${orbitron.className} text-xl font-bold text-white`}>Follow</h3>
              <div className="flex flex-wrap gap-4">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                   className="w-10 h-10 rounded-full bg-white/5 hover:bg-purple-500/20 flex items-center justify-center text-white/70 hover:text-purple-400 transition-all duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                   className="w-10 h-10 rounded-full bg-white/5 hover:bg-purple-500/20 flex items-center justify-center text-white/70 hover:text-purple-400 transition-all duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="https://spotify.com" target="_blank" rel="noopener noreferrer" 
                   className="w-10 h-10 rounded-full bg-white/5 hover:bg-purple-500/20 flex items-center justify-center text-white/70 hover:text-purple-400 transition-all duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.26.3-3.239-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" 
                   className="w-10 h-10 rounded-full bg-white/5 hover:bg-purple-500/20 flex items-center justify-center text-white/70 hover:text-purple-400 transition-all duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div className="space-y-6">
              <h3 className={`${orbitron.className} text-xl font-bold text-white`}>Newsletter</h3>
              <div className="space-y-4">
                <p className="text-white/70">Subscribe for tour updates and exclusive content.</p>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:border-purple-500/50"
                  />
                  <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-16 pt-8 border-t border-white/10 text-center text-white/40">
            <p>© {new Date().getFullYear()} Max Kate. All rights reserved.</p>
          </div>
        </motion.div>
      </main>
    </div>
  );
} 