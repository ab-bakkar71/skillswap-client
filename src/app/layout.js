import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="bg-background text-foreground min-h-full flex flex-col">
        <main>
          {children}
        </main>
        </body>
    </html>
  );
}
