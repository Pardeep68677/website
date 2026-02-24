
"use client";

import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Music, Clock } from 'lucide-react';

export const Hero = () => {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-retro-salon');

  return (
    <section className="relative overflow-hidden pt-12 pb-24 md:pt-24 md:pb-32">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-secondary border border-primary/20 text-sm font-medium">
              <Music className="w-4 h-4" />
              <span>Playing Retro Bollywood Classics</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-headline font-black text-secondary leading-tight">
              Traditional Grooming, <span className="text-primary italic">Modern Style.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Welcome to AapakaNai. We specialize in every type of men's haircut, from Bollywood legends to sharp military fades. Relax in our retro atmosphere and walk out looking like a hero.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-8 font-bold text-lg h-14">
                View Services
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-secondary text-secondary hover:bg-secondary/5 px-8 font-bold text-lg h-14">
                Our Location
              </Button>
            </div>
            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-background overflow-hidden bg-muted">
                    <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" />
                  </div>
                ))}
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                <span className="text-secondary font-bold">500+</span> Happy Heroes Weekly
              </p>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-primary/20 rounded-[2rem] blur-2xl group-hover:bg-primary/30 transition-colors" />
            <div className="relative rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl rotate-2 group-hover:rotate-0 transition-transform duration-500">
              <Image 
                src={heroImage?.imageUrl || ''} 
                alt={heroImage?.description || 'AapakaNai Salon'} 
                width={1200}
                height={600}
                className="object-cover h-[400px] md:h-[500px] w-full"
                data-ai-hint={heroImage?.imageHint}
              />
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur rounded-xl border border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Featured Cut</p>
                    <p className="text-xl font-headline font-bold text-secondary">The Classic 70s Hero</p>
                  </div>
                  <div className="text-right">
                    <p className="text-primary font-bold text-lg">₹100</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
