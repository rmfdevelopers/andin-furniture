'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Hammer, 
  Truck, 
  FlaskConical, 
  Award, 
  Users, 
  Map, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCheck, 
  Loader2, 
  ArrowRight, 
  Instagram, 
  Menu, 
  X, 
  ImageOff,
  ChevronRight
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: layered
// Divider Style: D-RULE
// Typography Personality: refined

// --- Hooks ---

const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, isVisible };
};

// --- Components ---

function SafeImage({ src, alt, fill, width, height, className, priority }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-zinc-900 ${className}`}>
        <ImageOff size={28} className="text-white/10" />
      </div>
    );
  }
  return (
    <Image 
      src={src} alt={alt} fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} priority={priority}
      onError={() => setError(true)} 
    />
  );
}

// --- Brand Data ---

const brand = {
  name: "Andin Furniture",
  tagline: "The Art of Bespoke Living",
  description: "Exquisite, custom-made furniture crafted with the precision of a scientist and the soul of an artist. Nationwide delivery of luxury pieces designed for the modern connoisseur.",
  industry: "Premium Custom Interiors",
  region: "Nigeria",
  currency: "₦"
};

const IMAGES = {
  hero: "https://picsum.photos/seed/premium1/1200/800",
  products: [
    "https://picsum.photos/seed/premium2/800/600",
    "https://picsum.photos/seed/premium3/800/600",
    "https://picsum.photos/seed/premium4/800/600",
    "https://picsum.photos/seed/premium5/800/600"
  ],
  gallery: [
    "https://picsum.photos/seed/living1/600/800",
    "https://picsum.photos/seed/living2/800/600",
    "https://picsum.photos/seed/living3/600/600",
    "https://picsum.photos/seed/living4/800/1000",
    "https://picsum.photos/seed/living5/600/800",
    "https://picsum.photos/seed/living6/800/600"
  ]
};

// --- Sections ---

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/90 backdrop-blur-lg py-4 border-b border-white/5 shadow-xl' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#hero" className="flex items-center gap-2">
          <span className="font-heading text-3xl font-bold tracking-tighter text-white">ANDIN</span>
        </a>
        
        <div className="hidden md:flex items-center gap-10">
          {['Home', 'Our Journey', 'The Collection'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '')}`} className="text-sm font-medium text-white/70 hover:text-[var(--accent)] transition-colors uppercase tracking-widest">{item}</a>
          ))}
          <a href="#contact" className="bg-[var(--primary)] text-white px-8 py-3 rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-[var(--accent)] transition-all">Start Custom Order</a>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(true)}>
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 bg-black z-50 transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center p-8 border-b border-white/5">
          <span className="font-heading text-3xl font-bold tracking-tighter">ANDIN</span>
          <button onClick={() => setIsOpen(false)}><X size={32} /></button>
        </div>
        <div className="flex flex-col gap-8 p-12">
          {['Home', 'Our Journey', 'The Collection'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '')}`} onClick={() => setIsOpen(false)} className="text-4xl font-heading font-light hover:text-[var(--accent)] transition-colors">{item}</a>
          ))}
          <a href="#contact" onClick={() => setIsOpen(false)} className="bg-[var(--accent)] text-black px-10 py-5 rounded-full text-center font-black uppercase tracking-widest mt-10">Start Custom Order</a>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="home" ref={ref} className="min-h-screen grid md:grid-cols-[1.1fr_0.9fr] items-stretch bg-[#0a0a0a] overflow-hidden">
      <div className="flex flex-col justify-center px-8 md:px-20 py-32 relative">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-[var(--primary)]/10 blur-[100px] rounded-full pointer-events-none" />
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h1 className="font-heading text-5xl md:text-[5.5rem] font-bold text-white leading-[0.9] mb-8">
            From <span className="text-[var(--primary)]">Soil Science</span> to Furniture Royalty
          </h1>
          <p className="text-white/45 text-xl max-w-md leading-relaxed mb-12">
            Luxury custom-made furniture that redefines elegance and comfort in Nigerian homes.
          </p>
          <div className="flex flex-wrap gap-6">
            <a href="#products" className="bg-[var(--primary)] text-white px-10 py-5 font-black text-sm uppercase tracking-widest hover:bg-[var(--accent)] transition-all">Discover the Collection</a>
            <div className="flex items-center gap-4 text-white/40 font-mono text-xs uppercase tracking-[0.3em]">
              <div className="w-12 h-px bg-white/20" />
              Crafted in Nigeria
            </div>
          </div>
        </div>
      </div>
      <div className={`relative min-h-[50vh] md:min-h-full transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0 scale-105'}`}>
        <SafeImage src={IMAGES.hero} alt="Luxury Furniture" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent md:block hidden" />
      </div>
    </section>
  );
};

const Divider = () => (
  <div className="py-16 flex items-center gap-8 px-8 max-w-6xl mx-auto">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--primary)]/40 to-transparent" />
    <span className="text-[var(--primary)] font-mono text-xs tracking-[0.4em] uppercase whitespace-nowrap opacity-70">
      {brand.tagline}
    </span>
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--primary)]/40 to-transparent" />
  </div>
);

const Features = () => {
  const { ref, isVisible } = useScrollReveal();
  const features = [
    { title: "Custom Craftsmanship", description: "Every piece is tailored to your specific architectural needs and aesthetic taste.", icon: <Hammer /> },
    { title: "Nationwide White-Glove Delivery", description: "Safe, insured, and professional installation across the federation.", icon: <Truck /> },
    { title: "Precision Engineering", description: "Leveraging scientific material analysis to ensure furniture longevity.", icon: <FlaskConical /> }
  ];

  return (
    <section id="features" ref={ref} className="py-32 bg-[var(--secondary)] px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-heading text-5xl font-bold text-black mb-20 text-center">Engineered for Luxury</h2>
        <div className="space-y-4">
          {features.map((f, idx) => (
            <div key={idx} className="sticky group" style={{ top: `${100 + idx * 30}px` }}>
              <div className="bg-white rounded-3xl p-10 border border-black/5 shadow-2xl group-hover:-translate-y-1 transition-transform duration-500 flex flex-col md:flex-row items-start gap-8">
                <div className="w-16 h-16 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center shrink-0 text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white transition-all duration-300">
                  {f.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-3xl font-bold text-black">{f.title}</h3>
                    <span className="text-black/10 font-mono text-xl font-black">0{idx + 1}</span>
                  </div>
                  <p className="text-black/50 mt-4 text-lg leading-relaxed max-w-xl">{f.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const { ref, isVisible } = useScrollReveal();
  const stats = [
    { number: "591", label: "Bespoke Projects", icon: <Award /> },
    { number: "3.8k", label: "Loyal Followers", icon: <Users /> },
    { number: "36", label: "States Covered", icon: <Map /> }
  ];

  return (
    <section id="ourjourney" ref={ref} className="py-32 bg-[var(--primary)] px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
          <p className="text-white/40 font-mono text-xs tracking-[0.4em] uppercase mb-6">Our Legacy</p>
          <h2 className="font-heading text-5xl md:text-7xl font-bold text-white leading-tight mb-8">The Journey of Inneh Samuel</h2>
          <p className="text-white/80 text-xl leading-relaxed mb-12">
            Founded by Inneh Samuel, Andin Furniture represents a journey of transformation. By applying the rigorous precision of soil science to the delicate art of woodworking, we have built a furniture empire that prioritizes structural integrity alongside breathtaking luxury.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {stats.map((s, i) => (
              <div key={i} className="text-center md:text-left">
                <p className="font-heading text-4xl md:text-5xl font-bold text-white mb-2">{s.number}</p>
                <p className="text-white/50 text-xs uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={`relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
          <SafeImage src="https://picsum.photos/seed/carpentry/800/1000" alt="Master Crafting" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const { ref, isVisible } = useScrollReveal();
  const steps = [
    { number: "01", title: "Consultation", description: "We analyze your space and style preferences." },
    { number: "02", title: "Material Selection", description: "Sourcing the finest mahogany, oak, and premium fabrics." },
    { number: "03", title: "Master Crafting", description: "Hand-built by our expert artisans in our dedicated workshop." },
    { number: "04", title: "Installation", description: "Seamless setup in your home or office space." }
  ];

  return (
    <section id="process" ref={ref} className="py-32 bg-[#0f0f0f] px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4">The Andin Way</h2>
          <p className="text-white/40 text-lg">How we create your masterpiece</p>
        </div>
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--primary)] via-[var(--primary)]/20 to-transparent hidden md:block" />
          <div className="space-y-20">
            {steps.map((step, i) => (
              <div key={i} className={`flex gap-12 items-start group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${i * 150}ms` }}>
                <div className="w-14 h-14 rounded-full bg-[var(--primary)] flex items-center justify-center shrink-0 relative z-10 shadow-[0_0_20px_rgba(166,124,82,0.4)]">
                  <span className="font-mono font-bold text-white text-sm">{step.number}</span>
                </div>
                <div className="pt-2">
                  <h3 className="font-heading text-3xl font-bold text-white group-hover:text-[var(--primary)] transition-colors">{step.title}</h3>
                  <p className="text-white/40 mt-4 text-lg leading-relaxed max-w-xl">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Products = () => {
  const { ref, isVisible } = useScrollReveal();
  const products = [
    { name: "The Samuel Sovereign Sofa", description: "Hand-stitched premium leather modular sofa with mahogany framing.", price: "₦2,450,000", image: IMAGES.products[0] },
    { name: "Artisan Oak Dining Set", description: "A 10-seater custom-carved dining table with velvet upholstered chairs.", price: "₦4,800,000", image: IMAGES.products[1] },
    { name: "Luxe Minimalist Bed Frame", description: "Ergonomic design meeting high-end aesthetics for the ultimate rest.", price: "₦850,000", image: IMAGES.products[2] },
    { name: "Signature Executive Desk", description: "The 'Furniture King' series desk crafted for corporate leaders.", price: "₦1,200,000", image: IMAGES.products[3] }
  ];

  return (
    <section id="thecollection" ref={ref} className="py-32 px-6 bg-[var(--secondary)] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div>
            <h2 className="font-heading text-6xl md:text-8xl font-bold text-black leading-[0.8] mb-4">Masterpieces</h2>
            <p className="text-black/40 text-xl">A curated selection of our most requested custom designs.</p>
          </div>
          <a href="#contact" className="group flex items-center gap-4 text-black font-bold uppercase tracking-widest text-sm border-b border-black/20 pb-2">
            Request Price List <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </a>
        </div>
        
        <div className="space-y-32">
          {products.map((p, i) => (
            <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16 md:gap-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
              <div className="w-full md:w-[60%] relative">
                <div className="aspect-[16/10] relative rounded-3xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] group">
                  <SafeImage src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                </div>
              </div>
              <div className="w-full md:w-[40%] text-left">
                <span className="font-mono text-[var(--primary)] text-sm font-bold tracking-[0.4em] uppercase mb-4 block">0{i + 1} — Sovereign</span>
                <h3 className="font-heading text-4xl md:text-5xl font-bold text-black leading-tight mb-6">{p.name}</h3>
                <p className="text-black/50 text-lg leading-relaxed mb-8">{p.description}</p>
                <div className="flex items-center justify-between border-t border-black/5 pt-8">
                  <span className="text-3xl font-bold text-black font-heading">{p.price}</span>
                  <a href="#contact" className="bg-black text-white px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-[var(--primary)] transition-all">Enquire</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const { ref, isVisible } = useScrollReveal();
  const items = [
    { name: "Adewale Okonjo", text: "The attention to detail on our custom dining table is unmatched. Andin is truly the furniture king.", role: "Lekki Resident" },
    { name: "Chioma Uzor", text: "I ordered from Abuja and the delivery was flawless. The orange accents on my sofa are stunning.", role: "Interior Designer" }
  ];

  return (
    <section ref={ref} className="py-32 px-6 bg-[var(--secondary)] border-t border-black/5">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading text-5xl font-bold text-black text-center mb-24">Client Stories</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {items.map((t, i) => (
            <div key={i} className={`bg-white p-12 rounded-[3rem] border border-black/5 shadow-xl transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${i * 200}ms` }}>
              <div className="flex gap-1 mb-8">
                {[1,2,3,4,5].map(n => <div key={n} className="w-2 h-2 rounded-full bg-[var(--accent)]" />)}
              </div>
              <p className="text-black/70 text-2xl font-heading italic leading-relaxed mb-10">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[var(--primary)] flex items-center justify-center text-white font-bold text-xl font-heading">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-black text-lg">{t.name}</p>
                  <p className="text-black/40 text-sm uppercase tracking-widest font-medium">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center p-16 text-center bg-white rounded-[3rem] shadow-2xl">
        <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mb-8 border border-green-100">
          <CheckCheck size={40} className="text-green-500" />
        </div>
        <h3 className="font-heading text-4xl font-bold text-black mb-4">Request Received</h3>
        <p className="text-black/50 max-w-sm text-lg">Thank you for choosing Andin. Our lead designer will contact you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-10 md:p-14 rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] relative overflow-hidden">
      <div className="relative z-10">
        <h3 className="font-heading text-3xl font-bold text-black mb-10">Commission a Piece</h3>
        <div className="space-y-4">
          <input 
            type="text" placeholder="Full Name" value={form.name} required
            onChange={e => setForm({...form, name: e.target.value})}
            className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-6 py-5 text-black outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
          />
          <div className="grid grid-cols-2 gap-4">
            <input 
              type="email" placeholder="Email Address" value={form.email} required
              onChange={e => setForm({...form, email: e.target.value})}
              className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-6 py-5 text-black outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
            />
            <input 
              type="text" placeholder="Phone Number" value={form.phone} required
              onChange={e => setForm({...form, phone: e.target.value})}
              className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-6 py-5 text-black outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
            />
          </div>
          <textarea 
            rows={4} placeholder="Tell us about your project requirements..." value={form.message} required
            onChange={e => setForm({...form, message: e.target.value})}
            className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-6 py-5 text-black outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all resize-none"
          />
        </div>
        <button type="submit" disabled={loading} className="w-full mt-10 bg-black text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-[var(--primary)] transition-all disabled:opacity-50 flex justify-center items-center gap-3">
          {loading ? <Loader2 className="animate-spin" /> : "Submit Request"}
        </button>
      </div>
    </form>
  );
};

const Contact = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="contact" ref={ref} className="relative overflow-hidden py-32 bg-[var(--secondary)]">
      <div className="absolute inset-0 bg-[var(--accent)]" />
      <div className="absolute inset-0 bg-[var(--primary)] [clip-path:polygon(0_0,65%_0,45%_100%,0_100%)] hidden md:block" />
      <div className="absolute inset-0 bg-black [clip-path:polygon(0_0,30%_0,10%_100%,0_100%)] hidden md:block opacity-50" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="font-heading text-6xl md:text-8xl font-bold text-white leading-[0.85] mb-8">Begin Your Custom Project</h2>
          <p className="text-white/70 text-xl max-w-md leading-relaxed">
            From initial sketch to final installation, we bring your vision to life with scientific precision.
          </p>
          <div className="mt-16 space-y-4">
            <div className="flex items-center gap-4 text-white">
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center"><Instagram size={18} /></div>
              <span className="font-medium tracking-widest text-sm uppercase">@andin_furniture</span>
            </div>
            <div className="flex items-center gap-4 text-white">
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center"><MapPin size={18} /></div>
              <span className="font-medium tracking-widest text-sm uppercase">Lagos, Nigeria</span>
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-black py-20 px-6 border-t border-white/5">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
        <div className="md:col-span-2">
          <span className="font-heading text-4xl font-bold tracking-tighter text-white mb-6 block">ANDIN</span>
          <p className="text-white/30 max-w-sm text-lg leading-relaxed mb-8">
            The furniture king series. Crafting legacies through wood and scientific precision.
          </p>
          <p className="text-[var(--primary)] font-bold tracking-widest text-sm uppercase">Sharp delivery, nationwide.</p>
        </div>
        <div>
          <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Explore</h4>
          <ul className="space-y-4 text-white/40 text-sm font-medium">
            <li><a href="#hero" className="hover:text-[var(--primary)] transition-colors">Home</a></li>
            <li><a href="#ourjourney" className="hover:text-[var(--primary)] transition-colors">Our Journey</a></li>
            <li><a href="#thecollection" className="hover:text-[var(--primary)] transition-colors">The Collection</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Connect</h4>
          <div className="flex gap-4">
            <a href="https://instagram.com/andin_furniture" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all">
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>
      <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-white/20 text-xs font-mono uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Andin Furniture. All Rights Reserved.
        </p>
        <p className="text-white/20 text-xs font-mono uppercase tracking-widest">
          Designed for the Modern Connoisseur
        </p>
      </div>
    </div>
  </footer>
);

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <Divider />
      <Features />
      <About />
      <Process />
      <Products />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}