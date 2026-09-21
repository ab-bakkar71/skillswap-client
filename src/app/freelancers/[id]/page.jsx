import { getFreelancerById } from '@/lib/api/freelancer';
import { getFreelancerReviews } from '@/lib/api/review';
import FreelancerReviews from '@/components/FreelancerReviews';
import { Avatar } from '@heroui/react';
import Link from 'next/link';
import React from 'react';
import { FaStar } from 'react-icons/fa';

export async function generateMetadata({ params }) {
    const { id } = await params;
    const freelancer = await getFreelancerById(id);
    if (!freelancer || freelancer.error) {
        return {
            title: "Freelancer Profile - SkillSwap",
        };
    }
    return {
        title: `${freelancer.name || "Freelancer"} - SkillSwap Talent Profile`,
        description: freelancer.bio ? freelancer.bio.slice(0, 160) : `Hire ${freelancer.name} on SkillSwap for top-quality freelancing work.`,
    };
}

const FreelancerDetailPage = async ({ params }) => {
    const { id } = await params;
    const freelancer = await getFreelancerById(id);

    if (!freelancer || freelancer.error) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 font-manrope text-white">
                <h2 className="text-2xl font-bold mb-2">Freelancer Not Found</h2>
                <p className="text-zinc-400 text-sm max-w-md">
                    The freelancer profile you are looking for does not exist or has been removed.
                </p>
            </div>
        );
    }

    const reviewData = freelancer?.email ? await getFreelancerReviews(freelancer.email) : null;
    const displayRating = reviewData?.stats?.averageRating
        ? reviewData.stats.averageRating.toFixed(1)
        : freelancer?.averageRating
        ? Number(freelancer.averageRating).toFixed(1)
        : null;
    const reviewCount = reviewData?.stats?.totalReviews ?? freelancer?.reviewCount ?? 0;

    const skillsList = Array.isArray(freelancer?.skills)
        ? freelancer.skills
        : typeof freelancer?.skills === "string" && freelancer.skills.trim()
        ? freelancer.skills.split(",").map((s) => s.trim()).filter(Boolean)
        : [];

    return (
        <div>
            <div className="w-full max-w-7xl mx-auto px-4 py-8 text-white font-manrope">

                <div className="mb-8 border-b border-brand-border/20 pb-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight">Freelancer Profile</h1>
                        <p className="text-sm text-zinc-400 mt-1">View expert talent profile and skills details.</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    <div className="lg:col-span-1 bg-zinc-900/40 border border-brand-border/60 rounded-3xl p-6 text-center backdrop-blur-xl shadow-2xl flex flex-col items-center justify-center min-h-[450px]">

                        <h2 className="text-2xl font-bold tracking-tight mb-1">{freelancer?.name || "Freelancer"}</h2>
                        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 capitalize">
                                {freelancer?.role || "freelancer"}
                            </span>
                            <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 flex items-center gap-1">
                                <FaStar className="text-amber-400 text-xs" />
                                <span>{displayRating ? `${displayRating} (${reviewCount})` : "New Talent"}</span>
                            </span>
                        </div>
                        <div className="relative group p-1.5 rounded-full bg-gradient-to-tr from-brand-accent to-fuchsia-500 shadow-2xl shadow-violet-500/10">
                            <div className="rounded-full bg-zinc-950 p-1">
                                <Avatar className="w-48 h-48 md:w-56 md:h-56 text-large cursor-pointer object-cover rounded-full">
                                    <Avatar.Image alt={freelancer?.name || "Freelancer"} src={freelancer?.image} />
                                    <Avatar.Fallback>{freelancer?.name ? freelancer.name[0].toUpperCase() : "U"}</Avatar.Fallback>
                                </Avatar>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-2 bg-zinc-900/40 border border-brand-border/60 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl min-h-[400px] flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-6 border-b border-brand-border/30 pb-4">
                            <h3 className="text-lg font-bold tracking-wide text-zinc-200">About & Professional Details</h3>
                            <span className="flex h-3 w-3 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                            <div className="space-y-1">
                                <span className="text-xs text-zinc-500 font-medium tracking-wide block">Role</span>
                                <p className="text-sm font-semibold text-zinc-200 capitalize">{freelancer?.role || "Freelancer"}</p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs text-zinc-500 font-medium tracking-wide block">Hourly Rate (USD)</span>
                                <p className="text-sm font-semibold text-zinc-200">
                                    {freelancer?.hourlyRate ? `$${freelancer.hourlyRate}/hr` : "Not set"}
                                </p>
                            </div>
                            <div className="space-y-1 sm:col-span-2 border-t border-brand-border/20 pt-4">
                                <span className="text-xs text-zinc-500 font-medium tracking-wide block">Contact Email</span>
                                <p className="text-sm font-semibold text-zinc-200">{freelancer?.email || "N/A"}</p>
                            </div>
                            <div className="space-y-1 sm:col-span-2 border-t border-brand-border/20 pt-4">
                                <span className="text-xs text-zinc-500 font-medium tracking-wide block">Bio</span>
                                <p className="text-sm text-zinc-400 leading-relaxed">{freelancer?.bio || "No bio added yet."}</p>
                            </div>
                        </div>
                        <div className="mt-8 border-t border-brand-border/20 pt-5 space-y-2">
                            <span className="text-xs text-zinc-500 font-medium tracking-wide block">Skills & Badges</span>
                            <div className="flex flex-wrap gap-2 pt-1">
                                {skillsList.length > 0 ? (
                                    skillsList.map((skill, index) => (
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

                {/* Verified Reviews & Ratings Showcase */}
                <FreelancerReviews
                    reviews={reviewData?.reviews || []}
                    stats={reviewData?.stats || null}
                />

                {/* Hire / Work Together CTA Banner */}
                <div className="mt-8 p-6 md:p-8 rounded-3xl bg-gradient-to-r from-zinc-900/90 via-zinc-900/60 to-zinc-950 border border-brand-border/60 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xl shadow-2xl">
                    <div className="space-y-1 text-center md:text-left">
                        <h3 className="text-xl font-bold text-white">Interested in working with {freelancer?.name || "this talent"}?</h3>
                        <p className="text-sm text-zinc-400">Post a project with your budget and milestones, or reach out to discuss collaboration.</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        {freelancer?.email && (
                            <a
                                href={`mailto:${freelancer.email}`}
                                className="px-5 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900/80 text-zinc-200 text-sm font-semibold hover:border-zinc-500 hover:text-white transition-colors"
                            >
                                Contact via Email
                            </a>
                        )}
                        <Link
                            href="/dashboard/client/post-task"
                            className="px-6 py-2.5 rounded-xl bg-brand-accent text-zinc-950 font-bold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-brand-accent/10"
                        >
                            Post a Task & Hire
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FreelancerDetailPage;