"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { db } from "@/services/db";
import HeroAnimation from "@/components/HeroAnimation";
import PromoFlyer from "@/components/PromoFlyer";
import { 
  ArrowRight, ShieldCheck, Award, Users, BookOpen, 
  MapPin, CheckCircle2, ChevronDown, ChevronUp, Star,
  FileText, Briefcase, Globe, Clock, TrendingUp, Phone,
  GraduationCap, Building2, Plane, Scale, BadgeCheck, Zap
} from "lucide-react";

// ─── Counter animation hook ───────────────────────────────────────────────────
function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const end = parseInt(target.replace(/\D/g, "")) || 0;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

// ─── Animated stat card ───────────────────────────────────────────────────────
function StatCard({ value, label, icon: Icon, suffix = "", started }) {
  const num = useCounter(value, 2000, started);
  const rawNum = parseInt(value.replace(/\D/g, "")) || 0;
  const display = started ? `${num.toLocaleString()}${suffix}` : "0";
  return (
    <div className="glass-card p-6 rounded-2xl flex items-center space-x-4 group">
      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-brand-gold/20 to-brand-gold/5 border border-brand-gold/20 flex items-center justify-center text-brand-gold shrink-0 group-hover:scale-110 transition-transform">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-2xl sm:text-3xl font-extrabold text-brand-blue-dark">{display}</p>
        <p className="text-xs font-semibold text-brand-blue-light/70">{label}</p>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { t } = useLanguage();
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);

  // Lead Form State
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", service: "Study Abroad", message: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [activeService, setActiveService] = useState(0);

  // Intersection observer for stats counter
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    db.addLead({
      name: formData.name, email: formData.email, phone: formData.phone,
      preferredCountry: formData.service,
      type: "Quick Contact Form",
      score: `Inquiry Message: ${formData.message}`,
      status: "New"
    });

    // Send to WhatsApp
    const waMsg =
      `🚀 *Free Assessment Request — IQ Education*\n\n` +
      `👤 *Name:* ${formData.name}\n` +
      `📞 *Phone:* ${formData.phone}\n` +
      `📧 *Email:* ${formData.email}\n` +
      `🎯 *Service Interested In:* ${formData.service}\n` +
      `💬 *Message:* ${formData.message}\n\n` +
      `_Sent via IQ Education Homepage_`;
    window.open(`https://wa.me/918799072887?text=${encodeURIComponent(waMsg)}`, "_blank");

    setFormData({ name: "", email: "", phone: "", service: "Study Abroad", message: "" });
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  // ── DATA ────────────────────────────────────────────────────────────────────

  const immigrationServices = [
    {
      icon: GraduationCap,
      title: "Study Visa Guidance",
      color: "from-blue-500/20 to-blue-600/5",
      borderColor: "border-blue-400/30",
      desc: "End-to-end admission and visa filing support for top universities worldwide. We handle everything from university shortlisting to final visa stamping.",
      features: [
        "University applications & shortlisting",
        "SOP / LOR drafting assistance",
        "Scholarship & financial aid guidance",
        "Student Direct Stream (SDS) Canada",
        "IELTS / PTE preparation resources",
        "GIC & blocked account setup"
      ],
      link: "/study-abroad",
      badge: "Most Popular"
    },
    {
      icon: Briefcase,
      title: "Work Permit & LMIA",
      color: "from-emerald-500/20 to-emerald-600/5",
      borderColor: "border-emerald-400/30",
      desc: "Legal work permit processing including LMIA employer sponsorships, Express Entry profiles, and skilled worker immigration programs across Canada, UK, and Australia.",
      features: [
        "LMIA document audit & verification",
        "Express Entry CRS score optimization",
        "Employer sponsorship matching",
        "Provincial Nominee Programs (PNP)",
        "Intra-Company Transfer (ICT) visa",
        "Post-study work visa extensions"
      ],
      link: "/work-permit",
      badge: "High Demand"
    },
    {
      icon: Plane,
      title: "Visitor & Tourist Visa",
      color: "from-purple-500/20 to-purple-600/5",
      borderColor: "border-purple-400/30",
      desc: "Fast-track processing for tourist, family reunion, and business visitor visas. Our experts prepare precise documentation packages tailored to each embassy.",
      features: [
        "Complete document checklist",
        "Financial proof & bank statements",
        "Sponsorship invitation letters",
        "Business visitor visa support",
        "Family reunion applications",
        "Visa rejection appeal assistance"
      ],
      link: "/visitor-visa",
      badge: "Fast Processing"
    },
    {
      icon: Scale,
      title: "PR & Permanent Residency",
      color: "from-amber-500/20 to-amber-600/5",
      borderColor: "border-amber-400/30",
      desc: "Complete pathway planning for Canadian PR through Express Entry, PNP streams, and Atlantic Immigration Program. We maximize your CRS score for top draws.",
      features: [
        "Express Entry profile creation",
        "CRS score boosting strategies",
        "Provincial Nominee Programs",
        "Atlantic Immigration Program",
        "Family sponsorship pathways",
        "PR application submission & tracking"
      ],
      link: "/work-permit",
      badge: "New"
    },
    {
      icon: Building2,
      title: "Business & Investor Visa",
      color: "from-rose-500/20 to-rose-600/5",
      borderColor: "border-rose-400/30",
      desc: "Strategic business immigration consulting for entrepreneurs and investors looking to establish operations in Canada, UK, or Australia.",
      features: [
        "Start-Up Visa Canada program",
        "Investor immigration streams",
        "Business plan documentation",
        "Net worth & fund source verification",
        "Corporate transfer visa support",
        "Post-landing business setup advisory"
      ],
      link: "/contact",
      badge: "Premium"
    },
    {
      icon: FileText,
      title: "Document & File Audit",
      color: "from-cyan-500/20 to-cyan-600/5",
      borderColor: "border-cyan-400/30",
      desc: "Professional immigration file auditing by certified consultants. We review your entire application to ensure zero errors before embassy submission.",
      features: [
        "Pre-submission file review",
        "Biometrics & medical appointments",
        "Embassy interview coaching",
        "Rejection analysis & re-filing",
        "RCIC certified consultation",
        "Digital file management & tracking"
      ],
      link: "/eligibility",
      badge: "Expert Service"
    }
  ];

  const countries = [
    { 
      name: "Canada", flag: "🇨🇦", intake: "Sept / Jan", rate: "98%",
      programs: ["Express Entry", "SDS Student Visa", "PNP", "LMIA Work Permit"],
      color: "from-red-500/20 to-red-600/5", border: "border-red-300/20"
    },
    { 
      name: "Australia", flag: "🇦🇺", intake: "Feb / July", rate: "96%",
      programs: ["Student Visa 500", "Skilled Migration", "Working Holiday", "Partner Visa"],
      color: "from-blue-500/20 to-blue-600/5", border: "border-blue-300/20"
    },
    { 
      name: "United Kingdom", flag: "🇬🇧", intake: "Sept / Jan", rate: "97%",
      programs: ["Student Route Visa", "Skilled Worker Visa", "Graduate Route", "Business Visa"],
      color: "from-purple-500/20 to-purple-600/5", border: "border-purple-300/20"
    },
    { 
      name: "New Zealand", flag: "🇳🇿", intake: "Feb / July", rate: "95%",
      programs: ["Student Visa", "Skilled Migrant", "Working Holiday", "Family Reunion"],
      color: "from-emerald-500/20 to-emerald-600/5", border: "border-emerald-300/20"
    },
    { 
      name: "Germany", flag: "🇩🇪", intake: "Oct / April", rate: "94%",
      programs: ["Student Visa", "Opportunity Card", "EU Blue Card", "Job Seeker Visa"],
      color: "from-yellow-500/20 to-amber-600/5", border: "border-yellow-300/20"
    },
    { 
      name: "Russia", flag: "🇷🇺", intake: "Sept / Oct", rate: "93%",
      programs: ["Student Visa", "Medical Programs", "Engineering Courses", "Scholarship"],
      color: "from-cyan-500/20 to-cyan-600/5", border: "border-cyan-300/20"
    }
  ];

  const processSteps = [
    { step: "01", title: "Free Consultation", desc: "Book a free 30-min session with our certified immigration consultant. We assess your profile, goals, and eligibility.", icon: Phone },
    { step: "02", title: "Profile Evaluation", desc: "Our experts evaluate your academic background, work experience, IELTS score, and financial documents.", icon: FileText },
    { step: "03", title: "Program Selection", desc: "We identify the best visa program, country, and university based on your profile and budget.", icon: TrendingUp },
    { step: "04", title: "Document Preparation", desc: "Complete document checklist, SOP drafting, bank statement advice, and employer letter formats.", icon: BookOpen },
    { step: "05", title: "Application Submission", desc: "We file your application with the embassy or immigration authority with 100% accuracy guarantee.", icon: Zap },
    { step: "06", title: "Visa Approval & Beyond", desc: "Post-visa services including pre-departure briefing, accommodation guidance, and SIM card setup.", icon: BadgeCheck },
  ];

  const faqs = [
    {
      q: "What is an LMIA and how does it support a Canadian Work Permit?",
      a: "A Labour Market Impact Assessment (LMIA) is a document that an employer in Canada may need to get before hiring a foreign worker. A positive LMIA shows that there is a need for a foreign worker to fill the job and no Canadian worker is available to do it. Our team provides legal auditing and support to match work candidates with active, approved employers with a 98% positive LMIA rate."
    },
    {
      q: "Which country has the fastest student visa processing time?",
      a: "Canada (via Student Direct Stream / SDS) typically processes in 20 days, and the UK takes 3-6 weeks. Germany has high visa conversion but takes slightly longer due to blocked account steps. Australia processes in 4-8 weeks. We guide you according to current real-time timelines and embassy processing speeds."
    },
    {
      q: "What documents are required to prove financial eligibility?",
      a: "Generally: bank statements for the past 6 months, ITRs (3 years), FD receipts, valuation certificates, and sponsorship affidavits. For Canada SDS, a GIC of $20,635 CAD is mandatory. For UK, you need £1,334/month for 28 consecutive days. We provide a personalized country-specific checklist for every client."
    },
    {
      q: "Do you assist with IELTS or PTE preparation?",
      a: "Yes! We offer online preparation resources, diagnostic tests, and counselor evaluation reports. Our target score guidance: Canada/UK need 6.5+ IELTS, Australia needs 6.0+, Germany requires B1 German or IELTS 6.0. We partner with certified test-prep centers in Ahmedabad."
    },
    {
      q: "What is Express Entry and how does CRS score work?",
      a: "Express Entry is Canada's points-based immigration system for skilled workers. Your CRS (Comprehensive Ranking System) score is calculated based on age, education, work experience, language skills, and adaptability factors. The highest-scoring candidates receive Invitations to Apply (ITA) in regular draws. Our consultants help you maximize your CRS score legally."
    },
    {
      q: "Can I apply for PR after completing studies abroad?",
      a: "Absolutely! Most countries offer post-study work visas that lead to PR pathways. Canada's PGWP (Post-Graduate Work Permit) allows up to 3 years of work experience, which can then be used for Express Entry or PNP streams. UK's Graduate Route gives 2 years post-study. Australia's Graduate visa can lead to skilled migration."
    }
  ];

  const visaUpdates = [
    {
      title: "Canada updates proof of fund requirement for SDS students",
      date: "June 15, 2026",
      summary: "IRCC has modified the GIC requirement to secure student permits under SDS pathways. The new deposit limit is $20,635 CAD effective immediately.",
      category: "Visa Update",
      urgent: true
    },
    {
      title: "UK announces new post-study work visa options for graduates",
      date: "June 12, 2026",
      summary: "Graduates of designated master programs are eligible for extended stays under the recent Graduate Route framework adjustments.",
      category: "Immigration News",
      urgent: false
    },
    {
      title: "Germany introduces streamlined Opportunity Card rules for 2026",
      date: "June 08, 2026",
      summary: "A point-based job-seeking Opportunity Card makes it easier to work in Munich, Frankfurt, and Berlin without initial sponsorship.",
      category: "Work Permit News",
      urgent: false
    }
  ];

  const testimonials = [
    {
      name: "Amrit Patel",
      country: "Canada — Seneca College",
      visa: "Student Visa",
      review: "IQ Immigration helped me secure my Canada student visa in just 22 days via SDS! Their assessment of my IELTS profile and GIC account setup was transparent and highly professional.",
      stars: 5
    },
    {
      name: "Karan Shah",
      country: "United Kingdom — Skilled Work Permit",
      visa: "Skilled Worker Visa",
      review: "Exceptional assistance with the LMIA auditing and job sponsor support. The staff organized my interview preparation so thoroughly that my visa got approved without any delays.",
      stars: 5
    },
    {
      name: "Priya Mehta",
      country: "Australia — Melbourne University",
      visa: "Student Visa 500",
      review: "From university shortlisting to visa approval, every step was seamless. The team's knowledge of Australian immigration rules saved me from a costly rejection.",
      stars: 5
    },
    {
      name: "Rohan Desai",
      country: "Canada — Express Entry PR",
      visa: "Permanent Residency",
      review: "Got my Canadian PR within 6 months of starting with IQ Education. They boosted my CRS score by 45 points with strategic tips on education credential evaluation.",
      stars: 5
    }
  ];

  const featuredFlyer = {
    countryName: "Singapore",
    visaType: "Study Visa",
    title: "Diploma in International Hotel & Tourism Management",
    tagline: "A WORLD OF OPPORTUNITIES AWAITS YOU!",
    features: [
      {
        icon: "book",
        title: "Course Duration",
        items: ["8 Months Study", "6 Months Paid Internship"]
      },
      {
        icon: "building",
        title: "Internship In",
        items: ["5-Star Category Hotels"]
      },
      {
        icon: "wallet",
        title: "Installment",
        items: ["Payment Plan Available"]
      }
    ],
    feeStructure: {
      total: "SGD 6,250",
      installments: [
        { name: "1st Installment", amount: "SGD 3,125" },
        { name: "2nd Installment", amount: "SGD 3,125" },
        { name: "ICA Fee", amount: "SGD 45" }
      ]
    },
    keyHighlights: [
      "Study + Paid Internship Program",
      "Internship in 5-Star Hotels",
      "Installment Payment Option",
      "Ideal Program for Students Seeking International Hospitality Careers"
    ],
    bgImage: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1000&auto=format&fit=crop",
    personImage: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=800&auto=format&fit=crop",
    themeColor: "text-red-600",
    themeBg: "bg-red-600",
    themeBorder: "border-red-600",
  };

  return (
    <div className="pb-20">

      {/* ═══ HERO SECTION — Premium Animation ══════════════════════════════════ */}
      <HeroAnimation />



      {/* ═══ STATS SECTION ═════════════════════════════════════════════════════ */}
      <section ref={statsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <StatCard value="99" suffix="% Success" label={t("successRate")} icon={Award} started={statsVisible} />
          <StatCard value="10000" suffix="+" label={t("clientsGuided")} icon={Users} started={statsVisible} />
          <StatCard value="150" suffix="+" label={t("countriesPartners")} icon={Globe} started={statsVisible} />
          <StatCard value="12" suffix="+ Years" label={t("yearsExperience")} icon={ShieldCheck} started={statsVisible} />
        </div>
      </section>

      {/* ═══ FEATURED PROMO FLYER ══════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-gold animate-pulse">Hot Deal of the Month</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-blue-dark">
            Featured Immigration Program
          </h2>
          <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto">
            Take advantage of our most popular pathway this month with fast-track processing and exclusive benefits.
          </p>
        </div>
        
        <div className="transform transition-all duration-500 hover:scale-[1.01]">
          <PromoFlyer data={featuredFlyer} />
        </div>
        
        <div className="text-center mt-8">
          <Link href="/programs" className="inline-flex items-center space-x-2 bg-brand-blue-dark hover:bg-brand-blue text-white px-8 py-3 rounded-xl font-bold shadow-lg transition-transform hover:-translate-y-1">
            <span>View All Exclusive Programs</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ═══ IMMIGRATION SERVICES (Tabbed) ════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-gold">Our Immigration Expertise</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-blue-dark">
            Complete Immigration Services
          </h2>
          <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto">
            From student visas to permanent residency — we handle every step of your immigration journey with certified expertise and transparent processes.
          </p>
        </div>

        {/* Service Tab Selector */}
        <div className="flex flex-wrap justify-center gap-2">
          {immigrationServices.map((svc, i) => (
            <button key={i}
              onClick={() => setActiveService(i)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 flex items-center space-x-1.5
                ${activeService === i
                  ? "bg-brand-blue-dark text-white shadow-lg scale-105"
                  : "bg-white text-brand-blue-dark border border-brand-blue/10 hover:border-brand-gold hover:text-brand-gold"}`}>
              <svc.icon className="h-3.5 w-3.5" />
              <span>{svc.title}</span>
            </button>
          ))}
        </div>

        {/* Active Service Card */}
        <div className={`glass-card rounded-3xl p-8 sm:p-10 bg-gradient-to-br ${immigrationServices[activeService].color} border ${immigrationServices[activeService].borderColor} transition-all duration-500`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="h-14 w-14 rounded-2xl bg-brand-blue-dark/10 flex items-center justify-center">
                  {React.createElement(immigrationServices[activeService].icon, { className: "h-7 w-7 text-brand-blue-dark" })}
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-gold bg-brand-gold/10 px-2.5 py-1 rounded-full">
                    {immigrationServices[activeService].badge}
                  </span>
                  <h3 className="text-2xl font-extrabold font-heading text-brand-blue-dark mt-1">
                    {immigrationServices[activeService].title}
                  </h3>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {immigrationServices[activeService].desc}
              </p>
              <Link href={immigrationServices[activeService].link}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-brand-blue-dark text-white font-bold rounded-xl hover:bg-brand-blue text-sm transition-all hover:scale-[1.02]">
                <span>Learn More & Apply</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {immigrationServices[activeService].features.map((feat, idx) => (
                <div key={idx} className="flex items-start space-x-2.5 bg-white/60 backdrop-blur-sm p-3.5 rounded-xl border border-white/50">
                  <CheckCircle2 className="h-4 w-4 text-brand-gold shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-brand-blue-dark">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* All Services Grid (mini cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {immigrationServices.map((svc, i) => (
            <div key={i}
              onClick={() => setActiveService(i)}
              className={`glass-card p-5 rounded-2xl cursor-pointer transition-all duration-300 ${activeService === i ? "ring-2 ring-brand-gold shadow-lg" : ""}`}>
              <div className="flex items-center space-x-3 mb-3">
                <div className={`h-9 w-9 rounded-xl bg-gradient-to-br ${svc.color} flex items-center justify-center`}>
                  <svc.icon className="h-4.5 w-4.5 text-brand-blue-dark" />
                </div>
                <h4 className="font-bold text-sm text-brand-blue-dark">{svc.title}</h4>
              </div>
              <p className="text-xs text-gray-500 line-clamp-2">{svc.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ HOW IT WORKS PROCESS ══════════════════════════════════════════════ */}
      <section className="bg-gradient-premium py-24 border-y border-brand-gold/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-14">
          <div className="text-center space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-gold">Simple Process</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">How We Get Your Visa Approved</h2>
            <p className="text-sm text-gray-400 max-w-xl mx-auto">A transparent, step-by-step process with no hidden steps or surprises.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step, i) => (
              <div key={i} className="relative glass-card-dark rounded-2xl p-6 border border-white/10 hover:border-brand-gold/30 transition-all group">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <span className="text-4xl font-black text-brand-gold/20 font-heading">{step.step}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-9 w-9 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-blue-dark transition-all">
                      <step.icon className="h-4.5 w-4.5" />
                    </div>
                    <h4 className="font-bold text-white font-heading">{step.title}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 text-brand-gold/30 text-xl">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STUDY COUNTRIES ═══════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-gold">Global Destinations</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-blue-dark">Study & Work Abroad</h2>
          <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto">
            Direct partnerships with top institutions and immigration authorities in 6 major countries.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {countries.map((c, i) => (
            <div key={i} className={`glass-card p-6 rounded-2xl bg-gradient-to-br ${c.color} border ${c.border} space-y-4`}>
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{c.flag}</span>
                  <div>
                    <h3 className="text-base font-bold text-brand-blue-dark">{c.name}</h3>
                    <p className="text-xs text-gray-500">Intakes: {c.intake}</p>
                  </div>
                </div>
                <span className="text-[10px] font-extrabold bg-brand-gold/15 text-brand-gold-dark px-2.5 py-1 rounded-full">
                  {c.rate} Success
                </span>
              </div>
              <div className="space-y-1.5">
                {c.programs.map((p, j) => (
                  <div key={j} className="flex items-center space-x-2 text-xs text-gray-600">
                    <CheckCircle2 className="h-3.5 w-3.5 text-brand-gold shrink-0" />
                    <span>{p}</span>
                  </div>
                ))}
              </div>
              <Link href={`/study-abroad?country=${c.name.toLowerCase()}`}
                className="block w-full py-2.5 text-center text-xs font-bold text-brand-blue-dark border border-brand-blue-dark/15 hover:border-brand-gold hover:text-brand-gold rounded-xl transition-all">
                Explore {c.name} Options →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ TESTIMONIALS ══════════════════════════════════════════════════════ */}
      <section className="bg-brand-blue/5 py-24 border-y border-brand-blue-light/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-gold">Success Stories</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-blue-dark">{t("sectionTestimonials")}</h2>
            <p className="text-sm text-gray-500">Real clients, real approvals. Here's what they say about IQ Education.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((review, idx) => (
              <div key={idx} className="glass-card p-8 rounded-2xl text-left space-y-4 relative overflow-hidden">
                <div className="absolute top-4 right-4 text-6xl text-brand-gold/10 font-serif leading-none">"</div>
                <div className="flex space-x-1">
                  {[...Array(review.stars)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-brand-gold fill-current" />
                  ))}
                </div>
                <p className="text-sm italic text-gray-600 leading-relaxed relative z-10">"{review.review}"</p>
                <div className="flex items-center space-x-3 pt-2 border-t border-brand-blue/5">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-brand-gold/30 to-brand-blue/20 flex items-center justify-center font-bold text-brand-blue-dark text-sm">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-brand-blue-dark">{review.name}</h4>
                    <p className="text-[10px] text-brand-gold-dark font-semibold">{review.country}</p>
                    <span className="text-[9px] text-gray-400 uppercase font-bold">{review.visa}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/success-stories"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl border border-brand-blue/15 text-brand-blue-dark font-bold text-sm hover:border-brand-gold hover:text-brand-gold transition-all">
              <span>View All 10,000+ Success Stories</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ VISA UPDATES / NEWS ═══════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-12">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-gold">Live Immigration Hub</span>
            <h2 className="text-3xl font-extrabold font-heading text-brand-blue-dark">{t("sectionUpdates")}</h2>
          </div>
          <Link href="/blog" className="text-xs font-bold text-brand-blue-dark hover:text-brand-gold uppercase tracking-wider flex items-center space-x-1 shrink-0">
            <span>View all articles</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visaUpdates.map((update, i) => (
            <div key={i} className="glass-card p-6 rounded-2xl flex flex-col justify-between bg-white relative overflow-hidden">
              {update.urgent && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 to-red-600" />
              )}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded ${update.urgent ? "bg-red-50 text-red-600" : "bg-brand-gold/10 text-brand-gold-dark"}`}>
                    {update.urgent && "🔴 "}{update.category}
                  </span>
                  <span className="text-[10px] font-semibold text-gray-400 flex items-center space-x-1">
                    <Clock className="h-3 w-3" /><span>{update.date}</span>
                  </span>
                </div>
                <h3 className="font-bold text-sm sm:text-base text-brand-blue-dark hover:text-brand-gold transition-colors font-heading leading-snug">
                  <Link href="/blog">{update.title}</Link>
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">{update.summary}</p>
              </div>
              <div className="pt-4 border-t border-brand-blue/5 mt-4">
                <Link href="/blog" className="text-xs font-bold text-brand-blue-dark hover:text-brand-gold inline-flex items-center space-x-1">
                  <span>Read full update</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ FAQ ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-brand-blue/5 py-24 border-y border-brand-blue-light/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Header */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="h-5 w-5 rounded-full bg-brand-gold flex items-center justify-center">
                <ArrowRight className="h-3 w-3 text-white" />
              </span>
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand-gold">FAQs</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-blue-dark leading-tight max-w-2xl">
              {t("sectionFAQ")}
            </h2>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

            {/* Left — Accordion FAQs */}
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className={`bg-white rounded-2xl overflow-hidden shadow-sm border transition-all duration-300 ${openFaq === i ? "border-brand-gold/40 ring-1 ring-brand-gold/20" : "border-gray-100"}`}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex justify-between items-center text-left p-5 text-brand-blue-dark font-bold font-heading text-sm sm:text-base focus:outline-none group">
                    <span className="pr-4 leading-snug">{faq.q}</span>
                    <span className={`h-7 w-7 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-300 ${openFaq === i ? "bg-brand-gold text-white rotate-180" : "bg-brand-gold/10 text-brand-gold"}`}>
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 pt-1 border-t border-gray-100 text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right — Image + CTA Card */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-full min-h-[480px] lg:min-h-0">
              {/* Passport / Immigration Image */}
              <img
                src="/passport.jpg"
                alt="Immigration passport and documents"
                className="w-full h-full object-cover absolute inset-0"
                style={{ minHeight: "480px" }}
              />
              {/* Dark overlay at top */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/50" />

              {/* "Need More Answers" CTA at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-xl border border-gray-100 gap-4">
                  <div>
                    <p className="font-bold text-brand-blue-dark text-sm sm:text-base">Need More Answers?</p>
                    <p className="text-xs text-gray-500 mt-0.5">Talk to our certified immigration expert</p>
                  </div>
                  <Link href="/contact"
                    className="flex-shrink-0 inline-flex items-center space-x-2 bg-brand-gold hover:bg-brand-gold/90 text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all hover:scale-105 shadow-md whitespace-nowrap">
                    <span>Contact Us</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══ CONTACT FORM ══════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="glass-card p-8 sm:p-12 rounded-3xl bg-gradient-premium border border-brand-gold/20 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(212,175,55,0.1),transparent_40%)]" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-block">
                  {/* iQ text — original brand colors without icon */}
                  <div className="flex items-center gap-2.5">
                    <div className="flex flex-col leading-none">
                      <span style={{ fontWeight: 800, fontSize: '0.72rem', letterSpacing: '0.04em', lineHeight: 1.15 }}>
                        <span style={{ color: '#C8102E' }}>iQ </span>
                        <span style={{ color: '#ffffff' }}>EDUCATION &amp;</span>
                      </span>
                      <span style={{ fontWeight: 800, fontSize: '0.72rem', letterSpacing: '0.04em', lineHeight: 1.15, color: '#ffffff' }}>
                        IMMIGRATION PVT. LTD.
                      </span>
                      <span style={{ fontStyle: 'italic', fontSize: '0.55rem', color: '#C8102E', fontWeight: 400, letterSpacing: '0.02em', lineHeight: 1.4 }}>
                        a new beginning
                      </span>
                    </div>
                  </div>
                </div>
              <h2 className="text-3xl font-black font-heading text-brand-gold leading-none">Start Your Immigration Journey</h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                Connect with our RCIC certified immigration consultants for a private profile assessment. We will analyze your eligibility and recommend the best visa program for your goals.
              </p>
              <div className="space-y-3 text-xs sm:text-sm text-gray-300">
                {[
                  "RCIC certified under ICCRC / IRCC rules",
                  "Confidential and legal file verification",
                  "Dedicated counselor — WhatsApp & call support",
                  "Free reassessment if visa gets delayed"
                ].map((point, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-gold shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-xl border border-brand-gold/20 bg-brand-gold/5">
                <p className="text-xs font-bold text-brand-gold mb-1">📍 Office Address</p>
                <p className="text-xs text-gray-400">613, Accolade 2, Opp. Shell Petrol Pump, Nr Science City, Sola Road, Ahmedabad — 380060</p>
                <p className="text-xs text-gray-400 mt-1">📞 +91 87990 72887</p>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white/5 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/10 shadow-xl">
              {formSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="h-16 w-16 bg-brand-gold/25 rounded-full flex items-center justify-center mx-auto text-brand-gold border border-brand-gold/30">
                    <ShieldCheck className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold font-heading text-brand-gold">Assessment Scheduled!</h3>
                  <p className="text-xs text-gray-300 max-w-sm mx-auto">
                    Our counselor will contact you within 2 business hours via call & WhatsApp.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <h3 className="font-bold text-brand-gold font-heading mb-2">Book Free Consultation</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-300 uppercase tracking-wide">{t("formName")}</label>
                      <input type="text" required placeholder="Your Full Name" value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-brand-gold text-sm text-white placeholder-gray-500" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-300 uppercase tracking-wide">{t("formPhone")}</label>
                      <input type="tel" required placeholder="+91 99999 88888" value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-brand-gold text-sm text-white placeholder-gray-500" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-300 uppercase tracking-wide">{t("formEmail")}</label>
                    <input type="email" required placeholder="your@email.com" value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-brand-gold text-sm text-white placeholder-gray-500" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-300 uppercase tracking-wide">Preferred Service</label>
                      <select value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-2.5 bg-brand-blue-dark border border-white/10 rounded-xl focus:outline-none focus:border-brand-gold text-sm text-white">
                        <option value="Study Abroad">Study Abroad Visa</option>
                        <option value="Work Permit">Work Permit / LMIA</option>
                        <option value="Visitor Visa">Visitor / Tourist Visa</option>
                        <option value="PR">Permanent Residency</option>
                        <option value="Business Visa">Business Investor Visa</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-300 uppercase tracking-wide">Preferred Country</label>
                      <select className="w-full px-4 py-2.5 bg-brand-blue-dark border border-white/10 rounded-xl focus:outline-none focus:border-brand-gold text-sm text-white">
                        <option>Canada</option>
                        <option>Australia</option>
                        <option>United Kingdom</option>
                        <option>New Zealand</option>
                        <option>Germany</option>
                        <option>Russia</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-300 uppercase tracking-wide">{t("formMessage")}</label>
                    <textarea rows="3" placeholder="Tell us about your profile, IELTS score, education, and goals..." value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-brand-gold text-sm text-white placeholder-gray-500 resize-none" />
                  </div>
                  <button type="submit"
                    className="w-full py-4 bg-gradient-gold text-brand-blue-dark font-extrabold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.01] active:scale-95 text-sm uppercase tracking-wider">
                    🚀 Request Free Assessment Now
                  </button>
                  <p className="text-center text-[10px] text-gray-400">100% confidential · No spam · Reply within 2 hours</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WORK/STUDY/TOURIST VISA QUICK ASSESSMENTS ═══════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-12">
        <div className="text-center mb-8">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-gold">Interactive Tools</span>
          <h2 className="text-3xl font-extrabold font-heading text-brand-blue-dark">Check Your Eligibility</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: General Assessment */}
          <div className="glass-card p-8 rounded-3xl border border-gray-100 flex flex-col justify-between hover:border-brand-gold/30">
            <div>
              <span className="text-xs font-bold text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full uppercase tracking-wider">
                Full Profile Evaluation
              </span>
              <h3 className="text-2xl font-black text-brand-blue-dark mt-4 font-heading">
                Immigration Assessment Form
              </h3>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                Applying for a Student Visa, LMIA Work Permit, or Visitor Visa? Tell us about your background, goals, and family to get a direct callback from our registered consultants.
              </p>
            </div>
            <div className="pt-6">
              <Link href="/assessment" className="inline-flex items-center space-x-2 bg-brand-blue-dark hover:bg-brand-blue text-white px-6 py-3 rounded-xl font-bold shadow-md transition-transform hover:scale-105">
                <span>GET STARTED</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Card 2: CRS Score Calculator */}
          <div className="glass-card p-8 rounded-3xl border border-gray-100 flex flex-col justify-between hover:border-brand-gold/30">
            <div>
              <span className="text-xs font-bold text-[#EAB308] bg-yellow-500/10 px-3 py-1 rounded-full uppercase tracking-wider">
                Express Entry Tool
              </span>
              <h3 className="text-2xl font-black text-brand-blue-dark mt-4 font-heading">
                Canada CRS Score Calculator
              </h3>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                Instantly estimate your Canada Comprehensive Ranking System (CRS) score for Express Entry draws. Use our interactive sliders to test age, education, and language bands.
              </p>
            </div>
            <div className="pt-6">
              <Link href="/crs-calculator" className="inline-flex items-center space-x-2 bg-gradient-gold hover:shadow-lg hover:shadow-brand-gold/20 text-[#081B33] px-6 py-3 rounded-xl font-bold transition-transform hover:scale-105">
                <span>CALCULATE CRS POINTS</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TRENDING COURSES WORLDWIDE ════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="h-5 w-5 rounded-full bg-brand-gold flex items-center justify-center">
                <ArrowRight className="h-3 w-3 text-white" />
              </span>
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand-gold">Step by Step</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-blue-dark leading-tight">
              Trending Courses Worldwide
            </h2>
          </div>
          <Link href="/study-abroad"
            className="flex-shrink-0 inline-flex items-center space-x-2 bg-brand-gold hover:bg-brand-gold/90 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all hover:scale-105 shadow-md">
            <span>Learn More</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 4-Column Course Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Card 01 — Engineering */}
          <div className="group relative rounded-3xl overflow-hidden p-7 flex flex-col justify-between min-h-[380px] cursor-pointer hover:-translate-y-2 transition-all duration-500 shadow-xl hover:shadow-2xl"
            style={{ background: "linear-gradient(160deg, #e8524a 0%, #c0392b 30%, #1a2a4a 100%)" }}>
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-4xl font-black text-white/30 font-heading">01.</span>
                <span className="h-12 w-12 rounded-full border-2 border-white/40 flex items-center justify-center bg-white/10 backdrop-blur-sm group-hover:border-white/70 transition-all">
                  <GraduationCap className="h-5 w-5 text-white" />
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-white font-heading mb-3">Engineering</h3>
              <p className="text-xs text-white/75 leading-relaxed">
                Shape the future with globally recognized Engineering programs across top destinations. We guide students in choosing the right specialization such as Mechanical Engineering, Civil Engineering, Electrical Engineering, Computer Engineering, Automotive Engineering, Robotics, and more.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/20">
              <Link href="/study-abroad" className="text-xs font-bold text-white/80 hover:text-white flex items-center space-x-1 transition-colors">
                <span>Explore Programs</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            {/* Subtle glow overlay on hover */}
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-500 rounded-3xl" />
          </div>

          {/* Card 02 — Health Sciences */}
          <div className="group relative rounded-3xl overflow-hidden p-7 flex flex-col justify-between min-h-[380px] cursor-pointer hover:-translate-y-2 transition-all duration-500 shadow-xl hover:shadow-2xl"
            style={{ background: "linear-gradient(160deg, #d64f6e 0%, #b03060 30%, #1a2a4a 100%)" }}>
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-4xl font-black text-white/30 font-heading">02.</span>
                <span className="h-12 w-12 rounded-full border-2 border-white/40 flex items-center justify-center bg-white/10 backdrop-blur-sm group-hover:border-white/70 transition-all">
                  <BookOpen className="h-5 w-5 text-white" />
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-white font-heading mb-3">Health Sciences</h3>
              <p className="text-xs text-white/75 leading-relaxed">
                Build a rewarding global career in healthcare with programs in Nursing, Public Health, Biotechnology, Pharmacy, Medical Laboratory Technology, and other allied health sciences. We help you select institutions that offer quality education, practical exposure, and strong placement opportunities worldwide.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/20">
              <Link href="/study-abroad" className="text-xs font-bold text-white/80 hover:text-white flex items-center space-x-1 transition-colors">
                <span>Explore Programs</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-500 rounded-3xl" />
          </div>

          {/* Card 03 — AI & Technology */}
          <div className="group relative rounded-3xl overflow-hidden p-7 flex flex-col justify-between min-h-[380px] cursor-pointer hover:-translate-y-2 transition-all duration-500 shadow-xl hover:shadow-2xl"
            style={{ background: "linear-gradient(160deg, #c0392b 0%, #922b21 30%, #1a2a4a 100%)" }}>
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-4xl font-black text-white/30 font-heading">03.</span>
                <span className="h-12 w-12 rounded-full border-2 border-white/40 flex items-center justify-center bg-white/10 backdrop-blur-sm group-hover:border-white/70 transition-all">
                  <TrendingUp className="h-5 w-5 text-white" />
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-white font-heading mb-3">Artificial Intelligence &amp; Technology</h3>
              <p className="text-xs text-white/75 leading-relaxed">
                Stay ahead in the digital era with advanced programs in Artificial Intelligence, Data Science, Cybersecurity, Information Technology, Cloud Computing, and Software Development. We assist you in finding innovation-driven universities that prepare you for future-ready careers in global tech industries.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/20">
              <Link href="/study-abroad" className="text-xs font-bold text-white/80 hover:text-white flex items-center space-x-1 transition-colors">
                <span>Explore Programs</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-500 rounded-3xl" />
          </div>

          {/* Card 04 — Business & Management */}
          <div className="group relative rounded-3xl overflow-hidden p-7 flex flex-col justify-between min-h-[380px] cursor-pointer hover:-translate-y-2 transition-all duration-500 shadow-xl hover:shadow-2xl"
            style={{ background: "linear-gradient(160deg, #b03a2e 0%, #1f618d 60%, #1a2a4a 100%)" }}>
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-4xl font-black text-white/30 font-heading">04.</span>
                <span className="h-12 w-12 rounded-full border-2 border-white/40 flex items-center justify-center bg-white/10 backdrop-blur-sm group-hover:border-white/70 transition-all">
                  <Briefcase className="h-5 w-5 text-white" />
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-white font-heading mb-3">Business &amp; Management</h3>
              <p className="text-xs text-white/75 leading-relaxed">
                Develop leadership and strategic expertise through internationally recognized Business programs including BBA, MBA, Finance, Marketing, Human Resource Management, International Business, and Supply Chain Management. We help you choose programs that align with your career ambitions and global opportunities.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/20">
              <Link href="/study-abroad" className="text-xs font-bold text-white/80 hover:text-white flex items-center space-x-1 transition-colors">
                <span>Explore Programs</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-500 rounded-3xl" />
          </div>

        </div>
      </section>

    </div>
  );
}
