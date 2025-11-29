import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import TournamentInfo from '@/components/landing/TournamentInfo';
import Sponsors from '@/components/landing/Sponsors';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <TournamentInfo />
        <Sponsors />
      </main>
      <Footer />
    </div>
  );
}
