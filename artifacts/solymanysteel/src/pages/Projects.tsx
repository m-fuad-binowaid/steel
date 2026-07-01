import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageHero } from '@/components/PageHero';

import proj6 from '@assets/real_images/proj6.jpg';
import proj7 from '@assets/real_images/proj7.jpg';
import proj9 from '@assets/real_images/proj9.jpg';
import proj10 from '@assets/real_images/proj10.jpg';
import proj11 from '@assets/real_images/proj11.jpg';
import proj12 from '@assets/real_images/proj12.jpg';
import imgWa0001 from '@assets/real_images/img_wa_0001.jpg';
import imgWa0002 from '@assets/real_images/img_wa_0002.jpg';
import imgWa0003 from '@assets/real_images/img_wa_0003.jpg';
import imgWa0004 from '@assets/real_images/img_wa_0004.jpg';

export const Projects = () => {
  const { t, language } = useLanguage();

  const projects = [
    { id: 1, img: proj6,      labelAr: 'مستودع الحديد – الرياض',           labelEn: 'Steel Warehouse – Riyadh' },
    { id: 2, img: proj7,      labelAr: 'مخزن حديد التسليح',                labelEn: 'Rebar Storage Facility' },
    { id: 3, img: proj12,     labelAr: 'أقسام حديد بلدي الجديد',           labelEn: 'New Rebar Batch – Balady' },
    { id: 4, img: proj11,     labelAr: 'مستودع مفتوح – تخزين الحديد',     labelEn: 'Open Warehouse – Steel Storage' },
    { id: 5, img: proj10,     labelAr: 'عمليات التخزين والفرز',            labelEn: 'Storage & Sorting Operations' },
    { id: 6, img: proj9,      labelAr: 'ورشة اللحام والتصنيع',             labelEn: 'Welding & Manufacturing Workshop' },
    { id: 7, img: imgWa0001,  labelAr: 'أسطول الشحن – رافعة تادانو',       labelEn: 'Transport Fleet – Tadano Crane' },
    { id: 8, img: imgWa0002,  labelAr: 'تحميل حديد التسليح',               labelEn: 'Rebar Loading Operations' },
    { id: 9, img: imgWa0003,  labelAr: 'عمليات التوزيع الميداني',          labelEn: 'Field Distribution Operations' },
    { id: 10, img: imgWa0004, labelAr: 'تسليم الدفعات – موقع المشروع',    labelEn: 'Batch Delivery – Project Site' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-1 bg-background"
    >
      <PageHero title={t('projects.title')} subtitle={t('projects.tagline')} backgroundImage={proj6} />

      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t('projects.intro')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.4) }}
                className="group relative rounded-2xl overflow-hidden border border-border cursor-pointer"
                style={{ height: index === 0 || index === 5 ? '420px' : '320px' }}
              >
                <img
                  src={project.img}
                  alt={project.labelAr}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform">
                  <div className="w-10 h-1 bg-primary mb-3" />
                  <h3 className="text-white font-bold text-lg leading-snug">
                    {language === 'en' ? project.labelEn : project.labelAr}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};
