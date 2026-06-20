"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { db } from "../services/db";
import { 
  ArrowRight, ShieldCheck, Award, Users, BookOpen, 
  MapPin, CheckCircle2, ChevronDown, ChevronUp, Bell, Star
} from "lucide-react";

export default function HomePage() {
  const { t } = useLanguage();
  
  // Lead Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Study Abroad",
    message: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    db.addLead({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      preferredCountry: formData.service,
      type: "Quick Contact Form",
      score: `Inquiry Message: ${formData.message}`,
      status: "New"
    });
    setFormData({ name: "", email: "", phone: "", service: "Study Abroad", message: "" });
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  const services = [
    {
      title: "Study Abroad Program",
      desc: "Get admission in top-tier accredited colleges and universities globally. Complete guidance from admissions to visa filing.",
      features: ["University applications", "Scholarship support", "Statement of Purpose check"],
      link: "/study-abroad"
    },
    {
      title: "Work Permits & LMIA",
      desc: "Legal work permit applications, employer-sponsored visas, and verification of LMIA job offers across multiple sectors.",
      features: ["LMIA documentation check", "Skilled worker registration", "Express Entry profile"],
      link: "/work-permit"
    },
    {
      title: "Visitor & Tourist Visa",
      desc: "Fast processing for tourist visits, family reunions, and international business meetings with precise documents preparation.",
      features: ["Detailed checklist", "Sponsorship invite layouts", "Financial proofs advisor"],
      link: "/visitor-visa"
    }
  ];

  const countries = [
    { name: "Canada", code: "CA", intake: "Sept / Jan", rate: "98% Success", color: "from-red-500/20 to-red-600/5" },
    { name: "Australia", code: "AU", intake: "Feb / July", rate: "96% Success", color: "from-blue-500/20 to-blue-600/5" },
    { name: "United Kingdom", code: "GB", intake: "Sept / Jan", rate: "97% Success", color: "from-purple-500/20 to-purple-600/5" },
    { name: "New Zealand", code: "NZ", intake: "Feb / July", rate: "95% Success", color: "from-emerald-500/20 to-emerald-600/5" },
    { name: "Germany", code: "DE", intake: "Oct / April", rate: "94% Success", color: "from-yellow-500/20 to-amber-600/5" },
    { name: "Russia", code: "RU", intake: "Sept / Oct", rate: "93% Success", color: "from-cyan-500/20 to-cyan-600/5" }
  ];

  const faqs = [
    {
      q: "What is an LMIA and how does it support a Canadian Work Permit?",
      a: "A Labour Market Impact Assessment (LMIA) is a document that an employer in Canada may need to get before hiring a foreign worker. A positive LMIA shows that there is a need for a foreign worker to fill the job and no Canadian worker or permanent resident is available to do it. Our team provides legal auditing and support to match work candidates with active, approved employers."
    },
    {
      q: "Which country has the fastest student visa processing time?",
      a: "Canada (via Student Direct Stream / SDS) and the UK generally offer quick student visa processing times, ranging between 3 to 6 weeks. Germany has high visa conversion but takes slightly longer due to blocking account steps. We guide you according to up-to-date timelines."
    },
    {
      q: "What documents are required to prove financial eligibility?",
      a: "Generally, you need bank statements for the past 6 months, sponsorship affidavits, proof of tax filings (ITRs), fixed deposit receipts, and valuation certificates. For Canada, a GIC (Guaranteed Investment Certificate) of $20,635 CAD is mandatory for student visas."
    },
    {
      q: "Do you assist with IELTS or PTE preparation?",
      a: "Yes! We offer online preparation resources, diagnostic tests, and counselor evaluation reports to help you score the required band (6.5+ for Canada/UK, 6.0+ for other regions) before filing your visa application."
    }
  ];

  const visaUpdates = [
    {
      title: "Canada updates proof of fund requirement for SDS students",
      date: "June 15, 2026",
      summary: "IRCC has modified the GIC requirement to secure student permits under SDS pathways. Learn about the new deposit limits.",
      category: "Visa Update"
    },
    {
      title: "UK announces new post-study work visa options for graduates",
      date: "June 12, 2026",
      summary: "Graduates of designated master programs are eligible for extended stays under the recent legal framework adjustments.",
      category: "Immigration News"
    },
    {
      title: "Germany introduces streamlined Opportunity Card rules for 2026",
      date: "June 08, 2026",
      summary: "A point-based job-seeking Opportunity Card makes it easier to work in Munich, Frankfurt, and Berlin without initial sponsorship.",
      category: "Work Permit News"
    }
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-20 pb-28 md:py-36 bg-gradient-premium border-b border-brand-gold/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.15),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Info */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center space-x-2 bg-white/5 border border-brand-gold/20 px-3 py-1 rounded-full text-xs font-bold text-brand-gold uppercase tracking-wider">
                <ShieldCheck className="h-4 w-4" />
                <span>Government Approved Visa Advisory</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading text-white tracking-tight leading-tight">
                {t("heroTitle")} <br />
                <span className="text-gradient-gold font-extrabold">{t("heroSubTitle")}</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-300 max-w-xl leading-relaxed">
                {t("heroDesc")}
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/eligibility"
                  className="px-6 py-3.5 rounded-xl bg-gradient-gold text-brand-blue-dark font-extrabold shadow-lg hover:shadow-brand-gold/20 transition-all duration-300 hover:scale-[1.02] active:scale-95 text-sm uppercase tracking-wide flex items-center space-x-2"
                >
                  <span>{t("ctaCheckEligibility")}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold border border-white/20 transition-all hover:scale-[1.02] active:scale-95 text-sm"
                >
                  {t("ctaFreeConsultation")}
                </Link>
              </div>
            </div>

            {/* Hero Right Widget (Quick assessment visual or trust graphic) */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-gold opacity-30 blur-lg animate-pulse-slow" />
              <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-2xl text-white space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <h3 className="font-bold font-heading text-lg text-brand-gold">
                    Instant Assessment
                  </h3>
                  <span className="text-xs px-2 py-1 bg-green-500/25 text-green-400 rounded-full font-bold">
                    Online
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-lg border border-white/5">
                    <div className="h-8 w-8 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold font-bold text-xs">
                      1
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-200">Select preferred destination</p>
                      <p className="text-[10px] text-gray-400">Canada, UK, Australia, Germany...</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-lg border border-white/5">
                    <div className="h-8 w-8 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold font-bold text-xs">
                      2
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-200">Fill academic / job stats</p>
                      <p className="text-[10px] text-gray-400">IELTS Bands, work years, education level</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-lg border border-white/5">
                    <div className="h-8 w-8 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold font-bold text-xs">
                      3
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-200">Get Qualified Instantly</p>
                      <p className="text-[10px] text-gray-400">Review score results and submit file to CRM</p>
                    </div>
                  </div>
                </div>

                <Link
                  href="/eligibility"
                  className="block w-full py-3 text-center bg-gradient-gold text-brand-blue-dark font-extrabold rounded-xl hover:shadow-lg text-xs uppercase tracking-wider"
                >
                  Start Eligibility Check Now
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { value: "99%", label: t("successRate"), icon: Award },
            { value: "10,000+", label: t("clientsGuided"), icon: Users },
            { value: "150+", label: t("countriesPartners"), icon: BookOpen },
            { value: "12+", label: t("yearsExperience"), icon: ShieldCheck }
          ].map((stat, i) => (
            <div key={i} className="glass-card p-6 rounded-2xl flex items-center space-x-4">
              <div className="h-12 w-12 rounded-xl bg-brand-blue/5 border border-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0">
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-brand-blue-dark">{stat.value}</p>
                <p className="text-xs font-semibold text-brand-blue-light/70">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        <div className="space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-gold">Our Expertise</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-blue-dark">
            {t("sectionServices")}
          </h2>
          <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto">
            Comprehensive immigration counseling, administrative file audit, and legal representational services under one roof.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div key={i} className="glass-card p-8 rounded-2xl text-left flex flex-col justify-between h-full">
              <div className="space-y-6">
                <h3 className="text-xl font-bold font-heading text-brand-blue-dark border-b border-brand-blue/5 pb-4">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {service.desc}
                </p>
                <ul className="space-y-3">
                  {service.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-xs font-semibold text-brand-blue-light">
                      <CheckCircle2 className="h-4 w-4 text-brand-gold shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-8">
                <Link
                  href={service.link}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-brand-gold uppercase tracking-wider hover:text-brand-gold-dark transition-colors"
                >
                  <span>Learn details</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. COUNTRY SELECTION */}
      <section className="bg-brand-blue/5 py-24 border-y border-brand-blue-light/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-center">
          <div className="space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-gold">Global Placements</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-blue-dark">
              {t("sectionCountries")}
            </h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto">
              Choose your ideal pathway. We have direct tie-ups with leading educational institutes and legal authorities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {countries.map((c, i) => (
              <div key={i} className={`glass-card p-6 rounded-2xl text-left bg-gradient-to-br ${c.color} border border-brand-blue-light/10`}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-brand-blue-dark">{c.name}</h3>
                    <p className="text-xs text-gray-500">Intakes: {c.intake}</p>
                  </div>
                  <span className="text-[10px] font-extrabold bg-brand-gold/15 text-brand-gold-dark px-2.5 py-1 rounded-full">
                    {c.rate}
                  </span>
                </div>
                <Link
                  href={`/study-abroad?country=${c.name.toLowerCase()}`}
                  className="mt-4 w-full py-2.5 text-center block text-xs font-bold text-brand-blue-dark border border-brand-blue-dark/15 hover:border-brand-gold hover:text-brand-gold rounded-xl transition-all"
                >
                  View Details &amp; Criteria
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SUCCESS STORIES FEED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        <div className="space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-gold">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-blue-dark">
            {t("sectionTestimonials")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              name: "Amrit Patel",
              country: "Canada (Seneca College)",
              review: "IQ Immigration helped me secure my Canada student visa in just 22 days! Their assessment of my IELTS profile and block account layout was transparent and highly professional.",
              stars: 5
            },
            {
              name: "Karan Shah",
              country: "United Kingdom (Skilled Work Permit)",
              review: "Exceptional assistance with the LMIA auditing and job sponsor support. The staff organized my interview preparation steps so that my visa got approved without any delays.",
              stars: 5
            }
          ].map((t, idx) => (
            <div key={idx} className="glass-card p-8 rounded-2xl text-left space-y-4">
              <div className="flex space-x-1">
                {[...Array(t.stars)].map((_, i) => (
                  <Star key={i} className="h-4.5 w-4.5 text-brand-gold fill-current" />
                ))}
              </div>
              <p className="text-sm italic text-gray-600 leading-relaxed">
                "{t.review}"
              </p>
              <div>
                <h4 className="font-bold text-sm text-brand-blue-dark">{t.name}</h4>
                <p className="text-[10px] uppercase font-semibold text-brand-gold-dark">{t.country}</p>
              </div>
            </div>
          ))}
        </div>
        
        <Link
          href="/success-stories"
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-brand-blue-dark hover:text-brand-gold transition-colors"
        >
          <span>View all visa approvals</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </section>

      {/* 6. LATEST BLOG / VISA NEWS */}
      <section className="bg-brand-blue/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
            <div className="space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand-gold">Immigration Hub</span>
              <h2 className="text-3xl font-extrabold font-heading text-brand-blue-dark">
                {t("sectionUpdates")}
              </h2>
            </div>
            <Link
              href="/blog"
              className="text-xs font-bold text-brand-blue-dark hover:text-brand-gold uppercase tracking-wider flex items-center space-x-1 shrink-0"
            >
              <span>View all articles</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {visaUpdates.map((update, i) => (
              <div key={i} className="glass-card p-6 rounded-2xl flex flex-col justify-between h-full bg-white">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-extrabold text-brand-gold uppercase tracking-wider bg-brand-gold/10 px-2 py-0.5 rounded">
                      {update.category}
                    </span>
                    <span className="text-[10px] font-semibold text-gray-400">{update.date}</span>
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-brand-blue-dark hover:text-brand-gold transition-colors font-heading leading-snug">
                    <Link href="/blog">{update.title}</Link>
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 line-clamp-3">
                    {update.summary}
                  </p>
                </div>
                <div className="pt-6 border-t border-brand-blue/5 mt-4">
                  <Link
                    href="/blog"
                    className="text-xs font-bold text-brand-blue-dark hover:text-brand-gold inline-flex items-center space-x-1"
                  >
                    <span>Read article</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-gold">Get Answers</span>
          <h2 className="text-3xl font-extrabold font-heading text-brand-blue-dark">
            {t("sectionFAQ")}
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="glass-card p-5 rounded-2xl transition-all">
              <button
                onClick={() => toggleFaq(i)}
                className="w-full flex justify-between items-center text-left text-brand-blue-dark font-bold font-heading text-sm sm:text-base focus:outline-none"
              >
                <span>{faq.q}</span>
                {openFaq === i ? (
                  <ChevronUp className="h-5 w-5 text-brand-gold shrink-0 ml-4" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-brand-gold shrink-0 ml-4" />
                )}
              </button>
              {openFaq === i && (
                <div className="mt-4 pt-4 border-t border-brand-blue/5 text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 8. CONTACT FORM & LEAD GENERATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-8 sm:p-12 rounded-3xl bg-gradient-premium border border-brand-gold/20 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(212,175,55,0.1),transparent_40%)]" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
            {/* Form Info */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-3xl font-black font-heading text-brand-gold leading-none">
                Start Your Journey
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                Connect with our certified legal immigration consultants for a private profile assessment. We will walk you through your eligibility stats and help select the correct program paths.
              </p>
              <div className="space-y-3 text-xs sm:text-sm text-gray-300">
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-gold shrink-0" />
                  <span>Licensed under ICCRC / IRCC rules</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-gold shrink-0" />
                  <span>Confidential and legal file verification</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-gold shrink-0" />
                  <span>Dedicated counselor support</span>
                </div>
              </div>
            </div>

            {/* Form Inputs */}
            <div className="lg:col-span-7 bg-white/5 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/10 shadow-xl">
              {formSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="h-16 w-16 bg-brand-gold/25 rounded-full flex items-center justify-center mx-auto text-brand-gold border border-brand-gold/30">
                    <ShieldCheck className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold font-heading text-brand-gold">Assessment Scheduled!</h3>
                  <p className="text-xs text-gray-300 max-w-sm mx-auto">
                    Thank you. We have saved your lead details in the CRM. One of our counselors will contact you within 2 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-300 uppercase tracking-wide">
                        {t("formName")}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-brand-gold text-xs sm:text-sm text-white placeholder-gray-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-300 uppercase tracking-wide">
                        {t("formEmail")}
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-brand-gold text-xs sm:text-sm text-white placeholder-gray-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-300 uppercase tracking-wide">
                        {t("formPhone")}
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 99999 88888"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-brand-gold text-xs sm:text-sm text-white placeholder-gray-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-300 uppercase tracking-wide">
                        Preferred Service
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-2.5 bg-brand-blue-dark border border-white/10 rounded-xl focus:outline-none focus:border-brand-gold text-xs sm:text-sm text-white"
                      >
                        <option value="Study Abroad">Study Abroad Guidance</option>
                        <option value="Work Permit">Work Permit / LMIA</option>
                        <option value="Visitor Visa">Visitor / Tourist Visa</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-300 uppercase tracking-wide">
                      {t("formMessage")}
                    </label>
                    <textarea
                      rows="3"
                      placeholder="Share details of your profile or preferred intake..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-brand-gold text-xs sm:text-sm text-white placeholder-gray-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-gold text-brand-blue-dark font-extrabold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.01] active:scale-95 text-xs sm:text-sm uppercase tracking-wider"
                  >
                    Request Free Assessment
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
