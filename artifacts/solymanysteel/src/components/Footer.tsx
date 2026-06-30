import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import logoImg from '@assets/solymanysteel-logo.png';

export const Footer = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-zinc-950 border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10 flex items-center justify-center bg-primary rounded-lg overflow-hidden">
                <img 
                  src={logoImg} 
                  alt="السليماني للحديد" 
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = '<span class="text-sm font-black text-white">SS</span>';
                  }}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-white leading-none mb-1">
                  {language === 'ar' ? 'السليماني' : 'Al Solyymany'}
                </span>
                <span className="text-xs font-bold tracking-widest text-primary uppercase leading-none">
                  {language === 'ar' ? 'للحديد' : 'Iron'}
                </span>
              </div>
            </div>
            <p className="text-zinc-500 max-w-sm leading-relaxed text-sm">
              {language === 'ar' 
                ? 'شريكك الموثوق في البناء والتطوير، نقدم أفضل أنواع حديد التسليح والصلب بأعلى المعايير العالمية لدعم رؤية المملكة 2030.' 
                : 'Your trusted partner in construction and development, providing the best types of rebar and steel with the highest international standards to support Vision 2030.'}
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">{t('footer.quick_links')}</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="text-zinc-500 hover:text-primary transition-colors text-sm">{t('nav.about')}</a></li>
              <li><a href="#services" className="text-zinc-500 hover:text-primary transition-colors text-sm">{t('nav.services')}</a></li>
              <li><a href="#products" className="text-zinc-500 hover:text-primary transition-colors text-sm">{t('nav.products')}</a></li>
              <li><a href="#projects" className="text-zinc-500 hover:text-primary transition-colors text-sm">{t('nav.projects')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">{t('footer.connect')}</h4>
            <ul className="space-y-3">
              <li className="text-zinc-500 text-sm">LinkedIn</li>
              <li className="text-zinc-500 text-sm">Twitter</li>
              <li className="text-zinc-500 text-sm">Instagram</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-600 text-xs font-semibold tracking-wide">
            {t('footer.rights')}
          </p>
          <div className="flex gap-4 text-zinc-600 text-xs font-semibold">
            <span>{t('footer.privacy')}</span>
            <span>{t('footer.terms')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
