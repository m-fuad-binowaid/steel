import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageHero } from '@/components/PageHero';
import { Handshake } from 'lucide-react';

export const Partners = () => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-1 bg-background"
    >
      <PageHero title={t('partners.title')} subtitle={t('partners.tagline')} />
      
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card border border-border p-8 md:p-12 rounded-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-bl-full pointer-events-none" />
              
              <div className="flex flex-col md:flex-row gap-8 items-start md:items-center relative z-10">
                <div className="w-24 h-24 shrink-0 bg-background border border-border rounded-xl flex items-center justify-center">
                  <Handshake className="w-10 h-10 text-primary" />
                </div>
                
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
                    {t('partners.balady.name')}
                  </h2>
                  <div className="gold-separator w-16 mb-4" />
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {t('partners.balady.desc')}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
          
        </div>
      </section>
    </motion.div>
  );
};