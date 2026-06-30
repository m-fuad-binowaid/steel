import React from 'react';
import { Switch, Route, Router } from 'wouter';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

import { Home } from '@/pages/Home';
import { About } from '@/pages/About';
import { Services } from '@/pages/Services';
import { Projects } from '@/pages/Projects';
import { Products } from '@/pages/Products';
import { Partners } from '@/pages/Partners';
import { Contact } from '@/pages/Contact';

function App() {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');

  return (
    <LanguageProvider>
      <Router base={base}>
        <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/30 selection:text-white font-sans">
          <Navbar />
          <main className="flex-1 flex flex-col w-full">
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/services" component={Services} />
              <Route path="/projects" component={Projects} />
              <Route path="/products" component={Products} />
              <Route path="/partners" component={Partners} />
              <Route path="/contact" component={Contact} />
              <Route>
                <div className="flex-1 flex items-center justify-center pt-32 pb-16">
                  <h1 className="text-4xl font-black text-white">404 - Page Not Found</h1>
                </div>
              </Route>
            </Switch>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;