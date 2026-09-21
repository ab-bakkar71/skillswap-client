import Link from 'next/link';
import React from 'react';
import { 
    FiCheckCircle, 
    FiDollarSign, 
    FiRefreshCw, 
    FiShield, 
    FiUsers, 
    FiZap 
} from 'react-icons/fi';
import { IoShieldCheckmarkOutline } from 'react-icons/io5';

const BENEFITS = [
    {
        icon: FiShield,
        title: "Escrow Payment Protection",
        description: "Your funds are securely held via Stripe Checkout. Payment is only released to the freelancer once you review and approve the final work.",
        color: "text-emerald-400",
        bg: "bg-emerald-500/10 border-emerald-500/20",
        badge: "100% Secure"
    },
    {
        icon: FiZap,
        title: "Rapid Micro-Task Delivery",
        description: "No lengthy recruitment hurdles. Post focused jobs and get qualified proposals in minutes, with deliverables completed in hours.",
        color: "text-amber-400",
        bg: "bg-amber-500/10 border-amber-500/20",
        badge: "Fast Turnaround"
    },
    {
        icon: FiRefreshCw,
        title: "Review & Revision Workflow",
        description: "Inspect every submission directly in your dashboard. If changes are needed, request detailed revisions before approving completion.",
        color: "text-blue-400",
        bg: "bg-blue-500/10 border-blue-500/20",
        badge: "Guaranteed Satisfaction"
    },
    {
        icon: FiUsers,
        title: "Vetted Specialist Talent",
        description: "Browse verified freelancer profiles with proven skills, portfolios, client ratings, and hourly rates to find your ideal collaborator.",
        color: "text-fuchsia-400",
        bg: "bg-fuchsia-500/10 border-fuchsia-500/20",
        badge: "Top Rated"
    },
    {
        icon: FiDollarSign,
        title: "Zero Hidden Platform Fees",
        description: "Transparent budget breakdown from the start. What you see is what you pay, with direct payouts to freelancers upon approval.",
        color: "text-brand-accent",
        bg: "bg-brand-accent/10 border-brand-accent/20",
        badge: "Transparent Pricing"
    },
    {
        icon: FiCheckCircle,
        title: "End-to-End Task Tracking",
        description: "Track task progress from open status to active hiring, deliverable submission, client review, and final payment in real time.",
        color: "text-cyan-400",
        bg: "bg-cyan-500/10 border-cyan-500/20",
        badge: "Live Updates"
    }
];

const PlatformBenefits = () => {
    return (
        <section className="relative w-full py-24 px-6 md:px-16 lg:px-24 font-manrope text-white z-10 select-none">
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3 text-xs font-semibold tracking-wide uppercase">
                    <IoShieldCheckmarkOutline className="w-4 h-4" /> Why Choose SkillSwap
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400">
                    Built for Speed, Security & Trust
                </h2>
                <p className="text-sm text-zinc-400 mt-2.5 leading-relaxed">
                    Everything you need to collaborate with confidence. A seamless micro-task ecosystem designed for modern creators and clients.
                </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {BENEFITS.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={index}
                            className="group relative p-7 rounded-3xl bg-zinc-950/40 border border-brand-border/60 backdrop-blur-xl transition-all duration-300 hover:border-zinc-700 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between"
                        >
                            {/* Inner glow on hover */}
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

                            <div>
                                <div className="flex items-center justify-between mb-5">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border text-lg transition-transform duration-300 group-hover:scale-110 ${item.bg} ${item.color}`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${item.bg} ${item.color}`}>
                                        {item.badge}
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold text-white tracking-tight mb-2.5 group-hover:text-zinc-100 transition-colors">
                                    {item.title}
                                </h3>

                                <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Bottom Callout Bar */}
            <div className="mt-14 max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-brand-border/80 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl backdrop-blur-xl">
                <div className="text-center sm:text-left space-y-1">
                    <h4 className="text-lg font-bold text-white">Ready to get your project moving?</h4>
                    <p className="text-xs md:text-sm text-zinc-400">Join thousands of clients and skilled freelancers on SkillSwap today.</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                    <Link
                        href="/tasks"
                        className="px-5 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900/90 text-zinc-200 text-xs font-bold hover:border-zinc-500 hover:text-white transition-colors"
                    >
                        Browse Tasks
                    </Link>
                    <Link
                        href="/dashboard/client/post-task"
                        className="px-5 py-2.5 rounded-xl bg-brand-accent text-zinc-950 text-xs font-bold hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/10"
                    >
                        Post a Task
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default PlatformBenefits;
