import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Factory, HardHat, Phone, Box, Truck, ShieldCheck } from 'lucide-react';
// Removed wouter Link
import './home-variant.css';

export default function HomeVariant() {
  const heroPanels = [
    { img: '/__mockup/images/home-variant-panel1.jpg', label: 'Logistics & Fleet' },
    { img: '/__mockup/images/home-variant-panel2.jpg', label: 'Premium Rebar' },
    { img: '/__mockup/images/home-variant-panel3.jpg', label: 'Steel Sheets' },
  ];

  return (
    <div className="home-variant-wrapper min-h-screen relative">
      <div className="noise-overlay" />

      {/* Hero Section */}
      <section className="relative min-h-[100dvh] flex flex-col justify-center pt-24 pb-20 px-6 md:px-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-2/3 h-full z-0 opacity-10">
           <img 
             src="/__mockup/images/home-variant-hero.jpg" 
             alt="Architectural steel" 
             className="w-full h-full object-cover mix-blend-multiply"
           />
           <div className="absolute inset-0 bg-gradient-to-r from-[#F8F7F4] via-[#F8F7F4]/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-[#C06B47]" />
              <span className="text-[#C06B47] uppercase tracking-[0.2em] text-xs font-semibold">
                Al Solyymany Steel
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display leading-[1.1] mb-8 text-[#222222]">
              Strength,<br /><span className="italic font-light text-[#737373]">Redefined.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-[#737373] max-w-lg leading-relaxed mb-10 font-light">
              Elevating architectural possibilities with premium steel products. 
              Precision-engineered for the visionaries of modern construction.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <a href="/services" className="btn-primary px-8 py-4 rounded-full font-medium inline-flex items-center gap-3 tracking-wide text-sm">
                Explore Services
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="/contact" className="btn-outline px-8 py-4 rounded-full font-medium inline-flex items-center gap-3 tracking-wide text-sm">
                Request a Quote
              </a>
            </div>
          </motion.div>

          {/* 3-panel image strip */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="hidden lg:grid gap-4 h-[500px]"
            style={{ gridTemplateColumns: '1fr 1fr 1fr' }}
          >
            {heroPanels.map((panel, i) => (
              <div
                key={i}
                className="relative rounded-t-full rounded-b-[40px] overflow-hidden group shadow-lg"
                style={{ marginTop: i === 0 ? '60px' : i === 2 ? '30px' : '0', marginBottom: i === 0 ? '0' : i === 2 ? '30px' : '60px' }}
              >
                <img
                  src={panel.img}
                  alt={panel.label}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-0 right-0 text-center px-4">
                  <p className="text-white text-sm font-medium tracking-wide">
                    {panel.label}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative z-20 -mt-10 mx-6 md:mx-12 max-w-7xl xl:mx-auto">
        <div className="bg-surface rounded-2xl shadow-xl shadow-black/5 border border-custom p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-custom">
            {[
              { val: '25+', label: 'Years Experience' },
              { val: '10k+', label: 'Projects Supplied' },
              { val: '5', label: 'Industrial Fields' },
              { val: '100%', label: 'Quality Assured' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center text-center pt-8 md:pt-0 first:pt-0">
                <span className="text-4xl md:text-5xl font-display text-[#222222] mb-2">{stat.val}</span>
                <span className="text-xs font-semibold text-[#737373] uppercase tracking-[0.15em]">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Services */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-display text-[#222222] mb-6">Our Capabilities</h2>
            <p className="text-[#737373] text-lg font-light leading-relaxed">
              We provide end-to-end steel solutions, combining vast inventory with precision logistics to meet the demands of modern infrastructure.
            </p>
          </div>
          <a href="/services" className="text-[#C06B47] hover:text-[#A05535] font-semibold flex items-center gap-2 transition-colors uppercase text-sm tracking-wider pb-2 border-b border-[#C06B47]/30 hover:border-[#C06B47]">
            View All Services
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Building2 className="w-6 h-6" />, title: 'Structural Steel', desc: 'Premium grade I-beams and columns for high-rise and commercial developments.' },
            { icon: <Factory className="w-6 h-6" />, title: 'Industrial Supply', desc: 'Bulk materials for factories, including specialized plates and sheets.' },
            { icon: <Truck className="w-6 h-6" />, title: 'Logistics Fleet', desc: 'Nationwide delivery with our dedicated fleet ensuring on-time project supply.' },
          ].map((s, i) => (
            <div key={i} className="bg-surface border border-custom p-10 rounded-2xl hover:shadow-xl hover:shadow-black/5 transition-all duration-500 group">
              <div className="w-14 h-14 rounded-full bg-[#F8F7F4] flex items-center justify-center text-[#C06B47] mb-8 group-hover:scale-110 group-hover:bg-[#C06B47] group-hover:text-white transition-all duration-300">
                {s.icon}
              </div>
              <h3 className="text-2xl font-display text-[#222222] mb-4">{s.title}</h3>
              <p className="text-[#737373] font-light leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Products */}
      <section className="py-32 bg-surface border-y border-custom">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <h2 className="text-4xl md:text-5xl font-display text-[#222222]">Signature Products</h2>
            <a href="/products" className="text-[#C06B47] hover:text-[#A05535] font-semibold flex items-center gap-2 transition-colors uppercase text-sm tracking-wider pb-2 border-b border-[#C06B47]/30 hover:border-[#C06B47]">
              Explore Catalog
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { img: '/__mockup/images/home-variant-panel2.jpg', title: 'High-Tensile Rebar' },
              { img: '/__mockup/images/home-variant-panel3.jpg', title: 'Galvanized Sheets' },
              { img: '/__mockup/images/home-variant-panel1.jpg', title: 'Structural Sections' },
            ].map((p, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative h-80 rounded-2xl overflow-hidden border border-custom mb-6">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <h3 className="text-xl font-display text-[#222222] flex items-center justify-between">
                  {p.title}
                  <ArrowRight className="w-5 h-5 text-[#C06B47] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="bg-[#222222] rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('/__mockup/images/home-variant-hero.jpg')] bg-cover bg-center mix-blend-luminosity pointer-events-none" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-display text-white mb-6">Build with Confidence</h2>
            <p className="text-lg text-white/70 mb-12 font-light leading-relaxed">
              Partner with Al Solyymany Steel for your next landmark project. 
              Our team of experts is ready to provide tailored solutions and competitive pricing.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <a href="tel:0500729313" className="btn-primary px-8 py-4 rounded-full font-medium inline-flex items-center gap-3 tracking-wide text-sm w-full sm:w-auto justify-center">
                <Phone className="w-4 h-4" />
                <span>Call Us: 0500 729 313</span>
              </a>
              <a href="/contact" className="border border-white/20 text-white hover:bg-white hover:text-[#222222] px-8 py-4 rounded-full font-medium inline-flex items-center gap-3 tracking-wide text-sm transition-all duration-300 w-full sm:w-auto justify-center">
                Request a Quote
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
