import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { HelpCircle, ChevronDown } from 'lucide-react';

interface FAQItem {
  q_ar: string;
  q_en: string;
  a_ar: string;
  a_en: string;
}

const FAQS: FAQItem[] = [
  {
    q_ar: 'ما هو الحد الأدنى للطلب؟',
    q_en: 'What is the minimum order quantity?',
    a_ar: 'لا يوجد حد أدنى محدد، نخدم الأفراد والمقاولين والشركات بكل الأحجام. تواصل معنا وسنخدمك.',
    a_en: 'There is no fixed minimum order. We serve individuals, contractors, and companies of all sizes. Contact us and we will assist you.',
  },
  {
    q_ar: 'هل تتوفر خدمة التوصيل؟',
    q_en: 'Do you offer delivery services?',
    a_ar: 'نعم، لدينا أسطول نقل خاص يوصل لجميع مناطق المملكة العربية السعودية. تواصل معنا للاتفاق على التفاصيل.',
    a_en: 'Yes, we have a private fleet that delivers to all regions of Saudi Arabia. Contact us to arrange the details.',
  },
  {
    q_ar: 'ما طرق الدفع المتاحة؟',
    q_en: 'What payment methods are available?',
    a_ar: 'نقبل التحويل البنكي، والنقد، وترتيبات الائتمان للعملاء الدائمين. يُحدد ذلك عند التفاوض على العقد.',
    a_en: 'We accept bank transfers, cash, and credit arrangements for regular clients. This is determined when negotiating the contract.',
  },
  {
    q_ar: 'كم تستغرق مدة التوريد؟',
    q_en: 'How long does delivery take?',
    a_ar: 'يعتمد ذلك على الكمية والمنطقة. عادةً ٢٤-٧٢ ساعة للرياض، وقد تصل لأسبوع للمناطق البعيدة.',
    a_en: 'It depends on quantity and location. Usually 24-72 hours for Riyadh, and up to a week for remote areas.',
  },
  {
    q_ar: 'هل منتجاتكم معتمدة ومطابقة للمواصفات؟',
    q_en: 'Are your products certified and standards-compliant?',
    a_ar: 'نعم، جميع منتجاتنا مطابقة لمواصفات هيئة المواصفات والمقاييس السعودية (SASO) والمعايير الدولية.',
    a_en: 'Yes, all our products comply with Saudi Standards, Metrology and Quality Organization (SASO) specifications and international standards.',
  },
  {
    q_ar: 'ما العلامات التجارية التي تتوفر لديكم؟',
    q_en: 'Which brands do you carry?',
    a_ar: 'نوفر: سابك، الراجحي، بلدي الحديد، حديد الجبيل، حديد أميرة، وعلامات أخرى حسب الطلب.',
    a_en: 'We carry: SABIC, Al-Rajhi, Balady Steel, Jubail Steel, Amira Steel, and others upon request.',
  },
  {
    q_ar: 'كيف أحصل على تسعيرة؟',
    q_en: 'How do I get a quote?',
    a_ar: 'يمكنك ملء نموذج طلب التسعيرة على موقعنا وسيرد عليك فريقنا عبر واتساب، أو تواصل معنا مباشرة.',
    a_en: 'You can fill out the quote request form on our website and our team will reply via WhatsApp, or contact us directly.',
  },
  {
    q_ar: 'هل تقدمون خدمات القطع والتشكيل؟',
    q_en: 'Do you offer cutting and forming services?',
    a_ar: 'نعم، نوفر خدمات التشكيل والمعالجة للحديد حسب مواصفات المشروع. تواصل معنا لمعرفة التفاصيل.',
    a_en: 'Yes, we provide forming and processing services for steel according to project specifications. Contact us for details.',
  },
];

const FAQCard = ({ item, isOpen, onToggle, ar, id }: {
  item: FAQItem; isOpen: boolean; onToggle: () => void; ar: boolean; id: string;
}) => {
  const panelId  = `faq-panel-${id}`;
  const headerId = `faq-header-${id}`;
  return (
    <div className={`border rounded-2xl overflow-hidden transition-colors ${
      isOpen ? 'border-primary/40 bg-primary/5' : 'border-border bg-card hover:border-border/80'
    }`}>
      <button
        id={headerId}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-right cursor-pointer"
      >
        <span className={`font-bold text-base transition-colors ${isOpen ? 'text-primary' : 'text-white'}`}>
          {ar ? item.q_ar : item.q_en}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0"
          aria-hidden="true"
        >
          <ChevronDown className={`w-5 h-5 transition-colors ${isOpen ? 'text-primary' : 'text-muted-foreground'}`} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={headerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className="px-6 pb-6 text-muted-foreground leading-relaxed border-t border-border/40 pt-4">
              {ar ? item.a_ar : item.a_en}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FAQ = () => {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 bg-background pt-28 pb-20"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-3xl">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-4">
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-primary font-bold text-sm uppercase tracking-wider">
              {ar ? 'الأسئلة الشائعة' : 'FAQ'}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            {ar ? 'أسئلة يسألها عملاؤنا' : 'Questions Our Clients Ask'}
          </h1>
          <p className="text-muted-foreground text-lg">
            {ar
              ? 'إجابات سريعة على أكثر الأسئلة شيوعاً'
              : 'Quick answers to the most common questions'}
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {FAQS.map((item, i) => (
            <FAQCard
              key={i}
              id={String(i)}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              ar={ar}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center bg-card border border-border rounded-2xl p-8">
          <p className="text-white font-bold text-xl mb-2">
            {ar ? 'لم تجد إجابة لسؤالك؟' : "Didn't find your answer?"}
          </p>
          <p className="text-muted-foreground mb-6">
            {ar ? 'تواصل معنا مباشرة وسيسعدنا مساعدتك' : 'Contact us directly and we will be happy to help'}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact">
              <span className="inline-flex items-center justify-center gap-2 border border-border text-white hover:border-primary/40 px-6 py-3 rounded-xl font-bold transition-all cursor-pointer">
                {ar ? '📞 اتصل بنا' : '📞 Contact Us'}
              </span>
            </Link>
            <Link href="/quote">
              <span className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/20 cursor-pointer">
                {ar ? '📋 طلب تسعيرة' : '📋 Request a Quote'}
              </span>
            </Link>
          </div>
        </div>

      </div>
    </motion.div>
  );
};
