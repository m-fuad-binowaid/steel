import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Truck, Clock, CheckCircle, XCircle } from 'lucide-react';

const HOURS = [
  { day_ar: 'الأحد',    day_en: 'Sunday',    open: true  },
  { day_ar: 'الاثنين',  day_en: 'Monday',    open: true  },
  { day_ar: 'الثلاثاء', day_en: 'Tuesday',   open: true  },
  { day_ar: 'الأربعاء', day_en: 'Wednesday', open: true  },
  { day_ar: 'الخميس',   day_en: 'Thursday',  open: true  },
  { day_ar: 'الجمعة',   day_en: 'Friday',    open: false },
  { day_ar: 'السبت',    day_en: 'Saturday',  open: true  },
];

interface Region {
  name_ar: string;
  name_en: string;
  cities_ar: string[];
  cities_en: string[];
  time_ar: string;
  time_en: string;
}

const REGIONS: Region[] = [
  {
    name_ar: 'منطقة الرياض',
    name_en: 'Riyadh Region',
    cities_ar: ['الرياض', 'الخرج', 'الدوادمي', 'المجمعة', 'الأفلاج', 'وادي الدواسر', 'الزلفي'],
    cities_en: ['Riyadh', 'Al-Kharj', 'Dawadmi', 'Al-Majmaah', 'Al-Aflaj', 'Wadi Al-Dawasir', 'Az-Zulfi'],
    time_ar: '٢٤ ساعة',
    time_en: '24 hours',
  },
  {
    name_ar: 'المنطقة الشرقية',
    name_en: 'Eastern Province',
    cities_ar: ['الدمام', 'الخبر', 'الأحساء', 'الجبيل', 'حفر الباطن', 'القطيف', 'رأس تنورة'],
    cities_en: ['Dammam', 'Khobar', 'Al-Ahsa', 'Jubail', 'Hafar Al-Batin', 'Qatif', 'Ras Tanura'],
    time_ar: '٢٤-٤٨ ساعة',
    time_en: '24-48 hours',
  },
  {
    name_ar: 'منطقة مكة المكرمة',
    name_en: 'Makkah Region',
    cities_ar: ['جدة', 'مكة المكرمة', 'الطائف', 'رابغ', 'القنفذة', 'الليث', 'الجموم'],
    cities_en: ['Jeddah', 'Makkah', 'Taif', 'Rabigh', 'Al-Qunfudhah', 'Al-Lith', 'Al-Jumum'],
    time_ar: '٤٨-٧٢ ساعة',
    time_en: '48-72 hours',
  },
  {
    name_ar: 'منطقة المدينة المنورة',
    name_en: 'Madinah Region',
    cities_ar: ['المدينة المنورة', 'ينبع', 'العُلا', 'خيبر', 'بدر', 'مهد الذهب'],
    cities_en: ['Madinah', 'Yanbu', "Al-Ula", 'Khaybar', 'Badr', 'Mahad Al-Dahab'],
    time_ar: '٤٨-٧٢ ساعة',
    time_en: '48-72 hours',
  },
  {
    name_ar: 'منطقة القصيم',
    name_en: 'Al-Qassim Region',
    cities_ar: ['بريدة', 'عنيزة', 'الرس', 'المذنب', 'البدائع', 'الشماسية'],
    cities_en: ['Buraydah', 'Unaizah', 'Ar-Rass', 'Al-Mudhnab', 'Al-Badai', 'Ash-Shimasiyah'],
    time_ar: '٢٤-٤٨ ساعة',
    time_en: '24-48 hours',
  },
  {
    name_ar: 'منطقة حائل',
    name_en: 'Hail Region',
    cities_ar: ['حائل', 'بقعاء', 'الغزالة', 'السليمي'],
    cities_en: ['Hail', "Buq'a", 'Al-Ghazalah', 'Al-Sulaimi'],
    time_ar: '٤٨-٧٢ ساعة',
    time_en: '48-72 hours',
  },
  {
    name_ar: 'منطقة تبوك',
    name_en: 'Tabuk Region',
    cities_ar: ['تبوك', 'الوجه', 'أملج', 'ضباء', 'تيماء'],
    cities_en: ['Tabuk', 'Al-Wajh', 'Umluj', 'Duba', 'Tayma'],
    time_ar: '٣-٥ أيام',
    time_en: '3-5 days',
  },
  {
    name_ar: 'منطقة عسير',
    name_en: 'Aseer Region',
    cities_ar: ['أبها', 'خميس مشيط', 'بيشة', 'محايل', 'النماص', 'رجال ألمع'],
    cities_en: ['Abha', 'Khamis Mushait', 'Bisha', 'Muhayil', 'An-Namas', 'Rijal Alma'],
    time_ar: '٣-٥ أيام',
    time_en: '3-5 days',
  },
  {
    name_ar: 'منطقة جازان',
    name_en: 'Jizan Region',
    cities_ar: ['جازان', 'صبيا', 'أبو عريش', 'صامطة', 'العارضة'],
    cities_en: ['Jizan', 'Sabya', 'Abu Arish', 'Samtah', 'Al-Aridah'],
    time_ar: '٣-٥ أيام',
    time_en: '3-5 days',
  },
  {
    name_ar: 'منطقة نجران',
    name_en: 'Najran Region',
    cities_ar: ['نجران', 'شرورة', 'حبونا', 'ثار'],
    cities_en: ['Najran', 'Sharurah', 'Hubuna', 'Thar'],
    time_ar: '٣-٥ أيام',
    time_en: '3-5 days',
  },
  {
    name_ar: 'منطقة الباحة',
    name_en: 'Al-Bahah Region',
    cities_ar: ['الباحة', 'بلجرشي', 'المندق', 'العقيق'],
    cities_en: ['Al-Bahah', 'Baljurashi', 'Al-Mandiq', 'Al-Aqiq'],
    time_ar: '٣-٥ أيام',
    time_en: '3-5 days',
  },
  {
    name_ar: 'منطقة الجوف',
    name_en: 'Al-Jawf Region',
    cities_ar: ['سكاكا', 'القريات', 'دومة الجندل', 'طبرجل'],
    cities_en: ['Sakaka', 'Al-Qurayyat', 'Dumat Al-Jandal', 'Tabarjal'],
    time_ar: '٣-٥ أيام',
    time_en: '3-5 days',
  },
  {
    name_ar: 'الحدود الشمالية',
    name_en: 'Northern Borders',
    cities_ar: ['عرعر', 'رفحاء', 'طريف'],
    cities_en: ["Ar'ar", 'Rafha', 'Turaif'],
    time_ar: '٣-٥ أيام',
    time_en: '3-5 days',
  },
];

const RegionCard = ({ region, ar, index }: { region: Region; ar: boolean; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
    className="bg-card border border-border rounded-2xl p-5 hover:border-primary/30 transition-colors group"
  >
    <div className="flex items-start justify-between mb-3">
      <div>
        <h3 className="font-black text-white text-lg group-hover:text-primary transition-colors">
          {ar ? region.name_ar : region.name_en}
        </h3>
      </div>
      <div className="flex items-center gap-1 bg-primary/10 border border-primary/20 rounded-xl px-3 py-1.5">
        <Clock className="w-3 h-3 text-primary" />
        <span className="text-primary text-xs font-bold whitespace-nowrap">
          {ar ? region.time_ar : region.time_en}
        </span>
      </div>
    </div>
    <div className="flex flex-wrap gap-1.5 mt-3">
      {(ar ? region.cities_ar : region.cities_en).map((city) => (
        <span
          key={city}
          className="text-xs bg-background border border-border/60 text-muted-foreground px-2 py-1 rounded-lg"
        >
          {city}
        </span>
      ))}
    </div>
  </motion.div>
);

export const Regions = () => {
  const { language } = useLanguage();
  const ar = language === 'ar';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 bg-background pt-28 pb-20"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-4">
            <Truck className="w-4 h-4 text-primary" />
            <span className="text-primary font-bold text-sm uppercase tracking-wider">
              {ar ? 'مناطق التوريد' : 'Supply Regions'}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            {ar ? 'نوصل لجميع أنحاء المملكة' : 'We Deliver Across All KSA'}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {ar
              ? 'أسطول نقل متكامل يغطي جميع المناطق الثلاث عشرة في المملكة العربية السعودية'
              : 'A complete transport fleet covering all 13 regions of Saudi Arabia'}
          </p>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: <MapPin className="w-5 h-5" />, value: '13', label: ar ? 'منطقة إدارية' : 'Regions' },
            { icon: <CheckCircle className="w-5 h-5" />, value: '100+', label: ar ? 'مدينة وبلدة' : 'Cities & Towns' },
            { icon: <Truck className="w-5 h-5" />, value: ar ? 'أسطولنا' : 'Our Fleet', label: ar ? 'خاص بالمؤسسة' : 'Company-Owned' },
            { icon: <Clock className="w-5 h-5" />, value: ar ? '٢٤ ساعة' : '24h', label: ar ? 'أسرع توصيل' : 'Fastest Delivery' },
          ].map((s, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-5 text-center">
              <div className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center mx-auto mb-3 text-primary">
                {s.icon}
              </div>
              <p className="text-2xl font-black text-white">{s.value}</p>
              <p className="text-muted-foreground text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Working Hours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-12 bg-card border border-border rounded-2xl overflow-hidden"
        >
          <div className="flex items-center gap-3 px-6 py-4 border-b border-border bg-primary/5">
            <Clock className="w-5 h-5 text-primary" />
            <h2 className="font-black text-white text-lg">
              {ar ? 'أوقات الدوام الرسمية' : 'Official Working Hours'}
            </h2>
          </div>
          <div className="divide-y divide-border">
            {HOURS.map((h) => (
              <div
                key={h.day_en}
                className={`flex items-center justify-between px-6 py-3 ${!h.open ? 'bg-red-950/10' : 'hover:bg-white/[0.02]'} transition-colors`}
              >
                <span className={`font-bold text-sm ${!h.open ? 'text-muted-foreground' : 'text-white'}`}>
                  {ar ? h.day_ar : h.day_en}
                </span>
                {h.open ? (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {ar ? '٧ ص – ١٢ ظ' : '7:00 am – 12:00 pm'}
                    </span>
                    <span className="text-border text-xs">|</span>
                    <span className="text-sm text-muted-foreground">
                      {ar ? '٢ م – ٥ م' : '2:00 pm – 5:00 pm'}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-red-400">
                    <XCircle className="w-3.5 h-3.5" />
                    <span className="text-sm font-bold">{ar ? 'مغلق' : 'Closed'}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="px-6 py-3 border-t border-border bg-background/40">
            <p className="text-muted-foreground text-xs text-center">
              {ar
                ? 'يمكنك إرسال طلبك في أي وقت — سنتواصل معك خلال أوقات الدوام'
                : 'You can submit a request anytime — we will follow up during business hours'}
            </p>
          </div>
        </motion.div>

        {/* Regions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {REGIONS.map((r, i) => (
            <RegionCard key={r.name_ar} region={r} ar={ar} index={i} />
          ))}
        </div>

        {/* Note */}
        <div className="mt-10 bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center">
          <p className="text-primary font-bold text-lg mb-2">
            {ar ? 'أسعار الشحن تُحدد حسب المنطقة والكمية' : 'Shipping rates vary by region and quantity'}
          </p>
          <p className="text-muted-foreground">
            {ar
              ? 'تواصل معنا للحصول على سعر توصيل دقيق لمنطقتك'
              : 'Contact us to get an accurate delivery quote for your area'}
          </p>
          <Link href="/quote">
            <span className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-bold mt-4 transition-all shadow-lg shadow-primary/20 cursor-pointer">
              {ar ? 'طلب تسعيرة مع توصيل' : 'Request Quote with Delivery'}
            </span>
          </Link>
        </div>

      </div>
    </motion.div>
  );
};
