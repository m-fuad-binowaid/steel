import React from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Services } from '@/components/Services';
import { Products } from '@/components/Products';
import { Projects } from '@/components/Projects';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

function SinglePageApp() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Products />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <SinglePageApp />
    </LanguageProvider>
  );
}

export default App;
