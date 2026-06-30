import React from 'react';
import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import logoImg from '@assets/solymanysteel-logo.png';

export const Footer = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-secondary border-t border-border pt-16 pb-8 mt-auto">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-12 h-12 flex items-center justify-center bg-primary rounded-lg overflow-hidden">
                <img 
                  src={logoImg} 
                  alt="السليماني للحديد" 
                  className="w-10 h-10 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = '<span class="text-xl font-black text-white">SH</span>';
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
            <p className="text-muted-foreground max-w-sm leading-relaxed text-sm">
              {language === 'ar' 
                ? 'شريكك الموثوق في البناء والتطوير، نقدم أفضل أنواع حديد التسليح والصلب بأعلى المعايير العالمية لدعم رؤية المملكة 2030.' 
                : 'Your trusted partner in construction and development, providing the best types of rebar and steel with the highest international standards to support Vision 2030.'}
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">{t('footer.quick_links')}</h4>
            <ul className="space-y-3">
              <li><Link href="/about"><span className="text-muted-foreground hover:text-primary transition-colors text-sm cursor-pointer">{t('nav.about')}</span></Link></li>
              <li><Link href="/services"><span className="text-muted-foreground hover:text-primary transition-colors text-sm cursor-pointer">{t('nav.services')}</span></Link></li>
              <li><Link href="/products"><span className="text-muted-foreground hover:text-primary transition-colors text-sm cursor-pointer">{t('nav.products')}</span></Link></li>
              <li><Link href="/projects"><span className="text-muted-foreground hover:text-primary transition-colors text-sm cursor-pointer">{t('nav.projects')}</span></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">{t('footer.connect')}</h4>
            <ul className="space-y-3">
              <li className="text-muted-foreground hover:text-primary transition-colors text-sm cursor-pointer">LinkedIn</li>
              <li className="text-muted-foreground hover:text-primary transition-colors text-sm cursor-pointer">Twitter</li>
              <li className="text-muted-foreground hover:text-primary transition-colors text-sm cursor-pointer">Instagram</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs font-semibold tracking-wide">
            {t('footer.rights')}
          </p>
          <div className="flex gap-4 text-muted-foreground text-xs font-semibold">
            <span className="hover:text-primary transition-colors cursor-pointer">{t('footer.privacy')}</span>
            <span className="hover:text-primary transition-colors cursor-pointer">{t('footer.terms')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};