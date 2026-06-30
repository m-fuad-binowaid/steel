import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import heroBg from '@assets/generated_images/hero-bg.jpg';

export const Hero = () => {
  const { t, dir, language } = useLanguage();

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background/80 md:bg-gradient-to-r md:from-background/95 md:to-background/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
        {/* Adding noise texture overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-10 pointer-events-none" />
        
        <img
          src={heroBg}
          alt="Steel Mill Interior"
          className="w-full h-full object-cover object-center scale-105 animate-[pulse_20s_ease-in-out_infinite_alternate]"
          onError={(e) => {
            // Fallback dark gradient if image fails
            e.currentTarget.style.display = 'none';
          }}
        />
        {/* Fallback color if image is missing */}
        <div className="absolute inset-0 bg-zinc-950 -z-10" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-[2px] w-12 bg-primary"></div>
            <span className="text-primary font-bold tracking-widest uppercase text-sm">
              {t('hero.tagline')}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] mb-8 whitespace-pre-line"
          >
            {t('hero.title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl leading-relaxed"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#services"
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-white font-bold overflow-hidden rounded-sm transition-transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              <span>{t('hero.cta')}</span>
              {dir === 'rtl' ? <ChevronRight className="w-5 h-5 rotate-180" /> : <ArrowRight className="w-5 h-5" />}
            </a>
            
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-sm transition-all backdrop-blur-sm"
            >
              {t('nav.contact')}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-bold text-white/50 uppercase tracking-widest">
          {language === 'ar' ? 'تمرير للأسفل' : 'Scroll Down'}
        </span>
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
          <motion.div 
            animate={{ y: [0, 48] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-primary"
          />
        </div>
      </motion.div>
    </section>
  );
};
