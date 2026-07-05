import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  LayoutDashboard, Phone, MapPin, Package, Clock,
  CheckCircle, XCircle, AlertCircle, Trash2, RefreshCw
} from 'lucide-react';
import {
  type QuoteRecord,
  loadQuotes,
  updateQuoteStatus,
  deleteQuote,
  clearAllQuotes,
} from '@/lib/quotes';

// ─── Status config ─────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  new:       { ar: 'جديد',       en: 'New',       color: 'text-blue-400 bg-blue-400/10 border-blue-400/30',        Icon: AlertCircle },
  contacted: { ar: 'تم التواصل', en: 'Contacted', color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30', Icon: Phone },
  closed:    { ar: 'مكتمل',      en: 'Closed',    color: 'text-green-400 bg-green-400/10 border-green-400/30',    Icon: CheckCircle },
  cancelled: { ar: 'ملغي',       en: 'Cancelled', color: 'text-red-400 bg-red-400/10 border-red-400/30',          Icon: XCircle },
};

const PRODUCT_NAMES: Record<string, { ar: string; en: string }> = {
  rebar:  { ar: 'حديد تسليح',    en: 'Rebar' },
  mesh:   { ar: 'شبكة حديد',     en: 'Wire Mesh' },
  sheets: { ar: 'صفائح مموجة',   en: 'Corrugated Sheets' },
  wire:   { ar: 'أسلاك فولاذية', en: 'Steel Wire' },
  bars:   { ar: 'قضبان فولاذية', en: 'Steel Bars' },
};
const BRAND_NAMES: Record<string, { ar: string; en: string }> = {
  sabic:  { ar: 'سابك',        en: 'SABIC' },
  rajhi:  { ar: 'الراجحي',     en: 'Al-Rajhi' },
  balady: { ar: 'بلدي',        en: 'Balady' },
  jubail: { ar: 'حديد الجبيل', en: 'Jubail Steel' },
  amira:  { ar: 'حديد أميرة',  en: 'Amira Steel' },
  other:  { ar: 'أخرى',        en: 'Other' },
};

// ─── Single card ────────────────────────────────────────────────────────────

const QuoteCard = ({
  record, ar, onStatusChange, onDelete,
}: {
  record: QuoteRecord;
  ar: boolean;
  onStatusChange: (id: string, status: QuoteRecord['status']) => void;
  onDelete: (id: string) => void;
}) => {
  const cfg = STATUS_CONFIG[record.status];
  const date = new Date(record.createdAt);
  const dateStr = date.toLocaleDateString(ar ? 'ar-SA' : 'en-SA', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      className="bg-card border border-border rounded-2xl p-5 hover:border-border/80 transition-colors"
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-white font-black text-lg">{record.name}</h3>
            <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg border ${cfg.color}`}>
              <cfg.Icon className="w-3 h-3" aria-hidden="true" />
              {ar ? cfg.ar : cfg.en}
            </span>
          </div>
          <div className="flex items-center gap-4 mt-1 text-muted-foreground text-sm flex-wrap">
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" aria-hidden="true" />
              <a href={`tel:${record.phone}`} className="hover:text-white transition-colors">{record.phone}</a>
            </span>
            {record.city && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" aria-hidden="true" />
                {record.city}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" aria-hidden="true" />
              {dateStr}
            </span>
          </div>
        </div>

        {/* Delete */}
        <button
          onClick={() => onDelete(record.id)}
          aria-label={ar ? `حذف طلب ${record.name}` : `Delete ${record.name}'s request`}
          className="p-2 rounded-lg text-muted-foreground hover:text-red-400 hover:bg-red-400/10 transition-colors flex-shrink-0"
        >
          <Trash2 className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>

      {/* Products */}
      <div className="space-y-1.5 mb-4">
        {record.products.map((p, i) => {
          const prod  = PRODUCT_NAMES[p.product];
          const brand = BRAND_NAMES[p.brand];
          return (
            <div key={i} className="flex items-center gap-2 flex-wrap">
              <Package className="w-3 h-3 text-primary flex-shrink-0" aria-hidden="true" />
              <span className="text-white text-sm font-bold">
                {ar ? prod?.ar : prod?.en}
              </span>
              <span className="text-muted-foreground text-xs">
                {ar ? brand?.ar : brand?.en} | {p.size} | {p.qty} {ar ? 'طن' : 'ton'}
              </span>
            </div>
          );
        })}
      </div>

      {record.notes && (
        <p className="text-muted-foreground text-sm bg-background/50 rounded-xl px-3 py-2 mb-4 border border-border/40">
          📝 {record.notes}
        </p>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-muted-foreground text-xs font-bold">{ar ? 'تغيير الحالة:' : 'Change status:'}</span>
        {(Object.keys(STATUS_CONFIG) as QuoteRecord['status'][]).map((s) => {
          const c = STATUS_CONFIG[s];
          return (
            <button
              key={s}
              onClick={() => onStatusChange(record.id, s)}
              disabled={record.status === s}
              aria-pressed={record.status === s}
              className={`text-xs px-3 py-1.5 rounded-lg border font-bold transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                record.status === s ? c.color : 'border-border text-muted-foreground hover:border-white/30 hover:text-white'
              }`}
            >
              {ar ? c.ar : c.en}
            </button>
          );
        })}

        {/* WhatsApp reply */}
        <a
          href={`https://wa.me/966${record.phone.replace(/^0/, '')}?text=${encodeURIComponent(ar ? 'السلام عليكم، بخصوص طلب التسعيرة الخاص بكم...' : 'Hello, regarding your quote request...')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mr-auto text-xs px-3 py-1.5 rounded-lg border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/10 transition-colors font-bold"
        >
          💬 {ar ? 'رد عبر واتساب' : 'Reply on WhatsApp'}
        </a>
      </div>
    </motion.div>
  );
};

// ─── Main admin page ─────────────────────────────────────────────────────────

export const Admin = () => {
  const { language } = useLanguage();
  const ar = language === 'ar';

  const [quotes, setQuotes] = useState<QuoteRecord[]>([]);
  const [filter, setFilter] = useState<QuoteRecord['status'] | 'all'>('all');

  const reload = () => setQuotes(loadQuotes());

  useEffect(() => { reload(); }, []);

  const handleStatusChange = (id: string, status: QuoteRecord['status']) => {
    updateQuoteStatus(id, status);
    reload();
  };

  const handleDelete = (id: string) => {
    deleteQuote(id);
    reload();
  };

  const handleClearAll = () => {
    if (window.confirm(ar ? 'هل أنت متأكد من مسح جميع السجلات؟' : 'Are you sure you want to clear all records?')) {
      clearAllQuotes();
      setQuotes([]);
    }
  };

  const filtered = filter === 'all' ? quotes : quotes.filter((q) => q.status === filter);

  const counts = {
    all:       quotes.length,
    new:       quotes.filter((q) => q.status === 'new').length,
    contacted: quotes.filter((q) => q.status === 'contacted').length,
    closed:    quotes.filter((q) => q.status === 'closed').length,
    cancelled: quotes.filter((q) => q.status === 'cancelled').length,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 bg-background pt-28 pb-20"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">

        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center">
              <LayoutDashboard className="w-6 h-6 text-primary" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white">
                {ar ? 'لوحة تتبع الاستفسارات' : 'Inquiries Dashboard'}
              </h1>
              <p className="text-muted-foreground text-sm">
                {ar ? 'إجمالي الطلبات: ' : 'Total: '}{counts.all}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={reload}
              className="flex items-center gap-2 border border-border text-muted-foreground hover:text-white px-4 py-2 rounded-xl font-bold text-sm transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
              {ar ? 'تحديث' : 'Refresh'}
            </button>
            {quotes.length > 0 && (
              <button
                onClick={handleClearAll}
                className="flex items-center gap-2 border border-red-500/30 text-red-400 hover:bg-red-400/10 px-4 py-2 rounded-xl font-bold text-sm transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" aria-hidden="true" />
                {ar ? 'مسح الكل' : 'Clear All'}
              </button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {(Object.keys(STATUS_CONFIG) as QuoteRecord['status'][]).map((s) => {
            const cfg = STATUS_CONFIG[s];
            return (
              <div key={s} className="bg-card border border-border rounded-2xl p-4 text-center">
                <p className={`text-2xl font-black ${cfg.color.split(' ')[0]}`}>{counts[s]}</p>
                <p className="text-muted-foreground text-sm mt-1">{ar ? cfg.ar : cfg.en}</p>
              </div>
            );
          })}
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 flex-wrap mb-6" role="group" aria-label={ar ? 'تصفية الطلبات' : 'Filter requests'}>
          <span className="text-muted-foreground text-sm font-bold">{ar ? 'تصفية:' : 'Filter:'}</span>
          {(['all', 'new', 'contacted', 'closed', 'cancelled'] as const).map((f) => {
            const label = f === 'all'
              ? (ar ? 'الكل' : 'All')
              : (ar ? STATUS_CONFIG[f].ar : STATUS_CONFIG[f].en);
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={`text-sm px-4 py-2 rounded-xl border font-bold transition-colors cursor-pointer ${
                  filter === f
                    ? 'bg-primary border-primary text-white'
                    : 'border-border text-muted-foreground hover:border-white/20 hover:text-white'
                }`}
              >
                {label} ({counts[f === 'all' ? 'all' : f]})
              </button>
            );
          })}
        </div>

        {/* List */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-card border border-border rounded-2xl">
            <LayoutDashboard className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-40" aria-hidden="true" />
            <p className="text-muted-foreground text-lg font-bold">
              {ar ? 'لا توجد طلبات بعد' : 'No requests yet'}
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              {ar
                ? 'ستظهر طلبات التسعيرة هنا بعد إرسالها من العملاء'
                : 'Quote requests will appear here after clients submit them'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((q) => (
              <QuoteCard
                key={q.id}
                record={q}
                ar={ar}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

      </div>
    </motion.div>
  );
};
