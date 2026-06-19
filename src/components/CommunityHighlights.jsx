import Link from 'next/link';
import React from 'react';
import { FaArrowRight, FaAward, FaCheckCircle, FaStar } from 'react-icons/fa';

const CommunityHighlights = () => {
    const topWorker = {
        name: "Abubakkar Siddik",
        role: "Expert UI/UX Designer & Full-Stack Developer",
        bio: "This month's top earner with 100% client satisfaction. Specialized in fixing CSS bugs, building responsive layouts, and integrating secure Stripe checkout systems.",
        rating: "5.0",
        completedTasks: 42,
        skills: ["Next.js", "Tailwind CSS", "Figma", "Node.js"],
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200" // ডামি প্রোফাইল পিকচার
    };
    return (
        <section className="relative w-full text-white py-20 px-6 md:px-16 lg:px-24 font-manrope overflow-hidden z-10 select-none">
            
            {/* সেকশন হেডার */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 text-brand-accent border border-brand-accent/20 mb-3 text-xs font-semibold tracking-wide uppercase">
                    <FaAward className="animate-bounce" /> Community Highlights
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-neutral-100">
                    Freelancer of the Month
                </h2>
            </div>

            {/* ফিচার বক্স (Feature Box) কন্টেইনার */}
            <div className="w-full max-w-4xl mx-auto p-6 md:p-10 bg-brand-nav/40 backdrop-blur-xl border border-brand-border/60 rounded-3xl shadow-2xl shadow-violet-500/5 relative group hover:border-brand-accent/50 transition-all duration-500">
                
                {/* ব্যাকগ্রাউন্ডে মৃদু ভায়োলেট গ্লো আভা */}
                <div className="absolute inset-0 bg-gradient-to-r from-brand-accent/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
                    
                    {/* বাম পাশ: গ্লোয়িং ফ্রিল্যান্সার ইমেজ */}
                    <div className="relative flex-shrink-0">
                        <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden border-2 border-brand-accent/40 shadow-lg shadow-violet-500/20 group-hover:border-brand-accent transition-colors duration-300">
                            <img 
                                src={topWorker.image} 
                                alt={topWorker.name} 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* টপ ওয়ার্কারের ভেরিফাইড ব্যাজ আইকন */}
                        <div className="absolute bottom-[-10px] right-[-10px] bg-brand-accent text-white p-1.5 rounded-full shadow-lg">
                            <FaCheckCircle className="w-4 h-4" />
                        </div>
                    </div>

                    {/* ডান পাশ: মেম্বার ডিটেইলস */}
                    <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start">
                        
                        <h3 className="text-xl md:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                            {topWorker.name}
                        </h3>
                        
                        <p className="text-xs md:text-sm font-semibold text-brand-accent mt-1">
                            {topWorker.role}
                        </p>

                        <p className="text-xs text-zinc-400 mt-3 leading-relaxed max-w-2xl">
                            {topWorker.bio}
                        </p>

                        {/* লাইভ স্ট্যাটস মেকার (রেটিং ও টাস্ক কাউন্ট) */}
                        <div className="flex items-center gap-6 mt-4 flex-wrap justify-center md:justify-start">
                            <div className="flex items-center gap-1.5 bg-zinc-900/80 px-3 py-1.5 rounded-xl border border-zinc-800">
                                <FaStar className="text-yellow-400 w-3.5 h-3.5" />
                                <span className="text-xs font-bold text-slate-200">{topWorker.rating} Rating</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-zinc-900/80 px-3 py-1.5 rounded-xl border border-zinc-800">
                                <span className="text-xs font-bold text-brand-success">{topWorker.completedTasks} Jobs Completed</span>
                            </div>
                        </div>

                        {/* স্কিলস লিস্ট ট্যাগ (Skills Tag) */}
                        <div className="flex flex-wrap gap-2 mt-5 justify-center md:justify-start">
                            {topWorker.skills.map((skill, index) => (
                                <span 
                                    key={index}
                                    className="text-[10px] md:text-xs font-medium bg-white/5 border border-zinc-800/80 text-zinc-300 px-3 py-1 rounded-full hover:border-brand-accent/40 transition-colors"
                                >
                                    #{skill}
                                </span>
                            ))}
                        </div>

                        {/* প্রোফাইল দেখার বাটন */}
                        <Link 
                            href="/profile" 
                            className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-brand-accent hover:text-violet-400 mt-6 group/btn transition-colors"
                        >
                            View Public Profile 
                            <FaArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default CommunityHighlights;