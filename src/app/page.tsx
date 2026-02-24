
'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Star, Clock, Scissors, Info, Smartphone, CheckCircle2, UserCheck, Navigation } from 'lucide-react';
import { useCollection, useUser, useFirestore } from '@/firebase';
import { collection } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';

const POPULAR_AREAS = [
  "Bollywood Square",
  "Andheri West",
  "Bandra Junction",
  "Retro Lane",
  "Marine Drive"
];

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
    
    let filtered = [...shops];
    if (searchQuery) {
      filtered = filtered.filter(s => 
        s.shopName.toLowerCase().includes(searchQuery.toLowerCase()) || 
        s.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered
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

        return 0; 
      })
      .slice(0, 3); // Show only top 3 barbers as requested
  }, [shops, searchQuery]);

  const handleAreaClick = (area: string) => {
    setSearchQuery(area);
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Search */}
      <section className="bg-secondary text-secondary-foreground py-16 md:py-24 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="container mx-auto text-center max-w-3xl relative z-10">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/20 hover:bg-primary/30 px-4 py-1 rounded-full">
            India's First Location-Priority Marketplace
          </Badge>
          <h1 className="text-4xl md:text-6xl font-headline font-black mb-6 leading-tight">
            Find Your Next <span className="text-primary italic">Legendary Cut</span>
          </h1>
          <p className="text-lg opacity-80 mb-10 max-w-2xl mx-auto">
            The simplest way to discover top-rated barbers near you. 
            Ranked by availability, quality, and your current location.
          </p>
          
          <div className="relative max-w-xl mx-auto mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input 
              className="h-14 pl-12 pr-32 rounded-full text-foreground bg-white border-none shadow-2xl focus-visible:ring-primary"
              placeholder="Enter your location or area..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button className="absolute right-2 top-2 h-10 rounded-full px-6 bg-primary hover:bg-primary/90">
              Find Barbers
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
            <span className="text-secondary-foreground/60 font-medium mr-2">Quick Suggestions:</span>
            {POPULAR_AREAS.map((area) => (
              <button
                key={area}
                onClick={() => handleAreaClick(area)}
                className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full transition-colors border border-white/5"
              >
                {area}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Recommendations */}
      <section className="py-20 container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 text-primary">
              <Navigation className="w-5 h-5 fill-current" />
              <span className="text-xs font-black uppercase tracking-widest">Priority Ranking</span>
            </div>
            <h2 className="text-3xl font-headline font-black text-secondary">
              {searchQuery ? `Top Barbers in ${searchQuery}` : "Recommended for You"}
            </h2>
            <p className="text-muted-foreground">Availability &bull; Top Rating &bull; Proximity</p>
          </div>
          <Link href="/auth">
            <Button variant="outline" className="rounded-full px-8 h-12 border-primary/20 text-primary hover:bg-primary/5">View All Shops</Button>
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
            <h3 className="text-xl font-bold text-secondary">No barbers found in {searchQuery || "this area"}</h3>
            <p className="text-muted-foreground">Try selecting one of our popular suggestions above.</p>
          </div>
        )}
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-white border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-headline font-black text-secondary">How to get your haircut</h2>
            <p className="text-muted-foreground mt-2">Follow these 4 simple steps to look like a hero</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <StepItem 
              icon={<Search className="w-8 h-8 text-primary" />} 
              number="01"
              title="Search" 
              description="Enter your area to find the best barbers ranked by location and availability."
            />
            <StepItem 
              icon={<Smartphone className="w-8 h-8 text-primary" />} 
              number="02"
              title="Verify" 
              description="Quick login with your phone number and OTP for a secure experience."
            />
            <StepItem 
              icon={<UserCheck className="w-8 h-8 text-primary" />} 
              number="03"
              title="Select Shop" 
              description="Choose a shop that is 'Available Now' to skip the waiting line."
            />
            <StepItem 
              icon={<CheckCircle2 className="w-8 h-8 text-primary" />} 
              number="04"
              title="Transform" 
              description="Visit the salon, enjoy the vibes, and walk out looking legendary."
            />
          </div>
        </div>
      </section>

      {/* Transparent Pricing & Promotion Info */}
      <section className="bg-primary/5 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-primary/10">
            <div className="bg-primary/10 p-5 rounded-2xl">
              <Info className="w-10 h-10 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-secondary mb-2">Transparent Payment System</h3>
              <p className="text-muted-foreground text-sm max-w-2xl leading-relaxed">
                We believe in full transparency. As a startup, we often subsidize the first few cuts from our own pocket to help you find your lifelong barber. You'll always see the original price and the final amount you pay, with no hidden charges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Merchant CTA */}
      <section className="bg-secondary/5 py-20 border-y border-primary/5">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <h2 className="text-4xl font-headline font-black text-secondary mb-4 text-center md:text-left">Are you a Barber?</h2>
            <p className="text-muted-foreground text-center md:text-left text-lg">
              Join the AapakaNai marketplace. Grow your business, manage your queue with our AI tools, and build your reputation with guaranteed transparent payments.
            </p>
          </div>
          <Link href="/auth?role=barber">
            <Button size="lg" className="rounded-full bg-secondary hover:bg-secondary/90 px-10 h-14 text-lg font-bold shadow-xl">
              Register Your Shop
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function StepItem({ icon, number, title, description }: { icon: React.ReactNode, number: string, title: string, description: string }) {
  return (
    <div className="flex flex-col items-center text-center space-y-4 p-8 rounded-[2rem] hover:bg-accent/50 transition-all duration-300 border border-transparent hover:border-primary/10">
      <div className="relative">
        <div className="w-20 h-20 bg-accent rounded-[1.5rem] flex items-center justify-center shadow-inner">
          {icon}
        </div>
        <span className="absolute -top-3 -right-3 bg-primary text-white text-[12px] font-black w-8 h-8 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
          {number}
        </span>
      </div>
      <h3 className="text-xl font-black text-secondary">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

function ShopCard({ shop }: { shop: any }) {
  // Simulated distance for prototype
  const distance = useMemo(() => (Math.random() * 5).toFixed(1), [shop.id]);

  return (
    <div className="bg-white rounded-[2rem] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-border group">
      <div className="relative h-56 bg-muted">
        <Image 
          src={shop.imageUrl || `https://picsum.photos/seed/${shop.id}/600/400`}
          alt={shop.shopName}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
        {shop.isAvailable ? (
          <div className="absolute top-4 right-4 bg-green-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg z-10">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            AVAILABLE NOW
          </div>
        ) : (
          <div className="absolute top-4 right-4 bg-gray-600/90 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg z-10 backdrop-blur-sm">
            BUSY / CLOSED
          </div>
        )}
        <div className="absolute bottom-4 left-4 z-10">
           <Badge className="bg-white/90 text-secondary border-none backdrop-blur-sm text-[10px] font-black px-3 py-1">
             <MapPin className="w-3 h-3 mr-1 text-primary" />
             {distance} KM
           </Badge>
        </div>
      </div>
      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-headline font-black text-secondary leading-tight group-hover:text-primary transition-colors">{shop.shopName}</h3>
            <p className="text-muted-foreground text-xs mt-1">{shop.address}</p>
          </div>
          <div className="flex items-center gap-1.5 bg-primary/10 px-3 py-1.5 rounded-xl border border-primary/10">
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span className="text-sm font-black text-secondary">{shop.rating || 'New'}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-dashed">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground mb-1">Pricing</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-black text-secondary">₹{shop.services?.[0]?.price || '100'}</p>
              <Badge className="bg-primary/10 text-primary text-[9px] border-none px-2">SUBSIDIZED</Badge>
            </div>
          </div>
          <Link href={`/shop/${shop.id}`}>
            <Button className="rounded-full px-8 h-12 font-bold shadow-lg bg-secondary hover:bg-primary transition-colors">Book Now</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
