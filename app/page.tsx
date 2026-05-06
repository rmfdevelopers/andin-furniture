'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Hammer, 
  Settings, 
  Leaf, 
  Users, 
  Package, 
  Mail, 
  MapPin, 
  Instagram, 
  ArrowRight, 
  CheckCheck, 
  Loader2, 
  ImageOff,
  Menu,
  X,
  Phone
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: layered
// Divider Style: D-RULE
// Typography Personality: refined

// --- Hooks & Utilities ---

const useScrollReveal = (threshold = 0.1) => {
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

function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: any) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-zinc-900 ${fallbackClassName ?? className ?? ''}`}>
        <ImageOff size={28} className="text-white/10" />
      </div>
    );
  }
  return (
    <Image 
      src={src} 
      alt={alt} 
      fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} 
      priority={priority}
      onError={() => setError(true)} 
    />
  );
}

// --- Components ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { name: "The Story", href: "#about" },
    { name: "Collection", href: "#products" },
    { name: "Showroom", href: "#gallery" },
    { name: "Enquire", href: "#contact" }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 py-4 ${
        scrolled ? 'bg-primary/95 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#home" className="group flex items-center gap-2">
            <div className="bg-accent w-10 h-10 flex items-center justify-center font-heading font-bold text-black text-xl">
              A
            </div>
            <span className="font-heading text-2xl font-bold tracking-tighter text-white">ANDIN</span>
          </a>

          <div className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-xs font-bold uppercase tracking-[0.2em] text-white/70 hover:text-accent transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              className="bg-accent text-black px-6 py-2.5 font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all"
            >
              Get Started
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-[200] transition-transform duration-500 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
        <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-primary border-l border-white/10 p-8 flex flex-col">
          <div className="flex justify-between items-center mb-12">
            <span className="font-heading text-2xl font-bold text-white">ANDIN</span>
            <button onClick={() => setMobileOpen(false)}><X className="text-white" /></button>
          </div>
          <div className="flex flex-col gap-8">
            {links.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setMobileOpen(false)}
                className="text-3xl font-heading font-medium text-white hover:text-accent"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="mt-auto pt-8 border-t border-white/10">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-4">Get in touch</p>
            <p className="text-white/70 text-sm">Lagos, Nigeria</p>
          </div>
        </div>
      </div>
    </>
  );
};

const SectionDivider = () => (
  <div className="py-20 flex items-center gap-8 px-8 max-w-7xl mx-auto opacity-30">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
  </div>
);

// --- Sections ---

const Hero = () => {
  const { ref, isVisible } = useScrollReveal();
  
  return (
    <section id="home" className="min-h-screen grid md:grid-cols-[1.1fr_0.9fr] items-stretch bg-primary overflow-hidden">
      <div className="flex flex-col justify-center px-8 md:px-16 pt-32 pb-20 relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <p className="text-accent font-bold text-sm tracking-[0.4em] uppercase mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-accent"></span>
            Bespoke Luxury
          </p>
          <h1 className="font-heading text-6xl md:text-[5.5rem] font-light text-white leading-[0.9] mb-8">
            Crafting Your <span className="font-bold block">Legacy in Wood</span> & Velvet.
          </h1>
          <p className="text-white/40 text-lg max-w-md leading-relaxed mb-12">
            Luxury is in the details. Discover our 'Clean Luxe' collection of custom-made furniture designed for the discerning few.
          </p>
          <div className="flex flex-wrap gap-6 items-center">
            <a href="#products" className="bg-accent text-black px-10 py-5 font-bold uppercase tracking-widest text-sm hover:translate-y-[-4px] transition-all shadow-[0_10px_30px_rgba(255,20,147,0.2)]">
              Experience Luxury
            </a>
            <a href="#about" className="text-white/60 hover:text-white transition-colors flex items-center gap-3 group font-bold tracking-widest text-xs uppercase">
              Our Story <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          
          <div className="mt-20 flex gap-12 border-t border-white/5 pt-10">
            <div>
              <p className="text-4xl font-heading font-bold text-white">500+</p>
              <p className="text-white/30 text-[10px] uppercase tracking-widest mt-1">Custom Projects</p>
            </div>
            <div>
              <p className="text-4xl font-heading font-bold text-white">4k+</p>
              <p className="text-white/30 text-[10px] uppercase tracking-widest mt-1">Happy Clients</p>
            </div>
          </div>
        </div>
      </div>
      <div ref={ref} className="relative min-h-[50vh] md:min-h-full">
        <div className={`absolute inset-0 transition-all duration-1000 ease-out overflow-hidden ${isVisible ? 'max-w-full' : 'max-w-0'}`}>
          <SafeImage 
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000" 
            alt="Luxury Interior" 
            fill 
            className="object-cover" 
            priority 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/20 to-transparent" />
        </div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/20 blur-[60px] rounded-full animate-float" />
      </div>
    </section>
  );
};

const Gallery = () => {
  const { ref, isVisible } = useScrollReveal();
  const images = [
    "https://picsum.photos/seed/lux1/800/1000",
    "https://picsum.photos/seed/lux2/800/600",
    "https://picsum.photos/seed/lux3/800/800",
    "https://picsum.photos/seed/lux4/800/1100",
    "https://picsum.photos/seed/lux5/800/600",
    "https://picsum.photos/seed/lux6/800/900",
  ];

  return (
    <section id="gallery" ref={ref} className="py-32 px-6 bg-secondary text-primary">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center">
          <h2 className="font-heading text-5xl md:text-7xl font-bold mb-4">The Showroom</h2>
          <p className="text-primary/40 text-lg uppercase tracking-[0.2em]">Excellence curated for life</p>
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((src, i) => (
            <div 
              key={i} 
              style={{ transitionDelay: `${i * 150}ms` }}
              className={`break-inside-avoid relative overflow-hidden rounded-sm group shadow-xl transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <SafeImage 
                src={src} 
                alt={`Gallery piece ${i+1}`} 
                width={800} 
                height={1000} 
                className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0" 
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-accent/10 transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="about" ref={ref} className="py-32 px-6 bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <div className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
          <div className="aspect-[4/5] relative rounded-sm overflow-hidden z-10 border border-white/10 shadow-2xl">
            <SafeImage 
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2000" 
              alt="Artisan working" 
              fill 
              className="object-cover" 
            />
          </div>
          <div className="absolute -top-10 -right-10 w-full h-full border border-accent/20 -z-10 translate-x-4 translate-y-4" />
          <div className="absolute bottom-10 -left-10 bg-accent text-black p-8 z-20 max-w-xs shadow-2xl">
            <p className="font-heading text-2xl font-bold leading-tight">"Furniture is a statement of identity."</p>
          </div>
        </div>
        
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
          <p className="text-accent font-bold text-xs tracking-[0.4em] uppercase mb-6">Our Legacy</p>
          <h2 className="font-heading text-5xl md:text-6xl font-light mb-8">From Soil Scientist to <span className="font-bold">Furniture King</span></h2>
          <div className="space-y-6 text-white/50 text-lg leading-relaxed">
            <p>
              Founded by Inneh Samuel, Andin Furniture represents a journey of passion and precision. What started as a vision has grown into Lagos's premier atelier for custom furniture production.
            </p>
            <p>
              We believe that furniture is not just functional; it is a commitment to excellence. Each joint, each stitch, and each finish is a testament to our relentless pursuit of perfection.
            </p>
          </div>
          <div className="mt-12 flex items-center gap-10">
            <div className="flex -space-x-3">
              {[1,2,3,4].map(n => (
                <div key={n} className="w-12 h-12 rounded-full border-2 border-primary bg-zinc-800 flex items-center justify-center text-[10px] text-white/40">
                  {n}
                </div>
              ))}
            </div>
            <p className="text-white/40 text-sm italic">Trusted by elite designers across Nigeria.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Products = () => {
  const { ref, isVisible } = useScrollReveal();
  const items = [
    { name: "The Royal Wingback", desc: "Hand-tufted velvet armchair with artisanal mahogany legs.", price: "₦450,000", img: "https://picsum.photos/seed/luxprod1/800/1000" },
    { name: "Obsidian Dining Suite", desc: "A 10-seater custom mahogany masterpiece with a matte finish.", price: "₦3,500,000", img: "https://picsum.photos/seed/luxprod2/800/1000" },
    { name: "Minimalist Slate Lounge", desc: "High-density modular sofa system in premium Italian linen.", price: "₦1,850,000", img: "https://picsum.photos/seed/luxprod3/800/1000" },
    { name: "Bespoke Executive Desk", desc: "Custom glass and gold-leaf finish workspace.", price: "₦950,000", img: "https://picsum.photos/seed/luxprod4/800/1000" },
  ];

  return (
    <section id="products" ref={ref} className="py-32 px-6 bg-secondary text-primary">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <p className="text-accent font-bold text-xs tracking-[0.4em] uppercase mb-4">Curated Pieces</p>
            <h2 className="font-heading text-6xl md:text-7xl font-bold">The Collection</h2>
          </div>
          <p className="max-w-xs text-primary/40 font-medium text-right leading-relaxed">
            Signature pieces that define modern minimalist luxury. Sharp delivery, nationwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {items.map((p, i) => (
            <div 
              key={i} 
              style={{ transitionDelay: `${i * 120}ms` }}
              className={`group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <div className="aspect-[3/4] relative overflow-hidden mb-6 rounded-sm bg-zinc-200">
                <SafeImage 
                  src={p.img} 
                  alt={p.name} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-1000" 
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-all duration-500" />
                <a 
                  href="#contact" 
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-3 font-bold text-[10px] uppercase tracking-widest opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                >
                  Request Quote
                </a>
              </div>
              <h3 className="font-heading text-2xl font-bold mb-2 group-hover:text-accent transition-colors">{p.name}</h3>
              <p className="text-primary/50 text-sm mb-4 line-clamp-2 leading-relaxed">{p.desc}</p>
              <p className="text-xl font-bold tracking-tighter">{p.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const { ref, isVisible } = useScrollReveal();
  const features = [
    { title: "Master Craftsmanship", desc: "Every piece is hand-built by seasoned artisans with decades of furniture-making heritage.", icon: Hammer },
    { title: "Custom Tailoring", desc: "We don't just build furniture; we curate pieces designed specifically for your space and lifestyle.", icon: Settings },
    { title: "Ethical Sourcing", desc: "Our timber is sourced from sustainable forests, ensuring luxury that respects the earth.", icon: Leaf },
  ];

  return (
    <section ref={ref} className="py-32 px-6 bg-primary text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((f, i) => (
            <div 
              key={i} 
              className={`p-12 border border-white/5 bg-zinc-900/50 hover:bg-zinc-900 transition-all duration-500 group relative ${
                isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="w-16 h-16 bg-accent/10 border border-accent/20 flex items-center justify-center mb-8 group-hover:bg-accent group-hover:text-black transition-all duration-500">
                <f.icon size={28} strokeWidth={1.5} />
              </div>
              <h3 className="font-heading text-3xl font-bold mb-4">{f.title}</h3>
              <p className="text-white/40 leading-relaxed">{f.desc}</p>
              <div className="absolute top-0 right-0 p-8 text-white/5 font-heading text-7xl font-bold italic">0{i+1}</div>
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
    { name: "Adeola Balogun", text: "The attention to detail is simply unmatched in Nigeria. My dining suite is the talk of every dinner party.", role: "Interior Designer" },
    { name: "Chidi Okoro", text: "True custom luxury. They understood my vision and brought it to life with incredible precision.", role: "CEO, TechHaus" }
  ];

  return (
    <section ref={ref} className="py-32 bg-accent/5 px-6 border-y border-accent/10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-accent font-bold text-xs tracking-[0.4em] uppercase mb-4">Elite Circle</p>
          <h2 className="font-heading text-5xl md:text-6xl font-bold">Voices of Luxury</h2>
        </div>
        <div className="space-y-8">
          {items.map((t, i) => (
            <div 
              key={i} 
              style={{ transitionDelay: `${i * 150}ms` }}
              className={`bg-primary p-12 rounded-sm border border-white/5 shadow-2xl relative transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-6 blur-sm'
              }`}
            >
              <span className="text-accent/20 text-8xl font-serif absolute top-4 left-4 leading-none select-none">“</span>
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed italic relative z-10 mb-10">
                {t.text}
              </p>
              <div className="flex items-center gap-6 border-t border-white/5 pt-8">
                <div className="w-14 h-14 bg-accent flex items-center justify-center font-heading text-black font-bold text-2xl">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-heading text-xl font-bold text-white">{t.name}</p>
                  <p className="text-accent/60 text-xs uppercase tracking-widest mt-1 font-bold">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const { ref, isVisible } = useScrollReveal();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <section id="contact" ref={ref} className="relative overflow-hidden min-h-screen flex items-center">
      <div className="absolute inset-0 bg-accent" />
      <div className="absolute inset-0 bg-primary [clip-path:polygon(0_0,60%_0,45%_100%,0_100%)] hidden md:block" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-32 grid md:grid-cols-2 gap-20 items-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <p className="text-accent font-bold text-xs tracking-[0.4em] uppercase mb-6">Inquiry</p>
          <h2 className="font-heading text-6xl md:text-[5rem] font-bold text-white leading-none mb-8">
            Begin Your <br/><span className="text-white/30 md:text-accent">Custom Journey</span>
          </h2>
          <div className="space-y-6 mt-12 text-white/60">
            <div className="flex items-center gap-4">
              <MapPin className="text-accent" size={20} />
              <span>Lagos, Nigeria</span>
            </div>
            <div className="flex items-center gap-4">
              <Instagram className="text-accent" size={20} />
              <span>@andin_furniture</span>
            </div>
          </div>
        </div>

        <div className="w-full max-w-md ml-auto">
          {sent ? (
            <div className="bg-zinc-950 p-12 border border-accent/30 text-center animate-scaleIn">
              <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-accent/40">
                <CheckCheck size={40} className="text-accent" />
              </div>
              <h3 className="font-heading text-3xl font-bold text-white mb-4">Request Sent</h3>
              <p className="text-white/40 leading-relaxed">Our concierge will contact you within 24 hours to discuss your masterpiece.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-zinc-950 p-8 md:p-12 border border-white/10 shadow-3xl">
              <h3 className="font-heading text-2xl font-bold text-white mb-8">The Studio Intake</h3>
              <div className="space-y-5">
                {['name', 'email', 'phone'].map(field => (
                  <input
                    key={field}
                    type={field === 'email' ? 'email' : 'text'}
                    placeholder={field.toUpperCase()}
                    required={field !== 'phone'}
                    value={(form as any)[field]}
                    onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                    className="w-full bg-zinc-900 border border-white/5 p-4 text-white text-xs tracking-widest placeholder-white/20 outline-none focus:border-accent transition-colors"
                  />
                ))}
                <textarea
                  placeholder="PROJECT DETAILS"
                  rows={4}
                  required
                  value={form.message}
                  onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full bg-zinc-900 border border-white/5 p-4 text-white text-xs tracking-widest placeholder-white/20 outline-none focus:border-accent transition-colors resize-none"
                />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full mt-8 bg-accent text-black py-5 font-bold text-xs uppercase tracking-[0.3em] hover:brightness-110 transition-all flex justify-center items-center gap-4 group"
              >
                {loading ? <Loader2 className="animate-spin" /> : <>Send Inquiry <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-primary pt-24 pb-12 px-6 border-t border-white/5">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-accent w-10 h-10 flex items-center justify-center font-heading font-bold text-black text-xl">A</div>
            <span className="font-heading text-3xl font-bold text-white tracking-tighter uppercase">Andin</span>
          </div>
          <p className="text-white/40 text-lg max-w-sm leading-relaxed">
            Premium high-end furniture production company specializing in custom-made pieces that transform spaces into masterpieces.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-[0.3em] mb-8">Navigation</h4>
          <ul className="space-y-4">
            {['The Story', 'Collection', 'Showroom', 'Enquire'].map(link => (
              <li key={link}><a href={`#${link.toLowerCase()}`} className="text-white/40 hover:text-accent transition-colors text-sm">{link}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-[0.3em] mb-8">Contact</h4>
          <p className="text-white/40 text-sm mb-4 leading-relaxed">Lagos, Nigeria</p>
          <p className="text-white/40 text-sm">andin_furniture</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-white/5">
        <p className="text-white/20 text-[10px] uppercase tracking-[0.4em]">
          &copy; {new Date().getFullYear()} Andin Furniture Atelier.
        </p>
        <div className="flex gap-8">
          <a href="#" className="text-white/20 hover:text-accent transition-all"><Instagram size={20} /></a>
        </div>
      </div>
    </div>
  </footer>
);

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Gallery />
      <SectionDivider />
      <About />
      <Products />
      <SectionDivider />
      <Features />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}