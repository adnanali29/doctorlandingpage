import type { Metadata } from "next";
import { Outfit, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Cursor } from "@/components/Cursor";
import { FloatingActionBar } from "@/components/FloatingActionBar";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const dmSerif = DM_Serif_Display({
  weight: ["400"],
  subsets: ["latin"],
  style: ["italic", "normal"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://archimatemahesh.vercel.app"),
  title: {
    default: "ArchiMate | Civil & Architectural Design Studio — Odisha",
    template: "%s | ArchiMate",
  },
  description:
    "ArchiMate — High-precision civil engineering, AutoCAD drafting, 3D elevation design, and BDA/CDA municipal approval blueprints in Odisha, India. Get instant construction estimates.",
  keywords: [
    "civil engineering Odisha",
    "AutoCAD drafting",
    "3D elevation design",
    "BDA approval blueprints",
    "CDA compliant drawings",
    "house plan design Bhubaneswar",
    "structural drawings",
    "construction estimator",
    "floor plan design India",
    "ArchiMate",
  ],
  authors: [{ name: "ArchiMate Studio" }],
  creator: "ArchiMate Studio",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://archimatemahesh.vercel.app",
    siteName: "ArchiMate",
    title: "ArchiMate | Civil & Architectural Design Studio — Odisha",
    description:
      "High-precision civil engineering, AutoCAD drafting & 3D elevation design services in Odisha. BDA/CDA compliant blueprints. Get instant construction estimates.",
    images: [
      {
        url: "/logo-full.png",
        width: 1200,
        height: 630,
        alt: "ArchiMate — Civil & Architectural Design Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ArchiMate | Civil & Architectural Design Studio",
    description:
      "High-precision civil engineering & AutoCAD drafting in Odisha. 3D elevation design, BDA/CDA compliant blueprints.",
    images: ["/logo-full.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo-icon.png",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${dmSerif.variable}`}>
      <body className="bg-[#0a0a0a] text-[#f0ece4] min-h-screen flex flex-col antialiased selection:bg-[#e07a3a] selection:text-white">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <FloatingActionBar />
      </body>
    </html>
  );
}
