import React from 'react';
import { Switch, Route, Router } from 'wouter';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';

import { Home } from '@/pages/Home';
import { About } from '@/pages/About';
import { Services } from '@/pages/Services';
import { Projects } from '@/pages/Projects';
import { Products } from '@/pages/Products';
import { Partners } from '@/pages/Partners';
import { Contact } from '@/pages/Contact';
import { Quote } from '@/pages/Quote';
import { Calculator } from '@/pages/Calculator';
import { FAQ } from '@/pages/FAQ';
import { Regions } from '@/pages/Regions';
import { Admin } from '@/pages/Admin';

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
              <Route path="/quote" component={Quote} />
              <Route path="/calculator" component={Calculator} />
              <Route path="/faq" component={FAQ} />
              <Route path="/regions" component={Regions} />
              <Route path="/admin" component={Admin} />
              <Route>
                <div className="flex-1 flex items-center justify-center pt-32 pb-16">
                  <h1 className="text-4xl font-black text-white">404 - Page Not Found</h1>
                </div>
              </Route>
            </Switch>
          </main>
          <Footer />
          <WhatsAppFloat />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;