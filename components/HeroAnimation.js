"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Phone, CheckCircle, MapPin } from "lucide-react";

// Predefined positions and variables to avoid hydration mismatch (no Math.random())
const PARTICLES = [
  { top: "12%", left: "8%", size: 3, delay: "0s" },
  { top: "25%", left: "45%", size: 2, delay: "1.5s" },
  { top: "40%", left: "15%", size: 4, delay: "0.5s" },
  { top: "18%", left: "80%", size: 2, delay: "2.2s" },
  { top: "65%", left: "12%", size: 3, delay: "1s" },
  { top: "85%", left: "40%", size: 2, delay: "0.8s" },
  { top: "75%", left: "78%", size: 3, delay: "1.8s" },
  { top: "50%", left: "90%", size: 4, delay: "2.5s" },
  { top: "35%", left: "65%", size: 2, delay: "1.2s" },
  { top: "80%", left: "22%", size: 3, delay: "0.3s" }
];

const GLOWING_STARS = [
  { top: "15%", left: "20%", delay: "0.2s", scale: 0.8 },
  { top: "22%", left: "70%", delay: "1.1s", scale: 0.6 },
  { top: "55%", left: "5%", delay: "0.7s", scale: 1.0 },
  { top: "78%", left: "85%", delay: "1.9s", scale: 0.7 },
  { top: "62%", left: "55%", delay: "1.4s", scale: 0.5 },
  { top: "10%", left: "92%", delay: "2.3s", scale: 0.9 }
];

const PASSPORT_STAMPS = [
  { text: "★ VISA APPROVED ★", top: "12%", left: "5%", rotation: "-15deg", color: "rgba(212,175,55,0.06)" },
  { text: "PASSPORT CONTROL", top: "72%", left: "8%", rotation: "12deg", color: "rgba(255,255,255,0.04)" },
  { text: "IQ IMMIGRATION ARRIVED", top: "18%", left: "68%", rotation: "-8deg", color: "rgba(212,175,55,0.05)" },
  { text: "CLASS OF 2026", top: "82%", left: "62%", rotation: "18deg", color: "rgba(255,255,255,0.05)" }
];

const LOCATION_PINS = [
  { top: "35%", left: "10%" },
  { top: "20%", left: "38%" },
  { top: "15%", left: "72%" },
  { top: "50%", left: "82%" },
  { top: "72%", left: "15%" },
  { top: "65%", left: "45%" }
];

const ORBIT_COUNTRIES = [
  // Inner Orbit (Radius ~105px, Diameter 210px) - Clockwise
  {
    flag: "🇨🇦",
    name: "Canada",
    desc: "Top Universities · PR Pathway · SDS 20-Day",
    orbit: "inner",
    positionClass: "orbit-inner-1"
  },
  {
    flag: "🇬🇧",
    name: "United Kingdom",
    desc: "World-Class Education · 2-Year Graduate Visa",
    orbit: "inner",
    positionClass: "orbit-inner-2"
  },
  // Middle Orbit (Radius ~160px, Diameter 320px) - Counter-Clockwise
  {
    flag: "🇦🇺",
    name: "Australia",
    desc: "High Visa Success · Post-Study Work · PR Streams",
    orbit: "middle",
    positionClass: "orbit-middle-1"
  },
  {
    flag: "🇺🇸",
    name: "United States",
    desc: "Ivy League · OPT Pathways · High Quality Career",
    orbit: "middle",
    positionClass: "orbit-middle-2"
  },
  // Outer Orbit (Radius ~215px, Diameter 430px) - Clockwise
  {
    flag: "🇳🇿",
    name: "New Zealand",
    desc: "Affordable Study · Work Rights · Friendly PR",
    orbit: "outer",
    positionClass: "orbit-outer-1"
  },
  {
    flag: "🇩🇪",
    name: "Germany",
    desc: "Zero Tuition · Opportunity Card · Job Seeker Visa",
    orbit: "outer",
    positionClass: "orbit-outer-2"
  }
];

export default function HeroAnimation() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section 
      className="relative min-h-screen flex items-center overflow-hidden py-24 md:py-32"
      style={{ background: "linear-gradient(135deg, #050E1B 0%, #0A2342 50%, #102F54 100%)" }}
    >
      {/* ── Keyframes and Custom CSS Animations ── */}
      <style>{`
        /* Rotations for the Concentric Circles */
        @keyframes spin-clockwise {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-counter-clockwise {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        /* Apply rotation to orbits */
        .orbit-spin-cw {
          animation: spin-clockwise 30s linear infinite;
        }
        .orbit-spin-ccw {
          animation: spin-counter-clockwise 35s linear infinite;
        }
        .orbit-spin-slow-cw {
          animation: spin-clockwise 45s linear infinite;
        }

        /* Counter rotation to keep flags/cards upright */
        .counter-spin-cw {
          animation: spin-counter-clockwise 30s linear infinite;
        }
        .counter-spin-ccw {
          animation: spin-clockwise 35s linear infinite;
        }
        .counter-spin-slow-cw {
          animation: spin-counter-clockwise 45s linear infinite;
        }

        /* Twinkle stars */
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .twinkle-star {
          animation: twinkle 3s ease-in-out infinite;
        }

        /* Drift particles */
        @keyframes drift {
          0%, 100% { transform: translate(0, 0); opacity: 0.2; }
          50% { transform: translate(15px, -15px); opacity: 0.6; }
        }
        .drift-particle {
          animation: drift 6s ease-in-out infinite;
        }

        /* Location pins pulsate */
        @keyframes pulse-pin {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.3); opacity: 0.9; }
        }
        .pulse-pin-glow {
          animation: pulse-pin 2s ease-in-out infinite;
        }

        /* Pulse glow for Logo and Orbit Sun */
        @keyframes pulse-glow {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 15px rgba(212,175,55,0.4)); }
          50% { transform: scale(1.03); filter: drop-shadow(0 0 30px rgba(212,175,55,0.7)); }
        }
        .logo-glow-effect {
          animation: pulse-glow 4s ease-in-out infinite;
        }

        /* Airplane flying along curved infinity loop path */
        @keyframes fly-airplane {
          0% { offset-distance: 0%; }
          100% { offset-distance: 100%; }
        }
        .airplane-path-anim {
          animation: fly-airplane 20s linear infinite;
        }

        /* Slide / Fade in animations for grid copy */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in-up-custom {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Background airplane drift */
        @keyframes drift-bg-airplane {
          0% { transform: translate(-5%, 5%) rotate(-10deg) scale(1); }
          50% { transform: translate(5%, -5%) rotate(-8deg) scale(1.05); }
          100% { transform: translate(-5%, 5%) rotate(-10deg) scale(1); }
        }
        .bg-airplane-drift {
          animation: drift-bg-airplane 30s ease-in-out infinite;
        }

        /* Glass floating cards */
        @keyframes float-card {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        .float-card-anim {
          animation: float-card 6s ease-in-out infinite;
        }

        /* ── Airplane Slide-In & Park ── */
        @keyframes plane-slide-in {
          0%   { transform: translateX(-500px) translateY(20px) scale(0.5) rotate(-8deg); opacity: 0; }
          8%   { opacity: 1; }
          75%  { transform: translateX(0px) translateY(0px) scale(1) rotate(0deg); opacity: 1; }
          100% { transform: translateX(0px) translateY(0px) scale(1) rotate(0deg); opacity: 1; }
        }
        .plane-slide-in-anim {
          animation: plane-slide-in 2.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Contrail trail */
        @keyframes contrail-grow {
          0%   { width: 0px; opacity: 0; }
          30%  { opacity: 0.8; }
          75%  { width: 110px; opacity: 0.5; }
          100% { width: 0px; opacity: 0; }
        }
        .contrail-anim {
          animation: contrail-grow 2.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Gentle float after parking */
        @keyframes plane-parked-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-8px) rotate(1deg); }
        }
        .plane-parked-float {
          animation: plane-parked-float 3.5s ease-in-out 2.3s infinite;
        }
      `}</style>

      {/* ── Background Grid Overlay ── */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]" 
        style={{
          backgroundImage: "linear-gradient(rgba(212,175,55,1) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(212,175,55,1) 1.5px, transparent 1.5px)",
          backgroundSize: "60px 60px"
        }}
      />

      {/* ── Radial Background Glows ── */}
      <div 
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none blur-[120px] z-0"
        style={{ background: "radial-gradient(circle, rgba(20,57,105,0.4) 0%, transparent 70%)" }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none blur-[100px] z-0"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)" }}
      />

      {/* ── Background Giant Airplane ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-30 select-none z-0 mix-blend-screen">
        <Image 
          src="/realistic-airplane.png" 
          alt="Luxury Passenger Aircraft" 
          width={1800} 
          height={1200}
          priority
          className="object-contain bg-airplane-drift"
          style={{ filter: "blur(3px) drop-shadow(0 0 40px rgba(212,175,55,0.4))", minWidth: "120vw" }}
        />
      </div>

      {/* ── Glowing Travel Trails Across Background ── */}
      <div className="absolute inset-0 pointer-events-none opacity-40 z-0 hidden lg:block">
        <svg className="w-full h-full" fill="none" stroke="url(#gold-gradient-bg)" strokeWidth="1.5" strokeDasharray="8 8">
          <defs>
            <linearGradient id="gold-gradient-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(212,175,55,0.1)" />
              <stop offset="50%" stopColor="rgba(212,175,55,0.8)" />
              <stop offset="100%" stopColor="rgba(212,175,55,0.1)" />
            </linearGradient>
          </defs>
          <path d="M 10% 20% Q 30% 50% 50% 30% T 90% 20%" className="drift-particle" />
          <path d="M 15% 80% Q 50% 60% 80% 80%" className="drift-particle" style={{ animationDelay: '2s' }} />
          <path d="M 10% 20% C 20% 60% 70% 30% 80% 80%" className="drift-particle" style={{ animationDelay: '4s' }} />
        </svg>
      </div>

      {/* ── Floating Glassmorphism Information Cards ── */}
      <div className="absolute inset-0 pointer-events-none z-10 hidden xl:block">
        <div className="absolute top-[15%] left-[8%] float-card-anim backdrop-blur-xl bg-white/5 border border-white/15 rounded-2xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)]" style={{ animationDelay: '0s' }}>
          <h4 className="font-bold text-white flex items-center gap-2 mb-2 text-sm"><img src="https://flagcdn.com/w80/ca.png" className="w-5 h-5 rounded-full object-cover shadow-sm"/> Canada</h4>
          <p className="text-[10px] text-gray-300 space-y-1 font-semibold leading-relaxed">Study Permit<br/>PR Pathway<br/>Work Opportunities</p>
        </div>
        <div className="absolute bottom-[20%] left-[6%] float-card-anim backdrop-blur-xl bg-white/5 border border-white/15 rounded-2xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)]" style={{ animationDelay: '2s' }}>
          <h4 className="font-bold text-white flex items-center gap-2 mb-2 text-sm"><img src="https://flagcdn.com/w80/au.png" className="w-5 h-5 rounded-full object-cover shadow-sm"/> Australia</h4>
          <p className="text-[10px] text-gray-300 space-y-1 font-semibold leading-relaxed">Student Visa<br/>Work Rights<br/>Skilled Migration</p>
        </div>
        <div className="absolute top-[25%] right-[6%] float-card-anim backdrop-blur-xl bg-white/5 border border-white/15 rounded-2xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)]" style={{ animationDelay: '1s' }}>
          <h4 className="font-bold text-white flex items-center gap-2 mb-2 text-sm"><img src="https://flagcdn.com/w80/gb.png" className="w-5 h-5 rounded-full object-cover shadow-sm"/> United Kingdom</h4>
          <p className="text-[10px] text-gray-300 space-y-1 font-semibold leading-relaxed">Graduate Route<br/>Top Universities</p>
        </div>
        <div className="absolute bottom-[25%] right-[10%] float-card-anim backdrop-blur-xl bg-white/5 border border-white/15 rounded-2xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)]" style={{ animationDelay: '3s' }}>
          <h4 className="font-bold text-white flex items-center gap-2 mb-2 text-sm"><img src="https://flagcdn.com/w80/nz.png" className="w-5 h-5 rounded-full object-cover shadow-sm"/> New Zealand</h4>
          <p className="text-[10px] text-gray-300 space-y-1 font-semibold leading-relaxed">Affordable Education<br/>Post Study Work Visa</p>
        </div>
      </div>

      {/* ── World Map Outline in the Background (Holographic Glow) ── */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08] select-none flex items-center justify-center">
        <svg viewBox="0 0 1000 500" className="w-full h-full object-cover px-8" fill="none" stroke="#D4AF37" strokeWidth="0.8" style={{ filter: "drop-shadow(0 0 12px rgba(212,175,55,0.8))" }}>
          {/* Faux world map contours */}
          <path d="M 150 150 Q 180 80 250 100 T 320 180 T 280 250 T 150 280 T 100 200 Z" strokeDasharray="3 3" />
          <path d="M 450 250 Q 520 180 600 200 T 680 280 T 620 380 T 450 350 Z" />
          <path d="M 720 120 Q 800 80 880 120 T 920 220 T 800 280 T 720 200 Z" strokeDasharray="5 5" />
          <path d="M 220 380 Q 280 320 340 380 T 300 450 Z" />
          
          {/* Linking paths */}
          <path d="M 200 180 Q 350 100 500 220 T 800 180" strokeDasharray="8 8" opacity="0.6" />
          <path d="M 280 240 Q 400 350 550 260 T 820 240" strokeDasharray="6 6" opacity="0.4" />
        </svg>
      </div>

      {/* ── Twinkling Stars & Floating Particles ── */}
      {GLOWING_STARS.map((star, idx) => (
        <div 
          key={`star-${idx}`}
          className="absolute text-brand-gold opacity-60 pointer-events-none twinkle-star"
          style={{
            top: star.top,
            left: star.left,
            animationDelay: star.delay,
            transform: `scale(${star.scale})`
          }}
        >
          ✦
        </div>
      ))}

      {PARTICLES.map((p, idx) => (
        <div 
          key={`part-${idx}`}
          className="absolute bg-brand-gold rounded-full pointer-events-none drift-particle"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            boxShadow: "0 0 8px rgba(212,175,55,0.8)"
          }}
        />
      ))}

      {/* ── Floating Passport Stamps ── */}
      {PASSPORT_STAMPS.map((stamp, idx) => (
        <div 
          key={`stamp-${idx}`}
          className="absolute font-mono text-[9px] sm:text-xs font-bold tracking-widest pointer-events-none border border-dashed rounded px-2.5 py-1 select-none"
          style={{
            top: stamp.top,
            left: stamp.left,
            transform: `rotate(${stamp.rotation})`,
            color: stamp.color,
            borderColor: stamp.color,
          }}
        >
          {stamp.text}
        </div>
      ))}

      {/* ── Location Pins ── */}
      {LOCATION_PINS.map((pin, idx) => (
        <div 
          key={`pin-${idx}`}
          className="absolute flex items-center justify-center pointer-events-none"
          style={{ top: pin.top, left: pin.left }}
        >
          <div className="absolute w-4 h-4 bg-brand-gold/30 rounded-full pulse-pin-glow" />
          <MapPin className="h-3 w-3 text-brand-gold relative z-10" />
        </div>
      ))}

      {/* ── Main Container ── */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ========================================================================= */}
          {/* LEFT SIDE: ORBIT SYSTEM (Concentric revolving country badges around logo) */}
          {/* ========================================================================= */}
          <div className="col-span-1 lg:col-span-6 flex justify-center items-center h-[540px] relative order-2 lg:order-1">
            
            {/* Orbit System Wrapper - Scale down slightly on mobile to fit screen boundaries */}
            <div className="relative w-[500px] h-[500px] scale-[0.7] sm:scale-[0.85] md:scale-95 lg:scale-100 flex items-center justify-center transition-all duration-300">
              
              {/* --- Orbit 1: Inner (210px diameter, 105px radius) --- */}
              <div 
                className="absolute rounded-full border border-dashed border-brand-gold/30 flex items-center justify-center orbit-spin-cw"
                style={{ width: 210, height: 210 }}
              >
                {/* 1st Inner Badge: Canada */}
                <div 
                  className="absolute cursor-pointer group"
                  style={{ top: -24, left: "calc(50% - 24px)" }}
                >
                  <div className="counter-spin-cw flex items-center justify-center w-12 h-12 rounded-full backdrop-blur-md bg-brand-blue/70 border border-brand-gold/40 shadow-lg shadow-black/40 hover:scale-110 hover:border-brand-gold hover:bg-brand-blue-light/95 transition-all duration-300">
                    <img src="https://flagcdn.com/w80/ca.png" alt="Canada Flag" className="w-7 h-7 rounded-full object-cover border border-white/30 shadow-[0_0_10px_rgba(255,255,255,0.2)] select-none pointer-events-none" />
                    
                    {/* Hover Stats Card */}
                    <div className="absolute bottom-14 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 w-48">
                      <div className="bg-brand-blue-dark/95 border border-brand-gold/30 rounded-xl p-3 shadow-2xl backdrop-blur-md text-center">
                        <div className="text-xs font-bold text-white mb-1">Canada 🇨🇦</div>
                        <div className="text-[10px] text-gray-300 leading-normal">PR Pathway · Top Universities · SDS 20-Day Visa</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2nd Inner Badge: United Kingdom */}
                <div 
                  className="absolute cursor-pointer group"
                  style={{ bottom: -24, left: "calc(50% - 24px)" }}
                >
                  <div className="counter-spin-cw flex items-center justify-center w-12 h-12 rounded-full backdrop-blur-md bg-brand-blue/70 border border-brand-gold/40 shadow-lg shadow-black/40 hover:scale-110 hover:border-brand-gold hover:bg-brand-blue-light/95 transition-all duration-300">
                    <img src="https://flagcdn.com/w80/gb.png" alt="UK Flag" className="w-7 h-7 rounded-full object-cover border border-white/30 shadow-[0_0_10px_rgba(255,255,255,0.2)] select-none pointer-events-none" />
                    
                    {/* Hover Stats Card */}
                    <div className="absolute bottom-14 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 w-48">
                      <div className="bg-brand-blue-dark/95 border border-brand-gold/30 rounded-xl p-3 shadow-2xl backdrop-blur-md text-center">
                        <div className="text-xs font-bold text-white mb-1">United Kingdom 🇬🇧</div>
                        <div className="text-[10px] text-gray-300 leading-normal">World-Class Education · 2-Year Graduate Visa</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* --- Orbit 2: Middle (330px diameter, 165px radius) --- */}
              <div 
                className="absolute rounded-full border border-dashed border-white/10 flex items-center justify-center orbit-spin-ccw"
                style={{ width: 330, height: 330 }}
              >
                {/* 1st Middle Badge: Australia */}
                <div 
                  className="absolute cursor-pointer group"
                  style={{ top: "calc(50% - 24px)", left: -24 }}
                >
                  <div className="counter-spin-ccw flex items-center justify-center w-12 h-12 rounded-full backdrop-blur-md bg-brand-blue/70 border border-white/20 shadow-lg shadow-black/40 hover:scale-110 hover:border-brand-gold hover:bg-brand-blue-light/95 transition-all duration-300">
                    <img src="https://flagcdn.com/w80/au.png" alt="Australia Flag" className="w-7 h-7 rounded-full object-cover border border-white/30 shadow-[0_0_10px_rgba(255,255,255,0.2)] select-none pointer-events-none" />
                    
                    {/* Hover Stats Card */}
                    <div className="absolute bottom-14 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 w-48">
                      <div className="bg-brand-blue-dark/95 border border-brand-gold/30 rounded-xl p-3 shadow-2xl backdrop-blur-md text-center">
                        <div className="text-xs font-bold text-white mb-1">Australia 🇦🇺</div>
                        <div className="text-[10px] text-gray-300 leading-normal">High Visa Success · Post-Study Work · PR Pathway</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2nd Middle Badge: United States */}
                <div 
                  className="absolute cursor-pointer group"
                  style={{ top: "calc(50% - 24px)", right: -24 }}
                >
                  <div className="counter-spin-ccw flex items-center justify-center w-12 h-12 rounded-full backdrop-blur-md bg-brand-blue/70 border border-white/20 shadow-lg shadow-black/40 hover:scale-110 hover:border-brand-gold hover:bg-brand-blue-light/95 transition-all duration-300">
                    <img src="https://flagcdn.com/w80/us.png" alt="USA Flag" className="w-7 h-7 rounded-full object-cover border border-white/30 shadow-[0_0_10px_rgba(255,255,255,0.2)] select-none pointer-events-none" />
                    
                    {/* Hover Stats Card */}
                    <div className="absolute bottom-14 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 w-48">
                      <div className="bg-brand-blue-dark/95 border border-brand-gold/30 rounded-xl p-3 shadow-2xl backdrop-blur-md text-center">
                        <div className="text-xs font-bold text-white mb-1">United States 🇺🇸</div>
                        <div className="text-[10px] text-gray-300 leading-normal">Ivy League Universities · OPT Training · Global Careers</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* --- Orbit 3: Outer (440px diameter, 220px radius) --- */}
              <div 
                className="absolute rounded-full border border-dashed border-brand-gold/20 flex items-center justify-center orbit-spin-slow-cw"
                style={{ width: 440, height: 440 }}
              >
                {/* 1st Outer Badge: New Zealand */}
                <div 
                  className="absolute cursor-pointer group"
                  style={{ top: 40, left: 40 }}
                >
                  <div className="counter-spin-slow-cw flex items-center justify-center w-12 h-12 rounded-full backdrop-blur-md bg-brand-blue/70 border border-brand-gold/30 shadow-lg shadow-black/40 hover:scale-110 hover:border-brand-gold hover:bg-brand-blue-light/95 transition-all duration-300">
                    <img src="https://flagcdn.com/w80/nz.png" alt="New Zealand Flag" className="w-7 h-7 rounded-full object-cover border border-white/30 shadow-[0_0_10px_rgba(255,255,255,0.2)] select-none pointer-events-none" />
                    
                    {/* Hover Stats Card */}
                    <div className="absolute bottom-14 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 w-48">
                      <div className="bg-brand-blue-dark/95 border border-brand-gold/30 rounded-xl p-3 shadow-2xl backdrop-blur-md text-center">
                        <div className="text-xs font-bold text-white mb-1">New Zealand 🇳🇿</div>
                        <div className="text-[10px] text-gray-300 leading-normal">Affordable Study · Full Work Rights · Friendly Immigration</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2nd Outer Badge: Germany */}
                <div 
                  className="absolute cursor-pointer group"
                  style={{ bottom: 40, right: 40 }}
                >
                  <div className="counter-spin-slow-cw flex items-center justify-center w-12 h-12 rounded-full backdrop-blur-md bg-brand-blue/70 border border-brand-gold/30 shadow-lg shadow-black/40 hover:scale-110 hover:border-brand-gold hover:bg-brand-blue-light/95 transition-all duration-300">
                    <img src="https://flagcdn.com/w80/de.png" alt="Germany Flag" className="w-7 h-7 rounded-full object-cover border border-white/30 shadow-[0_0_10px_rgba(255,255,255,0.2)] select-none pointer-events-none" />
                    
                    {/* Hover Stats Card */}
                    <div className="absolute bottom-14 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 w-48">
                      <div className="bg-brand-blue-dark/95 border border-brand-gold/30 rounded-xl p-3 shadow-2xl backdrop-blur-md text-center">
                        <div className="text-xs font-bold text-white mb-1">Germany 🇩🇪</div>
                        <div className="text-[10px] text-gray-300 leading-normal">Zero Tuition Fees · Opportunity Card · Job Seeker Visas</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* --- Orbit Center: Text heading slides in from left & parks --- */}
              <div className="absolute flex items-center justify-center z-20" style={{ width: 270, height: 90 }}>
                {/* Glowing aura */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-brand-gold/10 to-transparent blur-xl logo-glow-effect pointer-events-none" />

                {/* Glass pill — slides in */}
                <div
                  className="plane-slide-in-anim plane-parked-float w-full h-full rounded-[28px] flex flex-col items-center justify-center relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(16,47,84,0.92) 0%, rgba(5,14,27,0.96) 100%)',
                    border: '1px solid rgba(212,175,55,0.3)',
                    boxShadow: '0 0 30px rgba(212,175,55,0.15), inset 0 1px 0 rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(16px)',
                  }}
                >
                  {/* Contrail */}
                  {mounted && (
                    <div
                      className="contrail-anim absolute pointer-events-none"
                      style={{
                        height: '2px',
                        background: 'linear-gradient(to left, rgba(212,175,55,0.7), transparent)',
                        right: '100%',
                        top: '50%',
                        marginTop: '-1px',
                        borderRadius: '2px',
                      }}
                    />
                  )}

                  {/* Text */}
                  <div className="relative z-10 text-center px-4 leading-tight select-none">
                    <div style={{ fontWeight: 900, fontSize: '1.05rem', letterSpacing: '0.04em', lineHeight: 1.1 }}>
                      <span style={{ color: '#C8102E' }}>iQ </span>
                      <span style={{ color: '#ffffff' }}>EDUCATION &amp;</span>
                    </div>
                    <div style={{ fontWeight: 900, fontSize: '1.05rem', letterSpacing: '0.04em', color: '#ffffff', lineHeight: 1.1 }}>
                      IMMIGRATION
                    </div>
                    <div style={{ fontStyle: 'italic', fontSize: '0.6rem', color: '#D4AF37', fontWeight: 400, marginTop: '3px', letterSpacing: '0.03em' }}>
                      a new beginning
                    </div>
                  </div>
                </div>
              </div>

              {/* --- Curved Airplane Path & Flying Airplane --- */}
              {mounted && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 15 }}>
                  {/* Dotted path crossing the orbits */}
                  <path 
                    id="airplane-route-path"
                    d="M 50 350 C 120 180, 200 120, 320 220 C 400 300, 480 320, 450 150 C 400 50, 250 80, 150 200 C 50 320, 200 450, 380 400 C 450 380, 480 300, 450 250"
                    fill="none" 
                    stroke="rgba(212,175,55,0.4)" 
                    strokeWidth="1.2" 
                    strokeDasharray="6 8" 
                  />
                  
                  {/* Invisible container moving along path carrying the airplane */}
                  <g className="airplane-path-anim" style={{ offsetPath: "path('M 50 350 C 120 180, 200 120, 320 220 C 400 300, 480 320, 450 150 C 400 50, 250 80, 150 200 C 50 320, 200 450, 380 400 C 450 380, 480 300, 450 250')" }}>
                    {/* Airplane SVG */}
                    <g transform="translate(-12, -12) rotate(45)">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        {/* Shadow plane effect */}
                        <path 
                          d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L14 19v-5.5l7 2.5z" 
                          fill="#D4AF37"
                          style={{ filter: "drop-shadow(0 0 8px rgba(212,175,55,0.9))" }}
                        />
                      </svg>
                    </g>
                  </g>
                </svg>
              )}

            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT SIDE: HERO CONTENT (Headings, Buttons, Assessment Assessment) */}
          {/* ========================================================================= */}
          <div className="col-span-1 lg:col-span-6 space-y-8 text-left order-1 lg:order-2 fade-in-up-custom">
            


            {/* Trust badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.25)", color: "#D4AF37" }}>
              <ShieldCheck className="h-4 w-4 shrink-0 text-brand-gold animate-pulse" />
              <span>Government Registered Immigration Consultants</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading text-white leading-tight">
              Orbiting Towards{" "}
              <span className="text-gradient-gold">
                Global Success
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-xl">
              As a global education and immigration network, we map your career to world-class universities and visa pathways. Experience absolute transparent guidance with a <strong className="text-white">99% success rate</strong>.
            </p>

            {/* Key stats pills */}
            <div className="flex flex-wrap gap-2.5">
              {["🏆 99% Success Rate", "⚡ Canada SDS Specialist", "🏫 150+ Global Partners", "💼 Post-Study Careers"].map((pill, i) => (
                <span key={i} className="text-xs px-3.5 py-1.5 rounded-full font-semibold text-white/85"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  {pill}
                </span>
              ))}
            </div>

            {/* Call to Actions */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/eligibility"
                className="px-8 py-4 rounded-xl font-extrabold shadow-lg text-sm uppercase tracking-wide flex items-center space-x-2 transition-all duration-300 hover:scale-[1.03] active:scale-95 hover:shadow-brand-gold/10"
                style={{ background: "linear-gradient(135deg,#F3E5AB,#D4AF37,#AA7C11)", color: "#050E1B" }}>
                <span>Assess Profile Free</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact"
                className="px-8 py-4 rounded-xl font-bold text-white text-sm flex items-center space-x-2 transition-all duration-300 hover:scale-[1.02] active:scale-95"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)" }}>
                <Phone className="h-4 w-4 text-brand-gold" />
                <span>Contact Counselors</span>
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom overlay fade */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, transparent, #F8FAFC)" }}
      />
    </section>
  );
}
