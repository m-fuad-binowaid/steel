import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageHero } from '@/components/PageHero';

// Real project images (actual buildings supplied with steel)
import alHamodeTower  from '@assets/real_images/AL-Hamode-Tower.jpg';
import dreamTower     from '@assets/real_images/Dream-Tower.jpg';
import riyadh10th    from '@assets/real_images/Riyadh-10th-power-s.jpg';
import riyadh12th    from '@assets/real_images/Riyadh-12th-power-s.jpg';

// Supplementary operations photos
import proj6         from '@assets/real_images/proj6.jpg';
import imgWa0002     from '@assets/real_images/img_wa_0002.jpg';

export const Projects = () => {
  const { t, language } = useLanguage();

  const projects = [
    {
      img: alHamodeTower,
      nameAr: 'برج الحمود',
      nameEn: 'AL Hamode Tower',
      locationAr: 'الرياض، المملكة العربية السعودية',
      locationEn: 'Riyadh, Saudi Arabia',
    },
    {
      img: dreamTower,
      nameAr: 'برج دريم',
      nameEn: 'Dream Tower',
      locationAr: 'الرياض، المملكة العربية السعودية',
      locationEn: 'Riyadh, Saudi Arabia',
    },
    {
      img: riyadh10th,
      nameAr: 'مشروع رياض 10 (S)',
      nameEn: 'Riyadh 10th Power (S)',
      locationAr: 'الرياض، المملكة العربية السعودية',
      locationEn: 'Riyadh, Saudi Arabia',
    },
    {
      img: riyadh12th,
      nameAr: 'مشروع رياض 12 (S)',
      nameEn: 'Riyadh 12th Power (S)',
      locationAr: 'الرياض، المملكة العربية السعودية',
      locationEn: 'Riyadh, Saudi Arabia',
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
      <PageHero title={t('projects.title')} subtitle={t('projects.tagline')} backgroundImage={alHamodeTower} />

      {/* Projects grid */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t('projects.intro')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative rounded-2xl overflow-hidden border border-border"
                style={{ height: '480px' }}
              >
                <img
                  src={project.img}
                  alt={project.nameAr}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-8">
                  <div className="w-10 h-1 bg-primary mb-4" />
                  <h3 className="text-white font-black text-2xl mb-2">
                    {language === 'ar' ? project.nameAr : project.nameEn}
                  </h3>
                  <p className="text-muted-foreground text-sm font-medium">
                    📍 {language === 'ar' ? project.locationAr : project.locationEn}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Operations strip */}
      <section className="pb-20 md:pb-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative h-64 rounded-2xl overflow-hidden border border-border group"
            >
              <img src={proj6} alt="warehouse" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-4 right-4 left-4">
                <div className="w-8 h-1 bg-primary mb-2" />
                <p className="text-white font-bold">
                  {language === 'ar' ? 'مستودعات وعمليات التخزين' : 'Warehouses & Storage Operations'}
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative h-64 rounded-2xl overflow-hidden border border-border group"
            >
              <img src={imgWa0002} alt="delivery" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-4 right-4 left-4">
                <div className="w-8 h-1 bg-primary mb-2" />
                <p className="text-white font-bold">
                  {language === 'ar' ? 'عمليات التحميل والتوصيل' : 'Loading & Delivery Operations'}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
