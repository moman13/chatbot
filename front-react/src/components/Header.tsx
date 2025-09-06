'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur border-b border-slate-700/60">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-2xl" style={{background: 'linear-gradient(135deg, #e5ff66, #d9ff2e)'}}></div>
          <span className="font-display text-xl font-bold">AqlBot</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#success" className="hover:text-white transition-colors">Success Stories</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </nav>
        
        <div className="flex items-center gap-3">
          <Link href="/login" className="hidden sm:inline-block px-4 py-2 rounded-xl border border-slate-600 text-white hover:bg-slate-800 transition-all">
            Login
          </Link>
          <Link href="/register" className="btn-primary px-4 py-2 rounded-xl font-medium hover:scale-105 transition-transform">
            🚀 Start Now
          </Link>
        </div>
        
        <button 
          className="md:hidden px-3 py-2 rounded-xl bg-slate-800"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          Menu
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700">
          <div className="px-6 py-4 space-y-4">
            <a href="#features" className="block text-slate-300 hover:text-white transition-colors">Features</a>
            <a href="#success" className="block text-slate-300 hover:text-white transition-colors">Success Stories</a>
            <a href="#pricing" className="block text-slate-300 hover:text-white transition-colors">Pricing</a>
            <div className="pt-4 border-t border-slate-700 space-y-3">
              <Link href="/login" className="block px-4 py-2 rounded-xl border border-slate-600 text-white hover:bg-slate-700 transition-all text-center">
                Login
              </Link>
              <Link href="/register" className="block btn-primary px-4 py-2 rounded-xl font-medium text-center">
                🚀 Start Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}


