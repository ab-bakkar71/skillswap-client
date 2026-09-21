"use client";
import React, { useState } from 'react';
import { FiChevronDown, FiHelpCircle, FiMail } from 'react-icons/fi';

const FAQ_ITEMS = [
    {
        question: "How does payment and escrow protection work?",
        answer: "When a client accepts a proposal, the agreed budget is securely processed via Stripe Checkout and held in escrow. Funds are only released to the freelancer once the client reviews and officially approves the submitted deliverable."
    },
    {
        question: "What happens if the delivered work needs changes or corrections?",
        answer: "Clients have access to a built-in Review & Revision workflow. When a freelancer submits their work, the client can either approve it or click 'Request Revision' to provide actionable feedback. The freelancer will then make the requested fixes and resubmit."
    },
    {
        question: "How do freelancers find tasks and get hired?",
        answer: "Freelancers can browse all open tasks by category or keyword on the Browse Tasks page. On any open task, you can submit a proposal with your customized price, estimated delivery time, and cover note. If the client accepts, you will see it in your Active Projects dashboard."
    },
    {
        question: "Are there any hidden platform charges or surprise fees?",
        answer: "No. SkillSwap is built on complete transparency. The budget you agree upon during proposal acceptance is the exact price paid. There are no surprise markups or hidden fees deducted unexpectedly."
    },
    {
        question: "How fast are micro-tasks completed on SkillSwap?",
        answer: "Because tasks on SkillSwap focus on targeted micro-jobs (such as bug fixes, landing page tweaks, logo design, or data entry), most projects are completed within 12 to 72 hours—far quicker than traditional freelance contracts."
    },
    {
        question: "Can I use the platform both as a client and a freelancer?",
        answer: "Yes! SkillSwap allows users to post projects when they need specialized assistance and browse or pitch for open tasks when they want to earn by leveraging their technical skills."
    }
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0); // First item open by default

    const toggleItem = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <section className="relative w-full py-24 px-6 md:px-16 lg:px-24 font-manrope text-white z-10 select-none">
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-accent/10 text-brand-accent border border-brand-accent/20 mb-3 text-xs font-semibold tracking-wide uppercase">
                    <FiHelpCircle className="w-4 h-4" /> Got Questions?
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400">
                    Frequently Asked Questions
                </h2>
                <p className="text-sm text-zinc-400 mt-2.5 leading-relaxed">
                    Everything you need to know about task milestones, secure payments, and collaborating on SkillSwap.
                </p>
            </div>

            {/* Accordion Container */}
            <div className="max-w-3xl mx-auto space-y-4">
                {FAQ_ITEMS.map((item, index) => {
                    const isOpen = openIndex === index;
                    return (
                        <div
                            key={index}
                            className={`rounded-2xl border transition-all duration-300 backdrop-blur-xl overflow-hidden ${
                                isOpen 
                                    ? "bg-zinc-900/60 border-brand-accent/40 shadow-lg shadow-violet-500/5" 
                                    : "bg-zinc-950/40 border-brand-border/60 hover:border-zinc-700"
                            }`}
                        >
                            <button
                                onClick={() => toggleItem(index)}
                                className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                                aria-expanded={isOpen}
                            >
                                <span className={`text-base font-bold transition-colors duration-200 ${
                                    isOpen ? "text-brand-accent" : "text-zinc-200 hover:text-white"
                                }`}>
                                    {item.question}
                                </span>
                                <div className={`w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                                    isOpen ? "rotate-180 bg-brand-accent/10 border-brand-accent/30 text-brand-accent" : "text-zinc-400 bg-zinc-900/80"
                                }`}>
                                    <FiChevronDown className="w-4 h-4" />
                                </div>
                            </button>

                            {/* Collapsible Content */}
                            <div
                                className={`grid transition-all duration-300 ease-in-out ${
                                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                }`}
                            >
                                <div className="overflow-hidden">
                                    <p className="px-6 pb-6 text-xs md:text-sm text-zinc-400 leading-relaxed border-t border-brand-border/20 pt-4">
                                        {item.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Still have questions banner */}
            <div className="mt-14 max-w-xl mx-auto text-center p-6 rounded-2xl bg-zinc-900/30 border border-brand-border/40 backdrop-blur-sm">
                <p className="text-sm font-semibold text-zinc-300 mb-1">
                    Still have questions or need assistance?
                </p>
                <p className="text-xs text-zinc-500 mb-4">
                    Our support team is always ready to guide you through your first project or proposal.
                </p>
                <a
                    href="mailto:support@skillswap.com"
                    className="inline-flex items-center gap-2 text-xs font-bold text-brand-accent hover:text-violet-300 transition-colors"
                >
                    <FiMail className="w-4 h-4" /> Reach Out to Support
                </a>
            </div>
        </section>
    );
};

export default FAQ;
