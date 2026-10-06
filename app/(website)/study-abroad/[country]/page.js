"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { db } from "@/services/db";
import {
  CheckCircle2, ArrowRight, GraduationCap, Briefcase, Globe,
  Clock, DollarSign, BookOpen, Building2, ChevronRight,
  CalendarDays, ShieldCheck, ChevronDown, Award
} from "lucide-react";

// ── Country Data ───────────────────────────────────────────────────────────
const countryData = {
  uk: {
    name: "United Kingdom",
    flag: "🇬🇧",
    heroImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1600&auto=format&fit=crop",
    uniImage: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?q=80&w=900&auto=format&fit=crop",
    programImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=900&auto=format&fit=crop",
    costImage: "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?q=80&w=900&auto=format&fit=crop",
    tagline: "STUDY IN UK",
    heroTitle: "Study in the UK with IQ Education",
    heroPara1: "The United Kingdom is one of the most prestigious destinations for international students seeking world-class education and global career opportunities. With centuries-old universities, cutting-edge research facilities, and innovative teaching methods, the UK offers students an environment that encourages academic excellence and professional growth.",
    heroPara2: "Studying in the UK allows students to gain <strong>international exposure, practical learning experience, and access to global job markets</strong>. Universities in the UK are known for their flexible education system, diverse courses, and strong industry connections.",
    heroPara3: "At <strong>IQ Education</strong>, we guide students through every step of the study abroad journey — from selecting the right university and course to preparing documents and securing a student visa.",
    whyTitle: "Why Study in the UK?",
    whySubtitle: "The United Kingdom continues to attract students from around the world because of its <strong>high academic standards and career opportunities</strong>.",
    whyBenefits: "Benefits of Studying in the UK",
    benefits: [
      "Globally recognized universities and degrees",
      "Wide range of courses and academic programs",
      "Advanced research and innovation facilities",
      "Opportunities for internships and practical training",
      "Cultural diversity and international exposure",
      "Access to modern technology and research facilities",
      "Graduate Route visa — 2 years post-study work",
      "Gateway to European and global job markets",
    ],
    programLevelsTitle: "Program Levels in the UK",
    programLevelsSubtitle: "Program level refers to the <strong>academic stage of education</strong> that a student chooses based on their qualifications and career goals.",
    programLevels: [
      { name: "Certificate Programs", desc: "Short-term courses focused on specialized skills." },
      { name: "Diploma Programs", desc: "Practical programs designed to develop industry-specific knowledge." },
      { name: "Foundation Year", desc: "Preparatory year for students transitioning to undergraduate study." },
      { name: "Bachelor's Degree (Undergraduate)", desc: "A comprehensive academic program typically completed in three years in the UK." },
      { name: "Master's Degree (Postgraduate)", desc: "Advanced study designed for specialization and career advancement." },
      { name: "Doctoral Degree (PhD)", desc: "The highest academic qualification focused on research and innovation." },
    ],
    programTypesTitle: "Program Types in the UK",
    programTypesSubtitle: "Program type refers to the <strong>field or specialization of study</strong> chosen by students.",
    programTypes: [
      "Business and Management",
      "Computer Science and IT",
      "Engineering and Technology",
      "Law and Legal Studies",
      "Data Science & Artificial Intelligence",
      "Health and Medical Studies",
      "Finance & Accounting",
      "Marketing & Digital Marketing",
      "Arts, Design, and Humanities",
      "Social Sciences",
    ],
    universitiesTitle: "Top Universities in the UK",
    universitiesSubtitle: "The United Kingdom is home to many world-renowned universities known for academic excellence and global recognition.",
    universities: [
      "University of Oxford",
      "University of Cambridge",
      "Imperial College London",
      "University College London (UCL)",
      "University of Edinburgh",
      "University of Manchester",
      "King's College London",
      "Coventry University",
    ],
    costTitle: "Cost of Studying in the UK",
    costSubtitle: "The cost of studying in the UK depends on the <strong>university, program level, and location</strong>.",
    costs: [
      { label: "Undergraduate Tuition", value: "£11,000 – £26,000 per year" },
      { label: "Postgraduate Tuition", value: "£12,000 – £28,000 per year" },
      { label: "Living Cost (Outside London)", value: "£12,006 per year" },
      { label: "Living Cost (London)", value: "£15,600 per year" },
      { label: "Student Visa Fee", value: "£363 (outside UK)" },
      { label: "Immigration Health Surcharge", value: "£776 per year" },
    ],
    intakes: [
      { season: "Autumn Intake", month: "September / October", details: "Major intake. All programs available. Highest number of scholarships." },
      { season: "Spring Intake", month: "January / February", details: "Secondary intake. Many popular programs available." },
      { season: "Summer Intake", month: "May / June", details: "Limited programs. Mostly language and foundation courses." }
    ],
    workRights: {
      partTime: "Up to 20 hours per week during term time and full-time during holidays.",
      postStudy: "Graduate Route Visa allows you to stay and work for 2 years (3 years for PhD) after graduation.",
      prPathway: "Switch to a Skilled Worker Visa to start your pathway towards Indefinite Leave to Remain (ILR)."
    },
    faqs: [
      { q: "Is IELTS mandatory to study in the UK?", a: "While IELTS is common, many UK universities offer an IELTS waiver (Medium of Instruction) if you scored 70%+ in English in your 12th standard." },
      { q: "Can I bring my dependents while studying in the UK?", a: "From Jan 2024, only postgraduate research students and those on government-sponsored scholarships can bring dependents." },
      { q: "What is a CAS letter?", a: "CAS (Confirmation of Acceptance for Studies) is an electronic document issued by your university. You need the CAS reference number to apply for your student visa." }
    ]
  },
  canada: {
    name: "Canada",
    flag: "🇨🇦",
    heroImage: "https://images.unsplash.com/photo-1517935706615-2717063c2225?q=80&w=1600&auto=format&fit=crop",
    uniImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=900&auto=format&fit=crop",
    programImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=900&auto=format&fit=crop",
    costImage: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?q=80&w=900&auto=format&fit=crop",
    tagline: "STUDY IN CANADA",
    heroTitle: "Study in Canada with IQ Education",
    heroPara1: "Canada is one of the most popular destinations for international students seeking world-class education and global career opportunities. With thousands of colleges and universities, advanced research facilities, and innovative teaching methods, Canada offers students an environment that encourages academic excellence and professional growth.",
    heroPara2: "Studying in Canada allows students to gain <strong>international exposure, practical learning experience, and access to global job markets</strong>. Universities in Canada are known for their flexible education system, diverse courses, and strong industry connections.",
    heroPara3: "At <strong>IQ Education</strong>, we guide students through every step of the study abroad journey — from selecting the right university and course to preparing documents and securing a student visa.",
    whyTitle: "Why Study in Canada?",
    whySubtitle: "Canada continues to attract students from around the world because of its <strong>high academic standards and career opportunities</strong>.",
    whyBenefits: "Benefits of Studying in Canada",
    benefits: [
      "Globally recognized universities and degrees",
      "Wide range of courses and academic programs",
      "Advanced research and innovation facilities",
      "Opportunities for internships and practical training",
      "Cultural diversity and international exposure",
      "Up to 3 years Post-Graduate Work Permit (PGWP)",
      "Pathway to Canadian Permanent Residency",
      "Safe and welcoming multicultural environment",
    ],
    programLevelsTitle: "Program Levels in Canada",
    programLevelsSubtitle: "Program level refers to the <strong>academic stage of education</strong> that a student chooses based on their qualifications and career goals.",
    programLevels: [
      { name: "Certificate Programs", desc: "Short-term courses focused on specialized skills." },
      { name: "Diploma Programs", desc: "Practical programs designed to develop industry-specific knowledge." },
      { name: "Associate Degree", desc: "A two-year undergraduate program offered by community colleges." },
      { name: "Bachelor's Degree (Undergraduate)", desc: "A comprehensive academic program typically completed in four years." },
      { name: "Master's Degree (Postgraduate)", desc: "Advanced study designed for specialization and career advancement." },
      { name: "Doctoral Degree (PhD)", desc: "The highest academic qualification focused on research and innovation." },
    ],
    programTypesTitle: "Program Types in Canada",
    programTypesSubtitle: "Program type refers to the <strong>field or specialization of study</strong> chosen by students.",
    programTypes: [
      "Business and Management",
      "Computer Science and IT",
      "Engineering and Technology",
      "Data Science & Artificial Intelligence",
      "Health and Medical Studies",
      "Finance & Accounting",
      "Marketing & Digital Marketing",
      "Arts, Design, and Humanities",
      "Social Sciences",
      "Hospitality and Tourism Management",
    ],
    universitiesTitle: "Top Universities in Canada",
    universitiesSubtitle: "Canada is home to many world-renowned universities known for academic excellence and global recognition.",
    universities: [
      "University of Toronto",
      "University of British Columbia (UBC)",
      "McGill University",
      "University of Alberta",
      "Seneca College",
      "Humber College",
      "Conestoga College",
      "George Brown College",
    ],
    costTitle: "Cost of Studying in Canada",
    costSubtitle: "The cost of studying in Canada depends on the <strong>university, program level, and location</strong>.",
    costs: [
      { label: "Undergraduate Tuition", value: "CAD $15,000 – $35,000 per year" },
      { label: "Postgraduate Tuition", value: "CAD $17,000 – $40,000 per year" },
      { label: "GIC Blocked Account (SDS)", value: "CAD $20,635 mandatory" },
      { label: "Living Cost", value: "CAD $12,000 – $18,000 per year" },
      { label: "Student Visa Fee", value: "CAD $150" },
      { label: "Health Insurance (OHIP)", value: "CAD $600 – $900 per year" },
    ],
    intakes: [
      { season: "Fall Intake", month: "September", details: "Primary intake with the widest variety of programs and scholarships." },
      { season: "Winter Intake", month: "January", details: "Good for students who missed the Fall intake. Many core programs available." },
      { season: "Summer Intake", month: "May", details: "Limited availability, usually for short courses or specific diplomas." }
    ],
    workRights: {
      partTime: "Up to 20 hours per week off-campus during academic sessions. Full-time during scheduled breaks.",
      postStudy: "Post-Graduation Work Permit (PGWP) allows you to work up to 3 years depending on the program length.",
      prPathway: "Gain 1 year of skilled work experience in Canada to qualify for the Canadian Experience Class (Express Entry) for PR."
    },
    faqs: [
      { q: "What is the SDS program for Canada?", a: "Student Direct Stream (SDS) is an expedited study permit processing program. It requires a GIC of $20,635 CAD, 1st-year tuition paid, and an IELTS score of 6.0 overall." },
      { q: "Is PTE accepted for Canadian Student Visas?", a: "Yes, PTE Academic is now accepted for both SDS and non-SDS study permit applications by IRCC." },
      { q: "Can my spouse accompany me to Canada?", a: "If you are enrolled in a master's or doctoral degree program, your spouse may be eligible for an Open Work Permit (SOWP)." }
    ]
  },
  australia: {
    name: "Australia",
    flag: "🇦🇺",
    heroImage: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=1600&auto=format&fit=crop",
    uniImage: "https://images.unsplash.com/photo-1569427572850-9a6bd58f3c47?q=80&w=900&auto=format&fit=crop",
    programImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=900&auto=format&fit=crop",
    costImage: "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?q=80&w=900&auto=format&fit=crop",
    tagline: "STUDY IN AUSTRALIA",
    heroTitle: "Study in Australia with IQ Education",
    heroPara1: "Australia is one of the most sought-after destinations for international students, offering world-class universities and a high quality of life. With warm weather, a multicultural society, and strong job market, Australia provides students with an exceptional study and work experience.",
    heroPara2: "Studying in Australia allows students to gain <strong>international exposure, practical learning experience, and access to global job markets</strong>. Australian universities are globally ranked and known for research innovation.",
    heroPara3: "At <strong>IQ Education</strong>, we guide students through every step of the study abroad journey — from selecting the right university and course to preparing documents and securing a student visa.",
    whyTitle: "Why Study in Australia?",
    whySubtitle: "Australia continues to attract students from around the world because of its <strong>high academic standards and career opportunities</strong>.",
    whyBenefits: "Benefits of Studying in Australia",
    benefits: [
      "Top-ranked globally recognized universities",
      "Wide range of courses and academic programs",
      "Post-study work visa up to 4 years",
      "Opportunities for internships and practical training",
      "Cultural diversity and safe environment",
      "Access to modern technology and research facilities",
      "Pathway to Skilled Migration and PR",
      "High quality of life and affordable living options",
    ],
    programLevelsTitle: "Program Levels in Australia",
    programLevelsSubtitle: "Program level refers to the <strong>academic stage of education</strong> that a student chooses based on their qualifications and career goals.",
    programLevels: [
      { name: "Certificate Programs", desc: "Short-term courses focused on specialized skills." },
      { name: "Diploma Programs", desc: "Practical programs designed to develop industry-specific knowledge." },
      { name: "Associate Degree", desc: "A two-year undergraduate program offered at TAFE institutions." },
      { name: "Bachelor's Degree (Undergraduate)", desc: "A comprehensive academic program typically completed in three to four years." },
      { name: "Master's Degree (Postgraduate)", desc: "Advanced study designed for specialization and career advancement." },
      { name: "Doctoral Degree (PhD)", desc: "The highest academic qualification focused on research and innovation." },
    ],
    programTypesTitle: "Program Types in Australia",
    programTypesSubtitle: "Program type refers to the <strong>field or specialization of study</strong> chosen by students.",
    programTypes: [
      "Business and Management",
      "Computer Science and IT",
      "Engineering and Technology",
      "Nursing and Healthcare",
      "Data Science & Artificial Intelligence",
      "Finance & Accounting",
      "Marketing & Digital Marketing",
      "Hospitality and Tourism",
      "Social Work",
      "Environmental Science",
    ],
    universitiesTitle: "Top Universities in Australia",
    universitiesSubtitle: "Australia is home to many world-renowned universities known for academic excellence and global recognition.",
    universities: [
      "University of Melbourne",
      "University of Sydney",
      "UNSW Sydney",
      "Monash University",
      "Australian National University (ANU)",
      "RMIT University",
      "Macquarie University",
      "University of Queensland",
    ],
    costTitle: "Cost of Studying in Australia",
    costSubtitle: "The cost of studying in Australia depends on the <strong>university, program level, and location</strong>.",
    costs: [
      { label: "Undergraduate Tuition", value: "AUD $20,000 – $45,000 per year" },
      { label: "Postgraduate Tuition", value: "AUD $22,000 – $50,000 per year" },
      { label: "Living Cost (Required Proof)", value: "AUD $29,710 per year" },
      { label: "OSHC Health Insurance", value: "AUD $600 – $1,500 per year" },
      { label: "Student Visa Fee", value: "AUD $650" },
      { label: "Biometrics", value: "AUD $0 (waived for most)" },
    ],
    intakes: [
      { season: "Semester 1", month: "February / March", details: "Major intake. All degree programs begin in Semester 1." },
      { season: "Semester 2", month: "July / August", details: "Secondary intake. Many programs accept mid-year entries." },
      { season: "Trimester Intake", month: "November", details: "Available at select universities for fast-tracked degrees." }
    ],
    workRights: {
      partTime: "Up to 48 hours per fortnight while your course is in session, unlimited during breaks.",
      postStudy: "Temporary Graduate Visa (Subclass 485) allows you to stay and work for 2-4 years.",
      prPathway: "Australia has a points-based PR system. Studying in regional areas grants extra points."
    },
    faqs: [
      { q: "What is OSHC?", a: "Overseas Student Health Cover (OSHC) is mandatory health insurance that international students must hold for the entire duration of their visa in Australia." },
      { q: "Do I need a blocked account for Australia?", a: "No, Australia does not use blocked accounts. However, you must demonstrate proof of funds (AUD $29,710/year) via bank statements or an education loan." },
      { q: "What is the Genuine Student (GS) requirement?", a: "The GS requirement replaces the old GTE. You must provide a statement demonstrating your intention to genuinely study and how it benefits your career." }
    ]
  },
  europe: {
    name: "Europe",
    flag: "🇪🇺",
    heroImage: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1600&auto=format&fit=crop",
    uniImage: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=900&auto=format&fit=crop",
    programImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=900&auto=format&fit=crop",
    costImage: "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?q=80&w=900&auto=format&fit=crop",
    tagline: "STUDY IN EUROPE",
    heroTitle: "Study in Europe with IQ Education",
    heroPara1: "Europe offers one of the world's most diverse and rich educational experiences. From tuition-free universities in Germany and Norway to prestigious business schools in France and the Netherlands, Europe has something for every international student.",
    heroPara2: "Studying in Europe allows students to gain <strong>international exposure, practical learning experience, and access to global job markets</strong>. European degrees are globally recognized and open doors to multinational careers.",
    heroPara3: "At <strong>IQ Education</strong>, we guide students through every step of the study abroad journey — from selecting the right country and course to preparing documents and securing a student visa.",
    whyTitle: "Why Study in Europe?",
    whySubtitle: "Europe continues to attract students from around the world because of its <strong>diverse academic offerings and affordable education</strong>.",
    whyBenefits: "Benefits of Studying in Europe",
    benefits: [
      "Many tuition-free public universities",
      "Schengen visa enables travel across 27 countries",
      "World-class research and innovation hubs",
      "Multilingual and multicultural environment",
      "Strong industry-academia connections",
      "Affordable living costs compared to USA/UK",
      "Post-study job-seeking visas in many countries",
      "Globally recognized qualifications",
    ],
    programLevelsTitle: "Program Levels in Europe",
    programLevelsSubtitle: "Program level refers to the <strong>academic stage of education</strong> that a student chooses based on their qualifications and career goals.",
    programLevels: [
      { name: "Certificate Programs", desc: "Short-term specialized courses." },
      { name: "Diploma Programs", desc: "Practical programs with industry focus." },
      { name: "Foundation Year", desc: "Preparatory program for undergraduate entry." },
      { name: "Bachelor's Degree (Undergraduate)", desc: "Typically 3–4 years depending on the country." },
      { name: "Master's Degree (Postgraduate)", desc: "1–2 year specialization programs." },
      { name: "Doctoral Degree (PhD)", desc: "Advanced research-focused qualifications." },
    ],
    programTypesTitle: "Program Types in Europe",
    programTypesSubtitle: "Program type refers to the <strong>field or specialization of study</strong> chosen by students.",
    programTypes: [
      "Business and Management",
      "Engineering and Technology",
      "Computer Science and IT",
      "Medicine and Healthcare",
      "Automotive Engineering",
      "Data Science & AI",
      "Finance & Accounting",
      "Arts, Design, and Humanities",
      "Environmental Science",
      "International Relations",
    ],
    universitiesTitle: "Top Universities in Europe",
    universitiesSubtitle: "Europe is home to some of the oldest and most prestigious universities in the world.",
    universities: [
      "Technical University of Munich (Germany)",
      "LMU Munich (Germany)",
      "University of Amsterdam (Netherlands)",
      "ETH Zurich (Switzerland)",
      "KU Leuven (Belgium)",
      "Politecnico di Milano (Italy)",
      "University of Copenhagen (Denmark)",
      "SRH Berlin University of Applied Sciences",
    ],
    costTitle: "Cost of Studying in Europe",
    costSubtitle: "The cost of studying in Europe depends on the <strong>country, university, and program type</strong>.",
    costs: [
      { label: "Germany (Public University)", value: "EUR €0 tuition + €300 semester fees" },
      { label: "Netherlands Tuition", value: "EUR €8,000 – €20,000 per year" },
      { label: "France Tuition", value: "EUR €3,000 – €15,000 per year" },
      { label: "Blocked Account (Germany)", value: "EUR €11,904 per year" },
      { label: "Living Cost", value: "EUR €8,000 – €14,000 per year" },
      { label: "Student Visa Fee", value: "EUR €75 – €100" },
    ],
    intakes: [
      { season: "Autumn/Winter", month: "September / October", details: "Primary intake for the vast majority of European universities." },
      { season: "Spring/Summer", month: "February / March", details: "Secondary intake. Fewer programs are offered." }
    ],
    workRights: {
      partTime: "Most EU countries allow 20 hours per week (e.g. Germany permits 120 full days or 240 half days per year).",
      postStudy: "Post-study job search visas range from 9 to 18 months depending on the specific country.",
      prPathway: "Securing a related job offer can lead to a Blue Card or national work visa, eventually leading to PR."
    },
    faqs: [
      { q: "Is IELTS mandatory for Europe?", a: "If you apply for English-taught programs, IELTS or TOEFL is generally required. Some universities accept MOI (Medium of Instruction) from your bachelor's degree." },
      { q: "Does the Schengen visa allow me to work in other countries?", a: "No, a student visa allows you to study and work only in the country that issued it. However, you can travel visa-free across the 27 Schengen states for tourism." },
      { q: "Are public universities really free?", a: "In countries like Germany and Norway, public universities do not charge tuition fees (only a small semester contribution), but you must still prove you can cover living expenses." }
    ]
  },
  germany: {
    name: "Germany",
    flag: "🇩🇪",
    heroImage: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1600&auto=format&fit=crop",
    uniImage: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=900&auto=format&fit=crop",
    programImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=900&auto=format&fit=crop",
    costImage: "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?q=80&w=900&auto=format&fit=crop",
    tagline: "STUDY IN GERMANY",
    heroTitle: "Study in Germany with IQ Education",
    heroPara1: "Germany is one of the most sought-after study destinations in Europe, offering tuition-free education at public universities and world-class engineering and technical programs. As an economic powerhouse, Germany offers excellent career opportunities for international graduates.",
    heroPara2: "Studying in Germany allows students to gain <strong>international exposure, practical learning experience, and access to global job markets</strong>. German universities are known for their research excellence and industry partnerships.",
    heroPara3: "At <strong>IQ Education</strong>, we guide students through every step of the study abroad journey — from APS certificate to blocked account setup and visa filing.",
    whyTitle: "Why Study in Germany?",
    whySubtitle: "Germany continues to attract students from around the world because of its <strong>tuition-free education and engineering excellence</strong>.",
    whyBenefits: "Benefits of Studying in Germany",
    benefits: [
      "Tuition-free at most public universities",
      "World's top engineering and technical programs",
      "18-month job-seeking visa after graduation",
      "Strong industry and research connections",
      "EU Blue Card pathway for skilled workers",
      "Affordable living costs",
      "Multicultural and safe environment",
      "Gateway to European job market",
    ],
    programLevelsTitle: "Program Levels in Germany",
    programLevelsSubtitle: "Program level refers to the <strong>academic stage of education</strong> that a student chooses based on their qualifications and career goals.",
    programLevels: [
      { name: "Ausbildung (Vocational Training)", desc: "Germany's renowned dual vocational training system." },
      { name: "Preparatory College (Studienkolleg)", desc: "Foundation year for students needing academic preparation." },
      { name: "Bachelor's Degree (Undergraduate)", desc: "3–4 year undergraduate programs at universities and FH." },
      { name: "Master's Degree (Postgraduate)", desc: "1–2 year specialization programs." },
      { name: "MBA Programs", desc: "Business leadership programs at private universities." },
      { name: "Doctoral Degree (PhD)", desc: "The highest academic qualification focused on research." },
    ],
    programTypesTitle: "Program Types in Germany",
    programTypesSubtitle: "Program type refers to the <strong>field or specialization of study</strong> chosen by students.",
    programTypes: [
      "Automotive and Mechanical Engineering",
      "Computer Science and IT",
      "Electrical Engineering",
      "Data Science & AI",
      "Business Administration (MBA)",
      "Medicine and Healthcare",
      "Environmental Engineering",
      "Finance & Economics",
      "Architecture and Design",
      "Aerospace Engineering",
    ],
    universitiesTitle: "Top Universities in Germany",
    universitiesSubtitle: "Germany is home to some of Europe's best technical and research universities.",
    universities: [
      "Technical University of Munich (TUM)",
      "LMU Munich",
      "Heidelberg University",
      "RWTH Aachen University",
      "TU Berlin",
      "University of Hamburg",
      "SRH Berlin University of Applied Sciences",
      "Freie Universität Berlin",
    ],
    costTitle: "Cost of Studying in Germany",
    costSubtitle: "The cost of studying in Germany depends on the <strong>university type and program</strong>.",
    costs: [
      { label: "Public University Tuition", value: "EUR €0 + ~€300 semester contribution" },
      { label: "Private University Tuition", value: "EUR €10,000 – €20,000 per year" },
      { label: "Blocked Account (Mandatory)", value: "EUR €11,904 per year" },
      { label: "Living Cost", value: "EUR €9,000 – €12,000 per year" },
      { label: "Health Insurance (mandatory)", value: "EUR €110/month (~€1,320/year)" },
      { label: "Student Visa Fee", value: "EUR €75" },
    ],
    intakes: [
      { season: "Winter Semester", month: "September / October", details: "Major intake. Over 80% of English-taught programs start now." },
      { season: "Summer Semester", month: "March / April", details: "Secondary intake. Only a limited selection of programs accept students." }
    ],
    workRights: {
      partTime: "International students can work 140 full days or 280 half days per year.",
      postStudy: "Graduates get an 18-month Job Seeking Visa to find employment related to their degree.",
      prPathway: "After 2 years of holding an EU Blue Card or skilled work visa, you can apply for permanent settlement."
    },
    faqs: [
      { q: "What is an APS Certificate?", a: "The APS (Akademische Prüfstelle) certificate is mandatory for Indian students to verify their academic documents before applying to German universities or for a student visa." },
      { q: "Do I need to learn German to study in Germany?", a: "While many Master's programs are 100% English-taught, learning basic German (A1/A2 level) is highly recommended for part-time jobs and daily life." },
      { q: "What is a Blocked Account?", a: "A Sperrkonto (Blocked Account) is a special bank account required to prove you have sufficient funds to live in Germany for a year (currently €11,904)." }
    ]
  },
  dubai: {
    name: "Dubai / UAE",
    flag: "🇦🇪",
    heroImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop",
    uniImage: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=900&auto=format&fit=crop",
    programImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=900&auto=format&fit=crop",
    costImage: "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?q=80&w=900&auto=format&fit=crop",
    tagline: "STUDY IN DUBAI",
    heroTitle: "Study in Dubai with IQ Education",
    heroPara1: "Dubai is rapidly becoming a global education hub, offering students access to international branch campuses of top universities from the UK, USA, and Australia — all in a tax-free, cosmopolitan environment with world-class infrastructure.",
    heroPara2: "Studying in Dubai allows students to gain <strong>international exposure, practical learning experience, and access to global job markets</strong>. Dubai's universities are known for their modern campuses and strong industry connections in hospitality, finance, and technology.",
    heroPara3: "At <strong>IQ Education</strong>, we guide students through every step of the study abroad journey — from selecting the right university and course to preparing documents and securing a student visa.",
    whyTitle: "Why Study in Dubai?",
    whySubtitle: "Dubai continues to attract students from around the world because of its <strong>tax-free lifestyle and international career opportunities</strong>.",
    whyBenefits: "Benefits of Studying in Dubai",
    benefits: [
      "International university branch campuses",
      "Tax-free income and lifestyle",
      "World-class infrastructure and campuses",
      "Strong hospitality, finance, and tech industries",
      "Cultural diversity and cosmopolitan lifestyle",
      "Strategic location between East and West",
      "Post-graduation work opportunities",
      "English medium instruction in most programs",
    ],
    programLevelsTitle: "Program Levels in Dubai",
    programLevelsSubtitle: "Program level refers to the <strong>academic stage of education</strong> that a student chooses based on their qualifications and career goals.",
    programLevels: [
      { name: "Certificate Programs", desc: "Short-term professional and technical courses." },
      { name: "Diploma Programs", desc: "Practical programs with industry-specific focus." },
      { name: "Foundation Year", desc: "Preparatory year to transition to degree programs." },
      { name: "Bachelor's Degree (Undergraduate)", desc: "3–4 year internationally accredited programs." },
      { name: "Master's Degree (Postgraduate)", desc: "Specialized MBA and Masters programs." },
      { name: "Executive Education", desc: "Short intensive programs for working professionals." },
    ],
    programTypesTitle: "Program Types in Dubai",
    programTypesSubtitle: "Program type refers to the <strong>field or specialization of study</strong> chosen by students.",
    programTypes: [
      "Business and Management (MBA)",
      "Hospitality and Tourism",
      "Computer Science and IT",
      "Engineering and Technology",
      "Finance & Banking",
      "Marketing & Digital Marketing",
      "Health and Medical Studies",
      "Media and Communications",
      "Architecture and Design",
      "International Relations",
    ],
    universitiesTitle: "Top Universities in Dubai",
    universitiesSubtitle: "Dubai hosts international branch campuses and local universities offering globally recognized degrees.",
    universities: [
      "University of Birmingham Dubai",
      "Heriot-Watt University Dubai",
      "Middlesex University Dubai",
      "University of Wollongong Dubai (UOWD)",
      "SP Jain School of Global Management",
      "American University in Dubai (AUD)",
      "Manipal Academy of Higher Education Dubai",
      "Rochester Institute of Technology Dubai",
    ],
    costTitle: "Cost of Studying in Dubai",
    costSubtitle: "The cost of studying in Dubai depends on the <strong>university, program level, and campus</strong>.",
    costs: [
      { label: "Undergraduate Tuition", value: "AED 45,000 – 95,000 per year" },
      { label: "Postgraduate Tuition", value: "AED 55,000 – 1,20,000 per year" },
      { label: "Living Cost", value: "AED 30,000 – 50,000 per year" },
      { label: "Student Visa Fee", value: "AED 3,000 – 5,000" },
      { label: "Health Insurance", value: "AED 600 – 1,500 per year" },
      { label: "Registration / Admin Fees", value: "AED 2,000 – 5,000" },
    ],
    intakes: [
      { season: "Autumn Intake", month: "September", details: "Major intake for all university programs." },
      { season: "Spring Intake", month: "January / February", details: "Secondary intake with a good number of courses available." }
    ],
    workRights: {
      partTime: "Students can work part-time if they obtain a No Objection Certificate (NOC) from their university.",
      postStudy: "Dubai occasionally offers extended residency visas (e.g. Golden Visa) for exceptional students.",
      prPathway: "The UAE does not offer traditional PR, but successful graduates can secure long-term work visas."
    },
    faqs: [
      { q: "Is the degree earned in Dubai recognized globally?", a: "Yes, degrees from international branch campuses (like UK or Australian universities in Dubai) are exactly the same as those awarded in the home country." },
      { q: "Do I need IELTS to study in Dubai?", a: "Yes, most universities require an IELTS score of 6.0 for undergraduates and 6.5 for postgraduates, though some may offer English placement tests." },
      { q: "Is Dubai safe for international students?", a: "Dubai is consistently ranked as one of the safest cities in the world with extremely low crime rates." }
    ]
  },
  usa: {
    name: "USA",
    flag: "🇺🇸",
    heroImage: "https://images.unsplash.com/photo-1501466044931-62695aada8e9?q=80&w=1600&auto=format&fit=crop",
    uniImage: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=900&auto=format&fit=crop",
    programImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=900&auto=format&fit=crop",
    costImage: "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?q=80&w=900&auto=format&fit=crop",
    tagline: "STUDY IN USA",
    heroTitle: "Study in the USA with IQ Education",
    heroPara1: "The United States is one of the most popular destinations for international students seeking world-class education and global career opportunities. With thousands of universities, advanced research facilities, and innovative teaching methods, the USA offers students an environment that encourages academic excellence and professional growth.",
    heroPara2: "Studying in the USA allows students to gain <strong>international exposure, practical learning experience, and access to global job markets</strong>. Universities in the USA are known for their flexible education system, diverse courses, and strong industry connections.",
    heroPara3: "At <strong>IQ Education</strong>, we guide students through every step of the study abroad journey — from selecting the right university and course to preparing documents and securing a student visa.",
    whyTitle: "Why Study in the USA?",
    whySubtitle: "The United States continues to attract students from around the world because of its <strong>high academic standards and career opportunities</strong>.",
    whyBenefits: "Benefits of Studying in the USA",
    benefits: [
      "Globally recognized universities and degrees",
      "Wide range of courses and academic programs",
      "Advanced research and innovation facilities",
      "Opportunities for internships and practical training",
      "Cultural diversity and international exposure",
      "Access to modern technology and research facilities",
      "OPT: 1–3 years post-study work authorization",
      "Silicon Valley and Wall Street job opportunities",
    ],
    programLevelsTitle: "Program Levels in the USA",
    programLevelsSubtitle: "Program level refers to the <strong>academic stage of education</strong> that a student chooses based on their qualifications and career goals.",
    programLevels: [
      { name: "Certificate Programs", desc: "Short-term courses focused on specialized skills." },
      { name: "Diploma Programs", desc: "Practical programs designed to develop industry-specific knowledge." },
      { name: "Associate Degree", desc: "A two-year undergraduate program offered by community colleges." },
      { name: "Bachelor's Degree (Undergraduate)", desc: "A comprehensive academic program typically completed in four years." },
      { name: "Master's Degree (Postgraduate)", desc: "Advanced study designed for specialization and career advancement." },
      { name: "Doctoral Degree (PhD)", desc: "The highest academic qualification focused on research and innovation." },
    ],
    programTypesTitle: "Program Types in the USA",
    programTypesSubtitle: "Program type refers to the <strong>field or specialization of study</strong> chosen by students.",
    programTypes: [
      "Business and Management",
      "Computer Science and IT",
      "Engineering and Technology",
      "Data Science & Artificial Intelligence",
      "Health and Medical Studies",
      "Finance & Accounting",
      "Marketing & Digital Marketing",
      "Arts, Design, and Humanities",
      "Social Sciences",
      "Hospitality and Tourism Management",
    ],
    universitiesTitle: "Top Universities in the USA",
    universitiesSubtitle: "The United States is home to many world-renowned universities known for academic excellence and global recognition.",
    universities: [
      "Harvard University",
      "Stanford University",
      "Massachusetts Institute of Technology (MIT)",
      "University of California, Berkeley",
      "Columbia University",
      "New York University (NYU)",
      "University of Chicago",
      "University of Washington",
    ],
    costTitle: "Cost of Studying in the USA",
    costSubtitle: "The cost of studying in the USA depends on the <strong>university, program level, and location</strong>.",
    costs: [
      { label: "Community College Tuition", value: "USD $6,000 – $15,000 per year" },
      { label: "Undergraduate Tuition", value: "USD $20,000 – $55,000 per year" },
      { label: "Postgraduate Tuition", value: "USD $25,000 – $60,000 per year" },
      { label: "Living Cost", value: "USD $10,000 – $20,000 per year" },
      { label: "Student Visa (F-1) Fee", value: "USD $185 + SEVIS $350" },
      { label: "Health Insurance", value: "USD $1,500 – $3,000 per year" },
    ],
    intakes: [
      { season: "Fall Intake", month: "August / September", details: "Major intake. Almost all universities accept students." },
      { season: "Spring Intake", month: "January / February", details: "Secondary intake. Only selected courses are offered." },
      { season: "Summer Intake", month: "May / June", details: "Rare intake for regular degree programs, mostly for short courses." }
    ],
    workRights: {
      partTime: "F-1 students can work up to 20 hours per week on-campus during the semester.",
      postStudy: "Optional Practical Training (OPT) allows 1 year of work. STEM degrees get an additional 2-year OPT extension.",
      prPathway: "Many students transition from F-1 to an H-1B work visa, which can eventually lead to a Green Card (PR)."
    },
    faqs: [
      { q: "What is an I-20 form?", a: "The I-20 is a Certificate of Eligibility issued by a US university after admission. You need it to apply for your F-1 student visa." },
      { q: "Is the GRE or GMAT mandatory for Master's programs in the USA?", a: "While many top universities require it, a growing number of universities offer GRE/GMAT waivers based on your GPA and work experience." },
      { q: "What is a STEM degree?", a: "STEM stands for Science, Technology, Engineering, and Mathematics. US degrees classified as STEM give you a 3-year post-study work right (OPT) instead of just 1 year." }
    ]
  },
};

// ── Apply Now Form ────────────────────────────────────────────────────────
function ApplyForm({ countryName }) {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", service: "Student Visa" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    db.addLead({
      name: `${form.firstName} ${form.lastName}`,
      email: form.email,
      phone: form.phone,
      preferredCountry: countryName,
      type: `Study in ${countryName} Application`,
      score: `Service: ${form.service}`,
      status: "New",
    });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center space-y-4">
        <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="h-8 w-8 text-green-500" />
        </div>
        <h3 className="text-xl font-bold text-brand-blue-dark">Application Submitted!</h3>
        <p className="text-sm text-gray-500">Our counselor will contact you within 2 business hours.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-brand-blue-dark px-6 py-4">
        <h3 className="text-xl font-bold text-white text-center font-heading">Apply Now</h3>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {/* Name row */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Your Name <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                type="text" required placeholder="First"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-brand-blue-dark"
              />
              <span className="text-[11px] text-gray-400">First</span>
            </div>
            <div>
              <input
                type="text" required placeholder="Last"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-brand-blue-dark"
              />
              <span className="text-[11px] text-gray-400">Last</span>
            </div>
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email" required placeholder="your@email.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-brand-blue-dark"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel" required placeholder="+91 99999 88888"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-brand-blue-dark"
          />
        </div>

        {/* Service */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">How Can We Help You?</label>
          <select
            value={form.service}
            onChange={(e) => setForm({ ...form, service: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-brand-blue-dark bg-white"
          >
            <option>Student Visa</option>
            <option>Work Permit</option>
            <option>Visitor Visa</option>
            <option>Permanent Residency</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-brand-gold hover:bg-brand-gold/90 text-white font-bold rounded-md text-sm transition-all hover:scale-[1.02]"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

// ── Accordion Component ───────────────────────────────────────────────────
function FAQAccordion({ faq }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl mb-3 overflow-hidden transition-all bg-white hover:border-brand-blue-light/30 shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between bg-white text-left focus:outline-none"
      >
        <span className="font-bold text-sm text-brand-blue-dark pr-8">{faq.q}</span>
        <ChevronDown className={`h-5 w-5 text-brand-gold transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0'}`}>
        <p className="px-5 text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-3">{faq.a}</p>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function CountryStudyPage() {
  const params = useParams();
  const countryKey = params.country?.toLowerCase() || "uk";
  const data = countryData[countryKey] || countryData["uk"];

  return (
    <div className="pb-20">

      {/* ── HERO SECTION ─────────────────────────────────────────────── */}
      <section
        className="relative min-h-[520px] flex items-center"
        style={{
          background: "linear-gradient(135deg, #e8eaf6 0%, #c5cae9 50%, #d1d9ef 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Left — text */}
            <div className="space-y-5 pt-4">
              <div className="flex items-center space-x-2">
                <span className="h-5 w-5 rounded-full bg-brand-gold flex items-center justify-center flex-shrink-0">
                  <ArrowRight className="h-3 w-3 text-white" />
                </span>
                <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue-dark">{data.tagline}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-brand-blue-dark leading-tight">
                {data.heroTitle}
              </h1>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{data.heroPara1}</p>
              <p
                className="text-sm sm:text-base text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: data.heroPara2 }}
              />
              <p
                className="text-sm sm:text-base text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: data.heroPara3 }}
              />
              <Link
                href="/contact"
                className="inline-flex items-center space-x-2 bg-brand-gold hover:bg-brand-gold/90 text-white px-6 py-3 rounded-lg font-bold text-sm transition-all hover:scale-105 shadow-md"
              >
                <span>Connect With Us</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Right — Apply Now form */}
            <div>
              <ApplyForm countryName={data.name} />
            </div>

          </div>
        </div>
      </section>

      {/* ── WHY STUDY SECTION ────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left — country image */}
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img
              src={data.uniImage}
              alt={`Study in ${data.name}`}
              className="w-full h-72 lg:h-96 object-cover"
            />
          </div>

          {/* Right — content */}
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-blue-dark">{data.whyTitle}</h2>
            <p
              className="text-sm text-gray-600 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: data.whySubtitle }}
            />
            <div>
              <h3 className="text-base font-bold text-brand-blue-dark mb-3">{data.whyBenefits}</h3>
              <ul className="space-y-2">
                {data.benefits.map((b, i) => (
                  <li key={i} className="flex items-start space-x-2 text-sm text-gray-700">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-brand-gold flex-shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* ── INTAKES & DEADLINES (NEW FEATURE) ────────────────────────── */}
      {data.intakes && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-100">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold font-heading text-brand-blue-dark mb-3">Academic Intakes in {data.name}</h2>
            <p className="text-sm text-gray-600">Plan your application based on these major university intakes.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.intakes.map((intake, i) => (
              <div key={i} className="bg-white border border-brand-blue/10 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-brand-gold/50 transition-all group">
                <div className="h-12 w-12 bg-brand-blue/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-gold/10 transition-colors">
                  <CalendarDays className="h-6 w-6 text-brand-blue-dark group-hover:text-brand-gold" />
                </div>
                <h3 className="text-lg font-bold text-brand-blue-dark mb-1">{intake.season}</h3>
                <span className="text-xs font-bold text-brand-gold uppercase tracking-wider block mb-3">{intake.month}</span>
                <p className="text-sm text-gray-600 leading-relaxed">{intake.details}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── WORK RIGHTS & PR (NEW FEATURE) ───────────────────────────── */}
      {data.workRights && (
        <section className="bg-brand-blue-dark py-16 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold font-heading text-white mb-3">Work Rights & Post-Study Pathways</h2>
              <p className="text-sm text-gray-300 max-w-2xl mx-auto">Maximize your global career opportunities. Understand your rights as an international student in {data.name}.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="h-6 w-6 text-brand-gold" />
                  <h3 className="font-bold text-white">Part-Time Work</h3>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">{data.workRights.partTime}</p>
              </div>
              <div className="bg-white/10 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center space-x-3 mb-4">
                  <Briefcase className="h-6 w-6 text-brand-gold" />
                  <h3 className="font-bold text-white">Post-Study Work Visa</h3>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">{data.workRights.postStudy}</p>
              </div>
              <div className="bg-white/10 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center space-x-3 mb-4">
                  <ShieldCheck className="h-6 w-6 text-brand-gold" />
                  <h3 className="font-bold text-white">PR Pathways</h3>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">{data.workRights.prPathway}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── PROGRAM LEVELS ───────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-extrabold font-heading text-brand-blue-dark mb-2">{data.programLevelsTitle}</h2>
        <p
          className="text-sm text-gray-600 mb-8"
          dangerouslySetInnerHTML={{ __html: data.programLevelsSubtitle }}
        />
        <h3 className="text-lg font-bold text-brand-blue-dark mb-6">Available Program Levels</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.programLevels.map((lvl, i) => (
            <div key={i} className="space-y-1 text-center p-4 rounded-xl hover:bg-brand-blue/3 transition-colors">
              <h4 className="font-bold text-brand-blue-dark text-sm">{lvl.name}</h4>
              <p className="text-xs text-gray-500 leading-relaxed">{lvl.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROGRAM TYPES ────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left — list */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-1">
              <span className="h-5 w-5 rounded-full bg-brand-gold flex items-center justify-center">
                <ArrowRight className="h-3 w-3 text-white" />
              </span>
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand-gold">Programs</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <h2 className="text-3xl font-extrabold font-heading text-brand-blue-dark">{data.programTypesTitle}</h2>
                <p
                  className="text-sm text-gray-600 mt-2"
                  dangerouslySetInnerHTML={{ __html: data.programTypesSubtitle }}
                />
              </div>
              <Link href="/contact"
                className="flex-shrink-0 inline-flex items-center space-x-1 bg-brand-gold text-white px-5 py-2.5 rounded-lg font-bold text-xs transition-all hover:scale-105 shadow">
                <span>Connect With Us</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="space-y-1 mt-4">
              <h3 className="text-base font-bold text-brand-blue-dark mb-3">Popular Program Types</h3>
              {data.programTypes.map((pt, i) => (
                <div key={i} className="flex items-center space-x-2 py-1.5 text-sm text-gray-700">
                  <span className="h-5 w-5 rounded-full bg-brand-gold/15 flex items-center justify-center flex-shrink-0">
                    <ArrowRight className="h-3 w-3 text-brand-gold" />
                  </span>
                  <span>{pt}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              These programs help students gain <strong>industry-relevant skills and knowledge required for global career opportunities</strong>.
            </p>
          </div>

          {/* Right — university campus image */}
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img
              src={data.programImage}
              alt={`Programs in ${data.name}`}
              className="w-full h-80 lg:h-96 object-cover"
            />
          </div>

        </div>
      </section>

      {/* ── TOP UNIVERSITIES ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left */}
          <div className="space-y-5">
            <h2 className="text-3xl font-extrabold font-heading text-brand-blue-dark">{data.universitiesTitle}</h2>
            <p
              className="text-sm text-gray-600"
              dangerouslySetInnerHTML={{ __html: data.universitiesSubtitle }}
            />
            <div>
              <h3 className="text-sm font-bold text-brand-blue-dark mb-3">Popular Universities in {data.name}</h3>
              <ul className="space-y-1.5">
                {data.universities.map((u, i) => (
                  <li key={i} className="flex items-center space-x-2 text-sm text-gray-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-500 flex-shrink-0" />
                    <span>{u}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-gray-500 mt-3">
                These universities offer high-quality education and cutting-edge research opportunities across multiple fields.
              </p>
            </div>
          </div>

          {/* Right — image */}
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img
              src={data.uniImage}
              alt={`Universities in ${data.name}`}
              className="w-full h-72 lg:h-80 object-cover"
            />
          </div>

        </div>
      </section>

      {/* ── COST OF STUDYING ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left */}
          <div className="space-y-5">
            <h2 className="text-3xl font-extrabold font-heading text-brand-blue-dark">{data.costTitle}</h2>
            <p
              className="text-sm text-gray-600"
              dangerouslySetInnerHTML={{ __html: data.costSubtitle }}
            />
            <div className="space-y-3 mt-4">
              {data.costs.map((c, i) => (
                <div key={i} className="flex items-start justify-between border-b border-gray-100 pb-2 gap-4">
                  <span className="text-sm font-semibold text-brand-blue-dark">{c.label}</span>
                  <span className="text-sm text-gray-600 text-right">{c.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — image */}
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img
              src={data.costImage}
              alt={`Cost of studying in ${data.name}`}
              className="w-full h-72 lg:h-80 object-cover"
            />
          </div>

        </div>
      </section>

      {/* ── FAQS (NEW FEATURE) ───────────────────────────────────────── */}
      {data.faqs && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-100">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold font-heading text-brand-blue-dark mb-3">Frequently Asked Questions</h2>
            <p className="text-sm text-gray-600">Got questions about studying in {data.name}? We have answers.</p>
          </div>
          <div className="space-y-1">
            {data.faqs.map((faq, index) => (
              <FAQAccordion key={index} faq={faq} />
            ))}
          </div>
        </section>
      )}

      {/* ── CTA BANNER ───────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-brand-blue-dark rounded-3xl p-10 text-center space-y-5 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.15),transparent_70%)]" />
          <h2 className="text-3xl font-extrabold font-heading text-white relative z-10">
            Ready to Study in {data.name}? {data.flag}
          </h2>
          <p className="text-sm text-gray-300 max-w-xl mx-auto relative z-10">
            Get a free profile evaluation and personalized guidance from our certified immigration consultants.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Link href="/contact"
              className="inline-flex items-center space-x-2 bg-brand-gold hover:bg-brand-gold/90 text-white px-8 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105 shadow-lg">
              <span>Book Free Consultation</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/eligibility"
              className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3 rounded-xl font-bold text-sm transition-all">
              <span>Check Eligibility</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
