"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { GraduationCap, Mail, Phone, MapPin, ArrowRight, Facebook, Instagram, Linkedin, Globe } from "lucide-react";

export default function Footer() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const countries = [
    { name: "Canada", path: "/study-abroad?tab=canada" },
    { name: "Australia", path: "/study-abroad?tab=australia" },
    { name: "United Kingdom", path: "/study-abroad?tab=united-kingdom" },
    { name: "New Zealand", path: "/study-abroad?tab=new-zealand" },
    { name: "Germany", path: "/study-abroad?tab=germany" },
    { name: "Russia", path: "/study-abroad?tab=russia" }
  ];

  return (
    <footer className="bg-brand-blue-dark text-white border-t border-brand-gold/20">
      {/* Top Banner with Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2">
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-brand-gold">
              Stay Updated with Immigration Rules & Visa Intakes
            </h3>
            <p className="mt-2 text-sm text-gray-300 max-w-xl">
              Subscribe to our monthly newsletter to get the latest visa policy updates, express entry draw scores, and university admissions details.
            </p>
          </div>
          <div>
            <form onSubmit={handleSubscribe} className="flex relative">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-l-lg focus:outline-none focus:border-brand-gold text-sm text-white placeholder-gray-400"
              />
              <button
                type="submit"
                className="px-5 bg-gradient-gold text-brand-blue-dark font-bold text-sm rounded-r-lg hover:shadow-lg transition-all duration-300 flex items-center"
              >
                {subscribed ? "Subscribed!" : <ArrowRight className="h-5 w-5" />}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & About */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-lg bg-gradient-premium flex items-center justify-center border border-brand-gold/30">
                <GraduationCap className="h-6 w-6 text-brand-gold" />
              </div>
              <div>
                <span className="text-xl font-extrabold text-white tracking-tight leading-none block">
                  IQ <span className="text-brand-gold font-normal">EDUCATION</span>
                </span>
                <span className="text-[10px] uppercase font-bold text-brand-gold-light/70 tracking-widest block">
                  &amp; Immigration
                </span>
              </div>
            </Link>
            <p className="text-sm text-gray-300 leading-relaxed">
              {t("footerTagline")} We help clients achieve their dreams of higher education abroad and secure international work permits through expert counseling and legal immigration pathways.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="h-9 w-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-gold hover:text-brand-blue-dark transition-all text-gray-300">
                <Facebook className="h-4.5 w-4.5" />
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-gold hover:text-brand-blue-dark transition-all text-gray-300">
                <Instagram className="h-4.5 w-4.5" />
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-gold hover:text-brand-blue-dark transition-all text-gray-300">
                <Linkedin className="h-4.5 w-4.5" />
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-gold hover:text-brand-blue-dark transition-all text-gray-300">
                <Globe className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-md font-bold uppercase tracking-wider text-brand-gold font-heading mb-6">
              Our Services
            </h4>
            <ul className="space-y-3.5 text-sm text-gray-300">
              <li>
                <Link href="/study-abroad" className="hover:text-brand-gold transition-colors">Study Visa Guidance</Link>
              </li>
              <li>
                <Link href="/work-permit" className="hover:text-brand-gold transition-colors">Skilled Worker Programs</Link>
              </li>
              <li>
                <Link href="/work-permit" className="hover:text-brand-gold transition-colors">LMIA Sponsorship Assistance</Link>
              </li>
              <li>
                <Link href="/visitor-visa" className="hover:text-brand-gold transition-colors">Visitor &amp; Business Visas</Link>
              </li>
              <li>
                <Link href="/eligibility" className="hover:text-brand-gold transition-colors">Eligibility Assessments</Link>
              </li>
            </ul>
          </div>

          {/* Study Countries */}
          <div>
            <h4 className="text-md font-bold uppercase tracking-wider text-brand-gold font-heading mb-6">
              Study Abroad
            </h4>
            <ul className="space-y-3.5 text-sm text-gray-300">
              {countries.map((c) => (
                <li key={c.name}>
                  <Link href={c.path} className="hover:text-brand-gold transition-colors">
                    Education in {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-md font-bold uppercase tracking-wider text-brand-gold font-heading mb-6">
              Corporate Office
            </h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                <span>
                  405-407, Premium Corporate Hub,<br />
                  C.G. Road, Navrangpura,<br />
                  Ahmedabad, Gujarat - 380009
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-brand-gold shrink-0" />
                <a href="tel:+917940008888" className="hover:text-brand-gold transition-colors">
                  +91 79 4000 8888
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-brand-gold shrink-0" />
                <a href="mailto:info@iqeducation.in" className="hover:text-brand-gold transition-colors">
                  info@iqeducation.in
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Sub-footer */}
      <div className="bg-[#051121] py-6 border-t border-white/5 text-center text-xs text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            {t("footerCopyright")} Registered Visa &amp; Legal Immigration Consultants.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
