import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// We wrap the import in a try-catch pattern or just import it directly
// since the prompt says "import it using @assets/solymanysteel-logo.png"
import logoImg from '@assets/solymanysteel-logo.png';

export const Navbar = () => {
  const { t, language, setLanguage, dir } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.home'), href: '#home' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.services'), href: '#services' },
    { name: t('nav.products'), href: '#products' },
    { name: t('nav.projects'), href: '#projects' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/90 backdrop-blur-md border-b border-border py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <a href="#home" onClick={(e) => scrollTo(e, '#home')} className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 flex items-center justify-center bg-primary rounded-lg overflow-hidden group-hover:bg-primary/90 transition-colors">
            {/* Fallback to initials if image fails to load, or show image */}
            <img 
              src={logoImg} 
              alt="السليماني للحديد" 
              className="w-10 h-10 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = '<span class="text-xl font-black text-white">SH</span>';
              }}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-white leading-none mb-1">
              {language === 'ar' ? 'السليماني' : 'Al Solyymany'}
            </span>
            <span className="text-xs font-bold tracking-widest text-primary uppercase leading-none">
              {language === 'ar' ? 'للحديد' : 'Iron'}
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className="text-sm font-semibold text-muted-foreground hover:text-white transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all hover:after:w-full"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4 ml-4 pl-4 border-l border-border">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-sm font-bold text-white hover:text-primary transition-colors"
            >
              <Globe className="w-4 h-4" />
              {language === 'ar' ? 'EN' : 'عربي'}
            </button>
            <a
              href="#contact"
              onClick={(e) => scrollTo(e, '#contact')}
              className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded text-sm font-bold transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5"
            >
              {t('nav.contact')}
            </a>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card border-b border-border overflow-hidden"
          >
            <div className="flex flex-col px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollTo(e, link.href)}
                  className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-border flex flex-col gap-4">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 text-lg font-bold text-foreground hover:text-primary w-fit"
                >
                  <Globe className="w-5 h-5" />
                  {language === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
