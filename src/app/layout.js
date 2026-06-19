import { Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});



export const metadata = {
  title: "SkillSwap - Get your tasks done by skilled freelancers",
  description: "SkillSwap is a marketplace website. Here, clients post small, simple tasks like making a logo, writing an article, or fixing a CSS bug. Freelancers can look at these tasks, send applications (proposals), and get hired to finish them. It is a simpler version of Fiverr or Freelancer.com for fast, one-time jobs.",
};

export default function RootLayout({ children }) {
  return (
    <html
     data-theme="dark"
      lang="en"
      className={`${manrope.variable} h-full antialiased dark`}
    >
      <body className="bg-brand-bg text-slate-50 min-h-full flex flex-col">
          <Navbar/>
        <main>
          {children}
        </main>
         <ToastContainer />
        </body>
    </html>
  );
}
