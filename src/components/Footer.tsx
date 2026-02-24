"use client";

import React from 'react';
import { MapPin, Phone, Instagram, Facebook, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer id="contact" className="bg-secondary text-secondary-foreground pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <h3 className="text-3xl font-headline font-black text-primary">AapakaNai</h3>
            <p className="text-secondary-foreground/70 leading-relaxed">
              Serving the modern Indian man with traditional values. Every cut is a masterpiece, every shave is a ritual.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-4 text-secondary-foreground/70">
              <li><a href="#services" className="hover:text-primary transition-colors">Services & Pricing</a></li>
              <li><a href="#gallery" className="hover:text-primary transition-colors">Style Catalog</a></li>
              <li><a href="#queue" className="hover:text-primary transition-colors">Queue Prediction</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Reviews</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Contact Us</h4>
            <ul className="space-y-4 text-secondary-foreground/70">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>swami vivekand nagar,suratgah</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+91 95302 77759</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>pardeepswami68677@gmail.com</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Opening Hours</h4>
            <ul className="space-y-4 text-secondary-foreground/70">
              <li className="flex justify-between">
                <span>Mon - Sat</span>
                <span className="text-primary font-bold">9:00 AM - 9:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span className="text-primary font-bold">10:00 AM - 6:00 PM</span>
              </li>
              <li className="text-xs italic mt-4 text-secondary-foreground/50">
                Note: Sundays are busy. Please use our predictor tool before visiting.
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 text-center text-secondary-foreground/50 text-sm">
          <p>© {new Date().getFullYear()} AapakaNai Barber Salon. All Rights Reserved. Designed for the Indian Hero.</p>
        </div>
      </div>
    </footer>
  );
};
