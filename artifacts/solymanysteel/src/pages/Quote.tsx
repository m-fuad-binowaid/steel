import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Plus, Trash2, Send, Package, ChevronDown } from 'lucide-react';
import { saveQuote } from '@/lib/quotes';

// ─── Data ───────────────────────────────────────────────────────────────────

const PRODUCTS = [
  { id: 'rebar',  ar: 'حديد تسليح',    en: 'Rebar' },
  { id: 'mesh',   ar: 'شبكة حديد',     en: 'Wire Mesh' },
  { id: 'sheets', ar: 'صفائح مموجة',   en: 'Corrugated Sheets' },
  { id: 'wire',   ar: 'أسلاك فولاذية', en: 'Steel Wire' },
  { id: 'bars',   ar: 'قضبان فولاذية', en: 'Steel Bars' },
];

const BRANDS = [
  { id: 'sabic',    ar: 'سابك',         en: 'SABIC' },
  { id: 'rajhi',   ar: 'الراجحي',      en: 'Al-Rajhi' },
  { id: 'balady',  ar: 'بلدي',         en: 'Balady' },
  { id: 'jubail',  ar: 'حديد الجبيل',  en: 'Jubail Steel' },
  { id: 'amira',   ar: 'حديد أميرة',   en: 'Amira Steel' },
  { id: 'other',   ar: 'أخرى',         en: 'Other' },
];

const SIZES: Record<string, string[]> = {
  rebar:  ['8 مم','10 مم','12 مم','14 مم','16 مم','18 مم','20 مم','22 مم','25 مم','28 مم','32 مم'],
  mesh:   ['Q131','Q188','Q257','Q335','Q503','مخصص'],
  sheets: ['0.4 مم','0.5 مم','0.6 مم','0.8 مم','1 مم','1.5 مم','2 مم'],
  wire:   ['4 مم','5 مم','6 مم','7 مم','8 مم','10 مم'],
  bars:   ['10 مم','12 مم','16 مم','20 مم','25 مم','32 مم','40 مم'],
};

const WHATSAPP_NUMBER = '966506324423';

// ─── Types ───────────────────────────────────────────────────────────────────

interface ProductRow {
  id: string;
  product: string;
  brand: string;
  size: string;
  qty: string;
}

const emptyRow = (): ProductRow => ({
  id: Math.random().toString(36).slice(2),
  product: '',
  brand: '',
  size: '',
  qty: '',
});

// ─── Select component ────────────────────────────────────────────────────────

const Select = ({
  value, onChange, placeholder, children,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  children: React.ReactNode;
}) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full appearance-none bg-background border border-border rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary transition-colors cursor-pointer pr-10"
    >
      <option value="" disabled>{placeholder}</option>
      {children}
    </select>
    <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
  </div>
);

// ─── Main Page ───────────────────────────────────────────────────────────────

export const Quote = () => {
  const { language } = useLanguage();
  const ar = language === 'ar';

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [notes, setNotes] = useState('');
  const [rows, setRows] = useState<ProductRow[]>([emptyRow()]);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  // ── Row helpers ──────────────────────────────────────────────────────────
  const updateRow = (id: string, field: keyof ProductRow, value: string) => {
    setRows((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const updated = { ...r, [field]: value };
        // reset size when product changes
        if (field === 'product') updated.size = '';
        return updated;
      })
    );
  };

  const addRow = () => setRows((prev) => [...prev, emptyRow()]);
  const removeRow = (id: string) => setRows((prev) => prev.filter((r) => r.id !== id));

  // ── Validation ───────────────────────────────────────────────────────────
  const validate = () => {
    const errs: string[] = [];
    if (!name.trim()) errs.push(ar ? 'الاسم مطلوب' : 'Name is required');
    if (!phone.trim()) errs.push(ar ? 'رقم الجوال مطلوب' : 'Phone is required');
    rows.forEach((r, i) => {
      if (!r.product) errs.push(`${ar ? 'المنتج' : 'Product'} ${i + 1}: ${ar ? 'اختر نوع المنتج' : 'select product'}`);
      if (!r.brand)   errs.push(`${ar ? 'المنتج' : 'Product'} ${i + 1}: ${ar ? 'اختر العلامة التجارية' : 'select brand'}`);
      if (!r.size)    errs.push(`${ar ? 'المنتج' : 'Product'} ${i + 1}: ${ar ? 'اختر المقاس' : 'select size'}`);
      if (!r.qty || isNaN(Number(r.qty)) || Number(r.qty) <= 0)
        errs.push(`${ar ? 'المنتج' : 'Product'} ${i + 1}: ${ar ? 'أدخل الكمية بالطن' : 'enter quantity in tons'}`);
    });
    return errs;
  };

  // ── Build WhatsApp message ────────────────────────────────────────────────
  const buildMessage = () => {
    const lines: string[] = [];

    lines.push(ar ? '*طلب تسعيرة — السليماني للحديد*' : '*Quote Request — Al Solyymany Steel*');
    lines.push('');
    lines.push(`${ar ? 'الاسم' : 'Name'}: ${name}`);
    lines.push(`${ar ? 'الجوال' : 'Phone'}: ${phone}`);
    if (city) lines.push(`${ar ? 'المدينة' : 'City'}: ${city}`);
    lines.push('');
    lines.push(ar ? '*الطلب:*' : '*Order:*');

    rows.forEach((r, i) => {
      const prod  = PRODUCTS.find((p) => p.id === r.product);
      const brand = BRANDS.find((b) => b.id === r.brand);
      lines.push(`${i + 1}. ${ar ? prod?.ar : prod?.en} – ${ar ? brand?.ar : brand?.en} – ${r.size} – ${r.qty} ${ar ? 'طن' : 'ton'}`);
    });

    if (notes.trim()) {
      lines.push('');
      lines.push(`${ar ? 'ملاحظة' : 'Note'}: ${notes.trim()}`);
    }

    return lines.join('\n');
  };

  // ── Submit ───────────────────────────────────────────────────────────────
  const handleSubmit = () => {
    const errs = validate();
    if (errs.length > 0) { setErrors(errs); return; }
    setErrors([]);

    // Save to local tracking dashboard
    saveQuote({
      name,
      phone,
      city,
      notes,
      products: rows.map((r) => ({
        product: r.product,
        brand: r.brand,
        size: r.size,
        qty: r.qty,
      })),
    });

    const msg = encodeURIComponent(buildMessage());
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
    setSubmitted(true);
  };

  // ─── Render ──────────────────────────────────────────────────────────────

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 flex items-center justify-center min-h-screen bg-background px-6"
      >
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Send className="w-8 h-8 text-green-400" />
          </div>
          <h2 className="text-3xl font-black text-white mb-4">
            {ar ? 'تم الإرسال!' : 'Sent!'}
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            {ar
              ? 'تم إرسال طلب التسعيرة على واتساب. سيتواصل معك فريقنا في أقرب وقت.'
              : 'Your quote request has been sent via WhatsApp. Our team will contact you shortly.'}
          </p>
          <button
            onClick={() => { setSubmitted(false); setRows([emptyRow()]); setName(''); setPhone(''); setCity(''); setNotes(''); }}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl font-bold transition-all"
          >
            {ar ? 'طلب جديد' : 'New Request'}
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="flex-1 bg-background pt-28 pb-20"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-4">
            <Package className="w-4 h-4 text-primary" />
            <span className="text-primary font-bold text-sm uppercase tracking-wider">
              {ar ? 'طلب تسعيرة' : 'Request a Quote'}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            {ar ? 'اطلب تسعيرتك الآن' : 'Request Your Quote Now'}
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {ar
              ? 'حدد المنتجات التي تحتاجها وسيصلك ردنا عبر واتساب في أسرع وقت'
              : 'Select your products and we\'ll reply via WhatsApp as soon as possible'}
          </p>
        </div>

        <div className="space-y-8">

          {/* ── Customer Info ─────────────────────────────────────────── */}
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
            <h2 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-primary text-white text-sm font-black flex items-center justify-center">١</span>
              {ar ? 'بياناتك الشخصية' : 'Your Information'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-bold text-muted-foreground mb-2">
                  {ar ? 'الاسم *' : 'Name *'}
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={ar ? 'اسمك الكريم' : 'Your name'}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-muted-foreground mb-2">
                  {ar ? 'رقم الجوال *' : 'Phone *'}
                </label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="05XXXXXXXX"
                  dir="ltr"
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-muted-foreground mb-2">
                  {ar ? 'المدينة' : 'City'}
                </label>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder={ar ? 'مثال: الرياض' : 'e.g. Riyadh'}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50"
                />
              </div>
            </div>
          </div>

          {/* ── Products ──────────────────────────────────────────────── */}
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
            <h2 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-primary text-white text-sm font-black flex items-center justify-center">٢</span>
              {ar ? 'المنتجات المطلوبة' : 'Requested Products'}
            </h2>

            {/* Column headers */}
            <div className="hidden md:grid grid-cols-[2fr_2fr_2fr_1fr_40px] gap-3 mb-3 px-1">
              {[
                ar ? 'نوع المنتج' : 'Product',
                ar ? 'العلامة التجارية' : 'Brand',
                ar ? 'المقاس' : 'Size',
                ar ? 'الكمية (طن)' : 'Qty (ton)',
                '',
              ].map((h, i) => (
                <div key={i} className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{h}</div>
              ))}
            </div>

            {/* Product rows */}
            <div className="space-y-3">
              <AnimatePresence>
                {rows.map((row, index) => (
                  <motion.div
                    key={row.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-[2fr_2fr_2fr_1fr_40px] gap-3 items-start bg-background/50 rounded-xl p-3 border border-border/50"
                  >
                    {/* Product */}
                    <div>
                      <div className="md:hidden text-xs font-bold text-muted-foreground mb-1">{ar ? 'نوع المنتج' : 'Product'}</div>
                      <Select value={row.product} onChange={(v) => updateRow(row.id, 'product', v)} placeholder={ar ? 'اختر المنتج' : 'Select product'}>
                        {PRODUCTS.map((p) => <option key={p.id} value={p.id}>{ar ? p.ar : p.en}</option>)}
                      </Select>
                    </div>

                    {/* Brand */}
                    <div>
                      <div className="md:hidden text-xs font-bold text-muted-foreground mb-1">{ar ? 'العلامة التجارية' : 'Brand'}</div>
                      <Select value={row.brand} onChange={(v) => updateRow(row.id, 'brand', v)} placeholder={ar ? 'اختر العلامة' : 'Select brand'}>
                        {BRANDS.map((b) => <option key={b.id} value={b.id}>{ar ? b.ar : b.en}</option>)}
                      </Select>
                    </div>

                    {/* Size */}
                    <div>
                      <div className="md:hidden text-xs font-bold text-muted-foreground mb-1">{ar ? 'المقاس' : 'Size'}</div>
                      <Select value={row.size} onChange={(v) => updateRow(row.id, 'size', v)} placeholder={ar ? 'اختر المقاس' : 'Select size'}>
                        {(SIZES[row.product] || []).map((s) => <option key={s} value={s}>{s}</option>)}
                      </Select>
                    </div>

                    {/* Qty */}
                    <div>
                      <div className="md:hidden text-xs font-bold text-muted-foreground mb-1">{ar ? 'الكمية (طن)' : 'Qty (ton)'}</div>
                      <input
                        type="number"
                        min="0.1"
                        step="0.5"
                        value={row.qty}
                        onChange={(e) => updateRow(row.id, 'qty', e.target.value)}
                        placeholder={ar ? 'طن' : 'ton'}
                        dir="ltr"
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50"
                      />
                    </div>

                    {/* Remove */}
                    <div className="flex items-center justify-end md:justify-center pt-1">
                      <button
                        onClick={() => rows.length > 1 && removeRow(row.id)}
                        disabled={rows.length === 1}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-red-400 hover:bg-red-400/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Add row */}
            <button
              onClick={addRow}
              className="mt-4 flex items-center gap-2 text-primary hover:text-white font-bold text-sm transition-colors border border-dashed border-primary/30 hover:border-primary/60 rounded-xl px-4 py-3 w-full justify-center hover:bg-primary/5"
            >
              <Plus className="w-4 h-4" />
              {ar ? 'إضافة منتج آخر' : 'Add Another Product'}
            </button>
          </div>

          {/* ── Notes ─────────────────────────────────────────────────── */}
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
            <h2 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-primary text-white text-sm font-black flex items-center justify-center">٣</span>
              {ar ? 'ملاحظات إضافية' : 'Additional Notes'}
              <span className="text-muted-foreground text-sm font-normal">({ar ? 'اختياري' : 'Optional'})</span>
            </h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder={ar ? 'مثال: التسليم خلال أسبوعين، الموقع في جدة، مشروع سكني...' : 'e.g. Delivery within 2 weeks, Jeddah site, residential project...'}
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50 resize-none"
            />
          </div>

          {/* ── Errors ────────────────────────────────────────────────── */}
          <AnimatePresence>
            {errors.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-red-500/10 border border-red-500/30 rounded-xl p-4"
              >
                <p className="text-red-400 font-bold text-sm mb-2">{ar ? 'يرجى تصحيح الأخطاء التالية:' : 'Please fix the following:'}</p>
                <ul className="list-disc list-inside space-y-1">
                  {errors.map((e, i) => (
                    <li key={i} className="text-red-300 text-sm">{e}</li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Submit ────────────────────────────────────────────────── */}
          <button
            onClick={handleSubmit}
            className="w-full flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-white px-8 py-5 rounded-2xl font-black text-xl transition-all shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.115 1.529 5.843L0 24l6.335-1.511A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.95 0-3.77-.527-5.327-1.44l-.381-.228-3.762.897.936-3.668-.249-.396A9.786 9.786 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z"/>
            </svg>
            {ar ? 'إرسال الطلب عبر واتساب' : 'Send Request via WhatsApp'}
          </button>

          <p className="text-center text-muted-foreground text-xs">
            {ar
              ? 'بالضغط على الإرسال سيتم فتح واتساب برسالة جاهزة إلى فريق المبيعات'
              : 'Pressing send will open WhatsApp with a ready message to our sales team'}
          </p>

        </div>
      </div>
    </motion.div>
  );
};
