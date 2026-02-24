
"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: "Rajesh Kumar",
    review: "Best 'Fauji' cut I've had in years. The retro music really sets the mood. Highly recommend!",
    rating: 5,
    role: "Regular Customer"
  },
  {
    name: "Amit Sharma",
    review: "The fire cutting technique is incredible. My hair has never looked so voluminous. ₹200 well spent.",
    rating: 5,
    role: "Local Resident"
  },
  {
    name: "Vikram Singh",
    review: "Excellent grooming and facial. They really understand men's skin. The staff is polite and professional.",
    rating: 4,
    role: "Professional"
  }
];

export const Reviews = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-headline font-black text-secondary mb-4">Hero Stories</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">Hear what our satisfied customers have to say about their experience at AapakaNai.</p>
      </div>
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
        {reviews.map((r, i) => (
          <Card key={i} className="bg-accent/30 border-none shadow-lg relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white">
              <Quote className="w-6 h-6" />
            </div>
            <CardContent className="p-8 text-center">
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className={`w-4 h-4 ${idx < r.rating ? 'fill-primary text-primary' : 'text-muted'}`} />
                ))}
              </div>
              <p className="italic text-muted-foreground mb-6">"{r.review}"</p>
              <h4 className="font-headline font-bold text-secondary text-lg">{r.name}</h4>
              <p className="text-xs text-primary font-bold uppercase tracking-widest">{r.role}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
