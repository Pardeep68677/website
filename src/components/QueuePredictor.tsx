
"use client";

import React, { useState } from 'react';
import { predictQueueStatus, type PredictiveQueueStatusOutput } from '@/ai/flows/predictive-queue-status';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, Loader2, Info } from 'lucide-react';

export const QueuePredictor = () => {
  const [day, setDay] = useState('Sunday');
  const [time, setTime] = useState('11 AM');
  const [prediction, setPrediction] = useState<PredictiveQueueStatusOutput | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    setLoading(true);
    try {
      const result = await predictQueueStatus({ day, time });
      setPrediction(result);
    } catch (error) {
      console.error("Error predicting queue:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="queue" className="py-24 bg-secondary text-secondary-foreground relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -ml-32 -mb-32" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-headline font-black mb-4">Don't Wait in Line</h2>
            <p className="text-secondary-foreground/80 text-lg">
              Sunday is our busiest day with crowds seeking that perfect Bollywood transformation. Use our AI-powered tool to predict waiting times and plan your visit.
            </p>
            <div className="flex items-center gap-3 text-sm bg-white/5 border border-white/10 p-4 rounded-lg">
              <Info className="w-5 h-5 text-primary shrink-0" />
              <p>Historical data shows peak traffic between 10 AM and 4 PM on Sundays.</p>
            </div>
          </div>
          
          <Card className="bg-background text-foreground border-none shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl font-headline">
                <Clock className="w-6 h-6 text-primary" />
                Queue Predictor
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-muted-foreground">Select Day</label>
                <Select value={day} onValueChange={setDay}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(d => (
                      <SelectItem key={d} value={d}>{d}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-muted-foreground">Approximate Time</label>
                <Input 
                  placeholder="e.g. 11 AM or afternoon" 
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>

              <Button 
                onClick={handleCheck} 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12"
                disabled={loading}
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Check Estimated Wait
              </Button>

              {prediction && (
                <div className="mt-6 p-4 bg-accent rounded-xl border border-primary/20 animate-in fade-in slide-in-from-top-4 duration-500">
                  <div className="mb-2">
                    <span className="text-xs font-bold uppercase text-primary">Wait Estimate:</span>
                    <p className="text-xl font-bold text-secondary">{prediction.estimatedWaitingTime}</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {prediction.queueStatusExplanation}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
