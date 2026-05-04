import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { Oculoplastic101 } from '@/components/oculoplastic-101';
import { KnowledgeSharing } from '@/components/knowledge-sharing';
import { ServicesGrid } from '@/components/services-grid';
import { InteractivePortfolio } from '@/components/interactive-portfolio';
import { AboutContact } from '@/components/about-contact';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Oculoplastic101 />
      <ServicesGrid />
      <InteractivePortfolio />
      <KnowledgeSharing />
      <AboutContact />
    </main>
  );
}
