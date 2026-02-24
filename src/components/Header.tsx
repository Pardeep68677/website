
"use client";

import React from 'react';
import Link from 'next/link';
import { ScissorsIcon } from './icons/BarberIcons';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-secondary">
          <ScissorsIcon className="w-8 h-8 text-primary" />
          <span className="font-headline tracking-tighter">AapakaNai</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#services" className="text-sm font-medium hover:text-primary transition-colors">Services</Link>
          <Link href="#gallery" className="text-sm font-medium hover:text-primary transition-colors">Gallery</Link>
          <Link href="#queue" className="text-sm font-medium hover:text-primary transition-colors">Queue Check</Link>
          <Link href="#contact" className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform">Book Now</Link>
        </nav>
      </div>
    </header>
  );
};
