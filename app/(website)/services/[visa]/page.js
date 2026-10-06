import React from "react";
import Link from "next/link";
import { FAQAccordion, ApplyForm } from "@/components/VisaServiceComponents";
import {
  User, FileText, Edit3, CreditCard, Monitor, Calendar, CheckCircle2,
  Briefcase, Search, Globe, Award, ClipboardList, Send, ArrowRight,
  Phone, BookOpen, GraduationCap, Building2, Plane, Shield, Clock,
  DollarSign, AlertCircle, ChevronRight, ChevronDown
} from "lucide-react";

// ── All Visa Data ──────────────────────────────────────────────────────────
const visaData = {
  "student-visa": {
    title: "Student Visa",
    subtitle: "STUDY ABROAD PREPARATION",
    flag: "🎓",
    heroColor: "from-[#e8524a] via-[#c0392b] to-[#1a2a4a]",
    tagColor: "bg-red-100 text-red-700",
    description: "Your complete step-by-step guide to preparing and securing a Student Visa for top destinations including Canada, UK, Australia, USA, Germany, and more.",
    heroImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop",
    steps: [
      {
        num: "01",
        title: "Profile Evaluation",
        desc: "Our counselors evaluate your academic profile and guide you in choosing the right course and university.",
        icon: User,
      },
      {
        num: "02",
        title: "University Application",
        desc: "Apply to universities and receive your Offer Letter / Letter of Acceptance (LOA).",
        icon: FileText,
      },
      {
        num: "03",
        title: "SOP & Document Prep",
        desc: "Prepare your Statement of Purpose, LOR, academic transcripts, and financial documents.",
        icon: Edit3,
      },
      {
        num: "04",
        title: "GIC / Blocked Account",
        desc: "Open a GIC account (Canada) or blocked account (Germany) as per the country requirement.",
        icon: CreditCard,
      },
      {
        num: "05",
        title: "Visa Application Filing",
        desc: "Complete and submit the online student visa application form (DS-160 / UKVI / ImmiAccount).",
        icon: Monitor,
      },
      {
        num: "06",
        title: "Biometrics & Medical",
        desc: "Submit biometric data and complete any required medical or TB test clearance.",
        icon: Shield,
      },
      {
        num: "07",
        title: "Visa Interview",
        desc: "Attend the visa interview at the embassy or consulate and receive your final visa decision.",
        icon: Calendar,
      },
      {
        num: "08",
        title: "Pre-Departure Briefing",
        desc: "IQ Education provides a complete pre-departure orientation — accommodation, SIM, airport pickup.",
        icon: Plane,
      },
    ],
    documents: [
      "Valid Passport (6+ months validity)",
      "Letter of Acceptance (LOA) from University",
      "IELTS / PTE Score Card (6.0+ overall)",
      "Academic Transcripts & Certificates",
      "Statement of Purpose (SOP)",
      "Bank Statements (6 months)",
      "GIC / Blocked Account Proof",
      "Sponsor's ITR (3 years)",
      "Passport-size Photographs",
      "Visa Application Fee Receipt",
    ],
    requirements: [
      { label: "Minimum Marks", value: "55%–65% in 12th / Bachelor's" },
      { label: "IELTS Score", value: "6.0 – 6.5 (varies by country)" },
      { label: "Processing Time", value: "3 – 8 weeks" },
      { label: "Visa Fee", value: "Country-specific" },
      { label: "Financial Proof", value: "Required (GIC / Bank Stmt)" },
      { label: "Post-Study Work", value: "2–3 years (country-based)" },
    ],
    processingFees: [
      { country: "Canada", cost: "CAD $150", time: "4 - 8 Weeks" },
      { country: "UK", cost: "£490 (Outside UK)", time: "3 - 4 Weeks" },
      { country: "Australia", cost: "AUD $710", time: "2 - 6 Weeks" },
      { country: "USA", cost: "USD $185 + SEVIS $350", time: "Variable (Interview based)" },
    ],
    faqs: [
      { q: "When should I start applying for a Student Visa?", a: "You should start your visa process as soon as you receive your unconditional offer letter (LOA) and arrange your funds. Typically, this is 3-4 months before your intake." },
      { q: "What if my student visa gets rejected?", a: "If rejected, you will receive a refusal letter stating the reasons. Our experts will analyze the GCMS/refusal notes, address the gaps, and help you reapply with a stronger profile." },
      { q: "Can I apply for a student visa without IELTS?", a: "Yes, some countries (like the UK or specific European universities) may offer English language waivers based on your Medium of Instruction (MOI) or 12th-grade marks, but an IELTS/PTE score is generally recommended for faster visa processing." }
    ]
  },

  "work-permit": {
    title: "Work Permit / LMIA",
    subtitle: "WORK ABROAD PREPARATION",
    flag: "💼",
    heroColor: "from-[#1565C0] via-[#0d47a1] to-[#0a1628]",
    tagColor: "bg-blue-100 text-blue-700",
    description: "Complete preparation guide for Canadian Work Permit, LMIA, Open/Closed Work Permits, PGWP, and UK Skilled Worker Visa — everything you need to work legally abroad.",
    heroImage: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop",
    steps: [
      {
        num: "01",
        title: "Profile Assessment",
        desc: "Our RCIC consultants assess your work experience, education, and IELTS score to identify the best work permit pathway.",
        icon: User,
      },
      {
        num: "02",
        title: "Job Offer / LMIA Audit",
        desc: "We verify your Canadian job offer letter and audit the employer's LMIA document for compliance and authenticity.",
        icon: Search,
      },
      {
        num: "03",
        title: "Document Collection",
        desc: "Collect employment contracts, pay stubs, reference letters, ECA (educational credential assessment), and police clearance.",
        icon: FileText,
      },
      {
        num: "04",
        title: "Express Entry Profile",
        desc: "Create or update your Express Entry profile with CRS score optimization strategies for high-ranking draws.",
        icon: Monitor,
      },
      {
        num: "05",
        title: "Work Permit Application",
        desc: "File the work permit application online through IRCC (Canada) or UKVI portal with all supporting documents.",
        icon: Edit3,
      },
      {
        num: "06",
        title: "Biometrics Appointment",
        desc: "Attend a biometrics collection appointment at the nearest Visa Application Centre (VAC).",
        icon: Shield,
      },
      {
        num: "07",
        title: "Medical Examination",
        desc: "Complete a medical examination with an IRCC-designated panel physician if required.",
        icon: ClipboardList,
      },
      {
        num: "08",
        title: "Visa Approval & Port Entry",
        desc: "Receive your work permit approval and get guidance for port of entry formalities.",
        icon: Award,
      },
    ],
    documents: [
      "Valid Passport (2+ years validity)",
      "LMIA-backed Job Offer Letter",
      "Educational Credential Assessment (ECA)",
      "IELTS Score Card (CLB 5+ for most streams)",
      "Employment Reference Letters (3–5 years)",
      "Police Clearance Certificate",
      "Proof of Work Experience",
      "Bank Statements (3 months)",
      "Passport-size Photographs",
      "Biometrics Receipt",
    ],
    requirements: [
      { label: "Work Experience", value: "Minimum 1 year in NOC skill type" },
      { label: "IELTS / Language", value: "CLB 5 or higher" },
      { label: "Processing Time", value: "4 – 16 weeks" },
      { label: "LMIA Requirement", value: "Required for closed work permit" },
      { label: "Visa Fee", value: "CAD $155 + Biometrics $85" },
      { label: "Validity", value: "1–3 years (extendable)" },
    ],
    processingFees: [
      { type: "Canada Work Permit (Closed/Open)", cost: "CAD $155", time: "8 - 12 Weeks" },
      { type: "Open Work Permit Holder Fee", cost: "CAD $100", time: "Paid with application" },
      { type: "Biometrics (per person)", cost: "CAD $85", time: "Within 30 days" },
    ],
    faqs: [
      { q: "What is an LMIA?", a: "A Labour Market Impact Assessment (LMIA) is a document an employer in Canada may need to get before hiring a foreign worker. A positive LMIA shows there is a need for a foreign worker to fill the job." },
      { q: "Can my spouse work if I hold a closed work permit?", a: "Yes, in many cases, if you hold an LMIA-based closed work permit in a skilled occupation (TEER 0, 1, 2, or 3), your spouse is eligible to apply for a Spousal Open Work Permit (SOWP)." },
      { q: "What is a Post-Graduation Work Permit (PGWP)?", a: "A PGWP is an open work permit granted to international students who have graduated from a designated learning institution (DLI) in Canada. It allows you to work for any employer for up to 3 years." }
    ]
  },

  "extension-visa": {
    title: "Extension Visa",
    subtitle: "VISA EXTENSION PREPARATION",
    flag: "📋",
    heroColor: "from-[#6a1b9a] via-[#4a148c] to-[#1a0a2e]",
    tagColor: "bg-purple-100 text-purple-700",
    description: "Complete guide to extending your Study Permit, Work Permit, or Visitor Visa before expiry — avoid status violations and maintain your legal stay in Canada, UK, or Australia.",
    heroImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1200&auto=format&fit=crop",
    steps: [
      {
        num: "01",
        title: "Current Status Review",
        desc: "Our consultants review your existing permit, expiry date, and immigration status to plan the extension timeline.",
        icon: Search,
      },
      {
        num: "02",
        title: "Eligibility Check",
        desc: "Confirm eligibility for extension — new acceptance letter, job continuation, or valid visitor reason.",
        icon: CheckCircle2,
      },
      {
        num: "03",
        title: "Document Preparation",
        desc: "Gather updated school enrollment, employment letter, bank statements, and tax documents.",
        icon: FileText,
      },
      {
        num: "04",
        title: "Online Application Filing",
        desc: "Submit the extension application through IRCC portal (Canada) or UKVI (UK) before current permit expires.",
        icon: Monitor,
      },
      {
        num: "05",
        title: "Implied Status / Bridging",
        desc: "If applied before expiry, you are protected under Implied Status while awaiting the new permit decision.",
        icon: Shield,
      },
      {
        num: "06",
        title: "Biometrics (if required)",
        desc: "Complete biometrics if the permit has been expired for over 10 years or it's your first extension.",
        icon: User,
      },
      {
        num: "07",
        title: "Decision & New Permit",
        desc: "Receive extended permit via email. Confirm all details (dates, conditions) are accurate before travel.",
        icon: Award,
      },
    ],
    documents: [
      "Current Valid Permit / Visa",
      "New Offer Letter / Enrollment Proof",
      "Updated Bank Statements",
      "Employer Letter (for work extension)",
      "ITR / Tax Documents (if applicable)",
      "Passport (valid for full requested period)",
      "Photos (passport-size)",
      "OSHC / Health Insurance Renewal",
    ],
    requirements: [
      { label: "Apply Before", value: "30–90 days before expiry" },
      { label: "Implied Status", value: "Maintained if applied on time" },
      { label: "Processing Time", value: "4 – 12 weeks" },
      { label: "Visa Fee", value: "CAD $150 – $350" },
      { label: "Conditions", value: "Must continue original purpose" },
      { label: "Max Extensions", value: "Varies by visa type" },
    ],
    processingFees: [
      { type: "Study Permit Extension", cost: "CAD $150", time: "60 - 90 Days" },
      { type: "Work Permit Extension", cost: "CAD $155", time: "90 - 120 Days" },
      { type: "Visitor Record Extension", cost: "CAD $100", time: "60 - 80 Days" },
    ],
    faqs: [
      { q: "What is Implied Status (Maintained Status)?", a: "If you apply to extend your permit before your current one expires, you can legally stay in the country under 'maintained status' until a decision is made, even if your original permit expires in the meantime." },
      { q: "How early should I apply for an extension?", a: "IRCC recommends applying at least 30 days before your current permit expires. However, we suggest starting the process 90 days prior to gather documents." },
      { q: "Can I travel outside Canada while on Implied Status?", a: "It is strongly advised NOT to travel. If you leave Canada while on maintained status, you lose that status and may only re-enter as a visitor (losing your right to work/study until the new permit is approved)." }
    ]
  },

  "visit-visa": {
    title: "Visit / Tourist Visa",
    subtitle: "VISITOR VISA PREPARATION",
    flag: "✈️",
    heroColor: "from-[#00796b] via-[#004d40] to-[#0a1628]",
    tagColor: "bg-teal-100 text-teal-700",
    description: "Step-by-step preparation for Tourist Visa, Family Visit Visa, and Business Visit Visa for Canada, UK, Australia, USA, Europe, and UAE.",
    heroImage: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200&auto=format&fit=crop",
    steps: [
      {
        num: "01",
        title: "Purpose Assessment",
        desc: "Identify your visit purpose — tourism, family reunion, medical, or business — to determine the correct visa category.",
        icon: Search,
      },
      {
        num: "02",
        title: "Financial Document Prep",
        desc: "Prepare bank statements (6 months), salary slips, ITR (3 years), and FD proof to show sufficient funds.",
        icon: CreditCard,
      },
      {
        num: "03",
        title: "Travel Itinerary",
        desc: "Create a detailed travel plan with hotel bookings, flight tickets, and planned activities.",
        icon: Plane,
      },
      {
        num: "04",
        title: "Invitation Letter",
        desc: "Obtain an invitation letter from sponsor or host (for family visits) or from business partner (for B-visa).",
        icon: FileText,
      },
      {
        num: "05",
        title: "Visa Application Filing",
        desc: "Fill and submit the correct visitor visa application form with all documents to the embassy or VAC.",
        icon: Edit3,
      },
      {
        num: "06",
        title: "Biometrics Appointment",
        desc: "Visit the Visa Application Centre for biometrics (fingerprints & photo collection).",
        icon: User,
      },
      {
        num: "07",
        title: "Embassy Interview (if any)",
        desc: "Some embassies (especially USA B1/B2) require an in-person interview. We prepare you with mock sessions.",
        icon: Calendar,
      },
      {
        num: "08",
        title: "Visa Decision",
        desc: "Receive your visa stamp/sticker in passport. Verify all dates and conditions before travel.",
        icon: Award,
      },
    ],
    documents: [
      "Valid Passport (6+ months validity)",
      "Completed Visa Application Form",
      "Passport-size Photographs",
      "Bank Statements (6 months)",
      "ITR — Last 3 Years",
      "Employment / Business Proof",
      "Hotel & Flight Booking Confirmation",
      "Travel Insurance Certificate",
      "Invitation Letter (for family visit)",
      "No Objection Certificate (NOC) from employer",
    ],
    requirements: [
      { label: "Financial Proof", value: "Proportional to trip duration" },
      { label: "Processing Time", value: "2 – 6 weeks" },
      { label: "Visa Fee", value: "USD $185 (USA) / CAD $100 (Canada)" },
      { label: "Interview", value: "Required for USA B1/B2" },
      { label: "Duration", value: "Up to 6 months" },
      { label: "Multiple Entry", value: "Available for most countries" },
    ],
    processingFees: [
      { type: "Canada Visitor Visa", cost: "CAD $100 + $85 Biometrics", time: "30 - 60 Days" },
      { type: "USA B1/B2 Visa", cost: "USD $185", time: "Interview Wait Times Vary" },
      { type: "Schengen Visa", cost: "EUR €80", time: "15 - 30 Days" },
    ],
    faqs: [
      { q: "How much bank balance is required for a tourist visa?", a: "It depends on the country and duration of stay. Generally, you need to show enough funds to cover flights, accommodation, and daily expenses (e.g., $100-$150 per day of your trip)." },
      { q: "What is an Invitation Letter?", a: "If you are visiting family or friends, they must provide a letter stating they invite you, detail the purpose of the trip, and confirm if they will be covering your expenses or providing accommodation." },
      { q: "Can a visitor visa be converted to a work permit?", a: "In most countries (like USA/UK), you cannot convert a visitor visa to a work permit from within the country. However, Canada occasionally runs public policies allowing visitors with valid job offers to apply for work permits inland." }
    ]
  },

  "super-visa": {
    title: "Super Visa (Canada)",
    subtitle: "SUPER VISA PREPARATION",
    flag: "🏠",
    heroColor: "from-[#e65100] via-[#bf360c] to-[#1a0a0a]",
    tagColor: "bg-orange-100 text-orange-700",
    description: "Canada Super Visa allows parents and grandparents of Canadian PR/citizens to visit for up to 5 years per entry. Complete step-by-step preparation guide.",
    heroImage: "https://images.unsplash.com/photo-1517935706615-2717063c2225?q=80&w=1200&auto=format&fit=crop",
    steps: [
      {
        num: "01",
        title: "Sponsor Eligibility Check",
        desc: "Confirm the Canadian child/grandchild (sponsor) meets the minimum income threshold (LICO) requirements.",
        icon: CheckCircle2,
      },
      {
        num: "02",
        title: "Invitation Letter",
        desc: "The Canadian sponsor prepares an invitation letter promising to support the parent financially during the visit.",
        icon: FileText,
      },
      {
        num: "03",
        title: "Medical Health Insurance",
        desc: "Purchase at least 1-year Canadian medical health insurance of minimum $100,000 CAD from a Canadian insurer.",
        icon: Shield,
      },
      {
        num: "04",
        title: "Medical Examination",
        desc: "Complete a medical exam with an IRCC-designated panel physician — results valid for 12 months.",
        icon: ClipboardList,
      },
      {
        num: "05",
        title: "Financial Documents",
        desc: "Compile sponsor's NOA (Notice of Assessment), T4 slips, and bank statements to prove LICO compliance.",
        icon: CreditCard,
      },
      {
        num: "06",
        title: "Visa Application Filing",
        desc: "Submit the Super Visa application online through IRCC portal with all supporting documents.",
        icon: Monitor,
      },
      {
        num: "07",
        title: "Biometrics Collection",
        desc: "Attend a biometrics appointment at the nearest Visa Application Centre (VAC).",
        icon: User,
      },
      {
        num: "08",
        title: "Visa Approval",
        desc: "Receive Super Visa — valid for 10 years with multiple entries, up to 5 years per stay.",
        icon: Award,
      },
    ],
    documents: [
      "Valid Passport (Parent/Grandparent)",
      "Sponsor's Invitation Letter",
      "Proof of Sponsor's PR/Citizenship",
      "Sponsor's NOA & Tax Returns",
      "Canadian Medical Health Insurance ($100K min)",
      "Medical Exam Results (Panel Physician)",
      "Bank Statements (Parent's finances)",
      "Photographs (Passport-size)",
      "Biometrics Fee Receipt",
      "Sponsor's Employment Letter",
    ],
    requirements: [
      { label: "Sponsor Income", value: "LICO + 30% minimum" },
      { label: "Insurance Required", value: "$100,000 CAD minimum" },
      { label: "Medical Exam", value: "Mandatory" },
      { label: "Processing Time", value: "8 – 16 weeks" },
      { label: "Visa Validity", value: "Up to 10 years" },
      { label: "Stay Per Entry", value: "Up to 5 years" },
    ],
    processingFees: [
      { type: "Super Visa Application", cost: "CAD $100", time: "8 - 16 Weeks" },
      { type: "Biometrics Fee", cost: "CAD $85", time: "Required" },
      { type: "Health Insurance (Annual)", cost: "CAD $800 - $1500+", time: "Purchased before applying" },
    ],
    faqs: [
      { q: "What is LICO for a Super Visa?", a: "LICO stands for Low Income Cut-Off. The Canadian sponsor must prove their household income meets or exceeds this threshold to ensure they can financially support the visiting parents." },
      { q: "Can I pay health insurance in monthly installments?", a: "Yes, some Canadian insurance providers now offer monthly installment plans, but you must still provide proof of a 1-year policy coverage of at least $100,000 CAD during application." },
      { q: "How is a Super Visa different from a standard visitor visa?", a: "A standard visitor visa allows a maximum stay of 6 months per entry. A Super Visa allows parents/grandparents to stay for up to 5 consecutive years per entry." }
    ]
  },

  "permanent-residence": {
    title: "Permanent Residency (PR)",
    subtitle: "PR APPLICATION PREPARATION",
    flag: "🍁",
    heroColor: "from-[#c62828] via-[#8d1c1c] to-[#0a1628]",
    tagColor: "bg-red-100 text-red-800",
    description: "Complete preparation guide for Canadian PR through Express Entry, PNP, Atlantic Immigration, and Family Sponsorship — plus UK and Australia PR pathways.",
    heroImage: "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?q=80&w=1200&auto=format&fit=crop",
    steps: [
      {
        num: "01",
        title: "Eligibility Assessment",
        desc: "Our RCIC consultants evaluate your CRS score, language results, work experience, and education for Express Entry.",
        icon: Search,
      },
      {
        num: "02",
        title: "CRS Score Optimization",
        desc: "Boost your CRS score using legal strategies — re-attempting IELTS, adding siblings in Canada, Provincial Nomination.",
        icon: Award,
      },
      {
        num: "03",
        title: "Express Entry Profile",
        desc: "Create your IRCC profile on the Express Entry portal and enter the pool for Invitation to Apply (ITA) draws.",
        icon: Monitor,
      },
      {
        num: "04",
        title: "Provincial Nomination (PNP)",
        desc: "If eligible, apply for a Provincial Nominee Program stream to get an additional 600 CRS points boost.",
        icon: Globe,
      },
      {
        num: "05",
        title: "ITA & Document Gathering",
        desc: "Once you receive an Invitation to Apply (ITA), compile all PR documents within the 60-day deadline.",
        icon: FileText,
      },
      {
        num: "06",
        title: "Police Clearance & Medical",
        desc: "Obtain police clearance certificates from all countries lived in + complete IRCC medical examination.",
        icon: Shield,
      },
      {
        num: "07",
        title: "PR Application Submission",
        desc: "Submit complete PR application online through IRCC. Our team does a final quality check before submission.",
        icon: Send,
      },
      {
        num: "08",
        title: "COPR & Landing",
        desc: "Receive Confirmation of Permanent Residence (COPR) and complete your landing formalities in Canada.",
        icon: CheckCircle2,
      },
    ],
    documents: [
      "Valid Passport (all family members)",
      "IELTS Score Card (CLB 7+ recommended)",
      "Educational Credential Assessment (ECA/WES)",
      "Employment Reference Letters",
      "Police Clearance Certificate",
      "National Occupation Code (NOC) evidence",
      "Medical Exam Results",
      "Proof of Funds (Settlement Funds)",
      "Provincial Nomination Letter (if PNP)",
      "Marriage Certificate (if applicable)",
    ],
    requirements: [
      { label: "CRS Score", value: "Usually 470–545+ for FSW draws" },
      { label: "Work Experience", value: "1 year continuous NOC skilled work" },
      { label: "Language Score", value: "IELTS CLB 7+ (Express Entry FSW)" },
      { label: "Processing Time", value: "6 – 12 months after ITA" },
      { label: "Settlement Funds", value: "CAD $13,757+ (single person)" },
      { label: "Application Fee", value: "CAD $1,365 + Right of PR Fee $500" },
    ],
    processingFees: [
      { type: "Express Entry Processing Fee", cost: "CAD $850", time: "6 - 8 Months" },
      { type: "Right of Permanent Residence Fee", cost: "CAD $515", time: "Paid before COPR" },
      { type: "Dependent Child Fee", cost: "CAD $230", time: "Per child" },
      { type: "PNP Processing Fee (varies)", cost: "CAD $250 - $1,500", time: "3 - 6 Months" },
    ],
    faqs: [
      { q: "What is the Express Entry pool?", a: "It is a database of candidates who have met the criteria for one of the federal economic immigration programs. Candidates are ranked based on a Comprehensive Ranking System (CRS) score." },
      { q: "What is an ECA and why do I need it?", a: "An Educational Credential Assessment (ECA) is used to verify that your foreign degree, diploma, or certificate is valid and equal to a Canadian one. It's mandatory for Express Entry." },
      { q: "What if my CRS score is too low?", a: "You can improve it by retaking language tests, gaining more work experience, learning French, securing a valid job offer, or obtaining a Provincial Nomination (PNP)." }
    ]
  },
};

// ── Step Card Component ────────────────────────────────────────────────────
function StepCard({ step, index }) {
  const Icon = step.icon;
  // Alternate gradient shades across cards
  const gradients = [
    "linear-gradient(160deg, #e8524a 0%, #c0392b 40%, #1a2a4a 100%)",
    "linear-gradient(160deg, #d64f6e 0%, #922b6b 40%, #1a2a4a 100%)",
    "linear-gradient(160deg, #c0392b 0%, #7b241c 40%, #1a2a4a 100%)",
    "linear-gradient(160deg, #b03a2e 0%, #1f618d 60%, #1a2a4a 100%)",
  ];
  const bg = gradients[index % 4];

  return (
    <div
      className="relative rounded-2xl overflow-hidden p-6 flex flex-col space-y-4 shadow-xl hover:-translate-y-1 transition-transform duration-300 cursor-default"
      style={{ background: bg, minHeight: "220px" }}
    >
      {/* Number + Icon row */}
      <div className="flex items-start justify-between">
        <span className="text-4xl font-black text-white/40 font-heading leading-none">{step.num}.</span>
        <span className="h-11 w-11 rounded-full border-2 border-white/40 flex items-center justify-center bg-white/10 backdrop-blur-sm flex-shrink-0">
          <Icon className="h-5 w-5 text-white" />
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-extrabold text-white font-heading leading-snug">{step.title}</h3>

      {/* Description */}
      <p className="text-xs text-white/75 leading-relaxed">{step.desc}</p>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return [
    { visa: "student-visa" },
    { visa: "work-permit" },
    { visa: "extension-visa" },
    { visa: "visit-visa" },
    { visa: "super-visa" },
    { visa: "permanent-residence" },
  ];
}

export default async function VisaServicePage({ params }) {
  const resolvedParams = await params;
  const visaKey = resolvedParams?.visa?.toLowerCase() || "student-visa";
  const data = visaData[visaKey] || visaData["student-visa"];

  return (
    <div className="pb-20">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section
        className="relative py-20 text-white overflow-hidden"
        style={{ background: `linear-gradient(135deg, #0f1f3d 0%, #1a2a4a 60%, #081222 100%)` }}
      >
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: `url(${data.heroImage})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1f3d]/90 to-[#0f1f3d]/60" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <span className="h-5 w-5 rounded-full bg-brand-gold flex items-center justify-center">
                  <ArrowRight className="h-3 w-3 text-white" />
                </span>
                <span className="text-xs font-extrabold uppercase tracking-widest text-brand-gold">{data.subtitle}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold font-heading leading-tight">
                {data.flag} {data.title} <br />
                <span className="text-brand-gold">Preparation Guide</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-lg">{data.description}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact"
                  className="inline-flex items-center space-x-2 bg-brand-gold hover:bg-brand-gold/90 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105 shadow-lg">
                  <span>Book Free Consultation</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/eligibility"
                  className="inline-flex items-center space-x-2 border border-white/30 hover:border-brand-gold text-white px-6 py-3 rounded-xl font-bold text-sm transition-all">
                  <span>Check Eligibility</span>
                </Link>
              </div>
            </div>
            {/* Right — quick requirements */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 space-y-3">
              <h3 className="font-bold text-brand-gold text-sm uppercase tracking-wide mb-3">Quick Overview</h3>
              {data.requirements.map((req, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
                  <span className="text-xs text-gray-400 font-medium">{req.label}</span>
                  <span className="text-xs text-white font-bold text-right max-w-[55%]">{req.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── OTHER SERVICES NAV ──────────────────────────────────────── */}
      <section className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide mr-2">Services:</span>
            {[
              { label: "Student Visa", key: "student-visa", icon: "🎓" },
              { label: "Work Permit", key: "work-permit", icon: "💼" },
              { label: "Extension Visa", key: "extension-visa", icon: "📋" },
              { label: "Visit Visa", key: "visit-visa", icon: "✈️" },
              { label: "Super Visa", key: "super-visa", icon: "🏠" },
              { label: "Permanent Residence", key: "permanent-residence", icon: "🍁" },
            ].map((s) => (
              <Link key={s.key} href={`/services/${s.key}`}
                className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                  visaKey === s.key
                    ? "bg-brand-blue-dark text-white border-brand-blue-dark"
                    : "border-gray-200 text-gray-600 hover:border-brand-gold hover:text-brand-gold bg-white"
                }`}>
                {s.icon} {s.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS STEPS ────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="h-5 w-5 rounded-full bg-brand-gold flex items-center justify-center">
                <ArrowRight className="h-3 w-3 text-white" />
              </span>
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand-gold">Step by Step</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-blue-dark">
              {data.title} Process
            </h2>
            <p className="text-sm text-gray-500 max-w-xl">
              Follow these {data.steps.length} steps to successfully prepare and apply for your {data.title}.
            </p>
          </div>
          <Link href="/contact"
            className="flex-shrink-0 inline-flex items-center space-x-2 bg-brand-gold hover:bg-brand-gold/90 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all hover:scale-105 shadow">
            <span>Get Expert Help</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {data.steps.map((step, i) => (
            <StepCard key={i} step={step} index={i} />
          ))}
        </div>
      </section>

      {/* ── DOCUMENTS + FORM ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Documents checklist */}
          <div className="space-y-6">
            <h2 className="text-2xl font-extrabold font-heading text-brand-blue-dark">
              📄 Required Documents
            </h2>
            <p className="text-sm text-gray-500">Make sure you have all these documents ready before applying for your {data.title}.</p>
            <div className="space-y-2.5">
              {data.documents.map((doc, i) => (
                <div key={i} className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm hover:border-brand-gold/30 transition-colors">
                  <div className="h-6 w-6 rounded-full bg-brand-gold/15 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-3.5 w-3.5 text-brand-gold" />
                  </div>
                  <span className="text-sm text-gray-700 font-medium">{doc}</span>
                </div>
              ))}
            </div>

            {/* Important note */}
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-amber-800">Important Note</p>
                <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                  Document requirements vary by country and individual case. IQ Education's consultants provide a personalized checklist tailored to your profile and destination.
                </p>
              </div>
            </div>
          </div>

          {/* Apply form */}
          <div>
            <ApplyForm visaTitle={data.title} />
          </div>

        </div>
      </section>

      {/* ── PROCESSING TIMES & FEES (NEW FEATURE) ───────────────────── */}
      {data.processingFees && (
        <section className="bg-white py-16 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold font-heading text-brand-blue-dark mb-3">Processing Times & Fees</h2>
              <p className="text-sm text-gray-600">Standard government fees and estimated processing times for {data.title}.</p>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full text-left text-sm">
                <thead className="bg-brand-blue-dark text-white">
                  <tr>
                    <th className="px-6 py-4 font-bold">Category / Country</th>
                    <th className="px-6 py-4 font-bold">Government Fee</th>
                    <th className="px-6 py-4 font-bold">Estimated Processing Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {data.processingFees.map((fee, index) => (
                    <tr key={index} className="hover:bg-brand-blue/5 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-800">{fee.type || fee.country}</td>
                      <td className="px-6 py-4 text-brand-gold font-bold">{fee.cost}</td>
                      <td className="px-6 py-4 text-gray-600 flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span>{fee.time}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 text-center mt-4">
              * Note: Processing times are estimates provided by the government and are subject to change without notice.
            </p>
          </div>
        </section>
      )}

      {/* ── FAQS (NEW FEATURE) ───────────────────────────────────────── */}
      {data.faqs && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-100">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold font-heading text-brand-blue-dark mb-3">Frequently Asked Questions</h2>
            <p className="text-sm text-gray-600">Common questions regarding the {data.title} process.</p>
          </div>
          <div className="space-y-1">
            {data.faqs.map((faq, index) => (
              <FAQAccordion key={index} faq={faq} />
            ))}
          </div>
        </section>
      )}

      {/* ── WHY IQ EDUCATION ─────────────────────────────────────────── */}
      <section className="bg-brand-blue/5 py-16 border-y border-brand-blue-light/5 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-gold">Why Choose Us</span>
            <h2 className="text-3xl font-extrabold font-heading text-brand-blue-dark">
              Why IQ Education for Your {data.title}?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: "RCIC Certified", desc: "Registered Canadian immigration consultants under IRCC rules." },
              { icon: Award, title: "98% Success Rate", desc: "Highest visa approval rate across all categories and countries." },
              { icon: Clock, title: "Fast Processing", desc: "Urgent applications handled with priority file management." },
              { icon: Phone, title: "Dedicated Support", desc: "WhatsApp, call, and email support throughout your journey." },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center space-y-3 hover:border-brand-gold/30 transition-colors">
                <div className="h-12 w-12 rounded-2xl bg-brand-gold/10 flex items-center justify-center mx-auto">
                  <item.icon className="h-6 w-6 text-brand-gold" />
                </div>
                <h3 className="font-bold text-brand-blue-dark text-sm">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-brand-blue-dark rounded-3xl p-10 text-center space-y-5 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.15),transparent_70%)]" />
          <h2 className="text-3xl font-extrabold font-heading text-white relative z-10">
            Ready to Start Your {data.title} Journey? {data.flag}
          </h2>
          <p className="text-sm text-gray-300 max-w-xl mx-auto relative z-10">
            Our certified consultants will guide you through every step — from profile evaluation to visa approval.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Link href="/contact"
              className="inline-flex items-center space-x-2 bg-brand-gold hover:bg-brand-gold/90 text-white px-8 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105 shadow-lg">
              <span>Book Free Consultation</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/eligibility"
              className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3 rounded-xl font-bold text-sm transition-all">
              <span>Check My Eligibility</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
