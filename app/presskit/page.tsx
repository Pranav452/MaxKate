import Link from "next/link";
import Image from "next/image";
import { Orbitron, Rajdhani } from 'next/font/google';

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
    title: "Hear Max Kate's Melancholic Debut EP 'October'",
    source: "Rolling Stone India",
    date: "2023",
    url: "https://rollingstoneindia.com/hear-max-kates-melancholic-debut-ep-october/",
    excerpt: "An in-depth look at Max Kate's debut EP, exploring the melancholic soundscapes and emotional depth of 'October'."
  },
  {
    title: "Max Kate - October | Score: Indie Reviews",
    source: "High On Score",
    date: "2023",
    url: "https://highonscore.com/max-kate-october-score-indie-reviews/",
    excerpt: "A comprehensive review of 'October', analyzing the musical elements and production quality of Max Kate's work."
  },
  {
    title: "The Rogues: A Fashion Film - A Glimpse of What Goes Into Making a DJ",
    source: "Business Standard",
    date: "2020",
    url: "https://www.business-standard.com/article/news-ani/the-rogues-a-fashion-film-a-glimpse-of-what-goes-into-making-a-dj-120010800971_1.html",
    excerpt: "An exclusive behind-the-scenes look at the making of a DJ, featuring insights into Max Kate's creative process."
  },
  {
    title: "Max Kate and Xeede's New Single Shows Emotional Depth",
    source: "RSJ Online",
    date: "2023",
    url: "https://rsjonline.com/buzz/max-kate-and-xeede-have-been-watching-a-lot-of-emotional-dramas-if-their-new-single-is-anything-to-go-by.html",
    excerpt: "A collaborative masterpiece that showcases the emotional storytelling abilities of Max Kate and Xeede."
  }
];

export default function PressKitPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-sm z-50 border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className={`${orbitron.className} text-2xl font-bold tracking-wider`}>
              MAXKATE
            </Link>

            <div className={`${rajdhani.className} flex items-center space-x-8`}>
              <Link 
                href="/presskit" 
                className="text-purple-400 hover:text-purple-300 transition-colors tracking-wider"
              >
                PRESS KIT
              </Link>
              {/* <Link 
                href="/press" 
                className="text-white/80 hover:text-white transition-colors tracking-wider"
              >
                PRESS
              </Link> */}
              <Link 
                href="/contact" 
                className="text-white/80 hover:text-white transition-colors tracking-wider"
              >
                CONTACT US
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 pt-32 pb-20">
        {/* Header Section with improved spacing and emphasis */}
        <div className="mb-20 space-y-6 max-w-3xl">
          <h1 className={`${orbitron.className} text-5xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600`}>
            PRESS KIT
          </h1>
          <p className={`${rajdhani.className} text-xl text-white/80 leading-relaxed`}>
            Welcome to Max Kate's official press kit. Here you'll find everything you need for media coverage,
            including high-resolution photos, logos, biography, and technical requirements.
          </p>
        </div>

        {/* Quick Facts with improved visual hierarchy */}
        <div className="mb-20">
          <h2 className={`${orbitron.className} text-3xl font-bold mb-8 flex items-center gap-3`}>
            <span className="w-8 h-[2px] bg-purple-400"></span>
            QUICK FACTS
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-purple-500/50 transition-colors duration-300">
              <h3 className="text-purple-400 font-semibold mb-3 text-lg">Genre</h3>
              <p className="text-white/80 text-lg">Electronic, Techno, House</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-purple-500/50 transition-colors duration-300">
              <h3 className="text-purple-400 font-semibold mb-3 text-lg">Based in</h3>
              <p className="text-white/80 text-lg">New York City, USA</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-purple-500/50 transition-colors duration-300">
              <h3 className="text-purple-400 font-semibold mb-3 text-lg">Career Highlights</h3>
              <p className="text-white/80 text-lg">Rolling Stone Feature, International Tours</p>
            </div>
          </div>
        </div>

        {/* Press Coverage with improved card design */}
        <div className="mb-20">
          <h2 className={`${orbitron.className} text-3xl font-bold mb-8 flex items-center gap-3`}>
            <span className="w-8 h-[2px] bg-purple-400"></span>
            PRESS COVERAGE
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {pressAssets.map((asset, index) => (
              <div 
                key={index}
                className="group relative bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 
                         hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-semibold text-xl group-hover:text-purple-400 transition-colors duration-300">
                      {asset.title}
                    </h3>
                    <span className="shrink-0 text-sm text-purple-400 px-3 py-1 bg-purple-400/10 rounded-full">
                      {asset.source}
                    </span>
                  </div>
                  <p className="text-white/60 text-base leading-relaxed">{asset.excerpt}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-white/40">{asset.date}</span>
                    <a
                      href={asset.url}
                      className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Read Article</span>
                      <svg 
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Requirements with improved structure */}
        <div>
          <h2 className={`${orbitron.className} text-3xl font-bold mb-8 flex items-center gap-3`}>
            <span className="w-8 h-[2px] bg-purple-400"></span>
            TECHNICAL REQUIREMENTS
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-purple-500/50 transition-colors duration-300">
              <h3 className="text-purple-400 font-semibold mb-4 text-xl">Audio Equipment</h3>
              <p className="text-white/80 mb-4">Professional grade sound system with minimum specifications:</p>
              <ul className="list-disc list-inside text-white/60 space-y-2">
                <li className="hover:text-white transition-colors">High-quality stereo PA system</li>
                <li className="hover:text-white transition-colors">Minimum 2 monitor speakers</li>
                <li className="hover:text-white transition-colors">Professional DJ mixer</li>
              </ul>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-purple-500/50 transition-colors duration-300">
              <h3 className="text-purple-400 font-semibold mb-4 text-xl">Stage Requirements</h3>
              <p className="text-white/80 mb-4">Essential setup for optimal performance:</p>
              <ul className="list-disc list-inside text-white/60 space-y-2">
                <li className="hover:text-white transition-colors">Minimum stage size: 8ft x 6ft</li>
                <li className="hover:text-white transition-colors">Proper lighting setup</li>
                <li className="hover:text-white transition-colors">Stable power supply</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 