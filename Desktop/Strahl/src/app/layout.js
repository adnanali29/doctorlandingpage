import { Barlow, Barlow_Condensed } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-barlow",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-barlow-condensed",
});

export const metadata = {
  title: "STRAHL™ — Premium Suspension & Chassis Components",
  description:
    "Engineered for Performance. Built for Reliability. STRAHL™ delivers dependable replacement parts for passenger and commercial vehicles, backed by qualified manufacturing partners and stringent quality standards.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

