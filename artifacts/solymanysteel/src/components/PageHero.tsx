import React from 'react';
import { motion } from 'framer-motion';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

export const PageHero = ({ title, subtitle, backgroundImage }: PageHeroProps) => {
  return (
    <div className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden border-b border-border/50">
      <div className="absolute inset-0 bg-background z-0">
        {backgroundImage ? (
          <>
            <img src={backgroundImage} alt={title} className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />
          </>
        ) : (
          <div className="absolute inset-0 bg-diagonal-hatching opacity-50" />
        )}
      </div>
      
      <div className="container relative z-10 mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {subtitle && (
            <h2 className="text-primary font-bold tracking-widest uppercase mb-4 text-sm md:text-base">
              {subtitle}
            </h2>
          )}
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
            {title}
          </h1>
          <div className="gold-separator w-24 mx-auto mt-8 mb-0" />
        </motion.div>
      </div>
    </div>
  );
};