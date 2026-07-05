import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calculator as CalcIcon, RefreshCw, AlertTriangle } from 'lucide-react';

// ─── Steel density & weight formulas ─────────────────────────────────────────
// weight (kg) = volume (m³) × 7850 (kg/m³)

interface ProductType {
  id: string;
  ar: string;
  en: string;
  unit: 'diameter' | 'thickness_width' | 'od_thickness';
  // dimensions shown depend on type
  formula: (dims: Dims, length: number, qty: number) => number; // returns kg
}

interface Dims {
  diameter?: number;   // mm  (rebar / wire / rod)
  width?: number;      // mm  (flat bar / plate)
  height?: number;     // mm  (plate thickness / I-beam height)
  thickness?: number;  // mm  (pipe wall / angle thickness)
  flange?: number;     // mm  (I-beam flange width)
}

const DENSITY = 7850; // kg/m³

const PRODUCT_TYPES: ProductType[] = [
  {
    id: 'rebar',
    ar: 'حديد تسليح (دائري)',
    en: 'Rebar (Round)',
    unit: 'diameter',
    formula: ({ diameter = 0 }, length, qty) => {
      const r = (diameter / 1000) / 2;
      return Math.PI * r * r * length * DENSITY * qty;
    },
  },
  {
    id: 'wire',
    ar: 'أسلاك فولاذية',
    en: 'Steel Wire',
    unit: 'diameter',
    formula: ({ diameter = 0 }, length, qty) => {
      const r = (diameter / 1000) / 2;
      return Math.PI * r * r * length * DENSITY * qty;
    },
  },
  {
    id: 'plate',
    ar: 'صفائح / ألواح',
    en: 'Steel Plate / Sheet',
    unit: 'thickness_width',
    formula: ({ thickness = 0, width = 0 }, length, qty) => {
      return (thickness / 1000) * (width / 1000) * length * DENSITY * qty;
    },
  },
  {
    id: 'flatbar',
    ar: 'قضيب مسطح (Flat Bar)',
    en: 'Flat Bar',
    unit: 'thickness_width',
    formula: ({ thickness = 0, width = 0 }, length, qty) => {
      return (thickness / 1000) * (width / 1000) * length * DENSITY * qty;
    },
  },
  {
    id: 'squarebar',
    ar: 'قضيب مربع (Square Bar)',
    en: 'Square Bar',
    unit: 'thickness_width',
    formula: ({ width = 0 }, length, qty) => {
      return (width / 1000) * (width / 1000) * length * DENSITY * qty;
    },
  },
  {
    id: 'pipe',
    ar: 'أنبوب / ماسورة',
    en: 'Steel Pipe / Tube',
    unit: 'od_thickness',
    formula: ({ diameter = 0, thickness = 0 }, length, qty) => {
      const od = diameter / 1000;
      const id = (diameter - 2 * thickness) / 1000;
      return Math.PI / 4 * (od * od - id * id) * length * DENSITY * qty;
    },
  },
];

const REBAR_SIZES = [8, 10, 12, 14, 16, 18, 20, 22, 25, 28, 32, 36, 40];
const WIRE_SIZES  = [3, 4, 5, 6, 7, 8, 9, 10, 12];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (n: number, dec = 2) => n.toLocaleString('en-US', { maximumFractionDigits: dec });

const Field = ({
  label, value, onChange, unit, min = 0.1, step = 1, presets,
}: {
  label: string; value: string; onChange: (v: string) => void;
  unit: string; min?: number; step?: number; presets?: number[];
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{label}</label>
    <div className="flex gap-2 items-center">
      <input
        type="number"
        min={min}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        dir="ltr"
        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary transition-colors"
      />
      <span className="text-muted-foreground text-sm whitespace-nowrap">{unit}</span>
    </div>
    {presets && (
      <div className="flex flex-wrap gap-1 mt-1">
        {presets.map((p) => (
          <button
            key={p}
            onClick={() => onChange(String(p))}
            className={`text-xs px-2 py-1 rounded-lg border transition-colors cursor-pointer ${
              value === String(p)
                ? 'bg-primary border-primary text-white'
                : 'border-border text-muted-foreground hover:border-primary/50 hover:text-white'
            }`}
          >
            {p}
          </button>
        ))}
      </div>
    )}
  </div>
);

// ─── Main Component ──────────────────────────────────────────────────────────
export const Calculator = () => {
  const { language } = useLanguage();
  const ar = language === 'ar';

  const [productId, setProductId] = useState('rebar');
  const [diameter, setDiameter]   = useState('12');
  const [thickness, setThickness] = useState('6');
  const [width, setWidth]         = useState('100');
  const [length, setLength]       = useState('12');
  const [qty, setQty]             = useState('100');

  const product = PRODUCT_TYPES.find((p) => p.id === productId)!;

  const { weightKg, weightTon, pipeError } = useMemo(() => {
    const d   = parseFloat(diameter)  || 0;
    const t   = parseFloat(thickness) || 0;
    const w   = parseFloat(width)     || 0;
    const l   = parseFloat(length)    || 0;
    const q   = parseFloat(qty)       || 0;

    // Pipe guard: wall thickness must be less than radius
    if (productId === 'pipe' && d > 0 && t > 0 && 2 * t >= d) {
      return { weightKg: 0, weightTon: 0, pipeError: true };
    }

    const dims: Dims = { diameter: d, thickness: t, width: w, flange: w, height: t };
    const kg = product.formula(dims, l, q);
    return { weightKg: Math.max(0, kg), weightTon: Math.max(0, kg) / 1000, pipeError: false };
  }, [productId, diameter, thickness, width, length, qty, product]);

  const reset = () => {
    setDiameter('12'); setThickness('6'); setWidth('100');
    setLength('12'); setQty('100'); setProductId('rebar');
  };

  const presetDiameters = productId === 'rebar' ? REBAR_SIZES : productId === 'wire' ? WIRE_SIZES : undefined;

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
            <CalcIcon className="w-4 h-4 text-primary" />
            <span className="text-primary font-bold text-sm uppercase tracking-wider">
              {ar ? 'حاسبة وزن الحديد' : 'Steel Weight Calculator'}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            {ar ? 'احسب وزن حديدك' : 'Calculate Steel Weight'}
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {ar
              ? 'أداة دقيقة لحساب وزن الحديد بناءً على النوع والأبعاد والكمية'
              : 'Accurate tool to calculate steel weight based on type, dimensions and quantity'}
          </p>
        </div>

        <div className="space-y-6">

          {/* Product Type */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="text-white font-bold text-lg mb-4">
              {ar ? 'نوع المنتج' : 'Product Type'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {PRODUCT_TYPES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setProductId(p.id)}
                  className={`px-4 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer border text-center ${
                    productId === p.id
                      ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                      : 'border-border text-muted-foreground hover:border-primary/40 hover:text-white bg-background/50'
                  }`}
                >
                  {ar ? p.ar : p.en}
                </button>
              ))}
            </div>
          </div>

          {/* Dimensions */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="text-white font-bold text-lg mb-5">
              {ar ? 'الأبعاد' : 'Dimensions'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* diameter-based */}
              {product.unit === 'diameter' && (
                <Field
                  label={ar ? 'القطر' : 'Diameter'}
                  value={diameter}
                  onChange={setDiameter}
                  unit="mm"
                  presets={presetDiameters}
                />
              )}

              {/* thickness_width */}
              {(product.unit === 'thickness_width') && (
                <>
                  {product.id !== 'squarebar' && (
                    <Field
                      label={ar ? 'السماكة (الارتفاع)' : 'Thickness'}
                      value={thickness}
                      onChange={setThickness}
                      unit="mm"
                    />
                  )}
                  <Field
                    label={ar ? (product.id === 'squarebar' ? 'الجانب' : 'العرض') : (product.id === 'squarebar' ? 'Side' : 'Width')}
                    value={width}
                    onChange={setWidth}
                    unit="mm"
                  />
                </>
              )}

              {/* pipe */}
              {product.unit === 'od_thickness' && (
                <>
                  <Field
                    label={ar ? 'القطر الخارجي (OD)' : 'Outer Diameter (OD)'}
                    value={diameter}
                    onChange={setDiameter}
                    unit="mm"
                  />
                  <Field
                    label={ar ? 'سماكة الجدار' : 'Wall Thickness'}
                    value={thickness}
                    onChange={setThickness}
                    unit="mm"
                  />
                </>
              )}

              {/* Length always */}
              <Field
                label={ar ? 'الطول' : 'Length'}
                value={length}
                onChange={setLength}
                unit={ar ? 'متر' : 'm'}
                presets={[6, 9, 12, 15]}
              />
            </div>
          </div>

          {/* Quantity */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="text-white font-bold text-lg mb-5">
              {ar ? 'الكمية' : 'Quantity'}
            </h2>
            <Field
              label={ar ? 'عدد القطع / الوحدات' : 'Number of pieces / units'}
              value={qty}
              onChange={setQty}
              unit={ar ? 'قطعة' : 'pcs'}
              min={1}
              presets={[10, 50, 100, 200, 500]}
            />
          </div>

          {/* Result */}
          <motion.div
            key={`${weightKg}-${pipeError}`}
            initial={{ scale: 0.98, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className={`border-2 rounded-2xl p-8 ${pipeError ? 'bg-red-500/5 border-red-500/30' : 'bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30'}`}
          >
            {pipeError ? (
              <div className="flex items-center gap-3 text-red-400 justify-center">
                <AlertTriangle className="w-6 h-6 flex-shrink-0" />
                <p className="font-bold">
                  {ar
                    ? 'سماكة الجدار أكبر من أو تساوي نصف القطر — يرجى تصحيح الأبعاد'
                    : 'Wall thickness ≥ radius — please correct the dimensions'}
                </p>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-muted-foreground font-bold mb-2 uppercase tracking-wider text-sm">
                  {ar ? 'الوزن الإجمالي المقدر' : 'Estimated Total Weight'}
                </p>
                <div className="flex items-end justify-center gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-5xl md:text-6xl font-black text-primary">{fmt(weightTon, 3)}</p>
                    <p className="text-white font-bold mt-1">{ar ? 'طن' : 'Ton'}</p>
                  </div>
                  <div className="text-muted-foreground text-2xl font-black mb-4">=</div>
                  <div className="text-center">
                    <p className="text-3xl font-black text-white">{fmt(weightKg, 1)}</p>
                    <p className="text-muted-foreground font-bold mt-1">{ar ? 'كيلوجرام' : 'kg'}</p>
                  </div>
                </div>
                <p className="text-muted-foreground text-xs mt-2">
                  {ar
                    ? '* النتيجة تقريبية بناءً على كثافة الفولاذ ٧٨٥٠ كغ/م³'
                    : '* Approximate result based on steel density 7,850 kg/m³'}
                </p>
              </div>
            )}
          </motion.div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={reset}
              className="flex items-center justify-center gap-2 border border-border text-muted-foreground hover:text-white hover:border-white/30 px-6 py-3 rounded-xl font-bold transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              {ar ? 'إعادة تعيين' : 'Reset'}
            </button>
            <Link href="/quote" className="flex-1">
              <span className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/20 cursor-pointer w-full">
                {ar ? 'اطلب تسعيرة بهذه الكمية' : 'Request a Quote for This Quantity'}
              </span>
            </Link>
          </div>

        </div>
      </div>
    </motion.div>
  );
};
