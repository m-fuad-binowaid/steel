import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageHero } from '@/components/PageHero';
import { CheckCircle2 } from 'lucide-react';
import productsImg from '@assets/generated_images/products-page.jpg';

export const Products = () => {
  const { t } = useLanguage();

  const productsList = [
    t('products.p1'),
    t('products.p2'),
    t('products.p3'),
    t('products.p4'),
    t('products.p5'),
    t('products.p6'),
  ];

  const qualities = [
    { label: t('products.q1.label'), value: 98 },
    { label: t('products.q2.label'), value: 90 },
    { label: t('products.q3.label'), value: 95 },
    { label: t('products.q4.label'), value: 97 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-1 bg-background"
    >
      <PageHero title={t('products.title')} subtitle={t('products.tagline')} backgroundImage={productsImg} />
      
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
                {t('products.why.title')}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                {t('products.why.desc')}
              </p>
              
              <div className="space-y-6">
                {qualities.map((q, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm font-bold text-white mb-2 uppercase tracking-wider">
                      <span>{q.label}</span>
                      <span className="text-primary">{q.value}%</span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${q.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + (index * 0.1) }}
                        className="h-full bg-primary"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden border border-border p-8 bg-card"
            >
              <div className="absolute inset-0 bg-diagonal-hatching opacity-10 pointer-events-none" />
              <h3 className="text-2xl font-bold text-white mb-8 relative z-10 border-b border-border pb-4">{t('products.title')}</h3>
              <ul className="space-y-4 relative z-10">
                {productsList.map((product, index) => (
                  <li key={index} className="flex items-center gap-4 text-lg text-muted-foreground hover:text-white transition-colors group">
                    <CheckCircle2 className="text-primary w-6 h-6 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold">{product}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

        </div>
      </section>
    </motion.div>
  );
};