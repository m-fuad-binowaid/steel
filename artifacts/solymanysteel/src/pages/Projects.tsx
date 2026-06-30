import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageHero } from '@/components/PageHero';

import project1Img from '@assets/generated_images/project-1.jpg';
import project2Img from '@assets/generated_images/project-2.jpg';
import project3Img from '@assets/generated_images/project-3.jpg';
import project4Img from '@assets/generated_images/project-4.jpg';
import project5Img from '@assets/generated_images/project-5.jpg';
import project6Img from '@assets/generated_images/project-6.jpg';

export const Projects = () => {
  const { t } = useLanguage();

  const projects = [
    { id: 1, img: project1Img },
    { id: 2, img: project2Img },
    { id: 3, img: project3Img },
    { id: 4, img: project4Img },
    { id: 5, img: project5Img },
    { id: 6, img: project6Img },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-1 bg-background"
    >
      <PageHero title={t('projects.title')} subtitle={t('projects.tagline')} />
      
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t('projects.intro')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative h-80 rounded-2xl overflow-hidden border border-border"
              >
                <img 
                  src={project.img} 
                  alt={`Project ${project.id}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform">
                  <div className="w-10 h-1 bg-primary mb-4" />
                  <h3 className="text-white font-bold text-xl">{t('projects.title')} {project.id}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};