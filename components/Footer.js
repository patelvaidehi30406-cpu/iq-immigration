"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { GraduationCap, Mail, Phone, MapPin, ArrowRight, Globe } from "lucide-react";

// Facebook icon (not in lucide-react)
const FacebookIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073C24 5.445 18.627 0 12 0S0 5.445 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
  </svg>
);

// Instagram icon (not in lucide-react)
const InstagramIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

// LinkedIn icon (not in lucide-react)
const LinkedinIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

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
            <Link href="/" className="inline-block mb-2 hover:scale-105 transition-transform duration-300">
              <img src="/iq-logo-full-transparent.png" alt="IQ Education & Immigration Logo" className="h-12 w-auto object-contain bg-white/90 rounded-lg p-2" />
            </Link>
            <p className="text-sm text-gray-300 leading-relaxed">
              {t("footerTagline")} We help clients achieve their dreams of higher education abroad and secure international work permits through expert counseling and legal immigration pathways.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="h-9 w-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-gold hover:text-brand-blue-dark transition-all text-gray-300">
                <FacebookIcon className="h-4.5 w-4.5" />
              </a>
              <a href="https://instagram.com/iqeducationimmigration" target="_blank" rel="noreferrer" className="h-9 w-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-gold hover:text-brand-blue-dark transition-all text-gray-300">
                <InstagramIcon className="h-4.5 w-4.5" />
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-gold hover:text-brand-blue-dark transition-all text-gray-300">
                <LinkedinIcon className="h-4.5 w-4.5" />
              </a>
              <a href="https://iq-immigration.com" target="_blank" rel="noreferrer" className="h-9 w-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-gold hover:text-brand-blue-dark transition-all text-gray-300">
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
                  613, Accolade 2,<br />
                  Opp. Shell Petrol Pump,<br />
                  Nr Science City, Sola Road,<br />
                  Ahmedabad - 380060
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="font-bold text-brand-gold shrink-0 text-xs tracking-widest uppercase">Contact Person:</span>
                <span>Hitesh Patel</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-brand-gold shrink-0" />
                <a href="tel:+918799072887" className="hover:text-brand-gold transition-colors">
                  +91 87990 72887
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-brand-gold shrink-0" />
                <a href="mailto:info@iq-immigration.com" className="hover:text-brand-gold transition-colors">
                  info@iq-immigration.com
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
