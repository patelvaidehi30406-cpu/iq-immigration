"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const translations = {
  en: {
    navHome: "Home",
    navAbout: "About Us",
    navStudy: "Study Abroad",
    navWork: "Work Permit",
    navVisitor: "Visitor Visa",
    navEligibility: "Check Eligibility",
    navSuccess: "Success Stories",
    navBlog: "Blog",
    navContact: "Contact",
    navAdmin: "Admin",
    heroTitle: "Your Trusted Partner for",
    heroSubTitle: "Study Abroad & Work Permits",
    heroDesc: "Navigate your international journey with expert legal counsel, LMIA sponsorship assistance, and university placement advisors.",
    ctaFreeConsultation: "Free Consultation",
    ctaCheckEligibility: "Check Eligibility",
    ctaApplyNow: "Apply Now",
    sectionServices: "Our Specialized Services",
    sectionCountries: "Top Destination Countries",
    sectionStats: "Our Success in Numbers",
    sectionTestimonials: "What Our Clients Say",
    sectionFAQ: "Frequently Asked Questions",
    sectionUpdates: "Latest Visa & Immigration News",
    floatingWhatsApp: "Chat with an Expert",
    footerCopyright: "© 2026 IQ Education & Immigration. All rights reserved.",
    footerTagline: "Building trust, shaping futures, and bridging borders.",
    formName: "Full Name",
    formEmail: "Email Address",
    formPhone: "Phone Number",
    formAge: "Age",
    formEducation: "Highest Education Level",
    formIelts: "IELTS / PTE Band Score",
    formWorkExp: "Work Experience (Years)",
    formPreferredCountry: "Preferred Country",
    formMessage: "Message / Inquiry Details",
    formSubmit: "Submit Details",
    eligibilityTitle: "Immigration Eligibility Checker",
    eligibilityIntro: "Fill out this quick assessment form to check your qualification status for study permits or skilled worker programs.",
    successRate: "Visa Success Rate",
    clientsGuided: "Happy Clients",
    countriesPartners: "Global Partnerships",
    yearsExperience: "Years of Experience"
  },
  hi: {
    navHome: "मुख्य पृष्ठ",
    navAbout: "हमारे बारे में",
    navStudy: "विदेश में पढ़ाई",
    navWork: "वर्क परमिट",
    navVisitor: "विज़िटर वीज़ा",
    navEligibility: "पात्रता जांचें",
    navSuccess: "सफलता की कहानियां",
    navBlog: "ब्लॉग",
    navContact: "संपर्क करें",
    navAdmin: "एडमिन",
    heroTitle: "आपका विश्वसनीय भागीदार",
    heroSubTitle: "विदेश में पढ़ाई और वर्क परमिट के लिए",
    heroDesc: "विशेषज्ञ कानूनी सलाह, LMIA प्रायोजन सहायता और विश्वविद्यालय प्लेसमेंट सलाहकारों के साथ अपनी अंतर्राष्ट्रीय यात्रा का मार्गदर्शन करें।",
    ctaFreeConsultation: "निःशुल्क परामर्श",
    ctaCheckEligibility: "पात्रता जांचें",
    ctaApplyNow: "अभी आवेदन करें",
    sectionServices: "हमारी विशिष्ट सेवाएं",
    sectionCountries: "शीर्ष गंतव्य देश",
    sectionStats: "संख्याओं में हमारी सफलता",
    sectionTestimonials: "हमारे ग्राहक क्या कहते हैं",
    sectionFAQ: "अक्सर पूछे जाने वाले प्रश्न",
    sectionUpdates: "नवीनतम वीज़ा और आव्रजन समाचार",
    floatingWhatsApp: "विशेषज्ञ से बात करें",
    footerCopyright: "© 2026 आईक्यू एजुकेशन एंड इमिग्रेशन। सर्वाधिकार सुरक्षित।",
    footerTagline: "विश्वास का निर्माण, भविष्य को आकार देना और सीमाओं को जोड़ना।",
    formName: "पूरा नाम",
    formEmail: "ईमेल पता",
    formPhone: "फ़ोन नंबर",
    formAge: "उम्र",
    formEducation: "उच्चतम शिक्षा स्तर",
    formIelts: "आईईएलटीएस / पीटीई स्कोर",
    formWorkExp: "कार्य अनुभव (वर्ष)",
    formPreferredCountry: "पसंदीदा देश",
    formMessage: "संदेश / पूछताछ विवरण",
    formSubmit: "विवरण जमा करें",
    eligibilityTitle: "आव्रजन पात्रता परीक्षक",
    eligibilityIntro: "अध्ययन परमिट या कुशल श्रमिक कार्यक्रमों के लिए अपनी योग्यता स्थिति की जांच करने के लिए इस त्वरित मूल्यांकन फ़ॉर्म को भरें।",
    successRate: "वीज़ा सफलता दर",
    clientsGuided: "संतुष्ट ग्राहक",
    countriesPartners: "वैश्विक भागीदारी",
    yearsExperience: "अनुभव के वर्ष"
  },
  gu: {
    navHome: "હોમ પેજ",
    navAbout: "અમારા વિશે",
    navStudy: "વિદેશમાં અભ્યાસ",
    navWork: "વર્ક પરમિટ",
    navVisitor: "વિઝિટર વિઝા",
    navEligibility: "પાત્રતા તપાસો",
    navSuccess: "સફળતાની વાર્તાઓ",
    navBlog: "બ્લોગ",
    navContact: "સંપર્ક કરો",
    navAdmin: "એડમિન",
    heroTitle: "તમારો વિશ્વસનીય ભાગીદાર",
    heroSubTitle: "વિદેશમાં અભ્યાસ અને વર્ક પરમિટ માટે",
    heroDesc: "નિષ્ણાત કાનૂની સલાહ, LMIA સ્પોન્સરશિપ સહાય અને યુનિવર્સિટી પ્લેસમેન્ટ સલાહકારો સાથે તમારી આંતરરાષ્ટ્રીય સફરને સફળ બનાવો.",
    ctaFreeConsultation: "મફત પરામર્શ",
    ctaCheckEligibility: "પાત્રતા તપાસો",
    ctaApplyNow: "હમણાં અરજી કરો",
    sectionServices: "અમારી વિશિષ્ટ સેવાઓ",
    sectionCountries: "મુખ્ય દેશો",
    sectionStats: "આંકડામાં અમારી સફળતા",
    sectionTestimonials: "અમારા ગ્રાહકો શું કહે છે",
    sectionFAQ: "વારંવાર પૂછાતા પ્રશ્નો",
    sectionUpdates: "નવીનતમ વિઝા અને ઇમિગ્રેશન સમાચાર",
    floatingWhatsApp: "નિષ્ણાત સાથે વાત કરો",
    footerCopyright: "© 2026 આઈક્યુ એજ્યુકેશન એન્ડ ઇમિગ્રેશન. સર્વાધિકાર સુરક્ષિત.",
    footerTagline: "વિશ્વાસનું નિર્માણ, ભવિષ્યનું ઘડતર અને સરહદોનું જોડાણ.",
    formName: "પૂરું નામ",
    formEmail: "ઇમેઇલ સરનામું",
    formPhone: "ફોન નંબર",
    formAge: "ઉંમર",
    formEducation: "ઉચ્ચતમ શિક્ષણ સ્તર",
    formIelts: "આઇઇએલટીએસ / પીટીઇ સ્કોર",
    formWorkExp: "કામનો અનુભવ (વર્ષો)",
    formPreferredCountry: "પસંદગીનો દેશ",
    formMessage: "સંદેશ / પૂછપરછ વિગત",
    formSubmit: "વિગતો સબમિટ કરો",
    eligibilityTitle: "ઇમિગ્રેશન પાત્રતા તપાસનાર",
    eligibilityIntro: "સ્ટડી પરમિટ અથવા કુશળ કામદાર કાર્યક્રમો માટે તમારી લાયકાતની સ્થિતિ તપાસવા માટે આ ઝડપી મૂલ્યાંકન ફોર્મ ભરો.",
    successRate: "વિઝા સફળતા દર",
    clientsGuided: "ખુશ ગ્રાહકો",
    countriesPartners: "વૈશ્વિક ભાગીદારી",
    yearsExperience: "અનુભવના વર્ષો"
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  // Load selected language from localStorage if available
  useEffect(() => {
    const savedLanguage = localStorage.getItem("iq_lang");
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
      localStorage.setItem("iq_lang", lang);
    }
  };

  const t = (key) => {
    return translations[language]?.[key] || translations["en"]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
