import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageHero } from '@/components/PageHero';

import proj10 from '@assets/real_images/proj10.jpg';
import proj6 from '@assets/real_images/proj6.jpg';
import proj7 from '@assets/real_images/proj7.jpg';

export const Partners = () => {
  const { t, language } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-1 bg-background"
    >
      <PageHero title={t('partners.title')} subtitle={t('partners.tagline')} backgroundImage={proj6} />

      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6 md:px-12">

          {/* Main partner card */}
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card border border-border rounded-2xl overflow-hidden"
            >
              {/* Warehouse photo showing Balady sign */}
              <div className="relative h-72 md:h-96 overflow-hidden">
                <img
                  src={proj10}
                  alt="Balady Steel Warehouse"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/95 via-card/40 to-transparent" />

                {/* Balady logo text overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                  {/* Styled logo since the original is visible in the image */}
                  <div className="inline-block border-2 border-white/80 rounded-xl px-6 py-4 bg-black/60 backdrop-blur-sm mb-4">
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-white font-black text-2xl md:text-3xl tracking-tight">BALADY</div>
                        <div className="text-white/80 font-bold text-xl md:text-2xl">بلدي</div>
                      </div>
                      <div className="w-px h-12 bg-white/30" />
                      <div className="text-right">
                        <div className="text-white/90 text-xs md:text-sm leading-tight">
                          {language === 'ar' ? 'شركة بلدي الحديد المحدودة' : 'Balady Steel Company Ltd.'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Partner description */}
              <div className="p-8 md:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
                      {t('partners.balady.name')}
                    </h2>
                    <div className="gold-separator w-16 mb-6" />
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {t('partners.balady.desc')}
                    </p>
                  </div>

                  {/* Warehouse photos */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative h-40 rounded-xl overflow-hidden border border-border">
                      <img src={proj7} alt="Balady warehouse" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                    </div>
                    <div className="relative h-40 rounded-xl overflow-hidden border border-border">
                      <img src={proj6} alt="Rebar storage" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                    </div>
                    <div className="col-span-2 bg-background border border-border rounded-xl p-4 text-center">
                      <p className="text-primary font-bold text-sm uppercase tracking-wider mb-1">
                        {language === 'ar' ? 'تأسست' : 'Established'}
                      </p>
                      <p className="text-white font-black text-2xl">1439 هـ</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>
    </motion.div>
  );
};
