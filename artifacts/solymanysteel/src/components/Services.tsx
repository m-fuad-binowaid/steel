import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Building2, Truck, Wrench, ShieldCheck } from 'lucide-react';

export const Services = () => {
  const { t, dir } = useLanguage();

  const services = [
    {
      icon: <ShieldCheck className="w-10 h-10 text-primary" />,
      title: t('services.s1.title'),
      desc: t('services.s1.desc'),
    },
    {
      icon: <Building2 className="w-10 h-10 text-primary" />,
      title: t('services.s2.title'),
      desc: t('services.s2.desc'),
    },
    {
      icon: <Wrench className="w-10 h-10 text-primary" />,
      title: t('services.s3.title'),
      desc: t('services.s3.desc'),
    },
    {
      icon: <Truck className="w-10 h-10 text-primary" />,
      title: t('services.s4.title'),
      desc: t('services.s4.desc'),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="services" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <div className="h-[2px] w-8 bg-primary"></div>
            <span className="text-primary font-bold tracking-widest uppercase text-sm">
              {t('nav.services')}
            </span>
            <div className="h-[2px] w-8 bg-primary"></div>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-black text-white"
          >
            {t('services.title')}
          </motion.h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-card border border-border p-8 rounded-xl hover:bg-card/80 transition-all hover:-translate-y-2 hover:border-primary/30 group relative overflow-hidden"
            >
              {/* Decorative accent top */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="mb-6 p-4 bg-background inline-block rounded-lg group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                {service.title}
              </h3>
              <p className="text-zinc-400 leading-relaxed text-sm">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
