"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { FaGithub, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
     const pathName = usePathname()
        if(pathName.includes("dashboard")){
            return null
        }
    return (
        <footer className='bg-black py-12 px-4 sm:px-6 lg:px-8'>
            <div className='w-full max-w-7xl mx-auto'>

                <div className="flex flex-wrap justify-between gap-y-12 lg:gap-x-8">

                    <div className="w-full md:w-[45%] lg:w-[35%] flex flex-col items-center md:items-start text-center md:text-left">
                        <Link href="/" className="flex items-center gap-2 group select-none">
                            <svg width="240" height="40" viewBox="0 0 240 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-9 transition-transform duration-300 group-hover:scale-105">
                                <g className="transition-transform duration-500 group-hover:rotate-12">
                                    <path d="M15.5 2L29 11v18L15.5 38 2 29V11L15.5 2z" stroke="url(#violet-gradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M11 16h9m0 0l-3-3m3 3l-3 3M20 24H11m0 0l3-3m-3 3l3 3" stroke="#f8fafc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </g>
                                <text x="42" y="28" fill="#f8fafc" className="font-manrope font-extrabold text-[24px] tracking-wide">
                                    SkillSwap
                                </text>
                                <defs>
                                    <linearGradient id="violet-gradient" x1="2" y1="2" x2="29" y2="38" gradientUnits="userSpaceOnUse">
                                        <stop offset="0%" stopColor="#8b5cf6" />
                                        <stop offset="100%" stopColor="#d946ef" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </Link>
                        <div className='w-full max-w-52 h-px mt-8 bg-linear-to-r from-black via-white/25 to-black'></div>
                        <p className='text-sm text-slate-400 mt-6 max-w-sm leading-relaxed'>
                            SkillSwap is a marketplace website. Here, clients post small, simple tasks like making a logo, writing an article, or fixing a CSS bug. Freelancers can look at these tasks, send applications (proposals), and get hired to finish them. It is a simpler version of Fiverr or Freelancer.com for fast, one-time jobs.
                        </p>
                    </div>

                    <div className="w-full md:w-[45%] lg:w-[15%] flex flex-col items-center md:items-start text-center md:text-left">
                        <h3 className='text-sm text-white font-medium'>Important Links</h3>
                        <div className="flex flex-col gap-2 mt-6">
                            <Link href="/" className='text-sm text-slate-400 hover:text-slate-200 transition-colors'>Home</Link>
                            <Link href="/tasks" className='text-sm text-slate-400 hover:text-slate-200 transition-colors'>Browse Tasks</Link>
                            <Link href="/freelancers" className='text-sm text-slate-400 hover:text-slate-200 transition-colors'>Browse Freelancers</Link>
                            <Link href="#" className='text-sm text-slate-400 hover:text-slate-200 transition-colors'>Contact</Link>
                            <Link href="#" className='text-sm text-slate-400 hover:text-slate-200 transition-colors'>FAQ</Link>
                        </div>
                    </div>

                    <div className="w-full md:w-[45%] lg:w-[15%] flex flex-col items-center md:items-start text-center md:text-left font-manrope">

                        <h3 className='text-sm text-white font-semibold tracking-wide'>Social Links</h3>


                        <div className="flex flex-col gap-3 mt-6 w-full">
                            <Link
                                href="https://github.com/ab-bakkar71"
                                target='_blank'
                                className='group flex items-center justify-center md:justify-start gap-2.5 text-sm text-slate-400 hover:text-slate-200 hover:text-brand-accent hover:translate-x-1 transition-all duration-300'
                            >
                                <FaGithub className="w-4 h-4 text-slate-500 group-hover:text-slate-200 group-hover:text-brand-accent transition-colors duration-300" />
                                <span>GitHub</span>
                            </Link>

                            <Link
                                href="https://www.linkedin.com/in/ab-bakkar71/"
                                target='_blank'
                                className='group flex items-center justify-center md:justify-start gap-2.5 text-sm text-slate-400 hover:text-slate-200 hover:text-brand-accent hover:translate-x-1 transition-all duration-300'
                            >
                                <FaLinkedinIn className="w-4 h-4 text-slate-500 group-hover:text-slate-200 group-hover:text-brand-accent transition-colors duration-300" />
                                <span>LinkedIn</span>
                            </Link>
                            <Link
                                href="https://x.com/ab_bakkar71"
                                target='_blank'
                                className='group flex items-center justify-center md:justify-start gap-2.5 text-sm text-slate-400 hover:text-slate-200 hover:text-brand-accent hover:translate-x-1 transition-all duration-300'
                            >
                                <FaXTwitter className="w-4 h-4 text-slate-500 group-hover:text-slate-200 group-hover:text-brand-accent transition-colors duration-300" />
                                <span>X (Twitter)</span>
                            </Link>

                            {/* Instagram */}
                            <Link
                                href="https://www.instagram.com/ab.bakkar71/"
                                target='_blank'
                                className='group flex items-center justify-center md:justify-start gap-2.5 text-sm text-slate-400 hover:text-slate-200 hover:text-brand-accent hover:translate-x-1 transition-all duration-300'
                            >
                                <FaInstagram className="w-4 h-4 text-slate-500 group-hover:text-slate-200 group-hover:text-brand-accent transition-colors duration-300" />
                                <span>Instagram</span>
                            </Link>

                        </div>
                    </div>

                    <div className="w-full md:w-[45%] lg:w-[25%] flex flex-col items-center md:items-start text-center md:text-left">
                        <h3 className='text-sm text-white font-medium'>Subscribe for news</h3>
                        <div className="flex items-center border gap-2 border-white/20 h-13 max-w-80 w-full rounded-full overflow-hidden mt-4">
                            <input type="email" placeholder="Enter your email.." className="w-full h-full pl-6 outline-none text-sm bg-transparent text-white placeholder-white/60 placeholder:text-xs" required />
                            <button type="submit" className="bg-linear-to-b from-[#5623D8] to-[#7B53E2] active:scale-95 transition w-56 h-10 rounded-full text-sm text-white cursor-pointer mr-1.5">Subscribe</button>
                        </div>


                        <div className='mt-6'>
                            <h2 className="font-semibold mb-1">Get in touch</h2>
                            <div className="text-sm space-y-1 text-slate-500">
                                <p>+1-234-567-890</p>
                                <p>contact@example.com</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='w-full h-px mt-16 mb-4 bg-linear-to-r from-black via-white/25 to-black'></div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className='text-xs text-white/60'>© {new Date().getFullYear()} SkillSwap</p>
                    <div className="flex items-center gap-6">
                        <a href='#' className='text-xs text-white/60 hover:text-white transition-colors'>Terms & Conditions</a>
                        <div className='w-px h-4 bg-white/20'></div>
                        <a href='#' className='text-xs text-white/60 hover:text-white transition-colors'>Privacy Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;