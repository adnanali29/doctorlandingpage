import { DM_Sans, Poppins, Montserrat } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Addy Fitness - Premium Online Medical Consultation",
  description: "Verified Digital Outpatient Clinic. Empowering healthcare diagnostics in minutes. Experience secure 1-on-1 private video medical assessments, instant digital prescriptions, and certified fitness syncing.",
  icons: {
    icon: "https://i.ibb.co/n8VpyHWg/LOGO-RED.png",
    shortcut: "https://i.ibb.co/n8VpyHWg/LOGO-RED.png",
    apple: "https://i.ibb.co/n8VpyHWg/LOGO-RED.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${poppins.variable} ${montserrat.variable} scroll-smooth`}
    >
      <head>
        <link rel="icon" href="https://i.ibb.co/n8VpyHWg/LOGO-RED.png" type="image/png" />
        <link rel="shortcut icon" href="https://i.ibb.co/n8VpyHWg/LOGO-RED.png" type="image/png" />
        <link rel="apple-touch-icon" href="https://i.ibb.co/n8VpyHWg/LOGO-RED.png" />
      </head>
      <body className="bg-[#fcfdfe] text-slate-800 antialiased selection:bg-brand-100 selection:text-brand-900">
        {children}
      </body>
    </html>
  );
}
