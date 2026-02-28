
'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Phone, CheckCircle2, Scissors, ArrowRight } from 'lucide-react';
import { useAuth, useFirestore } from '@/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'customer';
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  // Note: Phone Auth requires real Firebase setup with Recaptcha.
  // This is a simplified simulation for the prototype.
  const handleSendOtp = async () => {
    if (!phoneNumber) return;
    setLoading(true);
    // Simulation:
    setTimeout(() => {
      setStep('otp');
      setLoading(false);
    }, 1000);
  };

  const handleVerifyOtp = async () => {
    if (!otp) return;
    setLoading(true);
    // Simulation: Log user in and set profile if new
    setTimeout(async () => {
      // Logic for creating/fetching profile would go here
      router.push(role === 'barber' ? '/dashboard/barber' : '/dashboard/customer');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-accent/20 p-4">
      <Card className="w-full max-w-md shadow-2xl border-none">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white">
            <Scissors className="w-6 h-6" />
          </div>
          <CardTitle className="text-3xl font-headline font-black">
            {role === 'barber' ? 'Barber Login' : 'Customer Login'}
          </CardTitle>
          <CardDescription>
            Join the most trusted Indian barber marketplace
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 'phone' ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-muted-foreground">Mobile Number</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold">+91</span>
                  <Input 
                    className="pl-14 h-12 rounded-xl"
                    placeholder="9876543210"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>
              <Button 
                onClick={handleSendOtp} 
                className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 font-bold"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send OTP'} <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-muted-foreground">Enter 6-digit OTP</label>
                <Input 
                  className="h-12 rounded-xl text-center text-2xl tracking-[1em]"
                  placeholder="000000"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <Button 
                onClick={handleVerifyOtp} 
                className="w-full h-12 rounded-xl bg-secondary hover:bg-secondary/90 font-bold"
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Verify & Enter'}
              </Button>
              <button 
                onClick={() => setStep('phone')} 
                className="w-full text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Change Phone Number
              </button>
            </div>
          )}

          <div className="pt-4 text-center">
            <p className="text-xs text-muted-foreground">
              By continuing, you agree to our Terms of Service and Privacy Policy. 
              OTP will be sent via SMS.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}