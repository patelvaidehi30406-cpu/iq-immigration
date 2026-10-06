"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Calculator, 
  Award, 
  BookOpen, 
  Briefcase, 
  Languages, 
  CheckCircle, 
  Calendar, 
  ChevronRight, 
  Sparkles, 
  Users, 
  GraduationCap, 
  HelpCircle,
  FileText
} from "lucide-react";

export default function CRSCalculator() {
  // Form State
  const [maritalStatus, setMaritalStatus] = useState("single");
  const [age, setAge] = useState(28);
  const [education, setEducation] = useState("bachelors");
  const [canadianWork, setCanadianWork] = useState(0);
  const [foreignWork, setForeignWork] = useState(0);
  
  // IELTS Scores
  const [listening, setListening] = useState(8.0);
  const [reading, setReading] = useState(7.0);
  const [writing, setWriting] = useState(7.0);
  const [speaking, setSpeaking] = useState(7.0);

  // Additional Factors
  const [hasPnp, setHasPnp] = useState(false);
  const [hasJobOffer, setHasJobOffer] = useState(false);
  const [hasCanadianStudy, setHasCanadianStudy] = useState(false);
  const [hasSibling, setHasSibling] = useState(false);
  const [hasFrench, setHasFrench] = useState(false);

  // Result details
  const [scores, setScores] = useState({
    age: 110,
    education: 120,
    language: 124,
    canadianWork: 0,
    skillTransferability: 50,
    additional: 0,
    total: 404
  });

  // Calculate scores on input change
  useEffect(() => {
    const isSingle = maritalStatus === "single";

    // 1. Age Points
    let agePoints = 0;
    if (age >= 18 && age <= 29) agePoints = isSingle ? 110 : 100;
    else if (age === 17) agePoints = 0;
    else if (age === 30) agePoints = isSingle ? 105 : 95;
    else if (age === 31) agePoints = isSingle ? 99 : 90;
    else if (age === 32) agePoints = isSingle ? 94 : 85;
    else if (age === 33) agePoints = isSingle ? 88 : 80;
    else if (age === 34) agePoints = isSingle ? 83 : 75;
    else if (age === 35) agePoints = isSingle ? 77 : 70;
    else if (age === 36) agePoints = isSingle ? 72 : 65;
    else if (age === 37) agePoints = isSingle ? 66 : 60;
    else if (age === 38) agePoints = isSingle ? 61 : 55;
    else if (age === 39) agePoints = isSingle ? 55 : 50;
    else if (age === 40) agePoints = isSingle ? 50 : 45;
    else if (age === 41) agePoints = isSingle ? 39 : 35;
    else if (age === 42) agePoints = isSingle ? 28 : 25;
    else if (age === 43) agePoints = isSingle ? 17 : 15;
    else if (age === 44) agePoints = isSingle ? 6 : 5;
    else agePoints = 0;

    // 2. Education Points
    let eduPoints = 0;
    if (education === "phd") eduPoints = isSingle ? 150 : 140;
    else if (education === "masters") eduPoints = isSingle ? 135 : 126;
    else if (education === "two_or_more") eduPoints = isSingle ? 128 : 119;
    else if (education === "bachelors") eduPoints = isSingle ? 120 : 112;
    else if (education === "two_year") eduPoints = isSingle ? 98 : 91;
    else if (education === "one_year") eduPoints = isSingle ? 90 : 84;
    else if (education === "high_school") eduPoints = isSingle ? 30 : 28;
    else eduPoints = 0;

    // 3. Language Points (CLB Calculation & Mapping)
    // Listening mapping
    let clbL = 4;
    if (listening >= 8.5) clbL = 10;
    else if (listening >= 8.0) clbL = 9;
    else if (listening >= 7.5) clbL = 8;
    else if (listening >= 6.0) clbL = 7;
    else if (listening >= 5.5) clbL = 6;
    else clbL = 5;

    // Reading mapping
    let clbR = 4;
    if (reading >= 8.0) clbR = 10;
    else if (reading >= 7.0) clbR = 9;
    else if (reading >= 6.5) clbR = 8;
    else if (reading >= 6.0) clbR = 7;
    else if (reading >= 5.0) clbR = 6;
    else clbR = 5;

    // Writing mapping
    let clbW = 4;
    if (writing >= 7.5) clbW = 10;
    else if (writing >= 7.0) clbW = 9;
    else if (writing >= 6.5) clbW = 8;
    else if (writing >= 6.0) clbW = 7;
    else if (writing >= 5.5) clbW = 6;
    else clbW = 5;

    // Speaking mapping
    let clbS = 4;
    if (speaking >= 7.5) clbS = 10;
    else if (speaking >= 7.0) clbS = 9;
    else if (speaking >= 6.5) clbS = 8;
    else if (speaking >= 6.0) clbS = 7;
    else if (speaking >= 5.5) clbS = 6;
    else clbS = 5;

    const getLangPoints = (clb) => {
      if (clb >= 10) return isSingle ? 34 : 32;
      if (clb === 9) return isSingle ? 31 : 29;
      if (clb === 8) return isSingle ? 23 : 22;
      if (clb === 7) return isSingle ? 17 : 16;
      if (clb === 6) return isSingle ? 9 : 8;
      return 0;
    };

    const langPoints = getLangPoints(clbL) + getLangPoints(clbR) + getLangPoints(clbW) + getLangPoints(clbS);

    // Average CLB score for transferability checks
    const avgClb = (clbL + clbR + clbW + clbS) / 4;

    // 4. Canadian Work Experience Points
    let canWorkPoints = 0;
    if (canadianWork === 1) canWorkPoints = isSingle ? 40 : 35;
    else if (canadianWork === 2) canWorkPoints = isSingle ? 53 : 46;
    else if (canadianWork === 3) canWorkPoints = isSingle ? 64 : 56;
    else if (canadianWork === 4) canWorkPoints = isSingle ? 72 : 63;
    else if (canadianWork >= 5) canWorkPoints = isSingle ? 80 : 70;

    // 5. Skill Transferability Points (Max 100 points)
    // A. Education + Language
    let eduLangPoints = 0;
    const hasDegree = education !== "high_school" && education !== "none";
    const hasPostGradDegree = education === "masters" || education === "phd" || education === "two_or_more";
    
    if (avgClb >= 9) {
      eduLangPoints = hasPostGradDegree ? 50 : (hasDegree ? 25 : 0);
    } else if (avgClb >= 7) {
      eduLangPoints = hasPostGradDegree ? 25 : (hasDegree ? 13 : 0);
    }

    // B. Foreign Work Experience + Language
    let foreignLangPoints = 0;
    if (foreignWork >= 3) {
      foreignLangPoints = avgClb >= 9 ? 50 : (avgClb >= 7 ? 25 : 0);
    } else if (foreignWork >= 1) {
      foreignLangPoints = avgClb >= 9 ? 25 : (avgClb >= 7 ? 13 : 0);
    }

    // C. Foreign Work Experience + Canadian Work Experience
    let foreignCanPoints = 0;
    if (foreignWork >= 3 && canadianWork >= 2) {
      foreignCanPoints = 50;
    } else if (foreignWork >= 3 && canadianWork === 1) {
      foreignCanPoints = 25;
    } else if (foreignWork >= 1 && canadianWork >= 2) {
      foreignCanPoints = 25;
    } else if (foreignWork >= 1 && canadianWork === 1) {
      foreignCanPoints = 13;
    }

    const skillTransferability = Math.min(100, eduLangPoints + foreignLangPoints + foreignCanPoints);

    // 6. Additional Points (Max 600 points)
    let additionalPoints = 0;
    if (hasPnp) additionalPoints += 600;
    if (hasJobOffer) additionalPoints += 50; // Simplified average job offer score (NOC 0, A or B)
    if (hasCanadianStudy) additionalPoints += 30; // Assuming post-graduate/degree level Canadian study
    if (hasSibling) additionalPoints += 15;
    if (hasFrench) additionalPoints += 50;

    additionalPoints = Math.min(600, additionalPoints);

    const total = agePoints + eduPoints + langPoints + canWorkPoints + skillTransferability + additionalPoints;

    setScores({
      age: agePoints,
      education: eduPoints,
      language: langPoints,
      canadianWork: canWorkPoints,
      skillTransferability,
      additional: additionalPoints,
      total
    });
  }, [maritalStatus, age, education, canadianWork, foreignWork, listening, reading, writing, speaking, hasPnp, hasJobOffer, hasCanadianStudy, hasSibling, hasFrench]);

  return (
    <div className="bg-brand-gray min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-brand-gold/10 text-brand-gold-dark px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-brand-gold/20">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Interactive Visa Eligibility Tool</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-brand-blue-dark tracking-tight mb-4">
            Canada Express Entry <span className="text-gradient-gold">CRS Calculator</span>
          </h1>
          <p className="text-lg text-brand-text max-w-2xl mx-auto font-medium">
            Calculate your Comprehensive Ranking System (CRS) score instantly and check if you are eligible for the next Express Entry draw.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Inputs Section */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 space-y-8">
            
            {/* Step 1: Personal Profile */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2.5 bg-brand-blue/5 text-brand-gold rounded-xl">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-brand-blue-dark">1. Personal Profile</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Marital Status */}
                <div>
                  <label className="block text-sm font-semibold text-brand-blue-dark mb-2">Marital Status</label>
                  <select 
                    value={maritalStatus} 
                    onChange={(e) => setMaritalStatus(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold text-brand-text text-sm font-medium bg-brand-gray/50"
                  >
                    <option value="single">Single / Unmarried</option>
                    <option value="married">Married (Spouse not accompanying/applying)</option>
                    <option value="married_accompanying">Married (Spouse accompanying)</option>
                  </select>
                </div>

                {/* Age */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-brand-blue-dark">Age: <span className="text-brand-gold font-extrabold">{age} years</span></label>
                  </div>
                  <input 
                    type="range" 
                    min="17" 
                    max="50" 
                    value={age} 
                    onChange={(e) => setAge(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-gold"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 font-bold mt-1">
                    <span>17 yrs</span>
                    <span>30 yrs</span>
                    <span>45+ yrs</span>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Step 2: Education & Work */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2.5 bg-brand-blue/5 text-brand-gold rounded-xl">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-brand-blue-dark">2. Education & Experience</h3>
              </div>

              <div className="space-y-6">
                {/* Education */}
                <div>
                  <label className="block text-sm font-semibold text-brand-blue-dark mb-2">Highest Education Level</label>
                  <select 
                    value={education} 
                    onChange={(e) => setEducation(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold text-brand-text text-sm font-medium bg-brand-gray/50"
                  >
                    <option value="none">Less than High School</option>
                    <option value="high_school">High School Diploma</option>
                    <option value="one_year">1-Year Post-Secondary Program</option>
                    <option value="two_year">2-Year Post-Secondary Program</option>
                    <option value="bachelors">Bachelor's Degree (3+ Years)</option>
                    <option value="two_or_more">Two or More Diplomas/Degrees (One must be 3+ Years)</option>
                    <option value="masters">Master's Degree</option>
                    <option value="phd">Doctoral Level (Ph.D.)</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Foreign Experience */}
                  <div>
                    <label className="block text-sm font-semibold text-brand-blue-dark mb-2">Foreign Work Experience</label>
                    <select 
                      value={foreignWork} 
                      onChange={(e) => setForeignWork(parseInt(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold text-brand-text text-sm font-medium bg-brand-gray/50"
                    >
                      <option value="0">No foreign experience</option>
                      <option value="1">1 to 2 years</option>
                      <option value="3">3 years or more</option>
                    </select>
                  </div>

                  {/* Canadian Experience */}
                  <div>
                    <label className="block text-sm font-semibold text-brand-blue-dark mb-2">Canadian Work Experience</label>
                    <select 
                      value={canadianWork} 
                      onChange={(e) => setCanadianWork(parseInt(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold text-brand-text text-sm font-medium bg-brand-gray/50"
                    >
                      <option value="0">No Canadian experience</option>
                      <option value="1">1 year</option>
                      <option value="2">2 years</option>
                      <option value="3">3 years</option>
                      <option value="4">4 years</option>
                      <option value="5">5 years or more</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Step 3: English Proficiency (IELTS) */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2.5 bg-brand-blue/5 text-brand-gold rounded-xl">
                  <Languages className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-brand-blue-dark">3. English Language Ability (IELTS)</h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {/* Listening */}
                <div>
                  <label className="block text-xs font-bold text-brand-blue-light mb-1.5 uppercase">Listening</label>
                  <select 
                    value={listening} 
                    onChange={(e) => setListening(parseFloat(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-brand-text text-xs font-semibold bg-brand-gray/50 focus:border-brand-gold"
                  >
                    <option value="8.5">8.5 - 9.0 (CLB 10)</option>
                    <option value="8.0">8.0 (CLB 9)</option>
                    <option value="7.5">7.5 (CLB 8)</option>
                    <option value="6.0">6.0 - 7.0 (CLB 7)</option>
                    <option value="5.5">5.5 (CLB 6)</option>
                    <option value="5.0">Below 5.5</option>
                  </select>
                </div>

                {/* Reading */}
                <div>
                  <label className="block text-xs font-bold text-brand-blue-light mb-1.5 uppercase">Reading</label>
                  <select 
                    value={reading} 
                    onChange={(e) => setReading(parseFloat(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-brand-text text-xs font-semibold bg-brand-gray/50 focus:border-brand-gold"
                  >
                    <option value="8.0">8.0 - 9.0 (CLB 10)</option>
                    <option value="7.0">7.0 - 7.5 (CLB 9)</option>
                    <option value="6.5">6.5 (CLB 8)</option>
                    <option value="6.0">6.0 (CLB 7)</option>
                    <option value="5.0">5.0 - 5.5 (CLB 6)</option>
                    <option value="4.0">Below 5.0</option>
                  </select>
                </div>

                {/* Writing */}
                <div>
                  <label className="block text-xs font-bold text-brand-blue-light mb-1.5 uppercase">Writing</label>
                  <select 
                    value={writing} 
                    onChange={(e) => setWriting(parseFloat(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-brand-text text-xs font-semibold bg-brand-gray/50 focus:border-brand-gold"
                  >
                    <option value="7.5">7.5 - 9.0 (CLB 10)</option>
                    <option value="7.0">7.0 (CLB 9)</option>
                    <option value="6.5">6.5 (CLB 8)</option>
                    <option value="6.0">6.0 (CLB 7)</option>
                    <option value="5.5">5.5 (CLB 6)</option>
                    <option value="4.0">Below 5.5</option>
                  </select>
                </div>

                {/* Speaking */}
                <div>
                  <label className="block text-xs font-bold text-brand-blue-light mb-1.5 uppercase">Speaking</label>
                  <select 
                    value={speaking} 
                    onChange={(e) => setSpeaking(parseFloat(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-brand-text text-xs font-semibold bg-brand-gray/50 focus:border-brand-gold"
                  >
                    <option value="7.5">7.5 - 9.0 (CLB 10)</option>
                    <option value="7.0">7.0 (CLB 9)</option>
                    <option value="6.5">6.5 (CLB 8)</option>
                    <option value="6.0">6.0 (CLB 7)</option>
                    <option value="5.5">5.5 (CLB 6)</option>
                    <option value="4.0">Below 5.5</option>
                  </select>
                </div>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Step 4: Additional Gold Points */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2.5 bg-brand-blue/5 text-brand-gold rounded-xl">
                  <Award className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-brand-blue-dark">4. Bonus & Additional Factors</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* PNP Nomination */}
                <label className={`flex items-start p-4 rounded-2xl border transition-all cursor-pointer ${
                  hasPnp ? "bg-brand-gold/5 border-brand-gold/40 shadow-sm" : "bg-brand-gray/30 border-gray-100 hover:border-gray-200"
                }`}>
                  <input 
                    type="checkbox" 
                    checked={hasPnp} 
                    onChange={(e) => setHasPnp(e.target.checked)}
                    className="mt-1 mr-3 h-4.5 w-4.5 text-brand-gold border-gray-300 rounded focus:ring-brand-gold"
                  />
                  <div>
                    <span className="block text-sm font-bold text-brand-blue-dark">Provincial Nomination (PNP)</span>
                    <span className="block text-xs text-gray-500 font-medium">Secured a nomination from a Canadian province (+600 points)</span>
                  </div>
                </label>

                {/* Job Offer */}
                <label className={`flex items-start p-4 rounded-2xl border transition-all cursor-pointer ${
                  hasJobOffer ? "bg-brand-gold/5 border-brand-gold/40 shadow-sm" : "bg-brand-gray/30 border-gray-100 hover:border-gray-200"
                }`}>
                  <input 
                    type="checkbox" 
                    checked={hasJobOffer} 
                    onChange={(e) => setHasJobOffer(e.target.checked)}
                    className="mt-1 mr-3 h-4.5 w-4.5 text-brand-gold border-gray-300 rounded focus:ring-brand-gold"
                  />
                  <div>
                    <span className="block text-sm font-bold text-brand-blue-dark">Valid Canadian Job Offer</span>
                    <span className="block text-xs text-gray-500 font-medium">Supported by an LMIA certificate (+50 points)</span>
                  </div>
                </label>

                {/* Canadian Education */}
                <label className={`flex items-start p-4 rounded-2xl border transition-all cursor-pointer ${
                  hasCanadianStudy ? "bg-brand-gold/5 border-brand-gold/40 shadow-sm" : "bg-brand-gray/30 border-gray-100 hover:border-gray-200"
                }`}>
                  <input 
                    type="checkbox" 
                    checked={hasCanadianStudy} 
                    onChange={(e) => setHasCanadianStudy(e.target.checked)}
                    className="mt-1 mr-3 h-4.5 w-4.5 text-brand-gold border-gray-300 rounded focus:ring-brand-gold"
                  />
                  <div>
                    <span className="block text-sm font-bold text-brand-blue-dark">Studied in Canada</span>
                    <span className="block text-xs text-gray-500 font-medium">Has a credential from a Canadian college (+30 points)</span>
                  </div>
                </label>

                {/* Sibling in Canada */}
                <label className={`flex items-start p-4 rounded-2xl border transition-all cursor-pointer ${
                  hasSibling ? "bg-brand-gold/5 border-brand-gold/40 shadow-sm" : "bg-brand-gray/30 border-gray-100 hover:border-gray-200"
                }`}>
                  <input 
                    type="checkbox" 
                    checked={hasSibling} 
                    onChange={(e) => setHasSibling(e.target.checked)}
                    className="mt-1 mr-3 h-4.5 w-4.5 text-brand-gold border-gray-300 rounded focus:ring-brand-gold"
                  />
                  <div>
                    <span className="block text-sm font-bold text-brand-blue-dark">Sibling in Canada</span>
                    <span className="block text-xs text-gray-500 font-medium">Brother or sister is a PR holder / Citizen in Canada (+15 points)</span>
                  </div>
                </label>

                {/* French Proficiency */}
                <label className={`flex items-start p-4 rounded-2xl border transition-all cursor-pointer ${
                  hasFrench ? "bg-brand-gold/5 border-brand-gold/40 shadow-sm" : "bg-brand-gray/30 border-gray-100 hover:border-gray-200"
                }`}>
                  <input 
                    type="checkbox" 
                    checked={hasFrench} 
                    onChange={(e) => setHasFrench(e.target.checked)}
                    className="mt-1 mr-3 h-4.5 w-4.5 text-brand-gold border-gray-300 rounded focus:ring-brand-gold"
                  />
                  <div>
                    <span className="block text-sm font-bold text-brand-blue-dark">Strong French Skills</span>
                    <span className="block text-xs text-gray-500 font-medium">Scored CLB 7 or higher in French test TEF/TCF (+50 points)</span>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* Results Side Panel */}
          <div className="lg:col-span-5 lg:sticky lg:top-[120px] space-y-6">
            
            {/* Visual Score Card */}
            <div className="bg-[#081B33] rounded-3xl p-8 text-white border border-brand-blue-light/50 shadow-2xl relative overflow-hidden">
              {/* Background design accents */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-gold/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-blue-light/20 rounded-full blur-2xl" />

              <h3 className="text-lg font-bold text-brand-gold tracking-wide uppercase mb-6 flex items-center">
                <Calculator className="h-5 w-5 mr-2" />
                Your Live CRS Estimate
              </h3>

              {/* Radial Meter / Big Score Display */}
              <div className="flex flex-col items-center justify-center py-4 mb-6">
                <div className="relative flex items-center justify-center w-40 h-40 rounded-full border-4 border-dashed border-brand-gold/30">
                  <div className="absolute inset-2 bg-gradient-to-tr from-brand-blue-light to-brand-blue-dark rounded-full flex flex-col items-center justify-center shadow-lg border border-brand-gold/20">
                    <span className="text-5xl font-black tracking-tight text-white">{scores.total}</span>
                    <span className="text-[10px] uppercase font-bold text-brand-gold tracking-widest mt-1">Total Points</span>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <span className="text-xs font-medium text-gray-400 block">Out of 1200 maximum points</span>
                </div>
              </div>

              {/* Score Breakdown list */}
              <div className="space-y-3.5 border-t border-white/10 pt-6">
                {/* Age points */}
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-gray-300">Age Points</span>
                  <span className="text-brand-gold font-bold">{scores.age} pts</span>
                </div>
                {/* Education */}
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-gray-300">Education Points</span>
                  <span className="text-brand-gold font-bold">{scores.education} pts</span>
                </div>
                {/* Language */}
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-gray-300">Official Language (IELTS)</span>
                  <span className="text-brand-gold font-bold">{scores.language} pts</span>
                </div>
                {/* Canadian Work */}
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-gray-300">Canadian Work Experience</span>
                  <span className="text-brand-gold font-bold">{scores.canadianWork} pts</span>
                </div>
                {/* Skill Transferability */}
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-gray-300">Skill Transferability / Spouse</span>
                  <span className="text-brand-gold font-bold">{scores.skillTransferability} pts</span>
                </div>
                {/* Additional Points */}
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-gray-300">Additional / Bonus Factors</span>
                  <span className="text-brand-gold font-bold">{scores.additional} pts</span>
                </div>
              </div>

              {/* CTA Form Trigger */}
              <div className="mt-8">
                <Link
                  href={`/eligibility?crs=${scores.total}&age=${age}&edu=${education}`}
                  className="block w-full py-4 text-center text-sm font-bold text-[#081B33] bg-gradient-gold hover:shadow-lg hover:shadow-brand-gold/20 rounded-xl transition-all duration-300"
                >
                  Book Free Detailed Assessment
                </Link>
                <p className="text-[10px] text-center text-gray-400 font-medium mt-3">
                  *This is an approximate estimate based on the official CIC grid rules.
                </p>
              </div>
            </div>

            {/* Express Entry Info Card */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-md">
              <div className="flex items-center space-x-2 text-brand-blue-dark font-bold mb-3 text-sm">
                <HelpCircle className="h-4 w-4 text-brand-gold" />
                <span>Target CRS Scores</span>
              </div>
              <p className="text-xs text-brand-text leading-relaxed font-medium mb-3">
                Typically, general Express Entry draws require a score between <strong>480 and 540</strong>. However, Category-based draws (STEM, Healthcare, Trades, Transport, Agriculture, French speakers) often issue invitations to scores between <strong>350 and 460</strong>.
              </p>
              <div className="p-3 bg-brand-blue/5 rounded-xl border border-brand-gold/20">
                <span className="block text-xs font-bold text-brand-blue-dark mb-1">
                  How can IQ Education & Immigration help?
                </span>
                <ul className="text-[11px] text-brand-text space-y-1 font-medium list-disc pl-4">
                  <li>Enhance language profiles to reach CLB 9+ (+50 to +100 points)</li>
                  <li>Secure LMIA-approved valid Job Offers (+50 points)</li>
                  <li>Guide you through provincial nomination programs (PNP) (+600 points)</li>
                </ul>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
