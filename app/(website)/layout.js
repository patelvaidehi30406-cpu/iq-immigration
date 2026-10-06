import { Inter, Outfit } from "next/font/google";
import "../globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import LiveChat from "@/components/LiveChat";
import AppShell from "@/components/AppShell";
import RecentApprovalsTicker from "@/components/RecentApprovalsTicker";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "IQ Education & Immigration | Study Abroad & Work Permit Consultants",
  description: "Your trusted immigration agency for Student Visas, LMIA work permits, skilled worker immigration, and tourist visitor visa services. Check eligibility online.",
  keywords: "Study Abroad, Work Permit, Canada LMIA, Visa Consultant, UK study visa, Australia Express Entry, Immigration lawyer",
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-brand-gray text-brand-text">
        <LanguageProvider>
          <AppShell>
            <div className="fixed top-0 left-0 right-0 z-50">
              <RecentApprovalsTicker />
              <Header />
            </div>
            
            {/* Page Contents */}
            <main className="flex-grow pt-[100px]">
              {children}
            </main>
            
            {/* Footer Branding */}
            <Footer />
            
            {/* Sticky Conversion Widgets */}
            <FloatingWhatsApp />
            <LiveChat />
          </AppShell>
        </LanguageProvider>
      </body>
    </html>
  );
}

