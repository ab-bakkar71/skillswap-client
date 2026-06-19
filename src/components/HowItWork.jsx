import React from 'react';

const HowItWork = () => {
    const steps = [
        {
            id: 1,
            title: "Post a Task",
            desc: "Clients post small, simple jobs with a title, category, budget size (USD), and a deadline date easily.",
            color: "bg-brand-accent shadow-violet-500/50"
        },
        {
            id: 2,
            title: "Get Proposals",
            desc: "Skilled freelancers look at the open tasks and apply by entering their price, completion time, and a message.",
            color: "bg-[#d946ef] shadow-pink-500/50"
        },
        {
            id: 3,
            title: "Hire and Pay",
            desc: "The client checks applications, chooses the best freelancer, and pays securely using standard Stripe Checkout.",
            color: "bg-brand-success shadow-emerald-500/50" 
        }
    ];
    return (
        <section className="relative w-full bg-black text-white py-24 px-6 md:px-16 lg:px-24 font-manrope overflow-hidden z-10 select-none">
            
        
            <div className="text-center mb-20 animate-in fade-in duration-700">
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400">
                    Let's See How it Works
                </h2>
                <p className="text-sm text-slate-400 mt-2 max-w-md mx-auto">
                    Follow these 3 simple steps to get your quick micro-tasks completed instantly.
                </p>
            </div>

       
            <div className="relative w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 items-start">
                
             
                <div className="absolute top-7 left-[12%] right-[12%] hidden md:block z-0 pointer-events-none opacity-20">
                    <svg width="100%" height="40" viewBox="0 0 600 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              
                        <path d="M 0 10 Q 75 40, 150 10 T 300 10 T 450 10 T 600 10" stroke="#8b5cf6" strokeWidth="2.5" strokeDasharray="6 6" strokeLinecap="round"/>
                    </svg>
                </div>

          
                {steps.map((step, index) => (
                    <div 
                        key={step.id} 
                        className="relative z-10 flex flex-col items-center text-center px-4 group animate-in fade-in slide-in-from-bottom duration-500"
                        style={{ animationDelay: `${index * 200}ms` }}
                    >
                     
                        <div className={`w-14 h-14 rounded-full ${step.color} flex items-center justify-center text-lg font-black text-white shadow-lg group-hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer`}>
                            {step.id}
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-neutral-100 mt-6 mb-3 tracking-tight group-hover:text-brand-accent transition-colors duration-300">
                            {step.title}
                        </h3>
                        <p className="text-xs md:text-sm text-slate-400 leading-relaxed max-w-xs group-hover:text-zinc-300 transition-colors">
                            {step.desc}
                        </p>
                    </div>
                ))}

            </div>
        </section>
    );
};

export default HowItWork;