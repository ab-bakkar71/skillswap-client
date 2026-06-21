'use client';
import Link from 'next/link';
import React from 'react';
import NavLinks from './NavLinks';
import { Avatar } from '@heroui/react';
import { authClient } from '@/lib/auth-client';
import { IoIosLogOut } from 'react-icons/io';
import { MdOutlineDashboardCustomize } from 'react-icons/md';
import { LuLayoutDashboard } from 'react-icons/lu';
import { BiLogOut } from 'react-icons/bi';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const pathName = usePathname()
    if(pathName.includes("dashboard")){
        return null
    }
  

    const handelLogOut = async () => {
        await authClient.signOut();
    }


    return (
        <>
            <nav className="sticky top-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 border-b border-brand-border/40 bg-brand-bg/80 backdrop-blur-xl py-3 z-50 transition-all duration-300">
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
                <div className="hidden md:flex items-center gap-4 lg:gap-8 text-sm font-medium">
                    <NavLinks />
                </div>
                {
                    !user ? (<div className="hidden md:flex items-center gap-4">
                        <Link
                            href="/login"
                            className="px-5 py-2 text-xs font-semibold rounded-full border border-brand-accent/40 text-slate-200 hover:text-white hover:border-brand-accent hover:bg-brand-accent/10 hover:scale-105 active:scale-95 shadow-sm hover:shadow-violet-500/20 transition-all duration-300 cursor-pointer text-center"
                        >
                            Login
                        </Link>
                        <Link
                            href="/register"
                            className="px-6 py-2 rounded-full text-xs font-semibold bg-brand-accent text-white hover:bg-violet-600 hover:scale-105 active:scale-95 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 transition-all duration-300 cursor-pointer text-center"
                        >
                            Get Started
                        </Link>
                    </div>) : (
                        <div className='relative group hidden md:flex gap-2'>
                            <button className='flex items-center gap-3 p-1 rounded-full hover:bg-muted transition-colors border border-transparent hover:border-border cursor-pointer'>
                                <Avatar>
                                    <Avatar.Image alt={user?.name} src={user?.image} />
                                    <Avatar.Fallback>{user?.name ? user.name[0].toUpperCase() : "U"}</Avatar.Fallback>
                                </Avatar>
                            </button>

                            <div className='absolute right-0 top-12 w-40 rounded-lg shadow-2xl hidden group-hover:flex flex-col py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200 bg-[#161616] text-slate-200 border-slate-800/60'>
                                <Link href={`/dashboard/${user?.role}`} className="px-4 py-2 text-sm flex items-center gap-3 transition-colors text-white hover:text-white hover:bg-violet-600">
                                    <LuLayoutDashboard className="w-4 h-4" /> Dashboard
                                </Link>
                                <button onClick={handelLogOut} className="px-4 py-2 text-sm text-red-500 flex items-center gap-3 transition-colors text-left hover:bg-violet-600 w-full cursor-pointer">
                                    <BiLogOut className="w-4 h-4" /> Log Out
                                </button>
                            </div>
                        </div>
                    )
                }
                <div className="flex items-center gap-3 md:hidden">
                    <svg onClick={() => setIsMenuOpen(!isMenuOpen)} className="h-6 w-6 text-slate-100 hover:text-brand-accent transition-colors duration-300 cursor-pointer" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <line x1="4" y1="6" x2="20" y2="6" />
                        <line x1="4" y1="12" x2="20" y2="12" />
                        <line x1="4" y1="18" x2="20" y2="18" />
                    </svg>
                </div>
                <div className={`fixed top-0 left-0 w-full h-screen bg-brand-bg text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-slate-200 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <button className="absolute top-5 right-5 text-slate-400 hover:text-brand-accent hover:scale-110 transition-all duration-300" onClick={() => setIsMenuOpen(false)}>
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>

                    <NavLinks />


                    <Link
                        href="/login"
                        className="border border-brand-accent/50 text-slate-200 hover:text-white hover:bg-brand-accent/10 px-10 py-3 rounded-full font-semibold w-2/3 max-w-xs text-center transition-all mt-4"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Login
                    </Link>

                    <Link
                        href="/register"
                        className="bg-brand-accent text-white px-10 py-3 rounded-full font-semibold w-2/3 max-w-xs shadow-lg shadow-violet-500/20 hover:bg-violet-600 text-center transition-all"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Get Started
                    </Link>
                </div>
            </nav>
        </>
    );
};

export default Navbar;