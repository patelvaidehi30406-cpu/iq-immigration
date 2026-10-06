"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function IntroAnimation({ onComplete }) {
  const [phase, setPhase] = useState("loading"); // loading → logo → tagline → exit → done
  const [particles, setParticles] = useState([]);
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  // Generate floating particles
  useEffect(() => {
    const pts = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.6 + 0.2,
      delay: Math.random() * 2,
    }));
    setParticles(pts);
  }, []);

  // Animation timeline
  useEffect(() => {
    // Check if intro was already shown in this session
    if (sessionStorage.getItem("iq_intro_shown")) {
      onComplete();
      return;
    }

    const t1 = setTimeout(() => setPhase("logo"), 300);
    const t2 = setTimeout(() => setPhase("tagline"), 1400);
    const t3 = setTimeout(() => setPhase("info"), 2400);
    const t4 = setTimeout(() => setPhase("exit"), 3600);
    const t5 = setTimeout(() => {
      sessionStorage.setItem("iq_intro_shown", "1");
      onComplete();
    }, 4400);

    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout);
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden
        transition-all duration-700
        ${phase === "exit" ? "opacity-0 scale-105" : "opacity-100 scale-100"}`}
      style={{ background: "linear-gradient(135deg, #040D1A 0%, #081B33 40%, #0C2340 70%, #1B365D 100%)" }}
    >
      {/* Animated radial glow */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          background: "radial-gradient(ellipse at center, rgba(212,175,55,0.18) 0%, transparent 65%)",
          opacity: phase === "logo" || phase === "tagline" || phase === "info" ? 1 : 0,
        }}
      />

      {/* Rotating ring */}
      <div
        className="absolute rounded-full border border-brand-gold/10 transition-all duration-1000"
        style={{
          width: "600px",
          height: "600px",
          animation: "spin 18s linear infinite",
          opacity: phase === "loading" ? 0 : 0.4,
        }}
      />
      <div
        className="absolute rounded-full border border-brand-gold/5"
        style={{
          width: "400px",
          height: "400px",
          animation: "spin 12s linear infinite reverse",
          opacity: phase === "loading" ? 0 : 0.3,
        }}
      />

      {/* Floating Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-brand-gold transition-opacity duration-1000"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: phase === "loading" ? 0 : p.opacity,
            animation: `float ${3 + p.speed * 4}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* Gold horizontal lines */}
      <div
        className="absolute left-0 right-0 transition-all duration-700"
        style={{
          top: "40%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)",
          transform: phase === "loading" ? "scaleX(0)" : "scaleX(1)",
          transition: "transform 1s ease 0.5s",
        }}
      />
      <div
        className="absolute left-0 right-0"
        style={{
          top: "60%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.2), transparent)",
          transform: phase === "loading" ? "scaleX(0)" : "scaleX(1)",
          transition: "transform 1.2s ease 0.7s",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center space-y-8 px-8 text-center">

        {/* Logo Container */}
        <div
          className="relative transition-all duration-700"
          style={{
            transform: phase === "loading" ? "scale(0.6) translateY(30px)" : "scale(1) translateY(0)",
            opacity: phase === "loading" ? 0 : 1,
          }}
        >
          {/* Glow behind logo */}
          <div
            className="absolute inset-0 rounded-2xl blur-2xl"
            style={{ background: "rgba(212,175,55,0.3)", transform: "scale(1.3)" }}
          />

          {/* Logo box */}
          <div className="relative">
            <Image
              src="/iq-logo-full-transparent.png"
              alt="IQ Education & Immigration Pvt. Ltd."
              width={320}
              height={90}
              className="object-contain brightness-0 invert drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]"
              priority
            />
          </div>
        </div>

        {/* Tagline */}
        <div
          className="transition-all duration-700 space-y-2"
          style={{
            opacity: phase === "tagline" || phase === "info" ? 1 : 0,
            transform: phase === "tagline" || phase === "info" ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <div className="flex items-center space-x-3">
            <div className="h-px w-12 bg-brand-gold/50" />
            <p className="text-brand-gold text-sm font-bold uppercase tracking-[0.3em]">
              Est. 2012 · Ahmedabad, India
            </p>
            <div className="h-px w-12 bg-brand-gold/50" />
          </div>
          <p className="text-white/70 text-base">
            Your Trusted Partner for Global Education & Immigration
          </p>
        </div>

        {/* Info pills */}
        <div
          className="flex flex-wrap justify-center gap-3 transition-all duration-700"
          style={{
            opacity: phase === "info" ? 1 : 0,
            transform: phase === "info" ? "translateY(0)" : "translateY(15px)",
          }}
        >
          {["10,000+ Visas Approved", "99% Success Rate", "12+ Years Experience", "Government Approved"].map((item, i) => (
            <span
              key={i}
              className="px-4 py-1.5 rounded-full text-xs font-bold text-brand-gold"
              style={{
                background: "rgba(212,175,55,0.1)",
                border: "1px solid rgba(212,175,55,0.3)",
                animationDelay: `${i * 0.1}s`,
              }}
            >
              ✦ {item}
            </span>
          ))}
        </div>

        {/* Loading bar */}
        <div
          className="w-48 h-0.5 rounded-full overflow-hidden transition-opacity duration-500"
          style={{
            background: "rgba(255,255,255,0.1)",
            opacity: phase === "info" ? 0 : 1,
          }}
        >
          <div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #D4AF37, #F3E5AB)",
              width: phase === "loading" ? "10%" : phase === "logo" ? "50%" : "90%",
              transition: "width 0.8s ease",
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
    </div>
  );
}
