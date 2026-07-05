import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const WHATSAPP_NUMBER = '966555095344';

export const WhatsAppFloat = () => {
  const { language } = useLanguage();
  const ar = language === 'ar';
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    const msg = encodeURIComponent(
      ar
        ? 'السلام عليكم، أريد الاستفسار عن منتجاتكم وأسعارها'
        : 'Hello, I would like to inquire about your products and prices'
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  return (
    <div
      className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2"
      style={{ direction: 'ltr' }}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: -10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-[#25D366] text-white text-sm font-bold px-4 py-2 rounded-xl shadow-lg whitespace-nowrap mb-1"
          >
            {ar ? 'تحدث معنا الآن!' : 'Chat with us now!'}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 1 }}
        className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-xl shadow-[#25D366]/30 hover:shadow-[#25D366]/50 hover:bg-[#20b85a] transition-colors cursor-pointer"
        aria-label="WhatsApp"
      >
        {/* WhatsApp SVG */}
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.115 1.529 5.843L0 24l6.335-1.511A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.95 0-3.77-.527-5.327-1.44l-.381-.228-3.762.897.936-3.668-.249-.396A9.786 9.786 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z" />
        </svg>

        {/* Pulse ring */}
        <span className="absolute w-14 h-14 rounded-full border-2 border-[#25D366] animate-ping opacity-30 pointer-events-none" />
      </motion.button>
    </div>
  );
};
