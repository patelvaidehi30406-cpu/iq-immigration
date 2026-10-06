"use client";

import React, { useState } from "react";
import PromoFlyer from "@/components/PromoFlyer";
import { Filter } from "lucide-react";

export default function ProgramsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Study Visa", "Work Permit", "Tourist Visa"];

  const flyerData = [
    {
      countryName: "Singapore",
      visaType: "Study Visa",
      title: "Diploma in International Hotel & Tourism Management",
      tagline: "A WORLD OF OPPORTUNITIES AWAITS YOU!",
      features: [
        {
          icon: "book",
          title: "Course Duration",
          items: ["8 Months Study", "6 Months Paid Internship"]
        },
        {
          icon: "building",
          title: "Internship In",
          items: ["5-Star Category Hotels"]
        },
        {
          icon: "wallet",
          title: "Installment",
          items: ["Payment Plan Available"]
        }
      ],
      feeStructure: {
        total: "SGD 6,250",
        installments: [
          { name: "1st Installment", amount: "SGD 3,125" },
          { name: "2nd Installment", amount: "SGD 3,125" },
          { name: "ICA Fee", amount: "SGD 45" }
        ]
      },
      keyHighlights: [
        "Study + Paid Internship Program",
        "Internship in 5-Star Hotels",
        "Installment Payment Option",
        "Ideal Program for Students Seeking International Hospitality Careers"
      ],
      bgImage: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1000&auto=format&fit=crop",
      personImage: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=800&auto=format&fit=crop",
      themeColor: "text-red-600",
      themeBg: "bg-red-600",
      themeBorder: "border-red-600",
      category: "Study Visa"
    },
    {
      countryName: "Canada",
      visaType: "Work Permit",
      title: "LMIA Approved Skilled Worker Program",
      tagline: "FAST-TRACK YOUR CAREER IN CANADA!",
      features: [
        {
          icon: "building",
          title: "Job Placement",
          items: ["Direct Employer Sponsorship", "NOC Skill Level TEER 0,1,2,3"]
        },
        {
          icon: "book",
          title: "PR Pathway",
          items: ["Eligible for Express Entry", "Earn 50-200 CRS Points"]
        },
        {
          icon: "wallet",
          title: "Processing",
          items: ["Transparent Legal Process", "RCIC Certified Auditing"]
        }
      ],
      feeStructure: {
        total: "Variable",
        installments: [
          { name: "Initial Retainer", amount: "CAD 1,500" },
          { name: "Profile Assessment", amount: "CAD 500" },
          { name: "Government Fees", amount: "CAD 155+" }
        ]
      },
      keyHighlights: [
        "Verified Employer Sponsorships",
        "Comprehensive Interview Coaching",
        "Spouse Open Work Permit Eligibility",
        "Full Legal Documentation Support"
      ],
      bgImage: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1000&auto=format&fit=crop",
      personImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
      themeColor: "text-brand-blue-dark",
      themeBg: "bg-brand-blue-dark",
      themeBorder: "border-brand-blue-dark",
      category: "Work Permit"
    },
    {
      countryName: "United Kingdom",
      visaType: "Tourist Visa",
      title: "Standard Visitor Visa (6 Months)",
      tagline: "EXPLORE THE BEAUTY OF THE UK!",
      features: [
        {
          icon: "book",
          title: "Visa Validity",
          items: ["Up to 6 Months Stay", "Multiple Entry Available"]
        },
        {
          icon: "building",
          title: "Purpose",
          items: ["Tourism & Vacation", "Visiting Family/Friends"]
        },
        {
          icon: "wallet",
          title: "Requirements",
          items: ["Strong Financial Ties", "Detailed Itinerary"]
        }
      ],
      feeStructure: {
        total: "£ 115",
        installments: [
          { name: "Govt Application Fee", amount: "£ 115" },
          { name: "Biometric Fee", amount: "Variable" },
          { name: "Consultation Fee", amount: "Contact Us" }
        ]
      },
      keyHighlights: [
        "100% Accurate File Preparation",
        "Sponsorship Letter Drafting",
        "Financial Document Auditing",
        "Quick Processing Times"
      ],
      bgImage: "https://images.unsplash.com/photo-1496851474254-8c4391e63a1d?q=80&w=1000&auto=format&fit=crop",
      personImage: "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?q=80&w=800&auto=format&fit=crop",
      themeColor: "text-purple-700",
      themeBg: "bg-purple-700",
      themeBorder: "border-purple-700",
      category: "Tourist Visa"
    },
    {
      countryName: "Australia",
      visaType: "Study Visa",
      title: "Masters in Information Technology & Business",
      tagline: "SECURE YOUR FUTURE DOWN UNDER!",
      features: [
        {
          icon: "book",
          title: "Course Details",
          items: ["1.5 to 2 Years Masters", "World-Ranked Universities"]
        },
        {
          icon: "building",
          title: "Work Rights",
          items: ["48 Hours / Fortnight", "Post-Study Work Visa (2-4 Yrs)"]
        },
        {
          icon: "wallet",
          title: "Admissions",
          items: ["Scholarships Available", "Offer Letter in 1-2 Weeks"]
        }
      ],
      feeStructure: {
        total: "AUD 30,000/yr",
        installments: [
          { name: "1st Semester Fee", amount: "AUD 15,000" },
          { name: "OSHC (Health Cover)", amount: "AUD 1,200" },
          { name: "Visa Fee", amount: "AUD 710" }
        ]
      },
      keyHighlights: [
        "High Visa Approval Rate",
        "Streamlined Visa Processing",
        "Spouse Visa Assistance Available",
        "Pre-Departure & Accommodation Support"
      ],
      bgImage: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1000&auto=format&fit=crop",
      personImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop",
      themeColor: "text-amber-600",
      themeBg: "bg-amber-600",
      themeBorder: "border-amber-600",
      category: "Study Visa"
    }
  ];

  const filteredFlyers = activeFilter === "All" ? flyerData : flyerData.filter(f => f.category === activeFilter);

  return (
    <main className="min-h-screen bg-brand-gray pb-20">
      
      {/* ─── PAGE HERO ─── */}
      <div className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-brand-blue-dark">
          Explore Our <span className="text-brand-gold">Programs</span>
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
          Discover opportunities across the globe. View our beautifully curated programs for study, work, and tourism in top destinations.
        </p>

        {/* ─── FILTERS ─── */}
        <div className="flex flex-wrap justify-center gap-2 mt-8 pt-4">
          <div className="flex items-center space-x-2 mr-2 text-brand-blue-light font-bold text-sm hidden sm:flex">
            <Filter className="h-4 w-4" />
            <span>Filter:</span>
          </div>
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-brand-blue-dark text-white shadow-md scale-105"
                  : "bg-white text-brand-blue-dark border border-brand-blue/10 hover:border-brand-gold hover:text-brand-gold"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* ─── FLYERS GALLERY ─── */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {filteredFlyers.length > 0 ? (
           <div className="space-y-16 mt-8">
             {filteredFlyers.map((flyer, idx) => (
               <div key={idx} className="animate-in fade-in slide-in-from-bottom-8 duration-700" style={{ animationDelay: `${idx * 150}ms` }}>
                 <PromoFlyer data={flyer} />
               </div>
             ))}
           </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm mt-8">
            <p className="text-gray-500 font-medium">No programs found for this category at the moment.</p>
          </div>
        )}
      </div>

    </main>
  );
}
