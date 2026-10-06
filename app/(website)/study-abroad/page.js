"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { db } from "@/services/db";
import { CheckCircle, Calendar, GraduationCap, DollarSign, Clock, FileText, Gift, Send, Sparkles, Briefcase, BookOpen, CalendarDays } from "lucide-react";

function StudyAbroadContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("canada");
  
  // Dynamic App form
  const [isApplying, setIsApplying] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    ielts: "6.5",
    gpa: "",
    stream: "Engineering"
  });
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const tabParam = searchParams.get("tab") || searchParams.get("country");
    if (tabParam) {
      setActiveTab(tabParam.toLowerCase());
    }
  }, [searchParams]);

  const handleApplySubmit = (e) => {
    e.preventDefault();
    db.addLead({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      preferredCountry: activeTab.toUpperCase(),
      education: `GPA/Marks: ${formData.gpa}%, Stream: ${formData.stream}`,
      ielts: formData.ielts,
      type: `Study Abroad Application (${activeTab})`,
      score: `Immediate Application for Study Permit in ${activeTab.toUpperCase()}`,
      status: "New"
    });

    // Send to WhatsApp
    const waMsg =
      `🎓 *Study Abroad Application — IQ Education*\n\n` +
      `👤 *Name:* ${formData.name}\n` +
      `📞 *Phone:* ${formData.phone}\n` +
      `📧 *Email:* ${formData.email}\n` +
      `🌍 *Country:* ${activeTab.toUpperCase()}\n` +
      `📊 *IELTS/PTE Score:* ${formData.ielts}\n` +
      `📝 *Marks/GPA:* ${formData.gpa}%\n` +
      `🏫 *Stream:* ${formData.stream}\n\n` +
      `_Sent via IQ Education Study Abroad Page_`;
    window.open(`https://wa.me/918799072887?text=${encodeURIComponent(waMsg)}`, "_blank");

    setFormData({ name: "", email: "", phone: "", ielts: "6.5", gpa: "", stream: "Engineering" });
    setApplied(true);
    setTimeout(() => {
      setApplied(false);
      setIsApplying(false);
    }, 4500);
  };

  const countriesData = {
    canada: {
      name: "Canada",
      flag: "🇨🇦",
      flagCode: "ca",
      eligibility: "60% or higher in High School (12th) or Bachelor's. IELTS: 6.0 in each band for SDS (Student Direct Stream), 5.5 for non-SDS. PTE: 60+ score.",
      fees: "$15,000 - $35,000 CAD per year.",
      living: "$20,635 CAD per year (Mandatory GIC blocked account deposit).",
      intakes: "September (Major), January, May",
      postStudyWork: "Up to 3 years Post-Graduation Work Permit (PGWP)",
      popularCourses: "IT & Computer Science, Engineering, Business Administration, Healthcare, Data Science",
      universities: [
        { name: "University of Toronto", url: "https://www.utoronto.ca/" },
        { name: "University of British Columbia (UBC)", url: "https://www.ubc.ca/" },
        { name: "McGill University", url: "https://www.mcgill.ca/" },
        { name: "Seneca College", url: "https://www.senecapolytechnic.ca/" },
        { name: "Humber College", url: "https://humber.ca/" },
        { name: "Conestoga College", url: "https://www.conestogac.on.ca/" }
      ],
      processingTime: "SDS pathway: 3 to 4 weeks. Non-SDS: 6 to 8 weeks.",
      documents: ["Letter of Acceptance (LOA)", "GIC Payment Receipt", "1-Year Tuition Receipt", "Statement of Purpose (SOP)", "Academic Transcripts & Certificates"],
      scholarships: ["Lester B. Pearson International Scholarship", "Ontario Graduate Scholarship", "University Entrance Awards (up to $5,000 CAD)"]
    },
    australia: {
      name: "Australia",
      flag: "🇦🇺",
      flagCode: "au",
      eligibility: "65% academic score. IELTS: 6.5 overall (minimum 6.0 in each band) or PTE overall score of 58+. MOI waiver accepted in select universities.",
      fees: "$25,000 - $45,000 AUD per year.",
      living: "$29,710 AUD per year (Official financial proof limit).",
      intakes: "February, July, November",
      postStudyWork: "2 to 4 years Temporary Graduate Visa (subclass 485)",
      popularCourses: "Nursing, Accounting, IT, Engineering, Social Work",
      universities: [
        { name: "University of Melbourne", url: "https://www.unimelb.edu.au/" },
        { name: "University of Sydney", url: "https://www.sydney.edu.au/" },
        { name: "UNSW Sydney", url: "https://www.unsw.edu.au/" },
        { name: "Monash University", url: "https://www.monash.edu/" },
        { name: "RMIT University", url: "https://www.rmit.edu.au/" },
        { name: "Macquarie University", url: "https://www.mq.edu.au/" }
      ],
      processingTime: "4 to 6 weeks.",
      documents: ["Confirmation of Enrollment (COE)", "Overseas Student Health Cover (OSHC)", "Genuine Student (GS) Statement", "6 Months Bank Statements", "Academic Transcripts"],
      scholarships: ["Destination Australia Scholarships", "Australian Government Research Training Program (RTP)", "Vice-Chancellor's International Scholarships"]
    },
    "united-kingdom": {
      name: "United Kingdom",
      flag: "🇬🇧",
      flagCode: "gb",
      eligibility: "55% academic marks. IELTS: 6.0 overall (no band less than 5.5) or English 70% in 12th standard (medium of instruction waiver).",
      fees: "£12,000 - £28,000 GBP per year.",
      living: "£12,006 GBP (Outside London) or £15,600 GBP (Inside London) per year.",
      intakes: "September (Major), January",
      postStudyWork: "2 years Graduate Route visa (3 years for PhD)",
      popularCourses: "Law, Business & Finance, Computer Science, Architecture, Medicine",
      universities: [
        { name: "University of Oxford", url: "https://www.ox.ac.uk/" },
        { name: "University College London (UCL)", url: "https://www.ucl.ac.uk/" },
        { name: "University of Manchester", url: "https://www.manchester.ac.uk/" },
        { name: "Coventry University", url: "https://www.coventry.ac.uk/" },
        { name: "University of Hertfordshire", url: "https://www.herts.ac.uk/" },
        { name: "BPP University", url: "https://www.bpp.com/" }
      ],
      processingTime: "Standard: 3 weeks. Priority visa path: 5 working days.",
      documents: ["Confirmation of Acceptance for Studies (CAS)", "TB Test Clearance Certificate", "28-Day Bank Statement proof", "Immigration Health Surcharge (IHS) payment"],
      scholarships: ["Chevening Scholarships", "Great Scholarships", "Commonwealth Master's Scholarships"]
    },
    "new-zealand": {
      name: "New Zealand",
      flag: "🇳🇿",
      flagCode: "nz",
      eligibility: "60% overall academic marks. IELTS: 6.0 overall (no band less than 5.5) or PTE score of 50+.",
      fees: "$22,000 - $38,000 NZD per year.",
      living: "$20,000 NZD per year (Mandatory living cost proof).",
      intakes: "February, July",
      postStudyWork: "Up to 3 years Post-Study Work Visa",
      popularCourses: "Agriculture, Information Technology, Hospitality, Environmental Science",
      universities: [
        { name: "University of Auckland", url: "https://www.auckland.ac.nz/" },
        { name: "University of Otago", url: "https://www.otago.ac.nz/" },
        { name: "University of Canterbury", url: "https://www.canterbury.ac.nz/" },
        { name: "Massey University", url: "https://www.massey.ac.nz/" },
        { name: "Auckland University of Technology (AUT)", url: "https://www.aut.ac.nz/" }
      ],
      processingTime: "4 to 8 weeks.",
      documents: ["Offer of Place letter", "Tuition Fee Payment Receipt", "Evidence of Funds (FTS account optional)", "Medical certificate and chest X-ray", "Police Clearance"],
      scholarships: ["New Zealand Excellence Awards (NZEA)", "Tongarewa Scholarship", "Vice-Chancellor's International Student Scholarships"]
    },
    germany: {
      name: "Germany",
      flag: "🇩🇪",
      flagCode: "de",
      eligibility: "70% overall academic score. Requires APS certificate verification. English programs require IELTS: 6.0+. German programs require TestDaF B2/C1.",
      fees: "€0 (Public Universities) or €10,000 - €20,000 EUR per year (Private).",
      living: "€11,904 EUR per year (Blocked account deposit).",
      intakes: "Winter (September/October), Summer (March/April)",
      postStudyWork: "18 months job-seeking visa after graduation",
      popularCourses: "Automotive Engineering, Mechanical Engineering, Data Analytics, Medicine",
      universities: [
        { name: "Technical University of Munich (TUM)", url: "https://www.tum.de/" },
        { name: "LMU Munich", url: "https://www.lmu.de/" },
        { name: "Heidelberg University", url: "https://www.uni-heidelberg.de/" },
        { name: "TU Berlin", url: "https://www.tu.berlin/" },
        { name: "SRH Berlin University of Applied Sciences", url: "https://www.srh-berlin.de/" }
      ],
      processingTime: "8 to 12 weeks.",
      documents: ["APS Certificate (Mandatory)", "University Admission Letter", "Blocked Account Funding Confirmation", "German Public Health Insurance", "SOP & Curriculam Vitae"],
      scholarships: ["DAAD Scholarship Database Programs", "Deutschlandstipendium (National Scholarship Program)"]
    },
    russia: {
      name: "Russia",
      flag: "🇷🇺",
      flagCode: "ru",
      eligibility: "50% academic marks in 12th standard. No IELTS/PTE required. Entrance tests done directly by medical or polytechnic schools.",
      fees: "$2,000 - $8,000 USD per year (High-quality medical & aeronautical studies).",
      living: "$2,400 - $3,600 USD per year.",
      intakes: "September, October",
      postStudyWork: "Foreign students can work without special work permits during studies",
      popularCourses: "MBBS (Medicine), Aviation & Aerospace, Engineering, IT",
      universities: [
        { name: "Moscow State University", url: "https://www.msu.ru/en/" },
        { name: "Saint Petersburg State University", url: "https://english.spbu.ru/" },
        { name: "Novosibirsk State University", url: "https://english.nsu.ru/" },
        { name: "I.M. Sechenov First Moscow State Medical University", url: "https://sechenov.ru/eng/" },
        { name: "Kazan Federal University", url: "https://kpfu.ru/eng" }
      ],
      processingTime: "2 to 3 weeks.",
      documents: ["Ministry of Education Visa Invitation", "HIV Test Medical Certificate", "Passport Russian Translation (Notarized)", "High School marksheets"],
      scholarships: ["Russian Government State Scholarships (State Quota scholarships covering 100% tuition)"]
    }
  };

  const countries = [
    { id: "canada", name: "Canada", flag: "🇨🇦" },
    { id: "australia", name: "Australia", flag: "🇦🇺" },
    { id: "united-kingdom", name: "United Kingdom", flag: "🇬🇧" },
    { id: "new-zealand", name: "New Zealand", flag: "🇳🇿" },
    { id: "germany", name: "Germany", flag: "🇩🇪" },
    { id: "russia", name: "Russia", flag: "🇷🇺" }
  ];

  const currentCountry = countriesData[activeTab] || countriesData["canada"];

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Header Banner */}
      <section className="bg-gradient-premium py-20 text-white text-center border-b border-brand-gold/15 relative overflow-hidden transition-all duration-500">
        <div 
          className="absolute inset-0 bg-center bg-cover transition-all duration-700" 
          style={{ backgroundImage: `url(https://flagcdn.com/w1280/${currentCountry.flagCode}.png)` }}
        />
        <div className="absolute inset-0 bg-[#081B33]/70 backdrop-blur-sm" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-gold bg-brand-gold/10 px-4 py-1.5 rounded-full backdrop-blur-md border border-brand-gold/30">Study in {currentCountry.name}</span>
          <h1 className="text-4xl md:text-5xl font-extrabold font-heading text-white drop-shadow-lg">Global Careers & Education</h1>
          <p className="text-sm sm:text-base text-gray-200 max-w-xl mx-auto drop-shadow-md">
            Choose your destination, view critical academic entry guidelines, understand blocked accounts, and apply for admissions directly.
          </p>
        </div>
      </section>

      {/* 2. Flag-based Tab Selectors */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto space-x-3 pb-3 border-b border-brand-blue-light/10 scrollbar-thin">
          {countries.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveTab(c.id)}
              className={`px-5 py-3.5 rounded-xl border flex items-center space-x-2 text-sm font-bold transition-all shrink-0 ${
                activeTab === c.id
                  ? "border-brand-gold bg-brand-blue/5 text-brand-gold font-extrabold shadow-sm"
                  : "border-brand-blue-light/10 text-brand-blue-dark bg-white hover:bg-gray-50"
              }`}
            >
              <span className="text-lg">{c.flag}</span>
              <span>{c.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 3. Detailed Data Panels */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-8">
            <div className="glass-card p-6 sm:p-8 rounded-3xl bg-white border border-brand-blue-light/5 space-y-6">
              <div className="flex justify-between items-center border-b border-brand-blue/5 pb-4">
                <h2 className="text-2xl font-extrabold text-brand-blue-dark flex items-center space-x-3 font-heading">
                  <span className="text-3xl">{currentCountry.flag}</span>
                  <span>Guide to study in {currentCountry.name}</span>
                </h2>
                <button
                  onClick={() => setIsApplying(true)}
                  className="px-5 py-2.5 bg-gradient-gold text-brand-blue-dark font-extrabold rounded-xl text-xs uppercase tracking-wide hover:scale-105 active:scale-95 transition-all shadow-md flex items-center space-x-1.5"
                >
                  <GraduationCap className="h-4 w-4" />
                  <span>Apply Now</span>
                </button>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* Eligibility */}
                <div className="space-y-2 border-b md:border-b-0 md:border-r border-brand-blue/5 pb-4 md:pb-0 md:pr-6">
                  <h4 className="text-sm font-bold text-brand-gold uppercase tracking-wide flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-brand-gold" />
                    <span>Academic Eligibility</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{currentCountry.eligibility}</p>
                </div>
                {/* Processing time */}
                <div className="space-y-2 pl-0 md:pl-2">
                  <h4 className="text-sm font-bold text-brand-gold uppercase tracking-wide flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-brand-gold" />
                    <span>Visa Processing Times</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{currentCountry.processingTime}</p>
                </div>
              </div>

              <div className="border-t border-brand-blue/5 pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tuition cost */}
                <div className="space-y-2 border-b md:border-b-0 md:border-r border-brand-blue/5 pb-4 md:pb-0 md:pr-6">
                  <h4 className="text-sm font-bold text-brand-gold uppercase tracking-wide flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-brand-gold" />
                    <span>Estimated Tuition Fees</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{currentCountry.fees}</p>
                </div>
                {/* Blocked Funds */}
                <div className="space-y-2 pl-0 md:pl-2">
                  <h4 className="text-sm font-bold text-brand-gold uppercase tracking-wide flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-brand-gold" />
                    <span>Living Cost / Blocked Funds</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{currentCountry.living}</p>
                </div>
              </div>

              <div className="border-t border-brand-blue/5 pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Intakes */}
                <div className="space-y-2 border-b md:border-b-0 md:border-r border-brand-blue/5 pb-4 md:pb-0 md:pr-4">
                  <h4 className="text-sm font-bold text-brand-gold uppercase tracking-wide flex items-center space-x-2">
                    <CalendarDays className="h-4 w-4 text-brand-gold" />
                    <span>Intakes</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{currentCountry.intakes}</p>
                </div>
                {/* Post Study Work */}
                <div className="space-y-2 border-b md:border-b-0 md:border-r border-brand-blue/5 pb-4 md:pb-0 md:px-2">
                  <h4 className="text-sm font-bold text-brand-gold uppercase tracking-wide flex items-center space-x-2">
                    <Briefcase className="h-4 w-4 text-brand-gold" />
                    <span>Post Study Work</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{currentCountry.postStudyWork}</p>
                </div>
                {/* Popular Courses */}
                <div className="space-y-2 pl-0 md:pl-2">
                  <h4 className="text-sm font-bold text-brand-gold uppercase tracking-wide flex items-center space-x-2">
                    <BookOpen className="h-4 w-4 text-brand-gold" />
                    <span>Popular Courses</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{currentCountry.popularCourses}</p>
                </div>
              </div>
            </div>

            {/* Documents & Scholarships Lists */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Documents Checklist */}
              <div className="glass-card p-6 sm:p-8 rounded-3xl bg-white border border-brand-blue-light/5 space-y-4">
                <h3 className="text-lg font-bold font-heading text-brand-blue-dark flex items-center space-x-2 border-b border-brand-blue/5 pb-3">
                  <FileText className="h-5 w-5 text-brand-gold" />
                  <span>Required Checklist</span>
                </h3>
                <ul className="space-y-3">
                  {currentCountry.documents.map((doc, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-gray-600">
                      <div className="h-2 w-2 rounded-full bg-brand-gold mt-2 shrink-0" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Scholarships */}
              <div className="glass-card p-6 sm:p-8 rounded-3xl bg-white border border-brand-blue-light/5 space-y-4">
                <h3 className="text-lg font-bold font-heading text-brand-blue-dark flex items-center space-x-2 border-b border-brand-blue/5 pb-3">
                  <Gift className="h-5 w-5 text-brand-gold" />
                  <span>Top Scholarships</span>
                </h3>
                <ul className="space-y-3">
                  {currentCountry.scholarships.map((sch, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-gray-600">
                      <div className="h-2 w-2 rounded-full bg-brand-gold mt-2 shrink-0" />
                      <span>{sch}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar Top universities & Packages */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-card p-6 rounded-3xl bg-brand-blue-dark text-white border border-brand-gold/20 shadow-xl space-y-6 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/10 rounded-bl-full -z-10" />
              <div className="space-y-1">
                <h3 className="text-xl font-bold font-heading text-brand-gold">
                  {currentCountry.name} Education Package
                </h3>
                <p className="text-xs text-gray-400">Estimated Annual Tuition</p>
              </div>
              <div className="bg-white/10 rounded-2xl p-4 border border-white/5 flex items-center justify-center">
                <span className="text-lg md:text-xl font-black text-brand-gold font-heading text-center">
                  {currentCountry.fees}
                </span>
              </div>
            </div>

            <div className="glass-card p-6 sm:p-8 rounded-3xl bg-white border border-brand-blue-light/10 shadow-lg space-y-5">
              <h3 className="text-lg font-bold font-heading text-brand-blue-dark border-b border-brand-blue/5 pb-3 flex items-center space-x-2">
                <GraduationCap className="h-5 w-5 text-brand-gold" />
                <span>Top Universities</span>
              </h3>
              <div className="space-y-3">
                {currentCountry.universities.map((uni, idx) => (
                  <a key={idx} href={uni.url} target="_blank" rel="noopener noreferrer" className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 hover:border-brand-gold/50 hover:bg-brand-gold/5 hover:-translate-y-0.5 transition-all duration-300 text-xs sm:text-sm font-bold text-brand-blue-dark flex items-start space-x-3 group cursor-pointer shadow-sm hover:shadow-md">
                    <div className="h-6 w-6 rounded-full bg-brand-blue/5 flex items-center justify-center shrink-0 group-hover:bg-brand-gold/20 transition-colors">
                      <span className="text-[10px]">🏛️</span>
                    </div>
                    <span className="mt-0.5 group-hover:text-brand-gold transition-colors">{uni.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Q&A Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="glass-card p-6 sm:p-10 rounded-3xl bg-white border border-brand-blue-light/10 shadow-xl space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-blue-dark font-heading">Have Questions about {currentCountry.name}?</h2>
            <p className="text-sm text-gray-500">Ask our immigration experts directly and get personalized guidance.</p>
          </div>
          
          <form onSubmit={(e) => { e.preventDefault(); alert("Question submitted! Our team will contact you shortly."); }} className="space-y-4 max-w-2xl mx-auto">
            <div className="space-y-1">
              <label className="text-xs font-bold text-brand-blue-dark uppercase tracking-wide">Your Name</label>
              <input type="text" required placeholder="John Doe" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-gold text-sm transition-colors" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-brand-blue-dark uppercase tracking-wide">Ask your Question</label>
              <textarea rows="4" required placeholder={`e.g., What are the best PR pathways after studying in ${currentCountry.name}?`} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-gold text-sm transition-colors resize-none" />
            </div>
            <button type="submit" className="w-full py-3.5 bg-brand-blue-dark hover:bg-brand-blue text-white font-extrabold rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 text-sm uppercase tracking-wider">
              <span>Submit Question</span>
            </button>
          </form>
        </div>
      </section>

      {/* 4. Overlay Form Modal */}
      {isApplying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-3xl border border-brand-blue-light/10 shadow-2xl p-6 sm:p-8 relative space-y-6 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsApplying(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            {applied ? (
              <div className="text-center py-12 space-y-4">
                <div className="h-16 w-16 bg-brand-gold/20 rounded-full flex items-center justify-center mx-auto text-brand-gold border border-brand-gold/30">
                  <Sparkles className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold font-heading text-brand-blue-dark">Application Lodged!</h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  We have successfully registered your interest for studying in {currentCountry.name} in the CRM. An admissions counseling assistant will prepare your profile within 2 business hours.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold font-heading text-brand-blue-dark">
                    Apply for {currentCountry.name} Student Admission
                  </h3>
                  <p className="text-xs text-gray-500">Submit your profile to assess your intake options and secure visa filing guidance.</p>
                </div>

                <form onSubmit={handleApplySubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-brand-blue-dark">Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-brand-blue-light/10 rounded-xl focus:outline-none focus:border-brand-gold text-sm text-brand-blue-dark"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-blue-dark">Email</label>
                      <input
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-brand-blue-light/10 rounded-xl focus:outline-none focus:border-brand-gold text-sm text-brand-blue-dark"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-blue-dark">Phone</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 99999"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-brand-blue-light/10 rounded-xl focus:outline-none focus:border-brand-gold text-sm text-brand-blue-dark"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-blue-dark">IELTS/PTE</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 6.5"
                        value={formData.ielts}
                        onChange={(e) => setFormData({ ...formData, ielts: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-brand-blue-light/10 rounded-xl focus:outline-none focus:border-brand-gold text-xs text-brand-blue-dark"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-blue-dark">Marks/GPA (%)</label>
                      <input
                        type="number"
                        required
                        placeholder="e.g. 80"
                        value={formData.gpa}
                        onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-brand-blue-light/10 rounded-xl focus:outline-none focus:border-brand-gold text-xs text-brand-blue-dark"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-blue-dark">Stream</label>
                      <select
                        value={formData.stream}
                        onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                        className="w-full px-3 py-2.5 bg-gray-50 border border-brand-blue-light/10 rounded-xl focus:outline-none focus:border-brand-gold text-xs text-brand-blue-dark"
                      >
                        <option value="Engineering">Engineering</option>
                        <option value="Business">Business / Commerce</option>
                        <option value="IT">Computer Science</option>
                        <option value="Medicine">Medicine / Biology</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-gold text-brand-blue-dark font-extrabold rounded-xl hover:shadow-lg transition-all flex items-center justify-center space-x-1.5 text-xs sm:text-sm uppercase tracking-wider"
                  >
                    <Send className="h-4 w-4" />
                    <span>File Admission Request</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function StudyAbroadPage() {
  return (
    <Suspense fallback={<div className="p-24 text-center">Loading options...</div>}>
      <StudyAbroadContent />
    </Suspense>
  );
}
