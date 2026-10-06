import { Inter, Outfit } from "next/font/google";
import "../globals.css";

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
  title: "IQ CRM | Admin Dashboard",
  robots: "noindex, nofollow",
};

export default function AdminLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-brand-gray text-brand-text">
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}
