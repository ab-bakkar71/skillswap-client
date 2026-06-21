import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import { Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import Footer from "@/components/Footer";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata = {
  title: "SkillSwap - Get your tasks done by skilled freelancers",
  description:
    "SkillSwap is a marketplace website. Here, clients post small, simple tasks like making a logo, writing an article, or fixing a CSS bug. Freelancers can look at these tasks, send applications (proposals), and get hired to finish them. It is a simpler version of Fiverr or Freelancer.com for fast, one-time jobs.",
};

export default function RootLayout({ children }) {
  return (
    <html
      data-theme="dark"
      lang="en"
      className={`${manrope.variable} h-full antialiased`}
      style={{ colorScheme: "dark" }}
    >
      <body className="min-h-screen bg-brand-bg text-slate-50 flex flex-col relative overflow-x-hidden">
        {/* Glow blobs wrapper - clips blobs so they never cause scroll */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-900/10 blur-[120px] rounded-full" />
          <div className="absolute top-[20%] right-[-10%] w-[50vw] h-[50vw] bg-[#D470FF]/5 blur-[120px] rounded-full" />
        </div>

        <div className="relative flex flex-col flex-1 z-10">
          <Navbar />
          <main className="flex-1">{children}</main>
        </div>

        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}
