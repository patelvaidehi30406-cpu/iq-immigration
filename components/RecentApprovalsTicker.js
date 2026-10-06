"use client";

import React from "react";

const approvals = [
  "🎉 Rahul S. just got his Canada PR approved!",
  "🎓 Priya M. secured admission in University of Toronto!",
  "✈️ Amit K. received his UK Work Permit!",
  "🌟 Neha G. successfully lodged her Australia Subclass 189 file!",
  "💼 Vikram P. got LMIA Sponsorship in Canada!",
  "🎉 Anjali D. received her New Zealand Student Visa!",
];

export default function RecentApprovalsTicker() {
  return (
    <div className="bg-[#081B33] text-white py-1.5 overflow-hidden relative border-b border-white/10 z-50">
      <div className="flex whitespace-nowrap animate-marquee">
        {/* Repeat the list twice to create a seamless loop */}
        {[...approvals, ...approvals, ...approvals].map((text, i) => (
          <span key={i} className="mx-8 text-xs font-medium tracking-wide">
            {text}
          </span>
        ))}
      </div>
      
      {/* CSS for the marquee animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-flex;
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />
    </div>
  );
}
