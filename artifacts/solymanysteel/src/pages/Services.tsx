import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageHero } from '@/components/PageHero';
import { Factory, HardHat, Truck, Landmark } from 'lucide-react';

import proj6 from '@assets/real_images/proj6.jpg';
import proj7 from '@assets/real_images/proj7.jpg';
import proj10 from '@assets/real_images/proj10.jpg';
import imgWa0001 from '@assets/real_images/img_wa_0001.jpg';
import imgWa0002 from '@assets/real_images/img_wa_0002.jpg';
import imgWa0003 from '@assets/real_images/img_wa_0003.jpg';

export const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      id: 's1',
      icon: <Landmark className="w-10 h-10" />,
      title: t('services.s1.title'),
      desc: t('services.s1.desc'),
      img: proj10,
    },
    {
      id: 's2',
      icon: <Factory className="w-10 h-10" />,
      title: t('services.s2.title'),
      desc: t('services.s2.desc'),
      img: proj7,
    },
    {
      id: 's3',
      icon: <HardHat className="w-10 h-10" />,
      title: t('services.s3.title'),
      desc: t('services.s3.desc'),
      img: imgWa0003,
    },
    {
      id: 's4',
      icon: <Truck className="w-10 h-10" />,
      title: t('services.s4.title'),
      desc: t('services.s4.desc'),
      img: imgWa0001,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-1 bg-background"
    >
      <PageHero title={t('services.title')} subtitle={t('services.tagline')} backgroundImage={proj6} />

      <section className="py-20 md:py-32 relative">
        <div className="absolute inset-0 bg-diagonal-hatching opacity-10 pointer-events-none" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t('services.intro')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-colors"
              >
                {/* Real image for each service */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/30 to-transparent" />
                  <div className="absolute top-4 right-4 rtl:right-4 ltr:left-4 w-14 h-14 bg-primary/90 rounded-xl flex items-center justify-center text-white shadow-lg">
                    {service.icon}
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Extra operations photo strip */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-64 rounded-2xl overflow-hidden border border-border"
            >
              <img src={imgWa0002} alt="loading operations" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-4 right-4 left-4">
                <div className="w-8 h-1 bg-primary mb-2" />
                <p className="text-white font-bold text-lg">{t('services.s4.title')}</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative h-64 rounded-2xl overflow-hidden border border-border"
            >
              <img src={proj6} alt="warehouse" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-4 right-4 left-4">
                <div className="w-8 h-1 bg-primary mb-2" />
                <p className="text-white font-bold text-lg">{t('services.s2.title')}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
