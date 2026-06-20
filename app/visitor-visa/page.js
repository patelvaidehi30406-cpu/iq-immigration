"use client";

import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { db } from "../../services/db";
import { Plane, Users, Building, ShieldCheck, Clock, FileText, Send, Sparkles } from "lucide-react";

export default function VisitorVisaPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("tourist");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "Canada",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    db.addLead({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      preferredCountry: formData.country,
      type: `Visitor Visa (${activeTab.toUpperCase()})`,
      score: `Inquiry details: ${formData.message}`,
      status: "New"
    });
    setFormData({ name: "", email: "", phone: "", country: "Canada", message: "" });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const tabsData = {
    tourist: {
      title: "Tourist Visa Services",
      desc: "For individuals looking to travel, explore landscapes, and holiday abroad. We manage everything from flight routing itineraries to accommodation bookings proof.",
      icon: Plane,
      processing: "15 to 30 days (depending on destination embassy loads).",
      checklist: [
        "6 Months bank statements showing sufficient travel balance",
        "Day-wise travel itinerary & hotel reservation copies",
        "Employment verification letters or business registry proofs",
        "Income tax return (ITR) filings of past 2 years",
        "Return flight tickets booking confirmation"
      ]
    },
    family: {
      title: "Family Visit Visas",
      desc: "For clients looking to visit children, siblings, or parents settled abroad. Focuses heavily on sponsor eligibility verification.",
      icon: Users,
      processing: "15 to 45 days. Schengen & UK priority options available.",
      checklist: [
        "Official invitation letter from the host abroad",
        "Host's passport copy & citizenship / visa permit status",
        "Proof of relationship (Birth certificates, marriage certificates)",
        "Proof of accommodation size / utility billing of host",
        "Host's employment and tax proof (if financially sponsoring you)"
      ]
    },
    business: {
      title: "Business Visit Visas",
      desc: "For delegates visiting overseas offices, executing corporate deals, attending training seminars, or exploring trade fairs.",
      icon: Building,
      processing: "7 to 15 days. Express processing highly active.",
      checklist: [
        "Formal invitation letter from the foreign host company",
        "No-objection certificate (NOC) from Indian employer company",
        "Corporate registry / Incorporation documents of both entities",
        "Event ticket bookings or exhibition registration badge",
        "Corporate bank statements showing sufficient operational capital"
      ]
    }
  };

  const activeContent = tabsData[activeTab] || tabsData.tourist;

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Header Hero */}
      <section className="bg-gradient-premium py-16 text-white text-center border-b border-brand-gold/15 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.1),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-gold">Fast Track Visas</span>
          <h1 className="text-4xl font-extrabold font-heading text-white">Visitor &amp; Business Visas</h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto">
            Travel stress-free. We provide precise verification of sponsorship letters, financial proofs, and travel ties to ensure maximum approvals.
          </p>
        </div>
      </section>

      {/* 2. Navigation Pills */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-2xl mx-auto border border-brand-blue-light/10 p-1.5 bg-white rounded-2xl">
          {[
            { id: "tourist", label: "Tourist", icon: Plane },
            { id: "family", label: "Family", icon: Users },
            { id: "business", label: "Business", icon: Building }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2.5 sm:py-3.5 rounded-xl text-xs sm:text-sm font-bold flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2 transition-all ${
                activeTab === tab.id
                  ? "bg-brand-blue text-brand-gold font-extrabold shadow-md"
                  : "text-brand-blue-dark hover:bg-gray-50"
              }`}
            >
              <tab.icon className="h-4 w-4 shrink-0" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 3. Details Content Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Details Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-card p-6 sm:p-8 rounded-3xl bg-white border border-brand-blue-light/5 space-y-6">
              <div className="flex items-center space-x-3 border-b border-brand-blue/5 pb-4">
                <div className="h-10 w-10 rounded-xl bg-brand-blue/5 border border-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0">
                  <activeContent.icon className="h-5 w-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-brand-blue-dark font-heading">
                  {activeContent.title}
                </h2>
              </div>
              
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {activeContent.desc}
              </p>

              {/* Processing times card */}
              <div className="p-4 bg-brand-blue/5 rounded-2xl border border-brand-blue-light/5 flex items-center space-x-3 text-brand-blue-dark">
                <Clock className="h-5 w-5 text-brand-gold shrink-0" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400">Processing Time</p>
                  <p className="text-xs sm:text-sm font-bold">{activeContent.processing}</p>
                </div>
              </div>
            </div>

            {/* Checklist Box */}
            <div className="glass-card p-6 sm:p-8 rounded-3xl bg-white border border-brand-blue-light/5 space-y-4">
              <h3 className="text-md sm:text-lg font-bold font-heading text-brand-blue-dark flex items-center space-x-2 border-b border-brand-blue/5 pb-3">
                <FileText className="h-5 w-5 text-brand-gold" />
                <span>Required Documentation Checklist</span>
              </h3>
              <ul className="space-y-3.5">
                {activeContent.checklist.map((item, i) => (
                  <li key={i} className="flex items-start space-x-2.5 text-xs sm:text-sm text-gray-600">
                    <ShieldCheck className="h-4 w-4 text-brand-gold shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick Quote Sidebar */}
          <div className="lg:col-span-5">
            <div className="glass-card p-6 sm:p-8 rounded-3xl bg-white border border-brand-blue-light/5 space-y-6">
              <div>
                <h3 className="text-lg font-bold font-heading text-brand-blue-dark">Quick Visitor Visa Inquiry</h3>
                <p className="text-xs text-gray-400">Select target country and request assistance.</p>
              </div>

              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="h-12 w-12 bg-brand-gold/15 rounded-full flex items-center justify-center mx-auto text-brand-gold">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <h4 className="font-bold text-brand-blue-dark">Inquiry Registered!</h4>
                  <p className="text-xs text-gray-500 max-w-xs mx-auto">
                    Thanks for contacting IQ Visitor visa desk. One of our destination specialists will call you within 2 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
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

                  <div className="grid grid-cols-2 gap-4">
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
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-blue-dark">Phone</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 9999"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-50 border border-brand-blue-light/10 rounded-xl focus:outline-none focus:border-brand-gold text-xs sm:text-sm text-brand-blue-dark"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-brand-blue-dark">Preferred Travel Destination</label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-brand-blue-light/10 rounded-xl focus:outline-none focus:border-brand-gold text-xs sm:text-sm text-brand-blue-dark font-semibold"
                    >
                      <option value="Canada">Canada 🇨🇦</option>
                      <option value="United Kingdom">United Kingdom 🇬🇧</option>
                      <option value="United States">United States 🇺🇸</option>
                      <option value="Europe / Schengen">Europe (Schengen) 🇪🇺</option>
                      <option value="Australia">Australia 🇦🇺</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-brand-blue-dark">Message / Specific Dates</label>
                    <textarea
                      rows="3"
                      placeholder="e.g. Planning tourist visit to Toronto in December for 15 days..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-50 border border-brand-blue-light/10 rounded-xl focus:outline-none focus:border-brand-gold text-xs sm:text-sm text-brand-blue-dark resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-gold text-brand-blue-dark font-extrabold rounded-xl hover:shadow-lg transition-all text-xs uppercase tracking-wider flex items-center justify-center space-x-1"
                  >
                    <Send className="h-4.5 w-4.5" />
                    <span>Submit Travel Inquiry</span>
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
