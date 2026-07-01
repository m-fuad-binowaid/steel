import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, ArrowRight, Building2, Factory, HardHat, Phone } from 'lucide-react';

import heroImg from '@assets/real_images/proj7.jpg';
import waImg5 from '@assets/real_images/wa_img5.jpg';
import waImg3 from '@assets/real_images/wa_img3.jpg';
import waImg4 from '@assets/real_images/wa_img4.jpg';
import imgWa0001 from '@assets/real_images/img_wa_0001.jpg';
import proj12 from '@assets/real_images/proj12.jpg';

export const Home = () => {
  const { t, dir } = useLanguage();
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const heroPanels = [
    { img: imgWa0001, labelAr: 'أسطول الشحن', labelEn: 'Transport Fleet' },
    { img: proj12,    labelAr: 'حديد التسليح', labelEn: 'Rebar Products' },
    { img: waImg4,    labelAr: 'الصفائح الفولاذية', labelEn: 'Steel Sheets' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-1 flex flex-col bg-background"
    >
      {/* ─── Hero Section ─── */}
      <section className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden">
        {/* Full-bleed background */}
        <div className="absolute inset-0 bg-background z-0">
          <img src={heroImg} alt="Hero" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left / text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-primary font-bold tracking-widest uppercase mb-6 text-sm md:text-base">
                {t('hero.tagline')}
              </h2>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] mb-8 whitespace-pre-line">
                {t('hero.title')}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10">
                {t('hero.subtitle')}
              </p>

              <div className="flex flex-wrap items-center gap-6">
                <Link href="/services">
                  <span className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 cursor-pointer">
                    {t('hero.cta')}
                    <ArrowIcon className="w-5 h-5" />
                  </span>
                </Link>
                <Link href="/contact">
                  <span className="inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-xl font-bold transition-all hover:-translate-y-1 cursor-pointer">
                    {t('home.cta.title')}
                  </span>
                </Link>
              </div>
            </motion.div>

            {/* Right / 3-panel image strip */}
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? -40 : 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="hidden lg:flex gap-3 items-start"
              style={{ height: '420px' }}
            >
              {heroPanels.map((panel, i) => (
                <div
                  key={i}
                  className="relative flex-1 rounded-2xl overflow-hidden border border-border group"
                  style={{
                    height: i === 0 ? '360px' : i === 1 ? '420px' : '390px',
                    alignSelf: 'flex-end',
                  }}
                >
                  <img
                    src={panel.img}
                    alt={panel.labelAr}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                  <div className="absolute bottom-4 left-3 right-3">
                    <div className="w-6 h-0.5 bg-primary mb-1.5" />
                    <p className="text-white text-xs font-bold leading-tight">
                      {dir === 'rtl' ? panel.labelAr : panel.labelEn}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Stats Bar ─── */}
      <section className="border-y border-border bg-card relative z-20 -mt-10 mx-6 md:mx-12 rounded-2xl shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-diagonal-hatching opacity-10 pointer-events-none" />
        <div className="container mx-auto px-6 py-12 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-border rtl:divide-x-reverse">
            {[
              { val: t('stats.exp.value'),    label: t('stats.exp.label') },
              { val: t('stats.proj.value'),   label: t('stats.proj.label') },
              { val: t('stats.fields.value'), label: t('stats.fields.label') },
              { val: t('stats.qual.value'),   label: t('stats.qual.label') },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center text-center pt-8 md:pt-0 first:pt-0">
                <span className="text-4xl md:text-5xl font-black text-primary mb-2">{stat.val}</span>
                <span className="text-sm font-bold text-white uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Quick Services ─── */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4">{t('services.title')}</h2>
              <div className="gold-separator w-24" />
            </div>
            <Link href="/services">
              <span className="text-primary hover:text-white font-bold flex items-center gap-2 transition-colors cursor-pointer uppercase text-sm tracking-wider">
                {dir === 'rtl' ? 'عرض كل الخدمات' : 'View All Services'} <ArrowIcon className="w-4 h-4" />
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Building2 className="w-8 h-8" />, title: t('services.s1.title'), desc: t('services.s1.desc') },
              { icon: <Factory className="w-8 h-8" />,   title: t('services.s2.title'), desc: t('services.s2.desc') },
              { icon: <HardHat className="w-8 h-8" />,   title: t('services.s3.title'), desc: t('services.s3.desc') },
            ].map((s, i) => (
              <div key={i} className="bg-card border border-border p-8 rounded-2xl hover:border-primary/50 transition-colors group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -z-0 transition-transform group-hover:scale-110" />
                <div className="text-primary mb-6 relative z-10">{s.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-3 relative z-10">{s.title}</h3>
                <p className="text-muted-foreground relative z-10">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Quick Products ─── */}
      <section className="py-24 md:py-32 bg-card border-y border-border relative">
        <div className="absolute inset-0 bg-diagonal-hatching opacity-5 pointer-events-none" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4">{t('products.title')}</h2>
              <div className="gold-separator w-24" />
            </div>
            <Link href="/products">
              <span className="text-primary hover:text-white font-bold flex items-center gap-2 transition-colors cursor-pointer uppercase text-sm tracking-wider">
                {dir === 'rtl' ? 'استكشف المنتجات' : 'Explore Products'} <ArrowIcon className="w-4 h-4" />
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { img: waImg5, title: t('products.p1') },
              { img: waImg3, title: t('products.p2') },
              { img: waImg4, title: t('products.p3') },
            ].map((p, i) => (
              <div key={i} className="group relative h-64 rounded-2xl overflow-hidden border border-border">
                <img src={p.img} alt={p.title} className="w-full h-full object-contain bg-white p-4 transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <div className="w-8 h-1 bg-primary mb-3" />
                  <h3 className="text-white font-bold text-xl">{p.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="bg-primary/10 border border-primary/20 rounded-3xl p-10 md:p-20 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-diagonal-hatching opacity-20" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6">{t('home.cta.title')}</h2>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                {t('contact.desc')}
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                <a href="tel:0500729313" className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold transition-all w-full sm:w-auto justify-center">
                  <Phone className="w-5 h-5" />
                  <span dir="ltr">0500 729 313</span>
                </a>
                <Link href="/contact">
                  <span className="inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-xl font-bold transition-all w-full sm:w-auto justify-center cursor-pointer">
                    {t('nav.contact')}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
