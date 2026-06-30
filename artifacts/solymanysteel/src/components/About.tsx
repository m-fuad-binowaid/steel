import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

export const About = () => {
  const { t } = useLanguage();

  const stats = [
    { value: t('about.stat1.value'), label: t('about.stat1.label') },
    { value: t('about.stat2.value'), label: t('about.stat2.label') },
    { value: t('about.stat3.value'), label: t('about.stat3.label') },
    { value: t('about.stat4.value'), label: t('about.stat4.label') },
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-card relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[2px] w-8 bg-primary"></div>
              <span className="text-primary font-bold tracking-widest uppercase text-sm">
                {t('nav.about')}
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
              {t('about.title')}
            </h2>
            
            <p className="text-lg text-zinc-400 leading-relaxed mb-8">
              {t('about.description')}
            </p>
            
            {/* Subtle aesthetic element */}
            <div className="p-6 border-l-2 border-primary bg-background/50 rounded-r-lg">
              <p className="text-white font-semibold italic">
                "{t('about.quote')}"
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4 md:gap-6"
          >
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="bg-background p-8 rounded-lg border border-border hover:border-primary/50 transition-colors group"
              >
                <div className="text-4xl md:text-5xl font-black text-white mb-2 group-hover:text-primary transition-colors">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base font-bold text-zinc-500 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
          
        </div>
      </div>
      
      {/* Decorative large text behind */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -z-0 opacity-[0.02] pointer-events-none overflow-hidden w-full">
        <h2 className="text-[15rem] font-black whitespace-nowrap text-white text-center">
          STRENGTH
        </h2>
      </div>
    </section>
  );
};
