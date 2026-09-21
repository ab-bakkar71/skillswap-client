import { getFreelancerEarnings, getProposal } from '@/lib/api/freelancer';
import { getUserSession } from '@/lib/core/session';
import { Card } from '@heroui/react';
import Link from 'next/link';
import React from 'react';
import { BiCheckCircle, BiDollarCircle, BiTimeFive } from 'react-icons/bi';
import { FaDollarSign, FaStripe } from 'react-icons/fa';
import { FiFileText, FiTrendingUp } from 'react-icons/fi';
import { IoCheckmarkCircle, IoReceiptOutline, IoShieldCheckmarkOutline } from 'react-icons/io5';

const FreelancerEarnPage = async () => {
    const user = await getUserSession();
    const email = user?.email;

    if (!email) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center text-zinc-400 font-manrope">
                Unauthorized access. Please log in.
            </div>
        );
    }

    const [earningsRes, proposals] = await Promise.all([
        getFreelancerEarnings(email),
        getProposal(email),
    ]);

    const payments = Array.isArray(earningsRes?.data) ? earningsRes.data : Array.isArray(earningsRes) ? earningsRes : [];
    const proposalList = Array.isArray(proposals) ? proposals : [];

    const completedProposals = proposalList.filter(p => p.status === 'completed');
    const activeProposals = proposalList.filter(p => p.status === 'accepted');

    const totalEarned = completedProposals.reduce((sum, p) => sum + (Number(p?.proposedBudget) || 0), 0);
    const inEscrow = activeProposals.reduce((sum, p) => sum + (Number(p?.proposedBudget) || 0), 0);

    return (
        <section className="w-full max-w-7xl mx-auto px-4 py-8 text-white font-manrope pr-10">
            {/* Header */}
            <div className="mb-8 border-b border-zinc-800/60 pb-6">
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400">
                    Earnings & Payouts Overview
                </h1>
                <p className="text-xs md:text-sm text-zinc-400 mt-2 max-w-3xl leading-relaxed">
                    Track your total earned revenue, active milestone escrows, and payout history from completed client tasks.
                </p>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                <Card className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-5 flex flex-row items-center justify-between backdrop-blur-xl hover:border-zinc-700/60 transition-all">
                    <div className="space-y-1">
                        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Total Earned (USD)</p>
                        <p className="text-2xl font-black text-emerald-400">${totalEarned.toLocaleString()}</p>
                    </div>
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl">
                        <FaDollarSign className="w-5 h-5" />
                    </div>
                </Card>

                <Card className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-5 flex flex-row items-center justify-between backdrop-blur-xl hover:border-zinc-700/60 transition-all">
                    <div className="space-y-1">
                        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">In Escrow (Active)</p>
                        <p className="text-2xl font-black text-amber-400">${inEscrow.toLocaleString()}</p>
                    </div>
                    <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl">
                        <BiTimeFive className="w-5 h-5" />
                    </div>
                </Card>

                <Card className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-5 flex flex-row items-center justify-between backdrop-blur-xl hover:border-zinc-700/60 transition-all">
                    <div className="space-y-1">
                        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Completed Jobs</p>
                        <p className="text-2xl font-black text-indigo-400">{completedProposals.length}</p>
                    </div>
                    <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl">
                        <BiCheckCircle className="w-5 h-5" />
                    </div>
                </Card>

                <Card className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-5 flex flex-row items-center justify-between backdrop-blur-xl hover:border-zinc-700/60 transition-all">
                    <div className="space-y-1">
                        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Active Projects</p>
                        <p className="text-2xl font-black text-violet-400">{activeProposals.length}</p>
                    </div>
                    <div className="p-3 bg-violet-500/10 border border-violet-500/20 text-violet-400 rounded-xl">
                        <FiTrendingUp className="w-5 h-5" />
                    </div>
                </Card>
            </div>

            {/* Payout Information Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-violet-950/30 to-zinc-900/40 border border-violet-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-violet-500/20 rounded-xl text-violet-400">
                        <IoShieldCheckmarkOutline className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-white">Stripe Escrow & Direct Payouts</h3>
                        <p className="text-xs text-zinc-400 mt-0.5">
                            Client payments are held securely in Stripe Escrow upon proposal acceptance and disbursed upon deliverable completion.
                        </p>
                    </div>
                </div>
                <Link
                    href="/dashboard/freelancer/active-project"
                    className="px-4 py-2 text-xs font-bold bg-violet-600 hover:bg-violet-500 text-white rounded-xl transition-all shadow-lg shadow-violet-500/20 whitespace-nowrap"
                >
                    View Active Milestones →
                </Link>
            </div>

            {/* Earnings History Table */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                        <FiFileText className="text-brand-accent" />
                        Earnings History
                    </h2>
                    <span className="text-xs text-zinc-500">
                        {proposalList.length} total applications
                    </span>
                </div>

                <div className="w-full bg-zinc-900/20 border border-zinc-800/80 rounded-2xl overflow-hidden backdrop-blur-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-zinc-900/50 border-b border-zinc-800 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                                <tr>
                                    <th className="py-4 px-5">Project Title</th>
                                    <th className="py-4 px-5">Client</th>
                                    <th className="py-4 px-5">Est. Days</th>
                                    <th className="py-4 px-5">Bid Amount</th>
                                    <th className="py-4 px-5 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-900/60 text-zinc-300">
                                {proposalList.length > 0 ? (
                                    proposalList.map((p, index) => (
                                        <tr key={p._id || index} className="hover:bg-zinc-900/30 transition-colors">
                                            <td className="py-4 px-5 font-bold text-white text-sm">
                                                {p.taskTitle || "Micro Task Project"}
                                            </td>
                                            <td className="py-4 px-5 text-xs text-zinc-400">
                                                {p.clientEmail || "Client"}
                                            </td>
                                            <td className="py-4 px-5 text-xs text-zinc-400">
                                                {p.estimatedDays ? `${p.estimatedDays} days` : "N/A"}
                                            </td>
                                            <td className="py-4 px-5 font-bold text-emerald-400 text-sm">
                                                ${Number(p.proposedBudget || 0).toFixed(2)}
                                            </td>
                                            <td className="py-4 px-5 text-center">
                                                <span
                                                    className={`inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-full border ${
                                                        p.status === 'completed'
                                                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                                            : p.status === 'accepted'
                                                            ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                                                            : p.status === 'rejected'
                                                            ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                                                            : 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                                                    }`}
                                                >
                                                    {p.status === 'completed' && <IoCheckmarkCircle className="w-3.5 h-3.5" />}
                                                    <span className="capitalize">{p.status || "Pending"}</span>
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="py-12 text-center text-zinc-500">
                                            <div className="max-w-sm mx-auto space-y-3">
                                                <IoReceiptOutline className="w-10 h-10 mx-auto text-zinc-600" />
                                                <p className="font-semibold text-zinc-400">No earnings or proposals yet</p>
                                                <p className="text-xs text-zinc-500">
                                                    Browse available micro-tasks and submit pitches to start earning and tracking your payouts here.
                                                </p>
                                                <Link href="/tasks" className="inline-block mt-2 text-xs font-bold text-violet-400 hover:underline">
                                                    Browse Open Tasks →
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FreelancerEarnPage;
