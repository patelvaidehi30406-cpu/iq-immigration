"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ShieldCheck, Compass, Target, Sparkles, Building, Landmark, Users2, Award } from "lucide-react";

export default function AboutPage() {
  const { t } = useLanguage();

  const values = [
    {
      title: "Complete Transparency",
      desc: "We provide upfront, realistic assessments of your chances. We do not support false hopes or unauthentic documentation.",
      icon: ShieldCheck
    },
    {
      title: "Client-Centric Success",
      desc: "Our actions are focused on finding the quickest and safest pathway for your studies or skilled job permits.",
      icon: Target
    },
    {
      title: "Authorized & Legal",
      desc: "All applications are audited for compliance with IRCC (Canada), DHA (Australia), and Home Office (UK) guidelines.",
      icon: Compass
    }
  ];

  const team = [
    {
      name: "Ilesh Patel",
      role: "Founder & Chief Consultant",
      bio: "15+ years of experience in immigration counseling. Specializes in Canada LMIA, Business Visas, and complex refusal appeals.",
      imageBg: "bg-blue-900"
    },
    {
      name: "Anjali Shah",
      role: "Lead Study Abroad Advisor",
      bio: "Former placement officer with direct links to 100+ top universities in the UK, USA, and New Zealand. Helps draft perfect SOPs.",
      imageBg: "bg-amber-800"
    },
    {
      name: "Adv. Rajesh Rathod",
      role: "Legal & Compliance Head",
      bio: "Specialist visa lawyer managing skilled worker applications and employer sponsorship documentation validation.",
      imageBg: "bg-indigo-900"
    }
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* 1. Header Hero */}
      <section className="bg-gradient-premium py-16 text-white text-center relative border-b border-brand-gold/15">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.1),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-gold">Who We Are</span>
          <h1 className="text-4xl font-extrabold font-heading text-white">About IQ Education &amp; Immigration</h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto">
            Empowering students and skilled professionals to navigate the complexities of international admissions and global visa applications since 2014.
          </p>
        </div>
      </section>

      {/* 2. Intro Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-brand-blue-dark">
              Building Bridges to Your Global Ambitions
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed">
              <p>
                IQ Education &amp; Immigration was founded with a single mission: to bring clarity, trust, and exceptional success rates to the visa consultancy sector. Over the past decade, we have grown from a local advisor to a multi-branch agency helping thousands of aspirants each year.
              </p>
              <p>
                Whether you want to study at a top Canadian college, secure a skilled worker residency in Australia, or acquire a visitor visa for a family visit in Europe, our team is equipped with direct university integrations and regulatory know-how to make it a reality.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="border-l-4 border-brand-gold pl-4">
                <h4 className="text-2xl font-extrabold text-brand-blue-dark">10,000+</h4>
                <p className="text-xs text-gray-500 font-semibold uppercase">Visas Handled</p>
              </div>
              <div className="border-l-4 border-brand-gold pl-4">
                <h4 className="text-2xl font-extrabold text-brand-blue-dark">99%</h4>
                <p className="text-xs text-gray-500 font-semibold uppercase">Client Trust Index</p>
              </div>
            </div>
          </div>

          {/* Core certifications block */}
          <div className="lg:col-span-5 bg-white border border-brand-blue-light/10 p-8 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 h-16 w-16 bg-brand-gold/10 rounded-bl-full flex items-center justify-center text-brand-gold">
              <Award className="h-6 w-6" />
            </div>
            
            <h3 className="text-lg font-bold font-heading text-brand-blue-dark mb-6">
              Our Regulatory Approvals
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-3">
                <div className="h-2 w-2 rounded-full bg-brand-gold mt-2 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-brand-blue-dark">RCIC Registered Consultants Affiliate</p>
                  <p className="text-xs text-gray-500">Authorized legal submissions for Canadian Express Entry and study filings.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="h-2 w-2 rounded-full bg-brand-gold mt-2 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-brand-blue-dark">AIRC Certified Agency Network</p>
                  <p className="text-xs text-gray-500">Official counselor accreditations for university placements globally.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="h-2 w-2 rounded-full bg-brand-gold mt-2 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-brand-blue-dark">British Council Certified Counselors</p>
                  <p className="text-xs text-gray-500">Certified trainers for IELTS, PTE, and UK study permit filings.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Vision & Mission Grid */}
      <section className="bg-brand-blue/5 py-24 border-y border-brand-blue-light/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="glass-card p-8 rounded-3xl bg-white space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-brand-gold/15 flex items-center justify-center text-brand-gold-dark">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold font-heading text-brand-blue-dark">Our Mission</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                To democratize international mobility by providing high-quality, transparent, and completely legal migration consulting. We match aspiring talents and students with correct pathways to build long-term international futures.
              </p>
            </div>
            <div className="glass-card p-8 rounded-3xl bg-white space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-brand-gold/15 flex items-center justify-center text-brand-gold-dark">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold font-heading text-brand-blue-dark">Our Vision</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                To be recognized as the most ethical global brand in education consultancy and visa support. We aim to establish 20+ support branches by 2030, maintaining our 99% success rating and expanding digital eligibility checkers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        <div className="space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-gold">Our Philosophy</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-brand-blue-dark">Core Values We Live By</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((val, i) => (
            <div key={i} className="glass-card p-8 rounded-2xl text-left space-y-4">
              <div className="h-10 w-10 rounded-lg bg-brand-blue/5 border border-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0">
                <val.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold font-heading text-brand-blue-dark">{val.title}</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-center">
        <div className="space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-gold">The Directors</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-brand-blue-dark">Meet Our Advisory Board</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <div key={i} className="glass-card p-6 rounded-2xl text-left bg-white border border-brand-blue-light/5 flex flex-col justify-between">
              <div className="space-y-4">
                {/* Simulated Profile Picture placeholder */}
                <div className={`h-48 w-full rounded-xl ${member.imageBg} flex items-center justify-center text-white font-black text-2xl relative overflow-hidden`}>
                  <Users2 className="h-12 w-12 text-white/20 absolute bottom-2 right-2" />
                  <span className="relative z-10 tracking-widest">{member.name.split(" ").map(n => n[0]).join("")}</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-brand-blue-dark">{member.name}</h4>
                  <p className="text-xs font-bold text-brand-gold uppercase tracking-wider">{member.role}</p>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Offices Gallery info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-8 rounded-3xl bg-gradient-premium border border-brand-gold/15 text-white flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold font-heading text-brand-gold">Interested in joining our team?</h3>
            <p className="text-xs sm:text-sm text-gray-300">We are always looking for certified counselors and professional visa lawyers.</p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3 bg-gradient-gold text-brand-blue-dark font-extrabold rounded-xl text-xs uppercase tracking-wide hover:scale-105 active:scale-95 transition-all shrink-0"
          >
            Submit Resume
          </Link>
        </div>
      </section>
    </div>
  );
}
