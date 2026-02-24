
'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  TrendingUp, 
  Settings, 
  Clock, 
  CheckCircle, 
  DollarSign,
  Scissors
} from 'lucide-react';
import { Header } from '@/components/Header';

export default function BarberDashboard() {
  const [isAvailable, setIsAvailable] = useState(true);

  return (
    <div className="min-h-screen bg-accent/10">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-headline font-black text-secondary">Shop Dashboard</h1>
            <p className="text-muted-foreground">Manage your queue and track your earnings.</p>
          </div>
          <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border">
            <div className="text-right">
              <p className="text-xs font-bold text-muted-foreground uppercase">Shop Status</p>
              <p className={`font-bold ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                {isAvailable ? 'OPEN FOR BUSINESS' : 'CLOSED'}
              </p>
            </div>
            <Switch 
              checked={isAvailable} 
              onCheckedChange={setIsAvailable}
              className="data-[state=checked]:bg-green-500"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Earnings" value="₹12,450" icon={<DollarSign className="text-primary" />} trend="+12%" />
          <StatCard title="Active Queue" value="3" icon={<Users className="text-primary" />} trend="Busy" />
          <StatCard title="Completed Today" value="8" icon={<CheckCircle className="text-primary" />} trend="Good job!" />
          <StatCard title="Avg. Rating" value="4.8" icon={<TrendingUp className="text-primary" />} trend="Top 10%" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="md:col-span-2 rounded-3xl overflow-hidden border-none shadow-lg">
            <CardHeader className="bg-white border-b">
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Active Bookings
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                <BookingItem name="Rajesh Kumar" service="Fire Cutting" time="10:30 AM" status="Waitlist" />
                <BookingItem name="Amit Sharma" service="Classic Cut + Shave" time="11:15 AM" status="Upcoming" />
                <BookingItem name="Vikram Singh" service="Head Massage" time="12:00 PM" status="Upcoming" />
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="rounded-3xl border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Price Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span>Standard Cut</span>
                  <span className="font-bold">₹100</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Shaving</span>
                  <span className="font-bold">₹50</span>
                </div>
                <Button variant="outline" className="w-full rounded-xl mt-4">Edit Services</Button>
              </CardContent>
            </Card>

            <Card className="rounded-3xl bg-secondary text-secondary-foreground border-none shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Marketplace Promo</h3>
                <p className="text-sm opacity-80 mb-4">
                  AapakaNai is covering 50% of the cost for first-time customers this week. You will receive the full amount in your payout.
                </p>
                <Badge className="bg-primary text-white">Active Campaign</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend }: any) {
  return (
    <Card className="rounded-3xl border-none shadow-md">
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-muted-foreground uppercase mb-1">{title}</p>
          <h4 className="text-2xl font-black text-secondary">{value}</h4>
          <p className="text-[10px] text-green-500 font-bold mt-1">{trend}</p>
        </div>
        <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center">
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}

function BookingItem({ name, service, time, status }: any) {
  return (
    <div className="p-4 flex items-center justify-between hover:bg-accent/10 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-primary font-bold">
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-bold text-secondary">{name}</p>
          <p className="text-xs text-muted-foreground">{service}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold text-sm">{time}</p>
        <Badge variant="outline" className="text-[10px] uppercase">{status}</Badge>
      </div>
    </div>
  );
}
