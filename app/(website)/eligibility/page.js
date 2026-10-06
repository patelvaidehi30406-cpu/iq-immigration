"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { db } from "@/services/db";
import { ShieldCheck, ArrowLeft, ArrowRight, CheckCircle, GraduationCap, Award, Compass, HeartHandshake } from "lucide-react";
import confetti from "canvas-confetti";

export default function EligibilityPage() {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "24",
    education: "Bachelor's Degree",
    experience: "2",
    ielts: "6.5",
    preferredCountry: "Canada"
  });

  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState(null);

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleNext = () => {
    // Validate inputs
    if (step === 1 && (!formData.name || !formData.email || !formData.phone)) {
      alert("Please fill in your name, email and phone to continue.");
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const calculateEligibility = (e) => {
    e.preventDefault();
    setChecking(true);

    setTimeout(() => {
      let scoreText = "";
      let rating = "Good"; // Good, Excellent, Moderate
      let detailDesc = "";

      const band = parseFloat(formData.ielts);
      const exp = parseInt(formData.experience);
      const country = formData.preferredCountry;

      if (country === "Canada") {
        if (band >= 6.5) {
          rating = "Excellent";
          scoreText = "Highly Eligible (Canada SDS Student Permit)";
          detailDesc = "Excellent profile! Your IELTS score matches SDS criteria perfectly. You qualify for direct admissions in top public colleges with rapid visa processing.";
        } else if (band >= 6.0) {
          rating = "Good";
          scoreText = "Eligible (Canada SDS Stream)";
          detailDesc = "Your profile fits standard study requirements. You can apply directly to Seneca, Conestoga, or Humber College.";
        } else {
          rating = "Moderate";
          scoreText = "Eligible (Canada Non-SDS Stream)";
          detailDesc = "Your IELTS score is slightly low for the direct SDS stream. You can apply via the Non-SDS stream or join our IELTS band improvement program.";
        }
      } else if (country === "Australia") {
        if (band >= 6.5 && exp >= 2) {
          rating = "Excellent";
          scoreText = "Highly Eligible (Australia Subclass 190 / Skilled Nominated)";
          detailDesc = "Highly competitive profile for state nominations. You have solid chances to secure pathways in Victoria or NSW.";
        } else {
          rating = "Good";
          scoreText = "Eligible (Australia Subclass 500 / Student Visa)";
          detailDesc = "You qualify for standard university enrollment. We recommend applying for the upcoming July intake.";
        }
      } else if (country === "United Kingdom") {
        if (band >= 6.0) {
          rating = "Excellent";
          scoreText = "Highly Eligible (UK Tier-4 Student Pathway)";
          detailDesc = "Direct admission possible without pre-sessional English courses. You qualify for the 2-Year post-study work visa program.";
        } else {
          rating = "Good";
          scoreText = "Eligible (UK Student Pathway with Pre-Sessional)";
          detailDesc = "You qualify for master placements. You may need a 6-week pre-sessional English course before regular classes begin.";
        }
      } else {
        // Germany / others
        if (band >= 6.5) {
          rating = "Excellent";
          scoreText = "Eligible (Germany Opportunity Card / Public University)";
          detailDesc = "Excellent qualifications. You qualify for tuition-free master programs or the new point-based Opportunity job-seeker card.";
        } else {
          rating = "Good";
          scoreText = "Eligible (Germany Private University)";
          detailDesc = "Good chances. Private colleges in Berlin accept standard IELTS bands. Blocked account funding required.";
        }
      }

      const assessmentResult = {
        rating,
        scoreText,
        detailDesc
      };

      setResult(assessmentResult);
      setChecking(false);
      triggerConfetti();

      // Save Lead in CRM
      db.addLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        age: parseInt(formData.age),
        education: formData.education,
        ielts: formData.ielts,
        experience: formData.experience,
        preferredCountry: formData.preferredCountry,
        type: "Eligibility Checker",
        score: scoreText,
        status: "New"
      });

      // Send to WhatsApp
      const waMsg =
        `🌟 *New Eligibility Check — IQ Education*\n\n` +
        `👤 *Name:* ${formData.name}\n` +
        `📞 *Phone:* ${formData.phone}\n` +
        `📧 *Email:* ${formData.email}\n` +
        `🌍 *Preferred Country:* ${formData.preferredCountry}\n` +
        `🎓 *Education:* ${formData.education}\n` +
        `📊 *IELTS Score:* ${formData.ielts}\n` +
        `💼 *Work Experience:* ${formData.experience} years\n` +
        `📅 *Age:* ${formData.age}\n` +
        `✅ *Eligibility Result:* ${scoreText}\n\n` +
        `_Sent via IQ Education Eligibility Checker_`;
      window.open(`https://wa.me/918799072887?text=${encodeURIComponent(waMsg)}`, "_blank");

    }, 2000);
  };

  const resetForm = () => {
    setStep(1);
    setResult(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      age: "24",
      education: "Bachelor's Degree",
      experience: "2",
      ielts: "6.5",
      preferredCountry: "Canada"
    });
  };

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Header Banner */}
      <section className="bg-gradient-premium py-16 text-white text-center border-b border-brand-gold/15 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.1),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-gold">Instant Evaluation</span>
          <h1 className="text-4xl font-extrabold font-heading text-white">{t("eligibilityTitle")}</h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto">
            {t("eligibilityIntro")}
          </p>
        </div>
      </section>

      {/* 2. Interactive Step Wizard Card */}
      <section className="max-w-xl mx-auto px-4 sm:px-6">
        <div className="glass-card p-6 sm:p-10 rounded-3xl bg-white border border-brand-blue-light/5 shadow-2xl relative overflow-hidden">

          {/* Progress Indicators */}
          {result === null && (
            <div className="flex justify-between items-center mb-8 border-b border-brand-blue/5 pb-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center space-x-2">
                  <div
                    className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step >= s
                        ? "bg-brand-blue text-brand-gold font-black border border-brand-gold"
                        : "bg-gray-100 text-gray-400"
                      }`}
                  >
                    {s}
                  </div>
                  <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${step === s ? "text-brand-gold" : "text-gray-400"}`}>
                    {s === 1 ? "Profile" : s === 2 ? "Education" : "Country"}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Results View */}
          {result !== null ? (
            <div className="text-center py-6 space-y-8 animate-in zoom-in-95 duration-200">
              <div className="space-y-4">
                <div className="h-16 w-16 bg-brand-gold/15 rounded-full flex items-center justify-center mx-auto text-brand-gold border border-brand-gold/30 animate-bounce">
                  <Award className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-black font-heading text-brand-blue-dark">
                  Assessment Completed!
                </h2>
              </div>

              <div className="p-6 bg-brand-blue/5 rounded-2xl border border-brand-blue-light/5 space-y-3">
                <div className="inline-block px-3 py-1 bg-green-500/10 text-green-700 text-xs font-bold rounded-full uppercase border border-green-500/25">
                  Rating: {result.rating}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-brand-blue-dark font-heading">
                  {result.scoreText}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-sm mx-auto">
                  {result.detailDesc}
                </p>
              </div>

              <div className="p-4 border border-brand-blue-light/10 rounded-2xl text-left bg-gray-50 flex items-start space-x-3 text-xs sm:text-sm text-gray-500">
                <HeartHandshake className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                <span>
                  Our licensed advisor has received your score card in the CRM. You will receive a direct callback to draft your visa application details.
                </span>
              </div>

              <button
                onClick={resetForm}
                className="w-full py-3.5 bg-gradient-premium text-white font-extrabold rounded-xl hover:shadow-lg transition-all text-xs uppercase tracking-wider"
              >
                Scan Another Profile
              </button>
            </div>
          ) : (
            // Form Steps
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">

              {/* Step 1: Personal Info */}
              {step === 1 && (
                <div className="space-y-4 animate-in slide-in-from-right duration-250">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-brand-blue-dark uppercase tracking-wider">
                      {t("formName")}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-brand-blue-light/10 rounded-xl focus:outline-none focus:border-brand-gold text-sm text-brand-blue-dark"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-brand-blue-dark uppercase tracking-wider">
                      {t("formEmail")}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-brand-blue-light/10 rounded-xl focus:outline-none focus:border-brand-gold text-sm text-brand-blue-dark"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-blue-dark uppercase tracking-wider">
                        {t("formPhone")}
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 9999"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-brand-blue-light/10 rounded-xl focus:outline-none focus:border-brand-gold text-sm text-brand-blue-dark"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-blue-dark uppercase tracking-wider">
                        {t("formAge")}
                      </label>
                      <input
                        type="number"
                        required
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-brand-blue-light/10 rounded-xl focus:outline-none focus:border-brand-gold text-sm text-brand-blue-dark"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Education & Work */}
              {step === 2 && (
                <div className="space-y-4 animate-in slide-in-from-right duration-250">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-brand-blue-dark uppercase tracking-wider">
                      {t("formEducation")}
                    </label>
                    <select
                      value={formData.education}
                      onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-brand-blue-light/10 rounded-xl focus:outline-none focus:border-brand-gold text-xs sm:text-sm text-brand-blue-dark"
                    >
                      <option value="High School (12th)">High School (12th Pass)</option>
                      <option value="Diploma Holder">3-Year Diploma Holder</option>
                      <option value="Bachelor's Degree">Bachelor's Degree</option>
                      <option value="Master's Degree">Master's Degree / MBA</option>
                      <option value="Doctorate (PhD)">Doctorate (PhD)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-brand-blue-dark uppercase tracking-wider">
                      {t("formWorkExp")}
                    </label>
                    <select
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-brand-blue-light/10 rounded-xl focus:outline-none focus:border-brand-gold text-xs sm:text-sm text-brand-blue-dark"
                    >
                      <option value="0">Fresh Graduate / No Experience</option>
                      <option value="1">1 Year Experience</option>
                      <option value="2">2 Years Experience</option>
                      <option value="3">3 Years Experience</option>
                      <option value="4">4+ Years Experience</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 3: English score & Country */}
              {step === 3 && (
                <div className="space-y-4 animate-in slide-in-from-right duration-250">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-brand-blue-dark uppercase tracking-wider">
                      {t("formIelts")}
                    </label>
                    <select
                      value={formData.ielts}
                      onChange={(e) => setFormData({ ...formData, ielts: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-brand-blue-light/10 rounded-xl focus:outline-none focus:border-brand-gold text-xs sm:text-sm text-brand-blue-dark"
                    >
                      <option value="8.0">8.0 overall or higher</option>
                      <option value="7.5">7.5 overall band</option>
                      <option value="7.0">7.0 overall band</option>
                      <option value="6.5">6.5 overall band</option>
                      <option value="6.0">6.0 overall band</option>
                      <option value="5.5">5.5 overall band</option>
                      <option value="5.0">5.0 overall or lower</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-brand-blue-dark uppercase tracking-wider">
                      {t("formPreferredCountry")}
                    </label>
                    <select
                      value={formData.preferredCountry}
                      onChange={(e) => setFormData({ ...formData, preferredCountry: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-brand-blue-light/10 rounded-xl focus:outline-none focus:border-brand-gold text-xs sm:text-sm text-brand-blue-dark"
                    >
                      <option value="Canada">Canada 🇨🇦</option>
                      <option value="Australia">Australia 🇦🇺</option>
                      <option value="United Kingdom">United Kingdom 🇬🇧</option>
                      <option value="Germany">Germany 🇩🇪</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Bottom Buttons Controls */}
              <div className="flex space-x-4 border-t border-brand-blue/5 pt-4 mt-6">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 py-3 border border-brand-blue-light/15 rounded-xl text-xs font-bold text-brand-blue-dark hover:border-brand-gold flex items-center justify-center space-x-1"
                  >
                    <ArrowLeft className="h-4.5 w-4.5" />
                    <span>Back</span>
                  </button>
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex-1 py-3 bg-brand-blue text-white rounded-xl text-xs font-extrabold uppercase tracking-wide flex items-center justify-center space-x-1"
                  >
                    <span>Next step</span>
                    <ArrowRight className="h-4.5 w-4.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={calculateEligibility}
                    disabled={checking}
                    className="flex-grow py-3 bg-gradient-gold text-brand-blue-dark rounded-xl text-xs font-extrabold uppercase tracking-wide flex items-center justify-center space-x-1.5 disabled:opacity-50"
                  >
                    <span>{checking ? "Auditing Profile..." : "Submit & Check Result"}</span>
                    <CheckCircle className="h-4.5 w-4.5 shrink-0" />
                  </button>
                )}
              </div>

            </form>
          )}

        </div>
      </section>
    </div>
  );
}
