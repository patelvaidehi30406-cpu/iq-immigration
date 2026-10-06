"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";
import { Menu, X, Globe, User, ChevronDown, ChevronRight } from "lucide-react";

// ── Services mega-menu data ────────────────────────────────────────────────
const servicesMenu = [
  {
    label: "Students Visa",
    href: "/services/student-visa",
    sub: [
      { label: "Study in USA",       href: "/study-abroad/usa" },
      { label: "Study in Canada",    href: "/study-abroad/canada" },
      { label: "Study in Europe",    href: "/study-abroad/europe" },
      { label: "Study in UK",        href: "/study-abroad/uk" },
      { label: "Study in Australia", href: "/study-abroad/australia" },
      { label: "Study in Germany",   href: "/study-abroad/germany" },
      { label: "Study in Dubai",     href: "/study-abroad/dubai" },
    ],
  },
  {
    label: "Extension Visa",
    href: "/services/extension-visa",
    sub: [
      { label: "Extension Work Permit",  href: "/services/extension-visa" },
      { label: "Study Permit Extension", href: "/services/extension-visa" },
    ],
  },
  {
    label: "Visit Visa",
    href: "/services/visit-visa",
    sub: [],
  },
  {
    label: "Super Visa",
    href: "/services/super-visa",
    sub: [],
  },
  {
    label: "Work Visa",
    href: "/services/work-permit",
    sub: [
      { label: "Open Work Permit",   href: "/services/work-permit" },
      { label: "Closed Work Permit", href: "/services/work-permit" },
      { label: "PGWP",               href: "/services/work-permit" },
    ],
  },
  {
    label: "Permanent Residence (PR)",
    href: "/services/permanent-residence",
    sub: [
      { label: "PR Dependent Family Class", href: "/services/permanent-residence" },
      { label: "Express Entry",            href: "/services/permanent-residence" },
      { label: "Provincial Nominee (PNP)", href: "/services/permanent-residence" },
    ],
  },
];

// ── Services Dropdown Component ────────────────────────────────────────────
function ServicesDropdown() {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setActiveItem(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative" onMouseLeave={() => { setOpen(false); setActiveItem(null); }}>
      {/* Trigger */}
      <button
        onMouseEnter={() => setOpen(true)}
        onClick={() => setOpen((p) => !p)}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
          open
            ? "text-brand-gold bg-brand-blue/5"
            : "text-brand-blue-dark hover:text-brand-gold hover:bg-brand-blue/5"
        }`}
      >
        Services
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute top-full left-0 mt-1 z-50 flex shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
          {/* Left column — category list */}
          <div className="w-56 bg-white py-2">
            {servicesMenu.map((item, i) => (
              <div
                key={i}
                onMouseEnter={() => setActiveItem(i)}
                className={`flex items-center justify-between px-5 py-3 cursor-pointer transition-colors text-sm font-medium select-none ${
                  activeItem === i
                    ? "bg-gray-50 text-brand-blue-dark"
                    : "text-gray-700 hover:bg-gray-50 hover:text-brand-blue-dark"
                }`}
              >
                <Link
                  href={item.href}
                  className="flex-1"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
                {item.sub.length > 0 && (
                  <ChevronDown className="h-3.5 w-3.5 text-gray-400 -rotate-90 ml-2 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>

          {/* Right flyout — sub items */}
          {activeItem !== null && servicesMenu[activeItem].sub.length > 0 && (
            <div className="w-52 bg-gray-50 border-l border-gray-100 py-2">
              {servicesMenu[activeItem].sub.map((sub, j) => (
                <Link
                  key={j}
                  href={sub.href}
                  onClick={() => { setOpen(false); setActiveItem(null); }}
                  className="block px-5 py-3 text-sm text-gray-700 hover:text-brand-blue-dark hover:bg-white transition-colors font-medium"
                >
                  {sub.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Mobile Services Accordion ──────────────────────────────────────────────
function MobileServicesAccordion({ onClose }) {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  return (
    <div className="border border-brand-blue/10 rounded-xl overflow-hidden">
      {/* Header toggle */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-4 py-3 text-brand-blue-dark font-semibold text-sm bg-brand-blue/5"
      >
        <span>Services</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="bg-white divide-y divide-gray-50">
          {servicesMenu.map((item, i) => (
            <div key={i}>
              <button
                onClick={() => setActiveItem(activeItem === i ? null : i)}
                className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:text-brand-blue-dark"
              >
                <Link href={item.href} onClick={onClose} className="flex-1 text-left">
                  {item.label}
                </Link>
                {item.sub.length > 0 && (
                  <ChevronDown className={`h-3.5 w-3.5 text-gray-400 transition-transform ${activeItem === i ? "rotate-180" : ""}`} />
                )}
              </button>
              {activeItem === i && item.sub.length > 0 && (
                <div className="bg-gray-50 pl-6 divide-y divide-gray-100">
                  {item.sub.map((sub, j) => (
                    <Link
                      key={j}
                      href={sub.href}
                      onClick={onClose}
                      className="block py-2.5 text-xs text-gray-600 hover:text-brand-blue-dark font-medium"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main Header ────────────────────────────────────────────────────────────
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { language, changeLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("navHome"),    path: "/" },
    { name: "Programs",      path: "/programs" },
    { name: t("navAbout"),   path: "/about" },
    { name: t("navStudy"),   path: "/study-abroad" },
    { name: t("navCRS"),     path: "/crs-calculator" },
    { name: t("navSuccess"), path: "/success-stories" },
    { name: t("navBlog"),    path: "/blog" },
    { name: t("navContact"), path: "/contact" },
  ];

  const handleLangChange = (lang) => changeLanguage(lang);

  const isActive = (path) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <header
      className={`transition-all duration-300 w-full ${
        scrolled ? "glass-nav py-3 shadow-md" : "bg-white/80 backdrop-blur-sm py-4 border-b border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="inline-block hover:scale-105 transition-transform duration-300">
            <img src="/iq-logo-full.png" alt="IQ Education & Immigration Logo" className="h-9 w-auto object-contain mix-blend-multiply" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1 xl:space-x-2 items-center">
            {/* Regular nav links */}
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors relative flex items-center ${
                  isActive(link.path)
                    ? "text-brand-gold bg-brand-blue/5 border-b-2 border-brand-gold"
                    : "text-brand-blue-dark hover:text-brand-gold hover:bg-brand-blue/5"
                }`}
              >
                {link.name}
                {link.name === "Programs" && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full animate-bounce">
                    HOT
                  </span>
                )}
                {link.path === "/crs-calculator" && (
                  <span className="absolute -top-1 -right-2 bg-brand-gold text-brand-blue-dark text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                    NEW
                  </span>
                )}
              </Link>
            ))}

            {/* Services Dropdown */}
            <ServicesDropdown />
          </nav>

          {/* Controls */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Language Switcher */}
            <div className="relative group">
              <button className="flex items-center space-x-1 px-3 py-1.5 rounded-full border border-brand-blue-light/20 hover:border-brand-gold/50 text-sm font-medium text-brand-blue-dark transition-all">
                <Globe className="h-4 w-4 text-brand-gold" />
                <span className="uppercase">{language}</span>
              </button>
              <div className="absolute right-0 mt-2 w-28 bg-white rounded-lg shadow-xl border border-brand-blue-light/10 overflow-hidden hidden group-hover:block z-50">
                <button onClick={() => handleLangChange("en")}
                  className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-brand-blue-light hover:text-white transition-colors ${language === "en" ? "text-brand-gold bg-brand-blue/5" : "text-brand-blue-dark"}`}>
                  English (EN)
                </button>
                <button onClick={() => handleLangChange("hi")}
                  className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-brand-blue-light hover:text-white transition-colors ${language === "hi" ? "text-brand-gold bg-brand-blue/5" : "text-brand-blue-dark"}`}>
                  हिन्दी (HI)
                </button>
                <button onClick={() => handleLangChange("gu")}
                  className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-brand-blue-light hover:text-white transition-colors ${language === "gu" ? "text-brand-gold bg-brand-blue/5" : "text-brand-blue-dark"}`}>
                  ગુજરાતી (GU)
                </button>
              </div>
            </div>


            {/* Check Eligibility CTA */}
            <Link href="/eligibility"
              className="px-4 py-2 rounded-full bg-gradient-premium text-white hover:shadow-lg text-sm font-semibold hover:bg-brand-blue-light transition-all duration-300 border border-brand-gold/30 hover:border-brand-gold flex items-center space-x-1">
              <span>{t("navEligibility")}</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={() => handleLangChange(language === "en" ? "hi" : language === "hi" ? "gu" : "en")}
              className="flex items-center space-x-1 p-2 rounded-full border border-brand-blue-light/10 text-xs font-bold text-brand-blue-dark">
              <Globe className="h-3.5 w-3.5 text-brand-gold" />
              <span className="uppercase">{language}</span>
            </button>


            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-brand-blue-dark hover:text-brand-gold transition-colors focus:outline-none">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`fixed inset-y-0 right-0 z-40 w-72 bg-white shadow-2xl border-l border-brand-blue/10 transform transition-transform duration-300 ease-in-out lg:hidden ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col h-full pt-20 pb-6 px-5 justify-between overflow-y-auto">
          <div className="space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-base font-semibold transition-colors ${
                  isActive(link.path)
                    ? "text-brand-gold bg-brand-blue/5 border-l-4 border-brand-gold"
                    : "text-brand-blue-dark hover:text-brand-gold hover:bg-brand-blue/5"
                }`}>
                {link.name}
              </Link>
            ))}

            {/* Mobile Services Accordion */}
            <MobileServicesAccordion onClose={() => setIsOpen(false)} />
          </div>

          <div className="space-y-4 mt-6">
            <div className="border-t border-brand-blue-light/10 pt-4">
              <span className="text-xs font-bold uppercase text-brand-blue-light/50 tracking-wider block mb-2">
                Select Language
              </span>
              <div className="grid grid-cols-3 gap-2">
                {["en", "hi", "gu"].map((lang) => (
                  <button key={lang}
                    onClick={() => { handleLangChange(lang); setIsOpen(false); }}
                    className={`py-1.5 rounded-md text-xs font-bold border uppercase transition-all ${
                      language === lang
                        ? "border-brand-gold text-brand-gold bg-brand-blue/5 font-extrabold"
                        : "border-brand-blue-light/15 text-brand-blue-dark"
                    }`}>
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <Link href="/eligibility"
              onClick={() => setIsOpen(false)}
              className="block w-full py-3 text-center rounded-xl bg-gradient-premium text-white font-bold shadow-lg border border-brand-gold/30 hover:border-brand-gold text-sm">
              {t("ctaCheckEligibility")}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile backdrop */}
      {isOpen && (
        <div onClick={() => setIsOpen(false)} className="fixed inset-0 z-30 bg-black/30 backdrop-blur-xs lg:hidden" />
      )}
    </header>
  );
}
