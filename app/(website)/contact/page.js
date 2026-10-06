"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { db } from "@/services/db";
import { Phone, Mail, MapPin, Send, Sparkles, Clock, Globe } from "lucide-react";

// Social icons not available in lucide-react
const FacebookIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073C24 5.445 18.627 0 12 0S0 5.445 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
);
const InstagramIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
);
const LinkedinIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
);

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

  // IQ Education WhatsApp Business Number
  const WHATSAPP_NUMBER = "918799072887"; // +91 87990 72887 (no + or spaces)

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save to CRM as before
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

    // Build WhatsApp message with all form details
    const waMessage =
      `🌟 *New Inquiry - IQ Education*\n\n` +
      `👤 *Name:* ${formData.name}\n` +
      `📧 *Email:* ${formData.email}\n` +
      `📞 *Phone:* ${formData.phone}\n` +
      `🌍 *Preferred Country:* ${formData.country}\n` +
      `🎓 *Service Required:* ${formData.service}\n` +
      `💬 *Message:*\n${formData.message}\n\n` +
      `_Sent via IQ Education Contact Form_`;

    // Encode message for URL
    const encodedMsg = encodeURIComponent(waMessage);

    // Open WhatsApp (works on mobile app & WhatsApp Web on desktop)
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`, "_blank");

    // Reset form and show success
    setFormData({ name: "", email: "", phone: "", country: "Canada", service: "Study Abroad", message: "" });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 6000);
  };

  const branches = [
    {
      city: "Ahmedabad (Head Office)",
      address: "613, Accolade 2, Opp. Shell Petrol Pump, Nr Science City, Sola Road, Ahmedabad - 380060",
      phone: "+91 87990 72887",
      email: "info@iq-immigration.com",
      contactPerson: "Hitesh Patel"
    }
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Header Hero */}
      <section className="bg-gradient-premium py-20 text-white text-center border-b border-brand-gold/15 relative overflow-hidden">
        {/* Holographic World Map Background */}
        <div className="absolute inset-0 pointer-events-none opacity-10 select-none flex items-center justify-center mix-blend-screen z-0">
          <svg viewBox="0 0 1000 500" className="w-full h-full object-cover" fill="none" stroke="#D4AF37" strokeWidth="1" style={{ filter: "drop-shadow(0 0 8px rgba(212,175,55,0.8))" }}>
            <path d="M 150 150 Q 180 80 250 100 T 320 180 T 280 250 T 150 280 T 100 200 Z" strokeDasharray="4 4" />
            <path d="M 450 250 Q 520 180 600 200 T 680 280 T 620 380 T 450 350 Z" />
            <path d="M 720 120 Q 800 80 880 120 T 920 220 T 800 280 T 720 200 Z" strokeDasharray="6 6" />
          </svg>
        </div>
        
        {/* Floating Flags */}
        <img src="https://flagcdn.com/w80/ca.png" alt="Canada" className="absolute top-[20%] left-[15%] w-12 h-12 rounded-full object-cover shadow-[0_0_15px_rgba(255,255,255,0.2)] animate-bounce" style={{ animationDuration: '4s' }} />
        <img src="https://flagcdn.com/w80/au.png" alt="Australia" className="absolute bottom-[20%] right-[20%] w-10 h-10 rounded-full object-cover shadow-[0_0_15px_rgba(255,255,255,0.2)] animate-bounce" style={{ animationDuration: '5s', animationDelay: '1s' }} />
        <img src="https://flagcdn.com/w80/gb.png" alt="UK" className="absolute top-[30%] right-[15%] w-14 h-14 rounded-full object-cover shadow-[0_0_15px_rgba(255,255,255,0.2)] animate-bounce" style={{ animationDuration: '6s', animationDelay: '2s' }} />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.1),transparent_70%)] z-0" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full border border-brand-gold/30 backdrop-blur-sm inline-block">Get In Touch</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-white drop-shadow-md">Connect With IQ Education</h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto leading-relaxed">
            Your global journey begins here. Reach out to our expert immigration consultants for a confidential profile assessment.
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
                <div key={i} className="glass-card p-6 sm:p-8 bg-white rounded-3xl border border-brand-blue-light/10 shadow-[0_10px_40px_rgba(0,0,0,0.06)] space-y-5 hover:border-brand-gold/40 transition-colors group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform" />
                  
                  <h3 className="text-lg sm:text-xl font-bold text-brand-blue-dark font-heading border-b border-brand-blue/5 pb-3 flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <span className="bg-brand-blue-dark text-brand-gold p-2 rounded-xl"><MapPin className="h-5 w-5" /></span>
                      {b.city}
                    </span>
                    <Clock className="h-5 w-5 text-brand-gold/50" />
                  </h3>
                  
                  <ul className="space-y-3.5 text-sm text-gray-600 font-medium">
                    <li className="flex items-start space-x-3">
                      <div className="h-6 w-6 rounded-full bg-brand-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                        <MapPin className="h-3 w-3 text-brand-gold" />
                      </div>
                      <span className="leading-relaxed">{b.address}</span>
                    </li>
                    {b.contactPerson && (
                      <li className="flex items-center space-x-3">
                        <div className="h-6 w-6 rounded-full bg-brand-gold/10 flex items-center justify-center shrink-0">
                          <span className="text-[10px]">👤</span>
                        </div>
                        <span>Contact Person: <strong className="text-brand-blue-dark">{b.contactPerson}</strong></span>
                      </li>
                    )}
                    <li className="flex items-center space-x-3">
                      <div className="h-6 w-6 rounded-full bg-brand-gold/10 flex items-center justify-center shrink-0">
                        <Phone className="h-3 w-3 text-brand-gold" />
                      </div>
                      <a href={`tel:${b.phone.replace(/ /g, "")}`} className="hover:text-brand-gold transition-colors">
                        {b.phone}
                      </a>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="h-6 w-6 rounded-full bg-brand-gold/10 flex items-center justify-center shrink-0">
                        <Mail className="h-3 w-3 text-brand-gold" />
                      </div>
                      <a href={`mailto:${b.email}`} className="hover:text-brand-gold transition-colors">
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
                  <FacebookIcon className="h-4.5 w-4.5 text-brand-gold" />
                </a>
                <a href="https://instagram.com/iqeducationimmigration" target="_blank" rel="noreferrer" className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-gold hover:text-brand-blue-dark transition-all">
                  <InstagramIcon className="h-4.5 w-4.5 text-brand-gold" />
                </a>
                <a href="#" className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-gold hover:text-brand-blue-dark transition-all">
                  <LinkedinIcon className="h-4.5 w-4.5 text-brand-gold" />
                </a>
                <a href="https://iq-immigration.com" target="_blank" rel="noreferrer" className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-gold hover:text-brand-blue-dark transition-all">
                  <Globe className="h-4.5 w-4.5 text-brand-gold" />
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
                  <div className="h-14 w-14 rounded-full flex items-center justify-center mx-auto border-2 border-green-400 bg-green-50" style={{ fontSize: '1.8rem' }}>
                    💬
                  </div>
                  <h4 className="font-extrabold text-brand-blue-dark text-lg font-heading">WhatsApp Opened! ✅</h4>
                  <p className="text-xs text-gray-500 max-w-xs mx-auto">
                    Your details have been sent to WhatsApp. Please press <strong>Send</strong> in the WhatsApp window to complete your inquiry. We will respond shortly!
                  </p>
                  <p className="text-[10px] text-gray-400">
                    (Details also saved in our CRM system)
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
                    className="w-full py-3.5 font-extrabold rounded-xl hover:shadow-lg transition-all text-xs uppercase tracking-wider flex items-center justify-center space-x-2"
                    style={{ background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)', color: '#fff' }}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                    <span>Send via WhatsApp</span>
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
