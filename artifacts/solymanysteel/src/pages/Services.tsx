import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageHero } from '@/components/PageHero';
import { Factory, HardHat, Truck, Landmark } from 'lucide-react';
import servicesImg from '@assets/generated_images/services-page.jpg';

export const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      id: 's1',
      icon: <Landmark className="w-10 h-10" />,
      title: t('services.s1.title'),
      desc: t('services.s1.desc'),
    },
    {
      id: 's2',
      icon: <Factory className="w-10 h-10" />,
      title: t('services.s2.title'),
      desc: t('services.s2.desc'),
    },
    {
      id: 's3',
      icon: <HardHat className="w-10 h-10" />,
      title: t('services.s3.title'),
      desc: t('services.s3.desc'),
    },
    {
      id: 's4',
      icon: <Truck className="w-10 h-10" />,
      title: t('services.s4.title'),
      desc: t('services.s4.desc'),
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-1 bg-background"
    >
      <PageHero title={t('services.title')} subtitle={t('services.tagline')} backgroundImage={servicesImg} />
      
      <section className="py-20 md:py-32 relative">
        <div className="absolute inset-0 bg-diagonal-hatching opacity-20 pointer-events-none" />
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
                className="bg-card border border-border p-10 rounded-2xl hover:border-primary/50 transition-colors group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-0 transition-transform group-hover:scale-110" />
                
                <div className="text-primary mb-6 relative z-10">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 relative z-10">{service.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed relative z-10">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};