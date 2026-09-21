"use client";
import React, { useMemo, useState } from 'react';
import AllFreelancerClient from '@/components/AllFreelancerClient';
import { BiSortAlt2 } from 'react-icons/bi';
import { FiFilter, FiRefreshCw, FiSearch, FiUser, FiX } from 'react-icons/fi';

const TOP_SKILLS = [
    "All",
    "React",
    "Next.js",
    "UI/UX",
    "Tailwind",
    "Node.js",
    "Figma",
    "Design",
    "Python",
];

const BrowseFreelancersClient = ({ initialFreelancers = [] }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSkill, setSelectedSkill] = useState("All");
    const [sortBy, setSortBy] = useState("default"); // "default", "rate-desc", "rate-asc"

    const freelancers = useMemo(() => (Array.isArray(initialFreelancers) ? initialFreelancers : []), [initialFreelancers]);

    const filteredFreelancers = useMemo(() => {
        return freelancers
            .filter((f) => {
                const search = searchTerm.toLowerCase().trim();

                const skillsStr = Array.isArray(f?.skills)
                    ? f.skills.join(" ")
                    : typeof f?.skills === "string"
                    ? f.skills
                    : "";

                const nameMatch = f?.name?.toLowerCase().includes(search);
                const bioMatch = f?.bio?.toLowerCase().includes(search);
                const skillsMatch = skillsStr.toLowerCase().includes(search);
                const matchesSearch = search === "" || nameMatch || bioMatch || skillsMatch;

                const matchesSkill =
                    selectedSkill === "All" ||
                    skillsStr.toLowerCase().includes(selectedSkill.toLowerCase());

                return matchesSearch && matchesSkill;
            })
            .sort((a, b) => {
                if (sortBy === "rate-desc") {
                    return (Number(b.hourlyRate) || 0) - (Number(a.hourlyRate) || 0);
                }
                if (sortBy === "rate-asc") {
                    return (Number(a.hourlyRate) || 0) - (Number(b.hourlyRate) || 0);
                }
                // default sort
                return 0;
            });
    }, [freelancers, searchTerm, selectedSkill, sortBy]);

    const handleReset = () => {
        setSearchTerm("");
        setSelectedSkill("All");
        setSortBy("default");
    };

    const hasActiveFilters = searchTerm !== "" || selectedSkill !== "All" || sortBy !== "default";

    return (
        <section className="w-full max-w-7xl min-h-screen mx-auto px-4 py-8 text-white font-manrope">
            {/* Header */}
            <div className="mb-8 border-b border-zinc-900 pb-6">
                <h1 className="text-3xl md:text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400">
                    Explore Top Tech Talent
                </h1>
                <p className="text-xs md:text-sm text-zinc-500 mt-2 max-w-3xl leading-relaxed">
                    Connect with expert developers, UI/UX designers, and freelance engineers from the SkillSwap community. Filter by skills, hourly rates, and hire the perfect match for your project.
                </p>
            </div>

            {/* Controls Bar */}
            <div className="space-y-4 mb-8">
                <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
                    {/* Search Input */}
                    <div className="relative flex-1">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search freelancers by name, skill, or bio..."
                            className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-brand-accent rounded-xl pl-11 pr-10 py-3 text-sm text-white placeholder-zinc-500 outline-none transition-all shadow-inner"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm("")}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
                            >
                                <FiX className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {/* Sort Dropdown */}
                    <div className="flex items-center gap-2">
                        <div className="relative min-w-[190px]">
                            <BiSortAlt2 className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4 pointer-events-none" />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-brand-accent rounded-xl pl-9 pr-8 py-3 text-xs md:text-sm text-zinc-200 outline-none cursor-pointer appearance-none transition-all"
                            >
                                <option value="default" className="bg-zinc-950 text-white">Recommended</option>
                                <option value="rate-asc" className="bg-zinc-950 text-white">Hourly Rate: Low to High</option>
                                <option value="rate-desc" className="bg-zinc-950 text-white">Hourly Rate: High to Low</option>
                            </select>
                        </div>

                        {hasActiveFilters && (
                            <button
                                onClick={handleReset}
                                title="Reset Filters"
                                className="px-3 py-3 rounded-xl border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
                            >
                                <FiRefreshCw className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Reset</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Popular Skills Filter */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                    <span className="text-xs text-zinc-500 font-semibold flex items-center gap-1 pr-1 shrink-0">
                        <FiFilter className="w-3.5 h-3.5" /> Skill:
                    </span>
                    {TOP_SKILLS.map((skill) => {
                        const isSelected = selectedSkill === skill;
                        return (
                            <button
                                key={skill}
                                onClick={() => setSelectedSkill(skill)}
                                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                                    isSelected
                                        ? "bg-brand-accent text-white shadow-md shadow-violet-500/20"
                                        : "bg-zinc-900/60 border border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
                                }`}
                            >
                                {skill}
                            </button>
                        );
                    })}
                </div>

                {/* Results Count Bar */}
                <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
                    <span>
                        Showing <strong className="text-white">{filteredFreelancers.length}</strong> of {freelancers.length} freelancers
                    </span>
                    {hasActiveFilters && (
                        <span className="text-brand-accent font-semibold">
                            Filtered results active
                        </span>
                    )}
                </div>
            </div>

            {/* Freelancers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {filteredFreelancers.length > 0 ? (
                    filteredFreelancers.map((freelancer) => (
                        <AllFreelancerClient key={freelancer._id} freelancer={freelancer} />
                    ))
                ) : (
                    <div className="col-span-full py-16 text-center rounded-3xl bg-zinc-900/20 border border-zinc-800/80 backdrop-blur-xl">
                        <div className="max-w-md mx-auto space-y-3 px-4">
                            <FiUser className="w-12 h-12 text-zinc-600 mx-auto" />
                            <h3 className="text-base font-bold text-zinc-200">No freelancers found</h3>
                            <p className="text-xs text-zinc-400 leading-relaxed">
                                {searchTerm
                                    ? `No talent matched "${searchTerm}". Try checking your spelling or searching for a different skill.`
                                    : "No freelancers matched the selected skill filter. Try selecting 'All'."}
                            </p>
                            {hasActiveFilters && (
                                <button
                                    onClick={handleReset}
                                    className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 bg-brand-accent text-white text-xs font-semibold rounded-xl hover:bg-violet-600 transition-all cursor-pointer"
                                >
                                    <FiRefreshCw className="w-3.5 h-3.5" />
                                    Clear all filters
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default BrowseFreelancersClient;
