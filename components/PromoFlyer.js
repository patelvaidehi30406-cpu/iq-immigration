"use client";

import React from "react";
import Image from "next/image";
import { BookOpen, Building2, Wallet, MapPin, CheckCircle2, Phone, Mail, Globe, Star } from "lucide-react";

export default function PromoFlyer({ data }) {
  const {
    countryName,
    visaType,
    title,
    tagline,
    features,
    feeStructure,
    keyHighlights,
    bgImage,
    personImage,
    themeColor = "text-red-600",
    themeBg = "bg-red-600",
    themeBorder = "border-red-600",
  } = data;

  return (
    <div className="relative w-full max-w-4xl mx-auto bg-white overflow-hidden shadow-2xl rounded-2xl flex flex-col font-sans mb-12 transform transition-transform hover:scale-[1.01] duration-300">
      
      {/* ─── HEADER / TOP BACKGROUND ─── */}
      <div className="relative h-80 sm:h-96 w-full">
        <Image
          src={bgImage}
          alt={countryName}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 1000px"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/40 to-transparent"></div>
        
        {/* Top Left Logo & Title */}
        <div className="absolute top-6 left-6 z-10 space-y-2 max-w-sm">
          <div className="bg-transparent px-0 py-0 rounded-lg shadow-none inline-block">
            <Image src="/iq-logo-full.png" alt="IQ Education" width={140} height={40} className="h-8 w-auto object-contain mix-blend-multiply" />
          </div>
          
          <div className="mt-4">
            <p className="text-xl font-bold font-heading text-brand-blue-dark italic">{visaType} in</p>
            <h1 className={`text-5xl sm:text-7xl font-black font-heading ${themeColor} uppercase tracking-tight leading-none drop-shadow-md`}>
              {countryName}
            </h1>
          </div>
          
          <div className={`${themeBg} text-white px-4 py-1.5 inline-block mt-2 font-bold tracking-wide text-sm shadow-md rounded-r-lg`}>
            {tagline}
          </div>
        </div>
      </div>

      {/* ─── MIDDLE SECTION ─── */}
      <div className="relative flex flex-col md:flex-row px-6 sm:px-10 py-8 z-10 bg-white">
        
        {/* Left Column (Title & Features) */}
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-blue-dark leading-tight uppercase">
            {title}
          </h2>

          <div className="space-y-5 mt-6">
            {features.map((feat, idx) => (
              <div key={idx} className="flex items-start space-x-4">
                <div className={`mt-1 h-12 w-12 rounded-full border-2 ${themeBorder} flex items-center justify-center shrink-0`}>
                  {feat.icon === 'book' ? <BookOpen className={`h-5 w-5 ${themeColor}`} /> :
                   feat.icon === 'building' ? <Building2 className={`h-5 w-5 ${themeColor}`} /> :
                   <Wallet className={`h-5 w-5 ${themeColor}`} />}
                </div>
                <div>
                  <h4 className="font-bold text-brand-blue-dark text-sm uppercase">{feat.title}</h4>
                  <ul className="text-sm text-gray-600 mt-1 space-y-0.5">
                    {feat.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (People / Images Overlay) */}
        <div className="md:w-1/2 mt-8 md:mt-0 relative flex justify-center items-center">
          <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden shadow-lg border-4 border-white z-20">
             <Image
              src={personImage}
              alt="Professionals"
              fill
              className="object-cover"
            />
          </div>
          {/* Badge */}
          <div className="absolute -bottom-6 -right-2 sm:-right-6 bg-brand-blue-dark text-white p-6 rounded-xl shadow-2xl z-30 max-w-[200px] transform rotate-3">
            <div className="flex justify-center space-x-1 mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 text-brand-gold fill-current" />)}
            </div>
            <p className="font-heading font-bold text-center text-sm tracking-widest uppercase">Learn. Experience.</p>
            <p className="font-heading font-black text-center text-2xl text-brand-gold italic mt-1">Succeed.</p>
          </div>
        </div>
      </div>

      {/* ─── BOTTOM SECTION (Fees & Highlights) ─── */}
      <div className="px-6 sm:px-10 py-8 bg-gray-50 border-t border-gray-100 flex flex-col md:flex-row gap-6">
        
        {/* Fee Structure */}
        <div className="md:w-1/2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-brand-blue-dark text-white text-center py-2 font-bold uppercase tracking-wider text-sm">
            Fee Structure
          </div>
          <div className="p-5 text-center">
            <p className="text-xs font-bold text-gray-500 uppercase">Total Course Fee</p>
            <p className={`text-4xl font-black ${themeColor} mt-1`}>{feeStructure.total}</p>
            
            <div className="mt-4 space-y-2">
              {feeStructure.installments.map((inst, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
                  <div className="flex items-center space-x-2">
                    <span className="h-5 w-5 rounded-full bg-brand-blue-dark text-white text-xs flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-gray-700">{inst.name}</span>
                  </div>
                  <span className="font-bold text-gray-900">{inst.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Highlights */}
        <div className="md:w-1/2 bg-white rounded-xl shadow-sm border border-brand-gold/30 overflow-hidden relative">
           <div className="bg-brand-gold/10 text-brand-gold-dark text-center py-2 font-bold uppercase tracking-wider text-sm flex items-center justify-center space-x-2 border-b border-brand-gold/20">
            <Star className="h-4 w-4 fill-current" />
            <span>Key Highlights</span>
          </div>
          <div className="p-5 space-y-3">
            {keyHighlights.map((hl, idx) => (
              <div key={idx} className="flex items-center space-x-3">
                <CheckCircle2 className="h-5 w-5 text-brand-gold shrink-0" />
                <span className="text-sm font-semibold text-gray-700">{hl}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ─── FOOTER ─── */}
      <div className={`flex flex-col sm:flex-row bg-brand-blue-dark text-white text-xs sm:text-sm`}>
        <div className="flex-1 flex items-center justify-center sm:justify-start space-x-2 p-3 sm:px-6 bg-red-600">
           <Phone className="h-4 w-4" />
           <div className="flex flex-col">
             <span className="text-[10px] uppercase font-bold opacity-80">Call Us Now</span>
             <span className="font-bold">+91 87990 72887</span>
           </div>
        </div>
        <div className="flex-1 flex items-center justify-center sm:justify-start space-x-2 p-3 sm:px-6 border-l border-white/20 bg-brand-blue-dark">
           <Mail className="h-4 w-4" />
           <div className="flex flex-col">
             <span className="text-[10px] uppercase font-bold opacity-80">Email Us Now</span>
             <span className="font-bold">iq-immigration.com</span>
           </div>
        </div>
        <div className="flex-1 flex items-center justify-center sm:justify-start space-x-2 p-3 sm:px-6 border-l border-white/20 bg-red-600">
           <Globe className="h-4 w-4" />
           <div className="flex flex-col">
             <span className="text-[10px] uppercase font-bold opacity-80">Website</span>
             <span className="font-bold">iqeducation.com</span>
           </div>
        </div>
      </div>

    </div>
  );
}
