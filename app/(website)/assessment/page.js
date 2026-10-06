"use client";

import React, { useState } from "react";
import { CloudUpload } from "lucide-react";

export default function AssessmentPage() {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    phone: "",
    email: "",
    children: "",
    dob: "",
    currentCountry: "Afghanistan",
    nationality: "Afghanistan",
    destination: "",
    visaType: "I need assistance",
    requests: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send to WhatsApp
    const waMsg =
      `📋 *Assessment Form — IQ Education*\n\n` +
      `👤 *Name:* ${formData.name} ${formData.lastName}\n` +
      `📞 *Phone:* ${formData.phone}\n` +
      `📧 *Email:* ${formData.email}\n` +
      `📅 *Date of Birth:* ${formData.dob}\n` +
      `👨‍👩‍👧 *Children:* ${formData.children || "0"}\n` +
      `🌍 *Current Country:* ${formData.currentCountry}\n` +
      `🛂 *Nationality:* ${formData.nationality}\n` +
      `✈️ *Destination:* ${formData.destination || "Not specified"}\n` +
      `🎫 *Visa Type:* ${formData.visaType}\n` +
      `💬 *Additional Requests:* ${formData.requests || "None"}\n\n` +
      `_Sent via IQ Education Assessment Form_`;
    window.open(`https://wa.me/918799072887?text=${encodeURIComponent(waMsg)}`, "_blank");
    setSubmitted(true);
  };

  const InputLabel = ({ title, required }) => (
    <label className="block text-[13px] font-bold text-gray-800 mb-1.5">
      {title} {required && <span className="text-red-500 font-normal italic text-xs">(Required)</span>}
    </label>
  );

  return (
    <main className="min-h-screen bg-[#F8F9FA] pb-24">
      <div className="pt-32 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 sm:p-12">
          
          {submitted ? (
            <div className="text-center py-16 space-y-4">
              <h2 className="text-2xl font-bold text-[#081B33]">Thank you for your submission!</h2>
              <p className="text-gray-600">We will review your profile and get back to you shortly.</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-10">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#081B33] tracking-wide">
                  You are one step closer...
                </h1>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <InputLabel title="Name" required />
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <InputLabel title="Last Name" required />
                    <input 
                      type="text" 
                      required
                      value={formData.lastName}
                      onChange={e => setFormData({...formData, lastName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Contact Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <InputLabel title="Phone" required />
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <InputLabel title="Email" required />
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Details Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <InputLabel title="Number of children" />
                    <input 
                      type="number" 
                      min="0"
                      value={formData.children}
                      onChange={e => setFormData({...formData, children: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-colors mb-1"
                    />
                    <p className="text-[11px] text-gray-500">Please enter a number greater than or equal to 0.</p>
                  </div>
                  <div>
                    <InputLabel title="Date of Birth" />
                    <input 
                      type="date" 
                      placeholder="dd/mm/yyyy"
                      value={formData.dob}
                      onChange={e => setFormData({...formData, dob: e.target.value})}
                      className="w-3/4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-colors text-gray-500"
                    />
                  </div>
                </div>

                {/* Country Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <InputLabel title="Current country of residence" required />
                    <select 
                      required
                      value={formData.currentCountry}
                      onChange={e => setFormData({...formData, currentCountry: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-colors text-gray-700 bg-white"
                    >
                      <option>Afghanistan</option>
                      <option>India</option>
                      <option>United Arab Emirates</option>
                      <option>United Kingdom</option>
                      <option>United States</option>
                    </select>
                  </div>
                  <div>
                    <InputLabel title="Nationality" required />
                    <select 
                      required
                      value={formData.nationality}
                      onChange={e => setFormData({...formData, nationality: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-colors text-gray-700 bg-white"
                    >
                      <option>Afghanistan</option>
                      <option>India</option>
                      <option>United Arab Emirates</option>
                      <option>United Kingdom</option>
                      <option>United States</option>
                    </select>
                  </div>
                </div>

                {/* Destination Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <InputLabel title="Destination" />
                    <input 
                      type="text" 
                      value={formData.destination}
                      onChange={e => setFormData({...formData, destination: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <InputLabel title="Visa type you need assistance with" />
                    <select 
                      value={formData.visaType}
                      onChange={e => setFormData({...formData, visaType: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-colors text-gray-700 bg-white"
                    >
                      <option>I need assistance</option>
                      <option>Study Visa</option>
                      <option>Work Permit</option>
                      <option>Tourist Visa</option>
                      <option>Permanent Residency</option>
                    </select>
                  </div>
                </div>

                {/* Conditional Visa Information Panel */}
                {formData.visaType === "Study Visa" && (
                  <div className="bg-[#F0F7FF] border-l-4 border-[#003366] p-4 rounded-r-md mt-4">
                    <h4 className="text-[#003366] font-bold text-sm mb-2">Study Visa Requirements & Info</h4>
                    <ul className="text-xs text-gray-700 space-y-1 list-disc pl-4">
                      <li>Valid passport and educational transcripts.</li>
                      <li>Minimum IELTS/PTE score as per university requirements.</li>
                      <li>Proof of funds for tuition and living expenses (e.g., GIC for Canada).</li>
                      <li>Statement of Purpose (SOP) explaining your career goals.</li>
                    </ul>
                  </div>
                )}

                {formData.visaType === "Work Permit" && (
                  <div className="bg-[#F0F7FF] border-l-4 border-[#003366] p-4 rounded-r-md mt-4">
                    <h4 className="text-[#003366] font-bold text-sm mb-2">Work Permit Requirements & Info</h4>
                    <ul className="text-xs text-gray-700 space-y-1 list-disc pl-4">
                      <li>Valid job offer from an approved employer (LMIA for Canada, CoS for UK).</li>
                      <li>Relevant work experience and educational background matching the job.</li>
                      <li>ATS-friendly Resume / CV.</li>
                      <li>Clear police and medical records.</li>
                    </ul>
                  </div>
                )}

                {formData.visaType === "Tourist Visa" && (
                  <div className="bg-[#F0F7FF] border-l-4 border-[#003366] p-4 rounded-r-md mt-4">
                    <h4 className="text-[#003366] font-bold text-sm mb-2">Tourist Visa Requirements & Info</h4>
                    <ul className="text-xs text-gray-700 space-y-1 list-disc pl-4">
                      <li>Day-wise travel itinerary & hotel reservation copies.</li>
                      <li>6 Months bank statements showing sufficient travel balance.</li>
                      <li>Employment verification or business registry proofs.</li>
                      <li>Return flight tickets booking confirmation.</li>
                    </ul>
                  </div>
                )}

                {formData.visaType === "Permanent Residency" && (
                  <div className="bg-[#F0F7FF] border-l-4 border-[#003366] p-4 rounded-r-md mt-4">
                    <h4 className="text-[#003366] font-bold text-sm mb-2">PR Requirements & Info</h4>
                    <ul className="text-xs text-gray-700 space-y-1 list-disc pl-4">
                      <li>Point-based assessments (CRS scores) for Express Entry (Canada) or SkillSelect (Australia).</li>
                      <li>Educational Credential Assessment (ECA).</li>
                      <li>High language proficiency scores (IELTS/CELPIP).</li>
                      <li>Proof of work experience and settlement funds.</li>
                    </ul>
                  </div>
                )}

                {/* Textarea */}
                <div>
                  <InputLabel title="Any requests or something you want us to know?" />
                  <textarea 
                    rows="6"
                    value={formData.requests}
                    onChange={e => setFormData({...formData, requests: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-colors resize-y"
                  />
                </div>

                {/* Submit Buttons */}
                <div className="pt-4 flex items-center space-x-6">
                  <button 
                    type="submit"
                    className="bg-[#003366] hover:bg-[#002244] text-white px-8 py-2.5 rounded font-medium text-sm transition-colors"
                  >
                    Submit
                  </button>
                  <button 
                    type="button"
                    className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 font-medium text-sm transition-colors"
                  >
                    <CloudUpload className="h-5 w-5" />
                    <span>Save and Continue Later</span>
                  </button>
                </div>

              </form>
            </>
          )}

        </div>
      </div>
    </main>
  );
}
