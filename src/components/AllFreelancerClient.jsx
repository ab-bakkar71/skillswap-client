"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { IoMdStar } from 'react-icons/io';
import { IoStar } from 'react-icons/io5'; // ৫-স্টার রেটিং আইকনের জন্য

const AllFreelancerClient = ({ freelancer }) => {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const divRef = React.useRef(null);

    const handleMouseMove = (e) => {
        const bounds = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
    };

    return (
        <div ref={divRef} onMouseMove={handleMouseMove} onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}
            className="relative h-[420px] rounded-2xl p-0.5 bg-transparent border border-zinc-800/60 overflow-hidden shadow-2xl shadow-violet-950/5 cursor-pointer transition-all duration-300 hover:border-brand-accent/40"
        >

            {visible && (
                <div className="pointer-events-none blur-3xl bg-gradient-to-r from-brand-accent via-violet-600 to-fuchsia-500 opacity-30 size-56 absolute z-0 transition-opacity duration-300"
                    style={{ top: position.y - 112, left: position.x - 112 }}
                />
            )}

            <div className="relative z-10 bg-transparent backdrop-blur-xl p-5 h-full w-full rounded-[14px] flex flex-col items-center justify-between text-center">

                <div className="flex flex-col items-center w-full">
                    <div className="relative w-32 h-32 flex items-center justify-center mb-4 mt-2">
                        <Image
                            src={freelancer?.image || "https://img.freepik.com/free-vector/broadcasting-live-event-illustration_23-2148511569.jpg?semt=ais_incoming&w=740&q=80"}
                            width={200}
                            height={200}
                            alt="Profile Avatar"
                            className="w-full h-full rounded-full border border-zinc-800 object-cover shadow-lg"/>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-zinc-900 border border-zinc-800 text-emerald-400 text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-md z-20">
                            <IoMdStar className="text-amber-500 text-sm" />
                            <span>5.0</span>
                        </div>
                    </div>

                    <h2 className="text-xl font-extrabold text-white tracking-tight line-clamp-1">
                        {freelancer?.name || "Richard Nelson"}
                    </h2>
                    <p className="text-xs text-brand-accent font-bold tracking-wide uppercase mt-1 mb-2">
                        Hourly Rate: ${freelancer?.hourlyRate || 0}/hr
                    </p>
                </div>

           
                <p className="text-xs text-zinc-400 px-2 leading-relaxed line-clamp-2 mb-4">
                    {freelancer?.bio || "Passionate about clean code, scalable systems, and solving real-world problems with elegant software."}
                </p>

                
                <div className="w-full">
                    <Link href={`/freelancers/${freelancer._id}`}>
                    <button className="w-full bg-zinc-900 border border-zinc-800 hover:border-brand-accent text-zinc-100 hover:text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all duration-300 shadow-lg shadow-black/40 hover:shadow-violet-500/10 active:scale-[0.98] cursor-pointer">
                        View Profile
                    </button>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default AllFreelancerClient;