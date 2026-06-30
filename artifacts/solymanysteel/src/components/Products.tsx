import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import productsBg from '@assets/generated_images/products-bg.jpg';
import { Download } from 'lucide-react';

export const Products = () => {
  const { t, dir } = useLanguage();

  const products = [
    { num: '01', title: t('products.p1.title'), desc: t('products.p1.desc') },
    { num: '02', title: t('products.p2.title'), desc: t('products.p2.desc') },
    { num: '03', title: t('products.p3.title'), desc: t('products.p3.desc') },
    { num: '04', title: t('products.p4.title'), desc: t('products.p4.desc') },
  ];

  return (
    <section id="products" className="py-24 md:py-32 bg-zinc-950 relative overflow-hidden">
      
      <div className="container mx-auto px-6 md:px-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Content Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[2px] w-8 bg-primary"></div>
              <span className="text-primary font-bold tracking-widest uppercase text-sm">
                {t('nav.products')}
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-white mb-12">
              {t('products.title')}
            </h2>

            <div className="space-y-8 mb-12">
              {products.map((item, idx) => (
                <div key={idx} className="flex gap-6 group">
                  <div className="text-2xl font-black text-border group-hover:text-primary transition-colors">
                    {item.num}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button className="flex items-center gap-3 px-8 py-4 bg-white text-zinc-950 font-bold hover:bg-primary hover:text-white transition-colors rounded-sm">
              <Download className="w-5 h-5" />
              <span>{t('products.cta')}</span>
            </button>
          </motion.div>

          {/* Image Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl shadow-primary/10"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent z-10" />
            <img 
              src={productsBg} 
              alt="Steel Products" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop';
              }}
            />
            {/* Decorative frame */}
            <div className="absolute inset-4 border border-white/20 z-20 pointer-events-none rounded-xl" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
