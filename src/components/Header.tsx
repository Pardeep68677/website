
'use client';

import React from 'react';
import Link from 'next/link';
import { ScissorsIcon } from './icons/BarberIcons';
import { useUser, useAuth } from '@/firebase';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { User, LogOut, LayoutDashboard } from 'lucide-react';

export const Header = () => {
  const { user } = useUser();
  const auth = useAuth();

  const handleLogout = () => {
    auth?.signOut();
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-secondary">
          <ScissorsIcon className="w-8 h-8 text-primary" />
          <span className="font-headline tracking-tighter">AapakaNai</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/#explore" className="text-sm font-medium hover:text-primary transition-colors">Explore</Link>
          
          {!user ? (
            <div className="flex items-center gap-4">
              <Link href="/auth">
                <Button variant="ghost" className="text-sm font-medium">Login</Button>
              </Link>
              <Link href="/auth?role=barber">
                <Button className="px-6 bg-secondary text-secondary-foreground rounded-full text-sm font-bold shadow-lg hover:scale-105 transition-transform">
                  Register Shop
                </Button>
              </Link>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-full gap-2 border-primary/20">
                  <User className="w-4 h-4" />
                  Profile
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2">
                <DropdownMenuItem className="rounded-xl gap-2 p-3 cursor-pointer">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>My Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="rounded-xl gap-2 p-3 cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </nav>
      </div>
    </header>
  );
};
