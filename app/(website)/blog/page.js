"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { BookOpen, Calendar, Clock, ArrowRight, Search, FileText, ChevronRight, X } from "lucide-react";

export default function BlogPage() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeArticle, setActiveArticle] = useState(null);

  const categories = [
    { id: "all", label: "All Posts" },
    { id: "visa updates", label: "Visa Updates" },
    { id: "immigration news", label: "Immigration News" },
    { id: "study abroad tips", label: "Study Abroad Tips" },
    { id: "refusal cases", label: "Refusal Cases" },
    { id: "work permit news", label: "Work Permit News" }
  ];

  const articles = [
    {
      id: 1,
      title: "Canada GIC Deposit Rules: Key Policy Updates for 2026",
      category: "Visa Updates",
      date: "June 15, 2026",
      readTime: "4 min read",
      author: "Adv. Ilesh Patel",
      summary: "IRCC has revised the mandatory GIC funds required for students under the SDS pathway. Find out the details of Seneca, Humber, and Conestoga intake compliance.",
      content: `The Canadian Immigration Department (IRCC) has officially announced updates regarding financial proof limits for students seeking Study Permits under the Student Direct Stream (SDS). Starting recently, students must deposit $20,635 CAD into a Guaranteed Investment Certificate (GIC) from a participating bank.

This update represents IRCC's efforts to ensure international students can cover rising living costs in major cities like Toronto, Vancouver, and Montreal without facing severe financial distress.

What Students Need to Know:
1. The new GIC deposit limit is $20,635 CAD.
2. In addition, proof of paying tuition fees for the first academic year is required.
3. SDS processing timelines remain rapid at 3-4 weeks.
4. Non-SDS applicants may face additional scrutiny regarding family asset evaluations.

Our recommendation: Fund your GIC at least 2 weeks before filing your visa application to ensure the bank certificate is generated and attached correctly.`,
      color: "from-red-600/10 to-red-900/5"
    },
    {
      id: 2,
      title: "How to Address a Canada Student Visa Refusal: SOP Formatting Tips",
      category: "Refusal Cases",
      date: "June 10, 2026",
      readTime: "7 min read",
      author: "Anjali Shah",
      summary: "Received a refusal under Section 216(1)? Learn how to draft a corrective Statement of Purpose (SOP) addressing travel ties and home assets.",
      content: `A student visa refusal under section 216(1)(b) of the IRCC guidelines—stating that the officer is not satisfied you will leave Canada at the end of your stay—is one of the most common immigration challenges.

To successfully address a refusal, your next application must include a structured Letter of Explanation (SOP Refusal Rectification).

Key Elements of a Successful Refusal SOP:
- Travel History & Ties: Detail why you need this specific course to progress in your home country's job market. Compare salary expectations at home pre- and post-study.
- Academic Progression: If there is a study gap, provide employment proofs, certificates, or training letters.
- Financial Audits: Clearly outline your assets in your home country (property valuations, family business registries, fixed deposits) to demonstrate substantial ties.

Do not submit the exact same SOP. Address the officer's notes (request GCMS notes first) systematically in your response letter.`,
      color: "from-amber-600/10 to-amber-900/5"
    },
    {
      id: 3,
      title: "UK Health and Care Visa CoS Allocation Timeline Rules",
      category: "Work Permit News",
      date: "June 05, 2026",
      readTime: "5 min read",
      author: "Adv. Rajesh Rathod",
      summary: "Understand the Certificate of Sponsorship (CoS) allocation quotas for health professionals and caregivers under the UK Home Office updates.",
      content: `The UK Home Office has streamlined the allocation of defined Certificates of Sponsorship (CoS) for health and care professionals. Under the new frameworks, NHS trusts and registered private care houses face modified recruitment guidelines.

Key Updates:
1. Sponsorship requests for Caregivers are subject to stricter local recruitment audits.
2. The minimum salary threshold for standard Skilled Worker Visas has increased, but the Health & Care Visa path remains eligible for exemptions.
3. The average turnaround for Defined CoS codes is now 5 to 7 business days.

Our legal desk recommends verifying your hiring agency's active status on the UK Registry of Licensed Sponsors before paying placement or processing fees.`,
      color: "from-blue-600/10 to-indigo-900/5"
    },
    {
      id: 4,
      title: "German Opportunity Card (Chancenkarte) Point Matrix 2026",
      category: "Immigration News",
      date: "May 28, 2026",
      readTime: "6 min read",
      author: "Adv. Ilesh Patel",
      summary: "Germany has activated its point-based Chancenkarte job seeker route. Calculate your score based on age, education, and language.",
      content: `Germany's new Opportunity Card (Chancenkarte) allows skilled workers from non-EU nations to enter the country and seek employment for up to one year without an active sponsor offer. The system operates on a points-based criteria.

How to Score Points:
- Bachelor's/Master's Degree: 4 points (if recognized in Germany).
- Work Experience: 3 points for 5+ years, 2 points for 2 years.
- Language Skills: 2 points for German B1 level, 1 point for English C1.
- Age: 2 points for applicants under 35 years of age.

Applicants must score a minimum of 6 points to qualify, alongside proof of financial stability (€1,027 EUR per month in a Blocked Account). This is an excellent alternative to standard work permits that require employer sponsorship upfront.`,
      color: "from-yellow-600/10 to-amber-900/5"
    },
    {
      id: 5,
      title: "Top 5 Tuition-Free English Master Programs in Germany",
      category: "Study Abroad Tips",
      date: "May 20, 2026",
      readTime: "5 min read",
      author: "Anjali Shah",
      summary: "Explore top public institutions in Munich and Berlin offering 100% English-taught master programs with zero tuition fees.",
      content: `Germany remains the prime destination for student budget-optimization due to its public university network charging €0 tuition fees, even for non-EU students.

Top 5 Public English Programs:
1. Technical University of Munich (TUM) - Computer Science & Management.
2. LMU Munich - Software Engineering.
3. Heidelberg University - Molecular Biotechnology.
4. Humboldt University of Berlin - Economics and Management.
5. RWTH Aachen - Electrical Engineering.

While tuition is free, students must cover a semester contribution of €200 - €400 EUR (which includes public transit cards) and fund a blocked account of €11,904 EUR for annual living costs. APS verification is mandatory for all Indian board certificates.`,
      color: "from-emerald-600/10 to-emerald-900/5"
    }
  ];

  const filteredArticles = articles.filter((art) => {
    const matchesCategory = filter === "all" || art.category.toLowerCase() === filter.toLowerCase();
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          art.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Header Hero */}
      <section className="bg-gradient-premium py-16 text-white text-center border-b border-brand-gold/15 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.1),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-gold">Knowledge Bank</span>
          <h1 className="text-4xl font-extrabold font-heading text-white">Immigration News &amp; Guidance Hub</h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto">
            Stay ahead of the curve. Access legal audits, visa quota releases, refusal analysis, and guides written directly by certified advisors.
          </p>
        </div>
      </section>

      {/* 2. Search & Category Filter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search box */}
          <div className="md:col-span-4 relative">
            <input
              type="text"
              placeholder="Search news, keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-brand-blue-light/10 rounded-xl focus:outline-none focus:border-brand-gold text-xs sm:text-sm text-brand-blue-dark placeholder-gray-400"
            />
            <Search className="h-4.5 w-4.5 text-gray-400 absolute left-3 top-3" />
          </div>

          {/* Category Tabs */}
          <div className="md:col-span-8 flex overflow-x-auto space-x-2 pb-2 scrollbar-thin">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all shrink-0 ${
                  filter === cat.id
                    ? "border-brand-gold bg-brand-blue/5 text-brand-gold font-extrabold"
                    : "border-brand-blue-light/10 text-brand-blue-dark bg-white hover:bg-gray-50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Blog Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredArticles.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <BookOpen className="h-12 w-12 mx-auto mb-4" />
            <p>No articles found matching search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((art) => (
              <div key={art.id} className="glass-card p-6 bg-white rounded-3xl border border-brand-blue-light/5 flex flex-col justify-between h-full bg-gradient-to-br">
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[10px] font-bold text-gray-400">
                    <span className="bg-brand-gold/10 text-brand-gold-dark px-2.5 py-1 rounded">
                      {art.category}
                    </span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{art.date}</span>
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-brand-blue-dark hover:text-brand-gold transition-colors font-heading leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed">
                    {art.summary}
                  </p>
                </div>

                <div className="pt-6 border-t border-brand-blue/5 mt-6 flex justify-between items-center">
                  <span className="text-[10px] font-semibold text-gray-400 flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{art.readTime}</span>
                  </span>
                  <button
                    onClick={() => setActiveArticle(art)}
                    className="text-xs font-bold text-brand-blue-dark hover:text-brand-gold inline-flex items-center space-x-1"
                  >
                    <span>Read Details</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. Article Detailed Modal/Overlay */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-2xl max-h-[85vh] bg-white rounded-3xl border border-brand-blue-light/10 shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-gradient-premium px-6 py-4 text-white flex justify-between items-center border-b border-brand-gold/20 shrink-0">
              <div>
                <span className="text-[9px] uppercase tracking-wider font-extrabold text-brand-gold">
                  {activeArticle.category}
                </span>
                <h3 className="text-sm sm:text-base font-bold font-heading">
                  Written by {activeArticle.author}
                </h3>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-grow p-6 sm:p-8 overflow-y-auto space-y-6">
              <h2 className="text-xl sm:text-2xl font-black font-heading text-brand-blue-dark leading-tight">
                {activeArticle.title}
              </h2>
              
              <div className="flex space-x-6 text-xs text-gray-400 border-b border-brand-blue/5 pb-4">
                <span className="flex items-center space-x-1.5">
                  <Calendar className="h-3.5 w-3.5 text-brand-gold" />
                  <span>Published: {activeArticle.date}</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <Clock className="h-3.5 w-3.5 text-brand-gold" />
                  <span>Reading: {activeArticle.readTime}</span>
                </span>
              </div>

              <div 
                className="text-xs sm:text-sm text-gray-600 leading-relaxed space-y-4"
                style={{ whiteSpace: "pre-line" }}
              >
                {activeArticle.content}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-gray-50 border-t border-brand-blue-light/5 text-right shrink-0">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-6 py-2 bg-brand-blue text-brand-gold font-bold text-xs uppercase tracking-wide rounded-xl"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
