"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { db } from "@/services/db";
import { ShieldCheck, ClipboardCheck, Briefcase, FileUser, BadgeDollarSign, HelpCircle, Send, CheckCircle, Flame } from "lucide-react";

export default function WorkPermitPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    jobTitle: "Software Engineer",
    experience: "3",
    cvText: ""
  });
  
  const [atsScore, setAtsScore] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [leadSaved, setLeadSaved] = useState(false);

  const handleCvAnalyze = (e) => {
    e.preventDefault();
    setAnalyzing(true);
    
    setTimeout(() => {
      // Calculate mock score
      const textLen = formData.cvText.length;
      let score = 65 + Math.floor(Math.random() * 25);
      if (textLen < 20) score = 52; // penalty for short descriptions

      setAtsScore(score);
      setAnalyzing(false);

      // Save to CRM database!
      db.addLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        education: `Job: ${formData.jobTitle}, Experience: ${formData.experience} years`,
        ielts: "ATS Analysis",
        preferredCountry: "Canada / UK Work Permit",
        type: "Work Permit ATS Lead",
        score: `ATS Resume Score: ${score}/100. Core skills described: "${formData.cvText.substring(0, 80)}..."`,
        status: "New"
      });
      setLeadSaved(true);

      // Send to WhatsApp
      const waMsg =
        `💼 *Work Permit Inquiry — IQ Education*\n\n` +
        `👤 *Name:* ${formData.name}\n` +
        `📞 *Phone:* ${formData.phone}\n` +
        `📧 *Email:* ${formData.email}\n` +
        `🛠️ *Job Title:* ${formData.jobTitle}\n` +
        `📅 *Experience:* ${formData.experience} years\n` +
        `📄 *ATS Score:* ${score}/100\n` +
        `🧾 *Profile Summary:* ${formData.cvText.substring(0, 150)}\n\n` +
        `_Sent via IQ Education Work Permit Page_`;
      window.open(`https://wa.me/918799072887?text=${encodeURIComponent(waMsg)}`, "_blank");

    }, 2000);
  };

  const steps = [
    { num: "01", title: "Profile Evaluation", desc: "Our visa lawyers check your credentials, age, experience, and eligibility for point-based express entry." },
    { num: "02", title: "Job Offer Matching", desc: "We support matches with Canadian LMIA-approved employers and UK registered Tier-2 sponsors." },
    { num: "03", title: "Labor Certification", desc: "We complete labor audits (LMIA for Canada, CoS code request for UK, Nomination for Australia)." },
    { num: "04", title: "Visa Filing", desc: "Detailed drafting of your immigration files, including work history verification, police codes, and bank deposits." }
  ];

  const salaries = [
    { role: "Software Engineer", canada: "$85,000 CAD", uk: "£55,000 GBP", australia: "$98,000 AUD" },
    { role: "Registered Nurse", canada: "$78,000 CAD", uk: "£42,000 GBP", australia: "$85,000 AUD" },
    { role: "Construction Manager", canada: "$90,000 CAD", uk: "£50,000 GBP", australia: "$105,000 AUD" },
    { role: "Electrician / Welder", canada: "$60,000 CAD", uk: "£32,000 GBP", australia: "$68,000 AUD" },
    { role: "Hospitality Manager", canada: "$55,000 CAD", uk: "£28,000 GBP", australia: "$60,000 AUD" }
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Header Hero */}
      <section className="bg-gradient-premium py-16 text-white text-center border-b border-brand-gold/15 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.1),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-gold">Global Careers</span>
          <h1 className="text-4xl font-extrabold font-heading text-white">Work Permit &amp; LMIA Auditing</h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto">
            Authorized legal consultancy for skilled worker immigration, employer-sponsored visas, and VFS file representation.
          </p>
        </div>
      </section>

      {/* 2. Core Service Offerings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Skilled Worker Visas",
              desc: "Complete point-based assessments (CRS scores) for Canadian Federal Skilled Worker (FSW) and Australia subclass 189/190/491.",
              icon: ClipboardCheck
            },
            {
              title: "LMIA Sponsorship Support",
              desc: "Legal review of Canadian Labour Market Impact Assessments. We ensure your job offer complies with Service Canada rules.",
              icon: ShieldCheck
            },
            {
              title: "Employer Nominations",
              desc: "Liaison services to guide international employers through sponsoring skilled technicians, IT engineers, and healthcare staff.",
              icon: Briefcase
            },
            {
              title: "Resume & Interview Prep",
              desc: "Formatting resumes to comply with ATS parameters in Canada/UK. Mock preparation sessions for visa consular interviews.",
              icon: FileUser
            }
          ].map((service, i) => (
            <div key={i} className="glass-card p-6 bg-white rounded-2xl border border-brand-blue-light/5 space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="h-10 w-10 rounded-lg bg-brand-blue/5 border border-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0">
                  <service.icon className="h-5 w-5" />
                </div>
                <h3 className="text-md font-bold text-brand-blue-dark font-heading">{service.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Steps Workflow */}
      <section className="bg-brand-blue/5 py-20 border-y border-brand-blue-light/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase text-brand-gold tracking-widest">Process Blueprint</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-brand-blue-dark">Your Pathway to a Global Career</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="glass-card p-6 bg-white rounded-2xl border border-brand-blue-light/5 text-left relative overflow-hidden">
                <span className="absolute right-3 top-2 text-3xl font-black text-brand-blue/5 select-none">{s.num}</span>
                <div className="space-y-3">
                  <h4 className="font-bold text-sm text-brand-blue-dark font-heading border-b border-brand-blue/5 pb-2">
                    {s.title}
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Salary expectations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <BadgeDollarSign className="h-10 w-10 text-brand-gold mx-auto" />
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-brand-blue-dark">Salary Expectations by Destination</h2>
          <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">Average starting packages for overseas workers in high-demand domains.</p>
        </div>

        <div className="glass-card rounded-2xl bg-white border border-brand-blue-light/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-brand-blue-dark text-white font-heading">
                <tr>
                  <th className="p-4">Industry Sector / Job Role</th>
                  <th className="p-4">🇨🇦 Canada (CAD / Year)</th>
                  <th className="p-4">🇬🇧 United Kingdom (GBP / Year)</th>
                  <th className="p-4">🇦🇺 Australia (AUD / Year)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-600 font-semibold">
                {salaries.map((s, i) => (
                  <tr key={i} className="hover:bg-brand-blue/5 transition-colors">
                    <td className="p-4 font-bold text-brand-blue-dark">{s.role}</td>
                    <td className="p-4">{s.canada}</td>
                    <td className="p-4">{s.uk}</td>
                    <td className="p-4">{s.australia}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. ATS Resume Scorer & Lead Capture */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-6 sm:p-10 rounded-3xl border border-brand-gold/15 bg-white space-y-6 relative overflow-hidden">
          <div className="flex items-center space-x-2 border-b border-brand-blue/5 pb-4">
            <Flame className="h-6 w-6 text-brand-gold animate-bounce" />
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold font-heading text-brand-blue-dark">Interactive ATS Resume Scorer</h3>
              <p className="text-xs text-gray-500">Calculate your CV compatibility rating for overseas job placements.</p>
            </div>
          </div>

          {atsScore !== null ? (
            <div className="text-center py-10 space-y-6">
              <div className="h-28 w-28 rounded-full border-4 border-brand-gold bg-brand-blue/5 flex flex-col items-center justify-center mx-auto text-brand-blue-dark">
                <span className="text-3xl font-black">{atsScore}</span>
                <span className="text-[10px] uppercase font-bold text-gray-400">Score</span>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-bold text-md text-brand-blue-dark">
                  {atsScore >= 80 ? "Excellent Profile Structure! 🎉" : atsScore >= 65 ? "Good Compatibility (Need minor improvements)" : "Needs Optimization"}
                </h4>
                <p className="text-xs text-gray-500 max-w-md mx-auto">
                  {atsScore >= 80 
                    ? "Your skills match international job specifications closely. We have logged your score to the CRM database; our job placement coordinator will schedule a sponsor matching call." 
                    : "Your resume details are submitted. We recommend adding core technical action verbs and mapping experience chronologically. An advisor will contact you to optimize it."}
                </p>
              </div>

              <button
                onClick={() => setAtsScore(null)}
                className="px-6 py-2.5 rounded-xl border border-brand-blue-dark/15 text-xs font-bold text-brand-blue-dark hover:border-brand-gold"
              >
                Scan Another Profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleCvAnalyze} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-brand-blue-dark">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-50 border border-brand-blue-light/10 rounded-xl focus:outline-none focus:border-brand-gold text-xs sm:text-sm text-brand-blue-dark"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-brand-blue-dark">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-50 border border-brand-blue-light/10 rounded-xl focus:outline-none focus:border-brand-gold text-xs sm:text-sm text-brand-blue-dark"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-brand-blue-dark">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 9999"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-50 border border-brand-blue-light/10 rounded-xl focus:outline-none focus:border-brand-gold text-xs sm:text-sm text-brand-blue-dark"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-brand-blue-dark">Target Job Title</label>
                  <select
                    value={formData.jobTitle}
                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-50 border border-brand-blue-light/10 rounded-xl focus:outline-none focus:border-brand-gold text-xs sm:text-sm text-brand-blue-dark"
                  >
                    <option value="Software Engineer">Software Engineer</option>
                    <option value="Registered Nurse">Registered Nurse</option>
                    <option value="Construction Manager">Construction Manager</option>
                    <option value="Welder / Machinist">Welder / Machinist</option>
                    <option value="Accountant">Accountant / FinSpecialist</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-brand-blue-dark">Experience (Years)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 3"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-50 border border-brand-blue-light/10 rounded-xl focus:outline-none focus:border-brand-gold text-xs sm:text-sm text-brand-blue-dark"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-brand-blue-dark">Describe Core Skills &amp; Profile Summary</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Paste CV summary or list major job duties/technologies (e.g. AWS, Nodejs, Javascript, 4 years leading deployments...)"
                  value={formData.cvText}
                  onChange={(e) => setFormData({ ...formData, cvText: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-50 border border-brand-blue-light/10 rounded-xl focus:outline-none focus:border-brand-gold text-xs sm:text-sm text-brand-blue-dark resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={analyzing}
                className="w-full py-3.5 bg-gradient-gold text-brand-blue-dark font-extrabold rounded-xl hover:shadow-lg transition-all flex items-center justify-center space-x-2 text-xs sm:text-sm uppercase tracking-wider disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
                <span>{analyzing ? "Analyzing Resume Keywords..." : "Scan & Submit Profile"}</span>
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
