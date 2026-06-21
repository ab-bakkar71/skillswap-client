import { Avatar } from '@heroui/react';
import React from 'react';

const ProfilePage = ({ user }) => {


    const currentUser = user || null;
    return (
        <div>
            <div className="w-full max-w-7xl mx-auto px-4 py-8 text-white">
                <div className="mb-8 border-b border-brand-border/20 pb-4">
                    <h1 className="text-3xl font-extrabold tracking-tight">Profile</h1>
                    <p className="text-sm text-zinc-400 mt-1">View all your profile details here.</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    <div className="lg:col-span-1 bg-zinc-900/40 border border-brand-border/60 rounded-3xl p-6 text-center backdrop-blur-xl shadow-2xl flex flex-col items-center justify-center min-h-[450px]">

                        <h2 className="text-2xl font-bold tracking-tight mb-1">{currentUser?.name}</h2>
                        <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 capitalize mb-6">
                            {currentUser?.role}
                        </span>
                        <div className="relative group p-1.5 rounded-full bg-gradient-to-tr from-brand-accent to-fuchsia-500 shadow-2xl shadow-violet-500/10">
                            <div className="rounded-full bg-zinc-950 p-1">
                                <Avatar className="w-48 h-48 md:w-56 md:h-56 text-large cursor-pointer object-cover rounded-full">
                                    <Avatar.Image alt={user?.name} src={user?.image} />
                                    <Avatar.Fallback>{user?.name ? user.name[0].toUpperCase() : "U"}</Avatar.Fallback>
                                </Avatar>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-2 bg-zinc-900/40 border border-brand-border/60 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl min-h-[400px] flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-6 border-b border-brand-border/30 pb-4">
                            <h3 className="text-lg font-bold tracking-wide text-zinc-200">Bio & other details</h3>
                            <span className="flex h-3 w-3 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                            </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                            <div className="space-y-1">
                                <span className="text-xs text-zinc-500 font-medium tracking-wide block">My Role</span>
                                <p className="text-sm font-semibold text-zinc-200 capitalize">{currentUser?.role}</p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs text-zinc-500 font-medium tracking-wide block">Hourly Rate (USD)</span>
                                <p className="text-sm font-semibold text-zinc-200">
                                    {currentUser?.hourlyRate ? `$${currentUser.hourlyRate}/hr` : "N/A"}
                                </p>
                            </div>
                            <div className="space-y-1 sm:col-span-2 border-t border-brand-border/20 pt-4">
                                <span className="text-xs text-zinc-500 font-medium tracking-wide block">Contact Email</span>
                                <p className="text-sm font-semibold text-zinc-200">{currentUser?.email}</p>
                            </div>
                            <div className="space-y-1 sm:col-span-2 border-t border-brand-border/20 pt-4">
                                <span className="text-xs text-zinc-500 font-medium tracking-wide block">Bio</span>
                                <p className="text-sm text-zinc-400 leading-relaxed">{currentUser?.bio || "No bio added yet."}</p>
                            </div>
                        </div>
                        <div className="mt-8 border-t border-brand-border/20 pt-5 space-y-2">
                            <span className="text-xs text-zinc-500 font-medium tracking-wide block">Skills & Badges</span>
                            <div className="flex flex-wrap gap-2 pt-1">
                                {currentUser?.skills && currentUser?.skills.length > 0 ? (
                                    currentUser?.skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="px-3.5 py-1.5 text-xs font-semibold rounded-full bg-brand-accent/10 border border-brand-accent/30 text-brand-accent shadow-sm shadow-violet-500/5 transition-all duration-300 hover:bg-brand-accent/20 hover:scale-105 cursor-pointer"
                                        >
                                            #{skill}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-xs text-zinc-600 italic">No skills specified.</span>
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