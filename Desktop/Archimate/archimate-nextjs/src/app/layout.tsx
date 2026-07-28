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
  title: "ArchiMate | Civil & Architectural Design Studio",
  description: "ArchiMate — High-precision civil engineering and architectural drafting services in Odisha, India.",
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
