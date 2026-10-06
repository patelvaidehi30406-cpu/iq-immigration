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

export function ApplyForm({ countryName }) {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", service: "Student Visa" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    db.addLead({
      name: `${form.firstName} ${form.lastName}`,
      email: form.email,
      phone: form.phone,
      preferredCountry: countryName,
      type: `Study in ${countryName} Application`,
      score: `Service: ${form.service}`,
      status: "New",
    });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center space-y-4">
        <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="h-8 w-8 text-green-500" />
        </div>
        <h3 className="text-xl font-bold text-brand-blue-dark">Application Submitted!</h3>
        <p className="text-sm text-gray-500">Our counselor will contact you within 2 business hours.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-brand-blue-dark px-6 py-4">
        <h3 className="text-xl font-bold text-white text-center font-heading">Apply Now</h3>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Your Name <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                type="text" required placeholder="First"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-brand-blue-dark"
              />
            </div>
            <div>
              <input
                type="text" required placeholder="Last"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-brand-blue-dark"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email" required placeholder="your.email@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-brand-blue-dark"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel" required placeholder="+91 99999 88888"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-brand-blue-dark"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Service Needed</label>
          <select
            value={form.service}
            onChange={(e) => setForm({ ...form, service: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-brand-blue-dark bg-white"
          >
            <option>Student Visa</option>
            <option>University Admissions</option>
            <option>SOP & LOR Writing</option>
            <option>IELTS Coaching</option>
            <option>Scholarship Assistance</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-brand-gold hover:bg-brand-gold/90 text-white font-bold rounded-md text-sm transition-all hover:scale-[1.02]"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
