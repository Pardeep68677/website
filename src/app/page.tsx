
'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Star, Clock, Scissors, Info } from 'lucide-react';
import { useCollection, useUser, useFirestore } from '@/firebase';
import { collection } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const { user } = useUser();
  const db = useFirestore();
  const { data: shops, loading } = useCollection(db ? collection(db, 'shops') : null);
  const [searchQuery, setSearchQuery] = useState('');

  // Priority Ranking Logic: 
  // 1. Availability (Available shops first)
  // 2. Shop Rating (Higher ratings first)
  // 3. Distance (Simulated as a secondary factor for this prototype)
  const rankedShops = useMemo(() => {
    if (!shops) return [];
    
    return [...shops]
      .sort((a, b) => {
        // First priority: Availability
        if (a.isAvailable !== b.isAvailable) {
          return a.isAvailable ? -1 : 1;
        }
        
        // Second priority: Rating
        const ratingA = a.rating || 0;
        const ratingB = b.rating || 0;
        if (ratingA !== ratingB) {
          return ratingB - ratingA;
        }

        // Third priority: Customer Satisfaction (Review Count as proxy)
        const reviewsA = a.reviewCount || 0;
        const reviewsB = b.reviewCount || 0;
        if (reviewsA !== reviewsB) {
          return reviewsB - reviewsA;
        }

        // Fourth priority: Distance (randomly simulated for now)
        return 0; 
      })
      .slice(0, 3); // Show only top 2-3 barbers
  }, [shops]);

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Search */}
      <section className="bg-secondary text-secondary-foreground py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-headline font-black mb-6">
            Find Your Next <span className="text-primary italic">Legendary Cut</span>
          </h1>
          <p className="text-lg opacity-80 mb-8">
            The simplest way to discover top-rated barbers near you. 
            Ranked by availability, quality, and distance.
          </p>
          
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input 
              className="h-14 pl-12 pr-32 rounded-full text-foreground bg-white border-none shadow-xl"
              placeholder="Enter your location or area..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button className="absolute right-2 top-2 h-10 rounded-full px-6 bg-primary hover:bg-primary/90">
              Find Barbers
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Recommendations */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-headline font-bold text-secondary">Top Recommendations</h2>
            <p className="text-muted-foreground text-sm">Priority ranked: Availability, Rating, and Distance</p>
          </div>
          <Link href="/auth">
            <Button variant="outline" className="rounded-full">View All</Button>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Clock className="animate-spin w-8 h-8 text-primary" />
          </div>
        ) : rankedShops.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            {rankedShops.map((shop) => (
              <ShopCard key={shop.id} shop={shop} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-accent/20 rounded-3xl border-2 border-dashed border-primary/20">
            <Scissors className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-bold text-secondary">No barbers found in this area yet</h3>
            <p className="text-muted-foreground">Try searching for a different location or check back later.</p>
          </div>
        )}
      </section>

      {/* Transparent Pricing & Promotion Info */}
      <section className="bg-primary/10 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-6 bg-white p-8 rounded-[2rem] shadow-sm border border-primary/20">
            <div className="bg-primary/20 p-4 rounded-2xl">
              <Info className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-secondary">Transparent Payment System</h3>
              <p className="text-muted-foreground text-sm max-w-2xl">
                We ensure full transparency. You see the original price and any marketplace discounts upfront. 
                As a startup business, we often subsidize the first few cuts to help you find your lifelong barber!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Merchant CTA */}
      <section className="bg-accent/30 py-16 border-y border-primary/10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-3xl font-headline font-bold text-secondary mb-4">Are you a Barber?</h2>
            <p className="text-muted-foreground">
              Join the AapakaNai marketplace. Grow your business, manage your queue, and build your reputation with transparent payments and separate login management.
            </p>
          </div>
          <Link href="/auth?role=barber">
            <Button size="lg" className="rounded-full bg-secondary hover:bg-secondary/90 px-8">
              Register Your Shop
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ShopCard({ shop }: { shop: any }) {
  // Simulated distance for prototype
  const distance = useMemo(() => (Math.random() * 5).toFixed(1), [shop.id]);

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-border group">
      <div className="relative h-48 bg-muted">
        <Image 
          src={shop.imageUrl || `https://picsum.photos/seed/${shop.id}/600/400`}
          alt={shop.shopName}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {shop.isAvailable ? (
          <div className="absolute top-4 right-4 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            AVAILABLE NOW
          </div>
        ) : (
          <div className="absolute top-4 right-4 bg-gray-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg">
            BUSY / CLOSED
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-headline font-bold text-secondary">{shop.shopName}</h3>
          <div className="flex items-center gap-1 bg-accent px-2 py-1 rounded-lg">
            <Star className="w-3 h-3 fill-primary text-primary" />
            <span className="text-xs font-bold">{shop.rating || 'New'}</span>
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{shop.address}</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-primary">
            <Clock className="w-3 h-3" />
            <span>{distance} km away</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Starts From</p>
            <div className="flex items-center gap-2">
              <p className="text-lg font-bold text-secondary">₹{shop.services?.[0]?.price || '100'}</p>
              {shop.hasDiscount && (
                <span className="text-[10px] bg-primary/20 text-primary px-1 rounded font-bold">DISCOUNTED</span>
              )}
            </div>
          </div>
          <Link href={`/shop/${shop.id}`}>
            <Button size="sm" className="rounded-full px-6">Book Now</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
