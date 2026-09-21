"use client";
import { Avatar } from '@heroui/react';
import React from 'react';
import EditProfileModal from './freelancer/EditProfileModal';

const ProfilePage = ({ user }) => {
    const currentUser = user || null;
    const isFreelancer = currentUser?.role === "freelancer";

    return (
        <div>
            <div className="w-full max-w-7xl mx-auto px-4 py-8 text-white">

                <div className="mb-8 border-b border-brand-border/20 pb-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight">Profile</h1>
                        <p className="text-sm text-zinc-400 mt-1">Manage your account information and preferences.</p>
                    </div>
                    <div>
                        {currentUser && (
                            <EditProfileModal currentUser={currentUser}/>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    <div className="lg:col-span-1 bg-zinc-900/40 border border-brand-border/60 rounded-3xl p-6 text-center backdrop-blur-xl shadow-2xl flex flex-col items-center justify-center min-h-[420px]">

                        <h2 className="text-2xl font-bold tracking-tight mb-1">{currentUser?.name || "User"}</h2>
                        <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 capitalize mb-6">
                            {currentUser?.role || "Member"}
                        </span>
                        <div className="relative group p-1.5 rounded-full bg-gradient-to-tr from-brand-accent to-fuchsia-500 shadow-2xl shadow-violet-500/10">
                            <div className="rounded-full bg-zinc-950 p-1">
                                <Avatar className="w-44 h-44 md:w-52 md:h-52 text-large cursor-pointer object-cover rounded-full">
                                    <Avatar.Image alt={currentUser?.name || "User"} src={currentUser?.image} />
                                    <Avatar.Fallback>{currentUser?.name ? currentUser.name[0].toUpperCase() : "U"}</Avatar.Fallback>
                                </Avatar>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-2 bg-zinc-900/40 border border-brand-border/60 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl min-h-[420px] flex flex-col justify-between">

                        <div className="flex items-center justify-between mb-6 border-b border-brand-border/30 pb-4">
                            <h3 className="text-lg font-bold tracking-wide text-zinc-200">About & Account Details</h3>
                            <div className="flex items-center gap-2">
                                <span className="flex h-2.5 w-2.5 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                                </span>
                                <span className="text-xs font-medium text-emerald-400">Active</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                            <div className="space-y-1">
                                <span className="text-xs text-zinc-500 font-medium tracking-wide block">Account Role</span>
                                <p className="text-sm font-semibold text-zinc-200 capitalize">{currentUser?.role || "User"}</p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs text-zinc-500 font-medium tracking-wide block">
                                    {isFreelancer ? "Hourly Rate (USD)" : "Account Status"}
                                </span>
                                <p className="text-sm font-semibold text-zinc-200">
                                    {isFreelancer 
                                        ? (currentUser?.hourlyRate ? `$${currentUser.hourlyRate}/hr` : "Not set")
                                        : "Verified Member"
                                    }
                                </p>
                            </div>
                            <div className="space-y-1 sm:col-span-2 border-t border-brand-border/20 pt-4">
                                <span className="text-xs text-zinc-500 font-medium tracking-wide block">Contact Email</span>
                                <p className="text-sm font-semibold text-zinc-200">{currentUser?.email || "N/A"}</p>
                            </div>
                            <div className="space-y-1 sm:col-span-2 border-t border-brand-border/20 pt-4">
                                <span className="text-xs text-zinc-500 font-medium tracking-wide block">Bio / Summary</span>
                                <p className="text-sm text-zinc-400 leading-relaxed">{currentUser?.bio || "No bio added yet."}</p>
                            </div>
                        </div>
                        <div className="mt-8 border-t border-brand-border/20 pt-5 space-y-2">
                            <span className="text-xs text-zinc-500 font-medium tracking-wide block">
                                {isFreelancer ? "Skills & Specialties" : "Account Features & Permissions"}
                            </span>
                            <div className="flex flex-wrap gap-2 pt-1">
                                {isFreelancer ? (
                                    (() => {
                                        const skillsList = Array.isArray(currentUser?.skills)
                                            ? currentUser.skills
                                            : typeof currentUser?.skills === "string" && currentUser.skills.trim()
                                            ? currentUser.skills.split(",").map(s => s.trim()).filter(Boolean)
                                            : [];

                                        return skillsList.length > 0 ? (
                                            skillsList.map((skill, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3.5 py-1.5 text-xs font-semibold rounded-full bg-brand-accent/10 border border-brand-accent/30 text-brand-accent shadow-sm shadow-violet-500/5 transition-all duration-300 hover:bg-brand-accent/20 hover:scale-105"
                                                >
                                                    #{skill}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-xs text-zinc-600 italic">No skills added yet. Click &quot;Edit Profile&quot; to add skills.</span>
                                        );
                                    })()
                                ) : (
                                    <>
                                        <span className="px-3.5 py-1.5 text-xs font-semibold rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                                            ✓ Task Management
                                        </span>
                                        <span className="px-3.5 py-1.5 text-xs font-semibold rounded-full bg-brand-accent/10 border border-brand-accent/30 text-brand-accent">
                                            ✓ Stripe Escrow Payments
                                        </span>
                                        <span className="px-3.5 py-1.5 text-xs font-semibold rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                                            ✓ Direct Hiring
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProfilePage;