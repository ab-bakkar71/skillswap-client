"use client";
import React, { useMemo, useState } from 'react';
import TaskCard from '@/components/TaskCard';
import { BiSortAlt2 } from 'react-icons/bi';
import { FiFilter, FiRefreshCw, FiSearch, FiX } from 'react-icons/fi';
import { IoBriefcaseOutline } from 'react-icons/io5';

const CATEGORIES = [
    { id: "all", label: "All Categories" },
    { id: "web-fixing", label: "Web & Bug Fixing" },
    { id: "graphics-design", label: "Graphics & Logo" },
    { id: "content-writing", label: "Content & Writing" },
    { id: "ui-ux", label: "UI/UX Design" },
    { id: "data-entry", label: "Data Entry" },
];

const BrowseTasksClient = ({ initialTasks = [] }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortBy, setSortBy] = useState("newest"); // "newest", "budget-desc", "budget-asc"

    const tasks = useMemo(() => (Array.isArray(initialTasks) ? initialTasks : []), [initialTasks]);

    const filteredTasks = useMemo(() => {
        return tasks
            .filter((task) => {
                const titleMatch = task?.title?.toLowerCase().includes(searchTerm.toLowerCase());
                const descMatch = task?.description?.toLowerCase().includes(searchTerm.toLowerCase());
                const categoryMatch = task?.category?.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesSearch = searchTerm.trim() === "" || titleMatch || descMatch || categoryMatch;

                const matchesCategory =
                    selectedCategory === "all" ||
                    task?.category?.toLowerCase() === selectedCategory.toLowerCase();

                return matchesSearch && matchesCategory;
            })
            .sort((a, b) => {
                if (sortBy === "budget-desc") {
                    return (Number(b.budget) || 0) - (Number(a.budget) || 0);
                }
                if (sortBy === "budget-asc") {
                    return (Number(a.budget) || 0) - (Number(b.budget) || 0);
                }
                // default newest
                const dateA = new Date(a.createdAt || a.createAt || 0).getTime();
                const dateB = new Date(b.createdAt || b.createAt || 0).getTime();
                return dateB - dateA;
            });
    }, [tasks, searchTerm, selectedCategory, sortBy]);

    const handleReset = () => {
        setSearchTerm("");
        setSelectedCategory("all");
        setSortBy("newest");
    };

    const hasActiveFilters = searchTerm !== "" || selectedCategory !== "all" || sortBy !== "newest";

    return (
        <section className="w-full max-w-7xl mx-auto px-4 py-8 text-white font-manrope">
            {/* Header */}
            <div className="mb-8 border-b border-zinc-800/60 pb-6">
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400">
                    Discover Available Tasks
                </h1>
                <p className="text-xs md:text-sm text-zinc-400 mt-2 max-w-3xl leading-relaxed">
                    Explore micro-tasks posted by clients worldwide. Filter by category, search by keywords, and pitch your skills to start earning instantly.
                </p>
            </div>

            {/* Search & Sort Controls Bar */}
            <div className="space-y-4 mb-8">
                <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
                    {/* Search Input */}
                    <div className="relative flex-1">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search tasks by title, skill, or keyword..."
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
                                <option value="newest" className="bg-zinc-950 text-white">Newest First</option>
                                <option value="budget-desc" className="bg-zinc-950 text-white">Budget: High to Low</option>
                                <option value="budget-asc" className="bg-zinc-950 text-white">Budget: Low to High</option>
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

                {/* Category Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                    <span className="text-xs text-zinc-500 font-semibold flex items-center gap-1 pr-1 shrink-0">
                        <FiFilter className="w-3.5 h-3.5" /> Category:
                    </span>
                    {CATEGORIES.map((cat) => {
                        const isSelected = selectedCategory === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                                    isSelected
                                        ? "bg-brand-accent text-white shadow-md shadow-violet-500/20"
                                        : "bg-zinc-900/60 border border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
                                }`}
                            >
                                {cat.label}
                            </button>
                        );
                    })}
                </div>

                {/* Results Count Bar */}
                <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
                    <span>
                        Showing <strong className="text-white">{filteredTasks.length}</strong> of {tasks.length} open tasks
                    </span>
                    {hasActiveFilters && (
                        <span className="text-brand-accent font-semibold">
                            Filtered results active
                        </span>
                    )}
                </div>
            </div>

            {/* Tasks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => <TaskCard key={task._id} task={task} />)
                ) : (
                    <div className="col-span-full py-16 text-center rounded-3xl bg-zinc-900/20 border border-zinc-800/80 backdrop-blur-xl">
                        <div className="max-w-md mx-auto space-y-3 px-4">
                            <IoBriefcaseOutline className="w-12 h-12 text-zinc-600 mx-auto" />
                            <h3 className="text-base font-bold text-zinc-200">No matching tasks found</h3>
                            <p className="text-xs text-zinc-400 leading-relaxed">
                                {searchTerm
                                    ? `No open tasks matched your search "${searchTerm}". Try checking for typos or searching a broader term.`
                                    : "No open tasks in this category at the moment. Try selecting 'All Categories'."}
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

export default BrowseTasksClient;
