import Link from 'next/link';
import React from 'react';
import { 
    FiArrowRight, 
    FiCode, 
    FiDatabase, 
    FiEdit3, 
    FiGrid, 
    FiLayers, 
    FiPenTool 
} from 'react-icons/fi';
import { IoSparklesOutline } from 'react-icons/io5';

const CATEGORIES_DATA = [
    {
        id: "web-fixing",
        title: "Web & Bug Fixing",
        description: "Front-end fixes, responsive layouts, React/Next.js debugging, and API integrations.",
        icon: FiCode,
        badge: "High Demand",
        badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        gradient: "group-hover:border-blue-500/50 hover:shadow-blue-500/10",
        iconBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        href: "/tasks?category=web-fixing"
    },
    {
        id: "ui-ux",
        title: "UI/UX Component Design",
        description: "Figma prototypes, mobile app wireframes, responsive component mockups, and design systems.",
        icon: FiLayers,
        badge: "Popular",
        badgeColor: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20",
        gradient: "group-hover:border-fuchsia-500/50 hover:shadow-fuchsia-500/10",
        iconBg: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20",
        href: "/tasks?category=ui-ux"
    },
    {
        id: "graphics-design",
        title: "Graphics & Logo Design",
        description: "Modern brand identity, vector logos, social media graphics, and illustrative banners.",
        icon: FiPenTool,
        badge: "Creative",
        badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        gradient: "group-hover:border-amber-500/50 hover:shadow-amber-500/10",
        iconBg: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        href: "/tasks?category=graphics-design"
    },
    {
        id: "content-writing",
        title: "Content & Article Writing",
        description: "SEO blog posts, tech documentation, engaging copy, and compelling product writeups.",
        icon: FiEdit3,
        badge: "Fast Turnaround",
        badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        gradient: "group-hover:border-emerald-500/50 hover:shadow-emerald-500/10",
        iconBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        href: "/tasks?category=content-writing"
    },
    {
        id: "data-entry",
        title: "Virtual Assistant & Data Entry",
        description: "Spreadsheet cleanup, web research, automated data extraction, and administrative support.",
        icon: FiDatabase,
        badge: "Quick Tasks",
        badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
        gradient: "group-hover:border-cyan-500/50 hover:shadow-cyan-500/10",
        iconBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
        href: "/tasks?category=data-entry"
    },
    {
        id: "all",
        title: "Explore All Categories",
        description: "Discover all open micro-tasks across diverse skill sets and pitch your customized proposal.",
        icon: FiGrid,
        badge: "All Tasks",
        badgeColor: "bg-brand-accent/10 text-brand-accent border-brand-accent/20",
        gradient: "group-hover:border-brand-accent/60 hover:shadow-violet-500/10",
        iconBg: "bg-brand-accent/10 text-brand-accent border-brand-accent/20",
        href: "/tasks"
    }
];

const Categories = () => {
    return (
        <section className="relative w-full py-20 px-6 md:px-16 lg:px-24 font-manrope text-white z-10 select-none">
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-14">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 text-brand-accent border border-brand-accent/20 mb-3 text-xs font-semibold tracking-wide uppercase">
                    <IoSparklesOutline className="animate-pulse" /> Browse by Skill
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400">
                    Explore Popular Categories
                </h2>
                <p className="text-sm text-zinc-400 mt-2.5 leading-relaxed">
                    Find high-impact micro-tasks suited to your expertise or hire top specialists in specific domains.
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {CATEGORIES_DATA.map((category) => {
                    const Icon = category.icon;
                    return (
                        <Link
                            key={category.id}
                            href={category.href}
                            className={`group relative p-6 rounded-2xl bg-zinc-950/40 border border-brand-border/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between ${category.gradient}`}
                        >
                            {/* Subtle Background Glow */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />

                            <div>
                                {/* Top Row: Icon & Badge */}
                                <div className="flex items-center justify-between gap-2 mb-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border text-lg transition-transform duration-300 group-hover:scale-110 ${category.iconBg}`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${category.badgeColor}`}>
                                        {category.badge}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-brand-accent transition-colors duration-200 mb-2">
                                    {category.title}
                                </h3>

                                {/* Description */}
                                <p className="text-xs md:text-sm text-zinc-400 leading-relaxed line-clamp-2">
                                    {category.description}
                                </p>
                            </div>

                            {/* Footer Link */}
                            <div className="mt-5 pt-4 border-t border-brand-border/30 flex items-center justify-between text-xs font-semibold text-zinc-400 group-hover:text-white transition-colors duration-200">
                                <span>Browse Tasks</span>
                                <FiArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5 text-brand-accent" />
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};

export default Categories;
