
"use client";

import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export const Gallery = () => {
  const galleryImages = PlaceHolderImages.filter(img => 
    ['bollywood-style-1', 'bollywood-style-2', 'fauji-cut', 'fire-cutting', 'shaving-ritual'].includes(img.id)
  );

  return (
    <section id="gallery" className="py-24">
      <div className="container mx-auto px-4 text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-headline font-black text-secondary mb-4">Style Gallery</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">Choose your look from our catalog of legendary Indian heroes and timeless military cuts.</p>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-4">
            <GalleryItem img={galleryImages[0]} height="h-80" />
            <GalleryItem img={galleryImages[4]} height="h-48" />
          </div>
          <div className="space-y-4 pt-8 md:pt-16">
            <GalleryItem img={galleryImages[1]} height="h-64" />
            <GalleryItem img={galleryImages[2]} height="h-96" />
          </div>
          <div className="space-y-4">
            <GalleryItem img={galleryImages[3]} height="h-96" />
            <GalleryItem img={galleryImages[0]} height="h-64" />
          </div>
          <div className="space-y-4 pt-8 md:pt-12">
            <GalleryItem img={galleryImages[2]} height="h-48" />
            <GalleryItem img={galleryImages[1]} height="h-80" />
          </div>
        </div>
      </div>
    </section>
  );
};

const GalleryItem = ({ img, height }: { img: any, height: string }) => {
  if (!img) return null;
  return (
    <div className={`relative ${height} rounded-2xl overflow-hidden group shadow-lg cursor-pointer`}>
      <Image 
        src={img.imageUrl} 
        alt={img.description} 
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-500"
        data-ai-hint={img.imageHint}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
        <p className="text-white font-medium text-sm">{img.description}</p>
      </div>
    </div>
  );
};
