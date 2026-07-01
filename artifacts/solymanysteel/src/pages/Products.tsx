import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageHero } from '@/components/PageHero';

import waImg5 from '@assets/real_images/wa_img5.jpg';
import waImg6 from '@assets/real_images/wa_img6.jpg';
import waImg3 from '@assets/real_images/wa_img3.jpg';
import waImg4 from '@assets/real_images/wa_img4.jpg';
import waImg1 from '@assets/real_images/wa_img1.jpg';
import waImg2 from '@assets/real_images/wa_img2.jpg';
import proj12 from '@assets/real_images/proj12.jpg';

export const Products = () => {
  const { t, language } = useLanguage();

  const qualities = [
    { label: t('products.q1.label'), value: 98 },
    { label: t('products.q2.label'), value: 90 },
    { label: t('products.q3.label'), value: 95 },
    { label: t('products.q4.label'), value: 97 },
  ];

  const products = [
    {
      img: waImg5,
      nameAr: 'حديد التسليح',
      nameEn: 'Rebar (Reinforcing Steel)',
      descAr: 'حديد تسليح عالي الجودة بمعايير سعودية دولية',
      descEn: 'High-quality rebar conforming to Saudi & international standards',
    },
    {
      img: waImg6,
      nameAr: 'القضبان الفولاذية',
      nameEn: 'Steel Bars & Rods',
      descAr: 'قضبان وأعمدة فولاذية لجميع الأحجام والمواصفات',
      descEn: 'Steel bars and rods in all sizes and specifications',
    },
    {
      img: waImg3,
      nameAr: 'شبكة الحديد',
      nameEn: 'Steel Wire Mesh',
      descAr: 'شبكات حديدية محكمة للبناء والتسليح',
      descEn: 'Welded wire mesh for construction & reinforcement',
    },
    {
      img: waImg4,
      nameAr: 'الصفائح المموجة',
      nameEn: 'Corrugated Steel Sheets',
      descAr: 'صفائح مموجة للأسقف والجدران بالمباني الصناعية',
      descEn: 'Corrugated sheets for industrial roofing & cladding',
    },
    {
      img: waImg1,
      nameAr: 'الأسلاك الفولاذية',
      nameEn: 'Steel Wire Coils',
      descAr: 'أسلاك فولاذية ملفوفة بمختلف الأقطار والأوزان',
      descEn: 'Steel wire coils in various diameters and weights',
    },
    {
      img: waImg2,
      nameAr: 'لفات الأسلاك',
      nameEn: 'Wire Rod Coils',
      descAr: 'لفات أسلاك للأعمال الإنشائية والصناعية',
      descEn: 'Wire rod coils for structural and industrial uses',
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
      <PageHero title={t('products.title')} subtitle={t('products.tagline')} backgroundImage={proj12} />

      {/* Why our products + Quality bars */}
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
                        transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
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
              className="relative h-[450px] rounded-2xl overflow-hidden border border-border"
            >
              <img src={proj12} alt="rebar quality" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
              <div className="absolute bottom-6 right-6 left-6">
                <div className="bg-card/90 backdrop-blur border border-border rounded-xl p-4">
                  <p className="text-primary font-bold text-sm uppercase tracking-wider mb-1">
                    {language === 'ar' ? 'جودة معتمدة' : 'Certified Quality'}
                  </p>
                  <p className="text-white font-black text-2xl">
                    {language === 'ar' ? 'معايير سعودية ودولية' : 'Saudi & International Standards'}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Gallery Grid */}
      <section className="pb-20 md:pb-32 bg-card border-t border-border relative">
        <div className="absolute inset-0 bg-diagonal-hatching opacity-5 pointer-events-none" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center pt-20 mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              {language === 'ar' ? 'منتجاتنا' : 'Our Products'}
            </h2>
            <div className="gold-separator w-24 mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.4) }}
                className="group bg-background border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-colors"
              >
                <div className="relative h-52 overflow-hidden bg-white">
                  <img
                    src={product.img}
                    alt={product.nameAr}
                    className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="w-8 h-1 bg-primary mb-3" />
                  <h3 className="text-white font-bold text-xl mb-2">
                    {language === 'ar' ? product.nameAr : product.nameEn}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {language === 'ar' ? product.descAr : product.descEn}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};
