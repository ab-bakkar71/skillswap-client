import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaCoins, FaSearch, FaTasks, FaUserPlus, FaUsers } from 'react-icons/fa';
import { PiMouseSimpleLight } from 'react-icons/pi';

const Hero = () => {
    return (
        <section className='relative min-h-screen w-full text-white flex flex-col items-center justify-center font-manrope px-4 py-12 overflow-hidden z-10 select-none'>
            <div className="relative z-0 bg-white/10 overflow-hidden p-px flex items-center justify-center rounded-full transition duration-300 active:scale-100 mt-12">
                <div className="flex items-center justify-center gap-3 pl-4 pr-6 py-2.5 text-white rounded-full font-medium bg-zinc-950/80 backdrop-blur">
                    <div className="relative flex size-3.5 items-center justify-center">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75 animate-ping duration-500"></span>
                        <span className="relative inline-flex size-2 rounded-full bg-brand-accent"></span>
                    </div>
                    <span className='text-xs tracking-wide text-zinc-300'>Designed for Micro-Tasks & Freelancers</span>
                </div>
            </div>
            <h1 className="text-4xl md:text-[56px]/[72px] text-center max-w-4xl mt-6 bg-clip-text font-extrabold leading-tight bg-gradient-to-b from-white to-zinc-400 text-transparent">
                Get your tasks done by skilled freelancers
            </h1>
            <p className="text-sm md:text-base text-zinc-400 text-center max-w-xl mt-4 leading-relaxed">
                <span className='font-bold'>Clients</span> post small jobs like logo design, article writing, or fixing a CSS bug. <span className='font-bold'>Freelancer</span> apply, get hired via Stripe, and deliver quick work instantly.
            </p>

            <div className='flex items-center gap-4 mt-8 flex-wrap justify-center'>
                <Link href="/register" className="bg-brand-accent hover:bg-violet-600 text-white px-7 py-3 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer group shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 hover:scale-105 active:scale-95">
                    <div className="relative overflow-hidden">
                        <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                            Get Started today
                        </span>
                        <span className="absolute top-0 left-0 block transition-transform duration-300 group-hover:translate-y-0 translate-y-full">
                            Get Started today
                        </span>
                    </div>
                </Link>

                <div className="bg-white/5 hover:bg-white/10 p-px flex items-center justify-center rounded-full hover:scale-105 transition duration-300 active:scale-100 border border-zinc-800 hover:border-brand-accent">
                    <Link href="/tasks" className="px-7 text-sm py-2.5 text-slate-300 hover:text-white rounded-full bg-transparent font-medium cursor-pointer transition-colors">
                        Browse Tasks
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl mx-auto mt-16 px-4 relative z-20">

                {/* স্ট্যাটস ১: মোট কাজের সংখ্যা */}
                <div className="flex items-center gap-4 p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 backdrop-blur hover:border-brand-accent/50 shadow-md shadow-violet-500/5 transition-all duration-300">
                    <div className="p-3 rounded-xl bg-brand-accent/10 text-brand-accent">
                        <FaTasks className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white tracking-tight">12,450+</h3>
                        <p className="text-xs text-zinc-400 font-medium">Total Tasks Posted</p>
                    </div>
                </div>

                {/* স্ট্যাটস ২: মোট ইউজার */}
                <div className="flex items-center gap-4 p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 backdrop-blur hover:border-brand-accent/50 shadow-md shadow-violet-500/5 transition-all duration-300">
                    <div className="p-3 rounded-xl bg-brand-accent/10 text-brand-accent">
                        <FaUsers className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white tracking-tight">8,900+</h3>
                        <p className="text-xs text-zinc-400 font-medium">Total Active Users</p>
                    </div>
                </div>

                {/* স্ট্যাটস ৩: সফল পেমেন্ট/লেনদেন */}
                <div className="flex items-center gap-4 p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 backdrop-blur hover:border-brand-accent/50 shadow-md shadow-violet-500/5 transition-all duration-300">
                    <div className="p-3 rounded-xl bg-brand-accent/10 text-brand-accent">
                        <FaCoins className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white tracking-tight">$45,200+</h3>
                        <p className="text-xs text-zinc-400 font-medium">Payout Completed</p>
                    </div>
                </div>

            </div>



            <div className="scroll-down flex flex-col items-center gap-3 mt-auto pt-16 pb-3 animate-bounce cursor-pointer opacity-50 hover:opacity-100 transition-opacity">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 9A7 7 0 1 0 5 9v6a7 7 0 1 0 14 0zm-7-3v4" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className='text-xs text-zinc-500 tracking-wider font-semibold uppercase'>Scroll down</p>
            </div>
        </section>
    );
};

export default Hero;