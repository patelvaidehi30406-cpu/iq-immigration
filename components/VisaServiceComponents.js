"use client";

import React, { useState } from "react";
import { CheckCircle2, ChevronDown } from "lucide-react";
import { db } from "@/services/db";

export function FAQAccordion({ faq }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl mb-3 overflow-hidden transition-all bg-white hover:border-brand-blue-light/30 shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between bg-white text-left focus:outline-none"
      >
        <span className="font-bold text-sm text-brand-blue-dark pr-8">{faq.q}</span>
        <ChevronDown className={`h-5 w-5 text-brand-gold transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0'}`}>
        <p className="px-5 text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-3">{faq.a}</p>
      </div>
    </div>
  );
}

export function ApplyForm({ visaTitle }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    db.addLead({
      name: form.name,
      email: form.email,
      phone: form.phone,
      type: `${visaTitle} Inquiry`,
      score: form.message,
      status: "New",
    });

    const waMsg =
      `🛂 *${visaTitle} Inquiry — IQ Education*\n\n` +
      `👤 *Name:* ${form.name}\n` +
      `📞 *Phone:* ${form.phone}\n` +
      `📧 *Email:* ${form.email}\n` +
      `💬 *Query:* ${form.message}\n\n` +
      `_Sent via IQ Education Services Page_`;
    window.open(`https://wa.me/918799072887?text=${encodeURIComponent(waMsg)}`, "_blank");

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center space-y-4 border border-gray-100">
        <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="h-8 w-8 text-green-500" />
        </div>
        <h3 className="text-lg font-bold text-brand-blue-dark">Submitted Successfully!</h3>
        <p className="text-sm text-gray-500">Our counselor will call you within 2 hours.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="bg-brand-blue-dark px-6 py-4">
        <h3 className="text-lg font-bold text-white text-center">Get Free Consultation</h3>
        <p className="text-xs text-gray-400 text-center mt-1">For {visaTitle}</p>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div>
          <label className="text-xs font-bold text-gray-600 uppercase tracking-wide block mb-1">Full Name *</label>
          <input type="text" required placeholder="Your Full Name"
            value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-blue-dark" />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-600 uppercase tracking-wide block mb-1">Phone Number *</label>
          <input type="tel" required placeholder="+91 99999 88888"
            value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-blue-dark" />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-600 uppercase tracking-wide block mb-1">Email Address *</label>
          <input type="email" required placeholder="your@email.com"
            value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-blue-dark" />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-600 uppercase tracking-wide block mb-1">Your Query</label>
          <textarea rows={3} placeholder={`Tell us about your ${visaTitle} needs...`}
            value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-blue-dark resize-none" />
        </div>
        <button type="submit"
          className="w-full py-3 bg-brand-gold hover:bg-brand-gold/90 text-white font-bold rounded-lg text-sm transition-all hover:scale-[1.02]">
          Request Callback →
        </button>
        <p className="text-[10px] text-gray-400 text-center">100% confidential · No spam · Reply in 2 hours</p>
      </form>
    </div>
  );
}
