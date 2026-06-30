import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import projectsBg from '@assets/generated_images/projects-bg.jpg';

export const Projects = () => {
  const { t, dir } = useLanguage();

  return (
    <section id="projects" className="py-24 md:py-32 bg-card relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[2px] w-8 bg-primary"></div>
              <span className="text-primary font-bold tracking-widest uppercase text-sm">
                {t('nav.projects')}
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              {t('projects.title')}
            </h2>
            <p className="text-zinc-400 text-lg">
              {t('projects.desc')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <a href="#" className="inline-flex items-center gap-2 text-white hover:text-primary transition-colors font-bold uppercase tracking-wider text-sm">
              <span>{t('projects.view_all')}</span>
              <ArrowUpRight className={`w-5 h-5 ${dir === 'rtl' ? '-scale-x-100' : ''}`} />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative h-[50vh] md:h-[70vh] w-full group overflow-hidden rounded-xl"
        >
          <div className="absolute inset-0 bg-background/40 group-hover:bg-background/20 transition-all duration-500 z-10" />
          <img 
            src={projectsBg} 
            alt="Major Construction Project" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1541888082405-eb73d6eb7c56?q=80&w=1000&auto=format&fit=crop';
            }}
          />
          
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20 bg-gradient-to-t from-background via-background/80 to-transparent translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <div className="flex items-center gap-4 text-primary text-sm font-bold mb-3">
              <span>2023</span>
              <span className="w-1 h-1 rounded-full bg-white/50"></span>
              <span>{t('projects.kafd.location')}</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-white mb-2">{t('projects.kafd.title')}</h3>
            <p className="text-zinc-300 max-w-xl hidden md:block">
              {t('projects.kafd.desc')}
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
