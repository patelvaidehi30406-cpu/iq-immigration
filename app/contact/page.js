"use client";

import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { db } from "../../services/db";
import { Phone, Mail, MapPin, Send, Sparkles, Clock, Globe, Facebook, Instagram, Linkedin } from "lucide-react";

export default function ContactPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "Canada",
    service: "Study Abroad",
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
      education: `Service: ${formData.service}`,
      ielts: "Contact Form",
      type: "Contact Page Inquiry",
      score: `Inquiry message details: ${formData.message}`,
      status: "New"
    });
    setFormData({ name: "", email: "", phone: "", country: "Canada", service: "Study Abroad", message: "" });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const branches = [
    {
      city: "Ahmedabad (HQ)",
      address: "405-407, Premium Corporate Hub, C.G. Road, Navrangpura, Ahmedabad, Gujarat - 380009",
      phone: "+91 79 4000 8888",
      email: "ahd@iqeducation.in"
    },
    {
      city: "Surat Branch",
      address: "302, Diamond Business Court, Ring Road, Surat, Gujarat - 395002",
      phone: "+91 261 400 9999",
      email: "surat@iqeducation.in"
    },
    {
      city: "Vadodara Branch",
      address: "105, Alkapuri Arcade, R.C. Dutt Road, Vadodara, Gujarat - 390007",
      phone: "+91 265 400 7777",
      email: "baroda@iqeducation.in"
    }
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Header Hero */}
      <section className="bg-gradient-premium py-16 text-white text-center border-b border-brand-gold/15 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.1),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-gold">Get In Touch</span>
          <h1 className="text-4xl font-extrabold font-heading text-white">Contact Our Counseling Branches</h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto">
            Find details of our corporate branches across Gujarat. Walk in for a free face-to-face visa counseling session.
          </p>
        </div>
      </section>

      {/* 2. Contact Details & Inquiry Form Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Branches Information */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-brand-blue-dark font-heading">
              Our Locations &amp; Branch Offices
            </h2>
            
            <div className="space-y-6">
              {branches.map((b, i) => (
                <div key={i} className="glass-card p-6 bg-white rounded-2xl border border-brand-blue-light/5 space-y-3.5">
                  <h3 className="text-base sm:text-lg font-bold text-brand-gold font-heading border-b border-brand-blue/5 pb-2 flex justify-between items-center">
                    <span>{b.city}</span>
                    <Clock className="h-4.5 w-4.5 text-gray-400" />
                  </h3>
                  
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
                    <li className="flex items-start space-x-2.5">
                      <MapPin className="h-4.5 w-4.5 text-brand-gold shrink-0 mt-0.5" />
                      <span>{b.address}</span>
                    </li>
                    <li className="flex items-center space-x-2.5">
                      <Phone className="h-4.5 w-4.5 text-brand-gold shrink-0" />
                      <a href={`tel:${b.phone.replace(/ /g, "")}`} className="hover:text-brand-gold font-semibold transition-colors">
                        {b.phone}
                      </a>
                    </li>
                    <li className="flex items-center space-x-2.5">
                      <Mail className="h-4.5 w-4.5 text-brand-gold shrink-0" />
                      <a href={`mailto:${b.email}`} className="hover:text-brand-gold font-semibold transition-colors">
                        {b.email}
                      </a>
                    </li>
                  </ul>
                </div>
              ))}
            </div>

            {/* Social & Support Card */}
            <div className="glass-card p-6 bg-brand-blue-dark text-white rounded-2xl border border-brand-gold/15 space-y-4">
              <h3 className="text-md font-bold font-heading text-brand-gold">Connect on Social Channels</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Follow our official accounts to watch live streams regarding immigration updates, refusal cases analysis, and student draw declarations.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-gold hover:text-brand-blue-dark transition-all">
                  <Facebook className="h-4.5 w-4.5 text-brand-gold" />
                </a>
                <a href="#" className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-gold hover:text-brand-blue-dark transition-all">
                  <Instagram className="h-4.5 w-4.5 text-brand-gold" />
                </a>
                <a href="#" className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-gold hover:text-brand-blue-dark transition-all">
                  <Linkedin className="h-4.5 w-4.5 text-brand-gold" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Inquiry form */}
          <div className="lg:col-span-6">
            <div className="glass-card p-6 sm:p-8 rounded-3xl bg-white border border-brand-blue-light/5 space-y-6">
              <div>
                <h3 className="text-xl font-bold font-heading text-brand-blue-dark">Corporate File Assessment Form</h3>
                <p className="text-xs text-gray-400">Fill details to register your visa query in our digital queue.</p>
              </div>

              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="h-14 w-14 bg-brand-gold/20 rounded-full flex items-center justify-center mx-auto text-brand-gold border border-brand-gold/30">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <h4 className="font-extrabold text-brand-blue-dark text-lg font-heading">Lead Registered!</h4>
                  <p className="text-xs text-gray-500 max-w-xs mx-auto">
                    Thank you. We have saved your lead details in the CRM. Our branch counselor will call you on the registered phone number shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-brand-blue-dark uppercase">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-brand-blue-light/10 rounded-xl focus:outline-none focus:border-brand-gold text-xs sm:text-sm text-brand-blue-dark"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-blue-dark uppercase">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-brand-blue-light/10 rounded-xl focus:outline-none focus:border-brand-gold text-xs sm:text-sm text-brand-blue-dark"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-blue-dark uppercase">Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 99999"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-brand-blue-light/10 rounded-xl focus:outline-none focus:border-brand-gold text-xs sm:text-sm text-brand-blue-dark"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-blue-dark uppercase">Preferred Country</label>
                      <select
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-brand-blue-light/10 rounded-xl focus:outline-none focus:border-brand-gold text-xs sm:text-sm text-brand-blue-dark font-semibold"
                      >
                        <option value="Canada">Canada 🇨🇦</option>
                        <option value="United Kingdom">United Kingdom 🇬🇧</option>
                        <option value="Australia">Australia 🇦🇺</option>
                        <option value="Germany">Germany 🇩🇪</option>
                        <option value="New Zealand">New Zealand 🇳🇿</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-blue-dark uppercase">Service Type</label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-brand-blue-light/10 rounded-xl focus:outline-none focus:border-brand-gold text-xs sm:text-sm text-brand-blue-dark font-semibold"
                      >
                        <option value="Study Abroad">Study Abroad guidance</option>
                        <option value="Work Permit">Work Permit / LMIA</option>
                        <option value="Visitor Visa">Visitor / Tourist visa</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-brand-blue-dark uppercase">Message Details</label>
                    <textarea
                      rows="4"
                      required
                      placeholder="Share details of your educational stream, IELTS bands, or work background..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-50 border border-brand-blue-light/10 rounded-xl focus:outline-none focus:border-brand-gold text-xs sm:text-sm text-brand-blue-dark resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-gold text-brand-blue-dark font-extrabold rounded-xl hover:shadow-lg transition-all text-xs uppercase tracking-wider flex items-center justify-center space-x-1"
                  >
                    <Send className="h-4.5 w-4.5" />
                    <span>File Contact Lead</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* 3. Google Maps Iframe */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-2 bg-white rounded-3xl border border-brand-blue-light/10 shadow-xl overflow-hidden h-[350px]">
          <iframe
            title="IQ Corporate Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.6979201509935!2d72.55468551128362!3d23.034860715783307!2m3!1f0!2f0!3f0!3m2!1i1024|2i768!4f13.1!3m3!1m2!1s0x395e84f509e5ee9d%3A0xe54d24177b9d365!2sChimanlal%20Girdharlal%20Rd%2C%20Ahmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1718873099999!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-2xl"
          />
        </div>
      </section>
    </div>
  );
}
