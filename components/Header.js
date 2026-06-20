"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";
import { Menu, X, Globe, User, GraduationCap } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { language, changeLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("navHome"), path: "/" },
    { name: t("navAbout"), path: "/about" },
    { name: t("navStudy"), path: "/study-abroad" },
    { name: t("navWork"), path: "/work-permit" },
    { name: t("navVisitor"), path: "/visitor-visa" },
    { name: t("navSuccess"), path: "/success-stories" },
    { name: t("navBlog"), path: "/blog" },
    { name: t("navContact"), path: "/contact" }
  ];

  const handleLangChange = (lang) => {
    changeLanguage(lang);
  };

  const isActive = (path) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-nav py-3 shadow-md" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="h-10 w-10 rounded-lg bg-gradient-premium flex items-center justify-center shadow-lg border border-brand-gold/30">
              <GraduationCap className="h-6 w-6 text-brand-gold" />
            </div>
            <div>
              <span className="text-xl font-extrabold text-brand-blue-dark tracking-tight leading-none block">
                IQ <span className="text-brand-gold font-normal">EDUCATION</span>
              </span>
              <span className="text-[10px] uppercase font-bold text-brand-blue-light/70 tracking-widest block">
                &amp; Immigration
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex space-x-1 xl:space-x-2 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? "text-brand-gold bg-brand-blue/5 border-b-2 border-brand-gold"
                    : "text-brand-blue-dark hover:text-brand-gold hover:bg-brand-blue/5"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Controls (Language & CTA & Admin Portal) */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Language Switcher Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-1 px-3 py-1.5 rounded-full border border-brand-blue-light/20 hover:border-brand-gold/50 text-sm font-medium text-brand-blue-dark transition-all">
                <Globe className="h-4 w-4 text-brand-gold" />
                <span className="uppercase">{language}</span>
              </button>
              <div className="absolute right-0 mt-2 w-28 bg-white rounded-lg shadow-xl border border-brand-blue-light/10 overflow-hidden hidden group-hover:block z-50">
                <button
                  onClick={() => handleLangChange("en")}
                  className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-brand-blue-light hover:text-white transition-colors ${
                    language === "en" ? "text-brand-gold bg-brand-blue/5" : "text-brand-blue-dark"
                  }`}
                >
                  English (EN)
                </button>
                <button
                  onClick={() => handleLangChange("hi")}
                  className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-brand-blue-light hover:text-white transition-colors ${
                    language === "hi" ? "text-brand-gold bg-brand-blue/5" : "text-brand-blue-dark"
                  }`}
                >
                  हिन्दी (HI)
                </button>
                <button
                  onClick={() => handleLangChange("gu")}
                  className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-brand-blue-light hover:text-white transition-colors ${
                    language === "gu" ? "text-brand-gold bg-brand-blue/5" : "text-brand-blue-dark"
                  }`}
                >
                  ગુજરાતી (GU)
                </button>
              </div>
            </div>

            {/* Admin Portal Button */}
            <Link
              href="/admin"
              className="flex items-center justify-center p-2 rounded-full border border-brand-blue-light/10 hover:border-brand-gold/50 hover:bg-brand-blue/5 text-brand-blue-dark transition-all"
              title="Admin CRM Dashboard"
            >
              <User className="h-4 w-4 text-brand-blue-light" />
            </Link>

            {/* Check Eligibility CTA */}
            <Link
              href="/eligibility"
              className="px-4 py-2 rounded-full bg-gradient-premium text-white hover:shadow-lg text-sm font-semibold hover:bg-brand-blue-light transition-all duration-300 border border-brand-gold/30 hover:border-brand-gold flex items-center space-x-1"
            >
              <span>{t("navEligibility")}</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-2">
            {/* Quick language toggle for mobile */}
            <button
              onClick={() =>
                handleLangChange(
                  language === "en" ? "hi" : language === "hi" ? "gu" : "en"
                )
              }
              className="flex items-center space-x-1 p-2 rounded-full border border-brand-blue-light/10 text-xs font-bold text-brand-blue-dark"
            >
              <Globe className="h-3.5 w-3.5 text-brand-gold" />
              <span className="uppercase">{language}</span>
            </button>

            <Link
              href="/admin"
              className="p-2 rounded-full border border-brand-blue-light/10 text-brand-blue-dark"
              title="Admin CRM Dashboard"
            >
              <User className="h-4 w-4 text-brand-blue-light" />
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-brand-blue-dark hover:text-brand-gold transition-colors focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <div
        className={`fixed inset-y-0 right-0 z-40 w-72 bg-white shadow-2xl border-l border-brand-blue/10 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-20 pb-6 px-6 justify-between">
          <div className="space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-base font-semibold transition-colors ${
                  isActive(link.path)
                    ? "text-brand-gold bg-brand-blue/5 border-l-4 border-brand-gold"
                    : "text-brand-blue-dark hover:text-brand-gold hover:bg-brand-blue/5"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="space-y-4">
            {/* Multi-language Selector */}
            <div className="border-t border-brand-blue-light/10 pt-4">
              <span className="text-xs font-bold uppercase text-brand-blue-light/50 tracking-wider block mb-2">
                Select Language
              </span>
              <div className="grid grid-cols-3 gap-2">
                {["en", "hi", "gu"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      handleLangChange(lang);
                      setIsOpen(false);
                    }}
                    className={`py-1.5 rounded-md text-xs font-bold border uppercase transition-all ${
                      language === lang
                        ? "border-brand-gold text-brand-gold bg-brand-blue/5 font-extrabold"
                        : "border-brand-blue-light/15 text-brand-blue-dark"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Check Eligibility Mobile CTA */}
            <Link
              href="/eligibility"
              onClick={() => setIsOpen(false)}
              className="block w-full py-3 text-center rounded-xl bg-gradient-premium text-white font-bold shadow-lg border border-brand-gold/30 hover:border-brand-gold text-sm"
            >
              {t("ctaCheckEligibility")}
            </Link>
          </div>
        </div>
      </div>

      {/* Backdrop overlay for mobile drawer */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-xs lg:hidden"
        />
      )}
    </header>
  );
}
