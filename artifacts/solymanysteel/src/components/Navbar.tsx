import React, { useState, useEffect } from 'react';
import { Link, useRoute } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import logoImg from '@assets/solymanysteel-logo.png';

const NavLink = ({ href, children, onClick }: { href: string, children: React.ReactNode, onClick?: () => void }) => {
  const [isActive] = useRoute(href);
  
  return (
    <Link href={href} onClick={onClick}>
      <span className={`text-sm font-semibold transition-colors relative cursor-pointer
        after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-primary after:transition-all
        ${isActive ? 'text-white after:w-full' : 'text-muted-foreground hover:text-white after:w-0 hover:after:w-full'}
      `}>
        {children}
      </span>
    </Link>
  );
};

export const Navbar = () => {
  const { t, language, setLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.services'), href: '/services' },
    { name: t('nav.products'), href: '/products' },
    { name: t('nav.projects'), href: '/projects' },
    { name: t('nav.partners'), href: '/partners' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md border-b border-border py-4 shadow-lg shadow-black/50' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative w-14 h-14 flex items-center justify-center bg-primary rounded-xl overflow-hidden group-hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30 border border-primary/40">
              <img 
                src={logoImg} 
                alt="السليماني للحديد" 
                className="w-12 h-12 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<span class="text-2xl font-black text-white">س</span>';
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-white leading-none mb-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                {language === 'ar' ? 'السليماني' : 'Al Solyymany'}
              </span>
              <span className="text-xs font-bold tracking-widest text-primary uppercase leading-none">
                {language === 'ar' ? 'للحديد' : 'Steel'}
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href}>
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-4 ml-4 pl-4 border-l border-border">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-sm font-bold text-white hover:text-primary transition-colors cursor-pointer"
            >
              <Globe className="w-4 h-4" />
              {language === 'ar' ? 'EN' : 'عربي'}
            </button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-white hover:text-primary transition-colors p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100dvh' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden fixed top-[72px] left-0 w-full bg-background border-t border-border overflow-y-auto"
          >
            <div className="flex flex-col px-6 py-8 space-y-6">
              {navLinks.map((link) => (
                <div key={link.href} className="border-b border-border/50 pb-4">
                  <Link href={link.href} onClick={() => setIsMobileMenuOpen(false)}>
                    <span className="text-xl font-bold text-white hover:text-primary transition-colors block w-full">
                      {link.name}
                    </span>
                  </Link>
                </div>
              ))}
              <div className="pt-4 flex flex-col gap-4">
                <button
                  onClick={() => {
                    toggleLanguage();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 text-lg font-bold text-white hover:text-primary w-fit bg-card px-6 py-3 rounded-lg border border-border"
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