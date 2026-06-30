import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';

export const Contact = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[2px] w-8 bg-primary"></div>
              <span className="text-primary font-bold tracking-widest uppercase text-sm">
                {t('nav.contact')}
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              {t('contact.title')}
            </h2>
            <p className="text-zinc-400 text-lg mb-12 max-w-md">
              {t('contact.desc')}
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-card rounded-lg flex items-center justify-center border border-border group-hover:border-primary/50 group-hover:text-primary transition-colors">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1 uppercase tracking-wider text-sm">{t('contact.hq_label')}</h4>
                  <p className="text-zinc-400">{t('contact.address')}</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-card rounded-lg flex items-center justify-center border border-border group-hover:border-primary/50 group-hover:text-primary transition-colors">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1 uppercase tracking-wider text-sm">{t('contact.phone_label')}</h4>
                  <p className="text-zinc-400" dir="ltr">{t('contact.phone')}</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-card rounded-lg flex items-center justify-center border border-border group-hover:border-primary/50 group-hover:text-primary transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1 uppercase tracking-wider text-sm">{t('contact.email_label')}</h4>
                  <p className="text-zinc-400">{t('contact.email')}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border p-8 md:p-12 rounded-xl"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wide">
                  {t('contact.form.name')}
                </label>
                <input 
                  type="text" 
                  className="w-full bg-background border border-border rounded-md px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                  placeholder={t('contact.form.name_placeholder')}
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wide">
                  {t('contact.form.email')}
                </label>
                <input 
                  type="email" 
                  className="w-full bg-background border border-border rounded-md px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                  placeholder={t('contact.form.email_placeholder')}
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-zinc-400 mb-2 uppercase tracking-wide">
                  {t('contact.form.message')}
                </label>
                <textarea 
                  rows={4}
                  className="w-full bg-background border border-border rounded-md px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder={t('contact.form.message_placeholder')}
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-md transition-all shadow-lg shadow-primary/20 hover:-translate-y-1 mt-4"
              >
                {t('contact.form.submit')}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
