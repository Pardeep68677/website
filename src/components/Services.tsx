
"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ScissorsIcon, RazorBladeIcon, ShavingCreamIcon } from './icons/BarberIcons';
import { Flame, Sparkles, UserRound } from 'lucide-react';

const services = [
  {
    name: "Classic Cutting",
    price: "100",
    description: "Any type of men's hair, from Bollywood styles to modern fades.",
    icon: <ScissorsIcon className="w-8 h-8" />
  },
  {
    name: "Traditional Shave",
    price: "50",
    description: "Smooth single-blade shave with hot towel treatment.",
    icon: <RazorBladeIcon className="w-8 h-8" />
  },
  {
    name: "Head Massage",
    price: "180",
    description: "Relaxing head massage with premium oils for maximum stress relief.",
    icon: <UserRound className="w-8 h-8" />
  },
  {
    name: "Fire Cutting",
    price: "200",
    description: "Advanced flame technique for precision and volume control.",
    icon: <Flame className="w-8 h-8" />
  },
  {
    name: "Facial & Grooming",
    price: "250+GST",
    description: "Deep cleanse and skin hydration designed specifically for men.",
    icon: <Sparkles className="w-8 h-8" />
  },
  {
    name: "Wax Coating",
    price: "Varies",
    description: "Professional wax treatment for long-lasting smoothness.",
    icon: <ShavingCreamIcon className="w-8 h-8" />
  }
];

export const Services = () => {
  return (
    <section id="services" className="py-24 bg-accent/30">
      <div className="container mx-auto px-4 text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-headline font-black text-secondary mb-4">Our Services</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">Expert grooming at pocket-friendly prices. We combine traditional Indian techniques with modern styling trends.</p>
      </div>
      <div className="container mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <Card key={index} className="border-none shadow-xl hover:-translate-y-2 transition-transform duration-300 overflow-hidden bg-background group">
            <CardContent className="p-8">
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                {service.icon}
              </div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-headline font-bold text-secondary">{service.name}</h3>
                <span className="text-xl font-bold text-primary">₹{service.price}</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
