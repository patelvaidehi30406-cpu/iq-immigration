"use client";

import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { Star, ShieldCheck, Heart, Play, Eye, Filter } from "lucide-react";

export default function SuccessStoriesPage() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState("all");

  const approvals = [
    {
      id: 1,
      name: "Sandeep Patel",
      country: "Canada",
      flag: "🇨🇦",
      type: "Study Permit (Seneca College)",
      review: "The SDS student permit process was seamless. IQ Education helped draft my SOP and prepared my medical audit. The file was approved in 18 days!",
      date: "June 2026",
      caseId: "IQ-CAN-9821"
    },
    {
      id: 2,
      name: "Priyanka Sharma",
      country: "United Kingdom",
      flag: "🇬🇧",
      type: "Skilled Worker Visa (NHS Trust)",
      review: "Outstanding support for NHS Certificate of Sponsorship (CoS). Their visa attorney reviewed my application line-by-line, and I got my stamping without any hassle.",
      date: "May 2026",
      caseId: "IQ-UK-3312"
    },
    {
      id: 3,
      name: "Mehul Rathod",
      country: "Australia",
      flag: "🇦🇺",
      type: "Skilled Nominated (Subclass 190)",
      review: "Very professional team. They managed my ACS skills assessment and lodged my EOI state sponsorship. Got my visa approval notification this morning!",
      date: "June 2026",
      caseId: "IQ-AUS-4412"
    },
    {
      id: 4,
      name: "Dharmesh Amin",
      country: "Germany",
      flag: "🇩🇪",
      type: "Opportunity Job Seeker Card",
      review: "I applied for the German Opportunity Card under point-based guidelines. The team organized my qualifications assessment and blocked account setup. Truly grateful.",
      date: "April 2026",
      caseId: "IQ-GER-1090"
    },
    {
      id: 5,
      name: "Nancy Christian",
      country: "Canada",
      flag: "🇨🇦",
      type: "Visitor Visa (Family Reunion)",
      review: "Highly recommend their visitor visa desk. They helped draft the sponsorship invite letter for my parents. Both received their 10-year multiple visas.",
      date: "June 2026",
      caseId: "IQ-CAN-0988"
    }
  ];

  const videoReviews = [
    {
      title: "How I got Seneca College LOA & Canada Student Visa",
      client: "Sandeep Patel",
      country: "Canada",
      duration: "3:42",
      bgGradient: "from-red-600/80 to-blue-900/90"
    },
    {
      title: "Securing UK NHS Health & Care Sponsorship Guide",
      client: "Priyanka Sharma",
      country: "UK",
      duration: "4:15",
      bgGradient: "from-blue-700/80 to-indigo-900/90"
    }
  ];

  const filteredApprovals = filter === "all" 
    ? approvals 
    : approvals.filter(a => a.country.toLowerCase() === filter.toLowerCase());

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Header Hero */}
      <section className="bg-gradient-premium py-16 text-white text-center border-b border-brand-gold/15 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.1),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-gold">Our Legacy</span>
          <h1 className="text-4xl font-extrabold font-heading text-white">Client Visa Approval Gallery</h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto">
            Real stories, real passports, and real success. Explore hundreds of approved cases processed across global checkpoints.
          </p>
        </div>
      </section>

      {/* 2. Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { id: "all", label: "All Approvals", flag: "🌍" },
            { id: "canada", label: "Canada", flag: "🇨🇦" },
            { id: "united kingdom", label: "United Kingdom", flag: "🇬🇧" },
            { id: "australia", label: "Australia", flag: "🇦🇺" },
            { id: "germany", label: "Germany", flag: "🇩🇪" }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-4 py-2.5 rounded-xl border flex items-center space-x-1.5 text-xs sm:text-sm font-bold transition-all ${
                filter === cat.id
                  ? "border-brand-gold bg-brand-blue/5 text-brand-gold font-extrabold"
                  : "border-brand-blue-light/10 text-brand-blue-dark bg-white hover:bg-gray-50"
              }`}
            >
              <span>{cat.flag}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 3. Approvals Grid with Mock Visa Stamp */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredApprovals.map((app) => (
            <div key={app.id} className="glass-card p-6 bg-white rounded-3xl border border-brand-blue-light/5 flex flex-col justify-between h-full space-y-6">
              
              {/* Review Testimonial */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div className="h-9 w-9 rounded-full bg-brand-blue/5 border border-brand-gold/15 flex items-center justify-center font-bold text-brand-blue-dark text-xs uppercase">
                      {app.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-brand-blue-dark">{app.name}</h4>
                      <p className="text-[9px] font-semibold text-gray-400">{app.date}</p>
                    </div>
                  </div>
                  <div className="flex text-brand-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" />
                    ))}
                  </div>
                </div>
                
                <p className="text-xs sm:text-sm italic text-gray-600 leading-relaxed">
                  "{app.review}"
                </p>
              </div>

              {/* Mock Approved Visa Stamp */}
              <div className="p-4 bg-brand-gold/5 border-2 border-dashed border-brand-gold/40 rounded-2xl relative overflow-hidden flex justify-between items-center">
                <div className="space-y-1 relative z-10 text-brand-blue-dark">
                  <p className="text-[9px] uppercase tracking-wider font-extrabold text-brand-gold-dark">Official Visa Stamp</p>
                  <p className="text-xs font-black">{app.type}</p>
                  <p className="text-[10px] font-mono text-gray-400">File ID: {app.caseId}</p>
                </div>
                <div className="text-right shrink-0 relative z-10">
                  <div className="inline-block p-1 bg-green-500 text-white rounded text-[8px] uppercase tracking-wider font-black font-heading rotate-6 border border-white">
                    Visa Granted
                  </div>
                  <p className="text-[14px] mt-1.5">{app.flag}</p>
                </div>
                {/* Stamp visual blur background */}
                <div className="absolute -bottom-4 -right-4 h-16 w-16 bg-brand-gold/10 rounded-full border border-brand-gold/20" />
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* 4. Video Testimonial Thumbnails */}
      <section className="bg-brand-blue/5 py-20 border-y border-brand-blue-light/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase text-brand-gold tracking-widest">Video Reviews</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-brand-blue-dark">Watch Our Success Stories</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {videoReviews.map((video, idx) => (
              <div key={idx} className="glass-card bg-white rounded-3xl overflow-hidden border border-brand-blue-light/5 group">
                {/* Video player screen placeholder */}
                <div className={`h-48 bg-gradient-to-br ${video.bgGradient} flex items-center justify-center text-white relative`}>
                  <div className="h-14 w-14 rounded-full bg-brand-gold text-brand-blue-dark flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 pointer-events-none">
                    <Play className="h-6 w-6 fill-current pl-1 text-brand-blue-dark" />
                  </div>
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/60 rounded text-[10px] font-mono font-bold">
                    {video.duration}
                  </span>
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-white/20 backdrop-blur-md rounded text-[10px] font-bold">
                    {video.country} review
                  </span>
                </div>
                
                <div className="p-5 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-brand-blue-dark group-hover:text-brand-gold transition-colors font-heading leading-snug">
                      {video.title}
                    </h4>
                    <p className="text-[10px] text-gray-500 mt-1">Shared by {video.client}</p>
                  </div>
                  <button className="p-2 rounded-xl bg-brand-blue/5 text-brand-blue-light hover:bg-brand-gold hover:text-brand-blue-dark transition-all">
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
