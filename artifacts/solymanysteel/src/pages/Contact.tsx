import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageHero } from '@/components/PageHero';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

export const Contact = () => {
  const { t, dir } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-1 bg-background"
    >
      <PageHero title={t('contact.title')} />
      
      <section className="py-20 md:py-32 relative">
        <div className="container mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-black text-white mb-10">
                {t('home.cta.title')}
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                    <MapPin className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">{t('contact.address.label')}</h3>
                    <p className="text-muted-foreground">{t('contact.address')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                    <Phone className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">{t('contact.phone.label')}</h3>
                    <div className="flex flex-col gap-1">
                      <a href="tel:0500729313" className="text-muted-foreground hover:text-primary transition-colors inline-block text-left" dir="ltr">0500 729 313</a>
                      <a href="tel:0500728912" className="text-muted-foreground hover:text-primary transition-colors inline-block text-left" dir="ltr">0500 728 912</a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                    <Mail className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">{t('contact.email.label')}</h3>
                    <a href="mailto:info@solymanysteel.com" className="text-muted-foreground hover:text-primary transition-colors">
                      info@solymanysteel.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-border">
                <a 
                  href="https://wa.me/966500729313" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-[#25D366]/20 hover:shadow-[#25D366]/40 hover:-translate-y-1"
                >
                  <MessageCircle className="w-6 h-6" />
                  <span>{t('contact.whatsapp')}</span>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="h-[500px] rounded-2xl overflow-hidden border border-border shadow-2xl"
            >
              <iframe 
                src="https://maps.google.com/maps?q=مؤسسة+سعيد+السليماني+للحديد+الرياض&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-80 hover:grayscale-0 transition-all duration-500"
              />
            </motion.div>
          </div>

        </div>
      </section>
    </motion.div>
  );
};