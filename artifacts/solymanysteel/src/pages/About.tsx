import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageHero } from '@/components/PageHero';
import aboutImg from '@assets/generated_images/about-page.jpg';

export const About = () => {
  const { t, dir } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-1 bg-background"
    >
      <PageHero title={t('about.title')} />
      
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: dir === 'rtl' ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">
                <span className="text-gradient-gold">السليماني للحديد</span><br />
                {t('hero.tagline')}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                {t('about.desc')}
              </p>
              
              <div className="grid grid-cols-2 gap-8 mt-12 pt-12 border-t border-border">
                <div>
                  <div className="text-4xl font-black text-primary mb-2">{t('stats.exp.value')}</div>
                  <div className="text-sm font-bold text-white uppercase tracking-wider">{t('stats.exp.label')}</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-primary mb-2">{t('stats.proj.value')}</div>
                  <div className="text-sm font-bold text-white uppercase tracking-wider">{t('stats.proj.label')}</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: dir === 'rtl' ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 border border-border"
            >
              <img src={aboutImg} alt={t('about.title')} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-background/80 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};