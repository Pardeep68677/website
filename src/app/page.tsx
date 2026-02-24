
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { Gallery } from '@/components/Gallery';
import { QueuePredictor } from '@/components/QueuePredictor';
import { Reviews } from '@/components/Reviews';
import { Footer } from '@/components/Footer';
import { ChatAssistant } from '@/components/ChatAssistant';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <Gallery />
      <QueuePredictor />
      <Reviews />
      <Footer />
      <ChatAssistant />
    </main>
  );
}
