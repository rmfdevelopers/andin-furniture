'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Hammer, 
  Truck, 
  Ruler, 
  Users, 
  PenTool, 
  Award, 
  Instagram, 
  Mail, 
  MapPin, 
  CheckCheck, 
  Loader2, 
  ArrowRight, 
  ImageOff, 
  Menu, 
  X,
  Smartphone
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: layered
// Divider Style: D-RULE
// Typography Personality: refined

const brand = {
  name: "Andin Furniture",
  tagline: "Bespoke Artistry for the Modern Connoisseur",
  description: "Led by visionary founder Inneh Samuel, Andin Furniture transforms raw materials into legacy pieces, blending scientific precision with clean luxe aesthetics for Nigeria's most discerning homes.",
  industry: "Furniture",
  region: "Nigeria",
  currency: "₦"
};

const IMAGES = {
  hero: "https://picsum.photos/seed/furniture0/1200/1000",
  products: [
    "https://picsum.photos/seed/furniture2/800/1000",
    "https://picsum.photos/seed/furniture3/800/1000",
    "https://picsum.photos/seed/furniture4/800/1000",
    "https://picsum.photos/seed/furniture5/800/1000"
  ]
};

const products = [
  { name: "The Samuel Signature Sofa", description: "A masterpiece of structural integrity and plush comfort, custom-tailored in premium velvet.", price: "₦1,850,000" },
  { name: "Empire Dining Suite", description: "Ten-seater solid wood table with minimalist black finishes and shocking pink accents.", price: "₦4,200,000" },
  { name: "Luxe Minimalist Credenza", description: "Hand-carved storage unit featuring geometric patterns and hidden magnetic latches.", price: "₦950,000" },
  { name: "Bespoke Master Bed Frame", description: "A regal foundation for rest, featuring an oversized headboard and integrated smart lighting.", price: "₦2,100,000" }
];

const features = [
  { title: "Bespoke Engineering", description: "Every joint and finish is calculated with the precision of a scientist for lifelong durability.", icon: Hammer },
  { title: "Nationwide Delivery", description: "Sharp delivery, nationwide. Logistics ensuring your custom pieces arrive in pristine condition.", icon: Truck },
  { title: "Clean Luxe Aesthetic", description: "A design philosophy that balances bold shocking pink statements with minimalist restraint.", icon: Ruler }
];

const process = [
  { number: "01", title: "Consultation", description: "We discuss your space, your style, and your specific functional needs." },
  { number: "02", title: "Technical Sketching", description: "Our engineers create detailed blueprints incorporating your chosen 'Clean Luxe' details." },
  { number: "03", title: "Handcrafted Build", description: "Master artisans execute the build using premium hardwoods and luxury finishes." }
];

const stats = [
  { number: "3.8k+", label: "Satisfied Clients" },
  { number: "591", label: "Custom Designs" },
  { number: "15+", label: "Years Experience" }
];

const testimonials = [
  { name: "Olumide Adebayo", text: "The attention to detail is staggering. My dining set isn't just furniture; it's a conversation starter.", role: "Lagos Architect" },
  { name: "Chidi Okeke", text: "Andin captured exactly what I wanted. The shocking pink accents in my lounge are bold yet classy.", role: "Interior Designer" }
];

// --- HOOKS ---

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
  }, [threshold]);
  return { ref, isVisible };
};

// --- COMPONENTS ---

function SafeImage({ src, alt, fill, width, height, className, priority }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-zinc-900 ${className}`}>
        <ImageOff size={28} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image src={src} alt={alt} fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} priority={priority}
      onError={() => setError(true)} />
  );
}

function SectionDivider() {
  return (
    <div className="py-16 flex items-center gap-8 px-8 max-w-6xl mx-auto">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--primary)]/40 to-transparent" />
      <span className="text-[var(--primary)] font-mono text-xs tracking-[0.4em] uppercase whitespace-nowrap opacity-70">
        {brand.name} Standards
      </span>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--primary)]/40 to-transparent" />
    </div>
  );
}

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  const heroReveal = useScrollReveal();
  const aboutReveal = useScrollReveal();
  const processReveal = useScrollReveal();
  const productsReveal = useScrollReveal();
  const featuresReveal = useScrollReveal();
  const testimonialReveal = useScrollReveal();
  const contactReveal = useScrollReveal();

  return (
    <main className="relative">
      {/* --- HEADER --- */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/90 backdrop-blur-lg py-4 border-b border-white/5' : 'bg-transparent py-8'}`}>
        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[var(--primary)] flex items-center justify-center font-heading text-2xl font-black text-black">A</div>
            <span className="font-heading text-xl font-bold tracking-tight hidden sm:block">ANDIN</span>
          </a>

          <div className="hidden md:flex items-center gap-10">
            {['Home', 'Our Craft', 'Collections'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '')}`} className="text-sm font-medium text-white/70 hover:text-[var(--primary)] transition-colors uppercase tracking-widest">
                {item}
              </a>
            ))}
            <a href="#contact" className="bg-[var(--primary)] text-black px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-transform">
              Start Project
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </nav>
      </header>

      {/* --- MOBILE NAV --- */}
      <div className={`fixed inset-0 z-[60] transition-all duration-500 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-[80%] max-w-sm bg-[var(--secondary)] p-8 transition-transform duration-500 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex justify-between items-center mb-12">
            <div className="w-10 h-10 bg-[var(--primary)] flex items-center justify-center font-heading text-2xl font-black text-black">A</div>
            <button onClick={() => setMobileMenuOpen(false)}><X size={32} /></button>
          </div>
          <div className="space-y-8">
            {['Home', 'Our Craft', 'Collections', 'Start Project'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '')}`} 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-3xl font-heading font-bold text-white hover:text-[var(--primary)]">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* --- HERO (HR-C Variant) --- */}
      <section id="home" className="min-h-screen grid md:grid-cols-[1fr_1fr] items-stretch bg-[var(--secondary)] overflow-hidden">
        <div className={`flex flex-col justify-center px-8 md:px-16 py-32 transition-all duration-1000 ${heroReveal.isVisible ? 'opacity-100 skew-y-0 translate-y-0' : 'opacity-0 skew-y-1 translate-y-10'}`} ref={heroReveal.ref}>
          <p className="text-[var(--primary)] font-mono text-xs tracking-[0.4em] uppercase mb-6 opacity-70">
            {brand.industry} • Nigeria
          </p>
          <h1 className="font-heading text-5xl md:text-[5.5rem] font-bold text-white leading-[0.95]">
            From Science to <span className="text-[var(--primary)]">Soulful</span> Spaces
          </h1>
          <p className="text-white/45 mt-8 text-xl max-w-md leading-relaxed">
            Luxury custom-made furniture that redefines the Nigerian interior landscape with surgical precision.
          </p>
          <div className="flex gap-4 mt-12 flex-wrap">
            <a href="#contact" className="bg-[var(--primary)] text-black px-10 py-4 font-bold text-lg hover:scale-105 transition-all duration-300 rounded-full">
              Begin Your Commission
            </a>
          </div>
        </div>
        <div className="relative min-h-[50vh] md:min-h-full">
          <SafeImage src={IMAGES.hero} alt="Andin Furniture Concept" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--secondary)] via-[var(--secondary)]/20 to-transparent" />
        </div>
      </section>

      {/* --- ABOUT (V3 Reveal) --- */}
      <section id="ourcraft" ref={aboutReveal.ref} className="py-32 px-6 bg-[var(--secondary)] relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <h2 className="font-heading text-6xl font-bold text-white mb-8">The Andin Legacy</h2>
            <p className="text-white/60 text-xl leading-relaxed mb-10">
              Founded by Inneh Samuel—who traded soil science for the art of the grain—Andin Furniture is a testament to the power of transformation. We don't just build furniture; we engineer comfort and style into every fiber of your home.
            </p>
            <div className="grid grid-cols-2 gap-8">
              {stats.map((s, i) => (
                <div key={i} className="border-l-2 border-[var(--primary)]/30 pl-6">
                  <p className="text-4xl font-heading font-bold text-white">{s.number}</p>
                  <p className="text-white/40 text-sm uppercase tracking-widest mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={`relative aspect-square transition-all duration-1000 delay-300 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <div className="absolute inset-0 border-[10px] border-[var(--primary)] translate-x-4 translate-y-4" />
            <div className="relative h-full w-full overflow-hidden">
              <SafeImage src={IMAGES.products[1]} alt="The Craft" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* --- PROCESS (V9 Counter Rise) --- */}
      <section id="process" ref={processReveal.ref} className="py-32 px-6 bg-white/[0.03]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="font-heading text-6xl font-bold text-white mb-4">The Path to Perfection</h2>
            <p className="text-white/40 text-lg">How we bring your custom vision to life.</p>
          </div>
          <div className="space-y-24">
            {process.map((step, i) => (
              <div key={i} className={`flex flex-col md:flex-row items-center gap-12 transition-all duration-1000 ${processReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: `${i * 200}ms` }}>
                <div className="shrink-0">
                   <span className="font-heading text-[10rem] leading-none font-black text-white/5">{step.number}</span>
                </div>
                <div className="md:-ml-12 pt-10">
                  <h3 className="font-heading text-4xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-white/50 text-xl leading-relaxed max-w-2xl">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PRODUCTS (V2 Scale Reveal) --- */}
      <section id="collections" ref={productsReveal.ref} className="py-32 px-6 bg-[var(--secondary)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="font-heading text-6xl font-bold text-white">The Collection</h2>
              <p className="text-white/40 text-lg mt-2">Limited editions and signature concepts.</p>
            </div>
            <a href="#contact" className="text-[var(--primary)] font-bold text-sm border-b-2 border-[var(--primary)] pb-1">VIEW ALL PIECES</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((p, i) => (
              <div key={i} className={`group transition-all duration-700 ease-out ${productsReveal.isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`} style={{ transitionDelay: `${i * 150}ms` }}>
                <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-zinc-900">
                  <SafeImage src={IMAGES.products[i] || IMAGES.hero} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500" />
                  <div className="absolute bottom-4 left-4 right-4 translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <button className="w-full bg-white text-black py-3 font-bold text-sm uppercase tracking-widest">Enquire Now</button>
                  </div>
                </div>
                <h3 className="font-heading text-2xl font-bold text-white mb-2">{p.name}</h3>
                <p className="text-white/40 text-sm mb-4 line-clamp-2">{p.description}</p>
                <p className="text-[var(--primary)] font-bold text-xl">{p.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURES (V4 Staggered Bento) --- */}
      <section ref={featuresReveal.ref} className="py-32 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} 
                style={{ transitionDelay: `${i * 120}ms` }}
                className={`p-10 border border-white/5 bg-white/5 rounded-2xl hover:border-[var(--primary)]/30 transition-all duration-500 group ${featuresReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="w-14 h-14 bg-[var(--primary)]/10 flex items-center justify-center rounded-xl mb-8 group-hover:bg-[var(--primary)] transition-colors duration-500">
                  <f.icon className="text-[var(--primary)] group-hover:text-black transition-colors" size={28} />
                </div>
                <h3 className="font-heading text-3xl font-bold text-white mb-4">{f.title}</h3>
                <p className="text-white/50 leading-relaxed text-lg">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS (V7 Blur Cascade) --- */}
      <section ref={testimonialReveal.ref} className="py-32 px-6 bg-[var(--secondary)] overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-5xl font-bold text-center mb-20 text-white">Client Reflections</h2>
          <div className="columns-1 md:columns-2 gap-8 space-y-8">
            {testimonials.map((t, i) => (
              <div key={i} 
                style={{ transitionDelay: `${i * 200}ms` }}
                className={`break-inside-avoid p-10 bg-white/[0.03] border border-white/5 rounded-3xl transition-all duration-1000 ${testimonialReveal.isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-10 blur-sm'}`}>
                <p className="text-white/70 text-2xl font-serif italic leading-relaxed mb-8">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[var(--primary)] rounded-full flex items-center justify-center text-black font-black text-xl">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg">{t.name}</p>
                    <p className="text-white/40 text-sm tracking-widest uppercase">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT (C2 Variant) --- */}
      <section id="contact" ref={contactReveal.ref} className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[var(--primary)]" />
        <div className="absolute inset-0 bg-[var(--secondary)] [clip-path:polygon(0_0,65%_0,45%_100%,0_100%)] hidden md:block" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-20 py-24 items-center">
          <div className={`transition-all duration-1000 delay-100 ${contactReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h2 className="font-heading text-7xl md:text-8xl font-bold text-white leading-none mb-8">Start Your <br/> Custom Build</h2>
            <p className="text-white/60 text-xl max-w-sm mb-12">
              Transform your living space with a piece that is uniquely yours. Let's discuss your commission today.
            </p>
            <div className="flex flex-col gap-6">
              <a href="https://instagram.com/andin_furniture" className="flex items-center gap-4 text-white/80 hover:text-white transition-colors group">
                <Instagram size={24} className="group-hover:text-[var(--primary)] transition-colors" />
                <span className="font-mono text-lg">@andin_furniture</span>
              </a>
              <div className="flex items-center gap-4 text-white/80">
                <MapPin size={24} className="text-[var(--primary)]" />
                <span className="font-mono text-lg">Lagos, Nigeria</span>
              </div>
            </div>
          </div>

          <div className={`w-full max-w-md ml-auto transition-all duration-1000 delay-300 ${contactReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {sent ? (
              <div className="bg-black p-12 rounded-3xl border border-white/10 text-center animate-scaleIn">
                <div className="w-20 h-20 bg-[var(--primary)] rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCheck size={40} className="text-black" />
                </div>
                <h3 className="font-heading text-4xl font-bold text-white mb-4">Inquiry Received</h3>
                <p className="text-white/50 text-lg">Inneh Samuel will review your commission request and respond shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-black p-10 rounded-3xl border border-white/10 space-y-4">
                <h3 className="text-white font-heading text-2xl font-bold mb-6">Commission Form</h3>
                {['name', 'email', 'phone'].map(field => (
                  <input key={field} type="text" placeholder={field.charAt(0).toUpperCase() + field.slice(1)} 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-white/30 outline-none focus:border-[var(--primary)] transition-colors"
                    onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))} required />
                ))}
                <textarea placeholder="Tell us about your space and style..." rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-white/30 outline-none focus:border-[var(--primary)] transition-colors"
                  onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))} required />
                <button type="submit" disabled={loading}
                  className="w-full bg-[var(--primary)] text-black py-5 rounded-xl font-bold text-lg hover:brightness-110 transition-all flex items-center justify-center gap-3">
                  {loading ? <Loader2 className="animate-spin" /> : "Request Commission"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-black py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-2">
            <div className="w-12 h-12 bg-[var(--primary)] flex items-center justify-center font-heading text-3xl font-black text-black mb-8">A</div>
            <h2 className="font-heading text-3xl font-bold text-white mb-4">Andin Furniture</h2>
            <p className="text-white/40 max-w-sm text-lg leading-relaxed mb-8">
              Handcrafting luxury legacy pieces for the discerning elite. Clean luxe aesthetics powered by technical precision.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[var(--primary)] hover:border-[var(--primary)] transition-all">
                <Instagram size={18} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-heading text-xl font-bold text-white mb-8">Quick Links</h4>
            <div className="space-y-4">
              {['Home', 'Our Craft', 'Collections', 'Contact'].map(link => (
                <a key={link} href={`#${link.toLowerCase().replace(' ', '')}`} className="block text-white/40 hover:text-white transition-colors uppercase text-sm tracking-widest">
                  {link}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-heading text-xl font-bold text-white mb-8">Regional</h4>
            <p className="text-white/40 text-sm leading-relaxed mb-4">
              Lagos Office & Studio<br/>
              Lekki Phase 1, Lagos, Nigeria
            </p>
            <p className="text-[var(--primary)] font-mono text-sm uppercase tracking-tighter">
              Sharp delivery, nationwide.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-white/30 text-xs font-mono uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} Andin Furniture. All rights reserved.</p>
          <p>Bespoke Artistry • Modern Connoisseur</p>
        </div>
      </footer>
    </main>
  );
}