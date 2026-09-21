import { getClientPayments } from '@/lib/api/client';
import { getUserSession } from '@/lib/core/session';
import { Card } from '@heroui/react';
import Link from 'next/link';
import React from 'react';
import { BiCreditCard } from 'react-icons/bi';
import { FaDollarSign } from 'react-icons/fa';
import { FiClock, FiFileText } from 'react-icons/fi';
import { IoCheckmarkCircle, IoReceiptOutline } from 'react-icons/io5';
import { RiShieldCheckLine } from 'react-icons/ri';

const ClientPaymentPage = async () => {
    const user = await getUserSession();
    const email = user?.email;

    if (!email) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center text-zinc-400">
                Unauthorized access. Please log in.
            </div>
        );
    }

    const response = await getClientPayments(email);
    const payments = Array.isArray(response?.data) ? response.data : Array.isArray(response) ? response : [];

    const totalSpent = payments.reduce((sum, p) => sum + (Number(p?.amount) || 0), 0);
    const totalTransactions = payments.length;

    return (
        <section className="w-full max-w-7xl mx-auto px-4 py-8 text-white font-manrope pr-10">
            {/* Header */}
            <div className="mb-8 border-b border-zinc-800/60 pb-6">
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400">
                    Payment History & Invoices
                </h1>
                <p className="text-xs md:text-sm text-zinc-400 mt-2 max-w-3xl leading-relaxed">
                    View and manage all your secure payments, escrow funding, and transaction receipts for hired freelancers.
                </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
                <Card className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-5 flex flex-row items-center justify-between backdrop-blur-xl hover:border-zinc-700/60 transition-all">
                    <div className="space-y-1">
                        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Total Spent (USD)</p>
                        <p className="text-2xl font-black text-emerald-400">${totalSpent.toLocaleString()}</p>
                    </div>
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl">
                        <FaDollarSign className="w-5 h-5" />
                    </div>
                </Card>

                <Card className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-5 flex flex-row items-center justify-between backdrop-blur-xl hover:border-zinc-700/60 transition-all">
                    <div className="space-y-1">
                        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Paid Transactions</p>
                        <p className="text-2xl font-black text-white">{totalTransactions}</p>
                    </div>
                    <div className="p-3 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl">
                        <IoReceiptOutline className="w-5 h-5" />
                    </div>
                </Card>

                <Card className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-5 flex flex-row items-center justify-between backdrop-blur-xl hover:border-zinc-700/60 transition-all">
                    <div className="space-y-1">
                        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Escrow Security</p>
                        <p className="text-sm font-bold text-violet-400 flex items-center gap-1.5 mt-1">
                            <RiShieldCheckLine className="w-4 h-4 text-violet-400" />
                            Stripe Escrow Protected
                        </p>
                    </div>
                    <div className="p-3 bg-violet-500/10 border border-violet-500/20 text-violet-400 rounded-xl">
                        <BiCreditCard className="w-5 h-5" />
                    </div>
                </Card>
            </div>

            {/* Transactions Table */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                        <FiFileText className="text-brand-accent" />
                        Recent Transactions
                    </h2>
                    <span className="text-xs text-zinc-500">
                        {payments.length} {payments.length === 1 ? 'transaction' : 'transactions'} found
                    </span>
                </div>

                <div className="w-full bg-zinc-900/20 border border-zinc-800/80 rounded-2xl overflow-hidden backdrop-blur-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-zinc-900/50 border-b border-zinc-800 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                                <tr>
                                    <th className="py-4 px-5">Task & Freelancer</th>
                                    <th className="py-4 px-5">Transaction ID</th>
                                    <th className="py-4 px-5">Date</th>
                                    <th className="py-4 px-5">Method</th>
                                    <th className="py-4 px-5">Amount</th>
                                    <th className="py-4 px-5 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-900/60 text-zinc-300">
                                {payments.length > 0 ? (
                                    payments.map((p, index) => (
                                        <tr key={p._id || p.transactionId || index} className="hover:bg-zinc-900/30 transition-colors">
                                            <td className="py-4 px-5">
                                                <div className="font-bold text-white text-sm line-clamp-1">
                                                    {p.taskTitle || "Hired Task Project"}
                                                </div>
                                                <div className="text-xs text-zinc-400 mt-0.5">
                                                    Freelancer: <span className="text-zinc-200 font-medium">{p.freelancerName || "Talented Freelancer"}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-5 font-mono text-xs text-zinc-400">
                                                {p.transactionId ? (
                                                    <span className="bg-zinc-950 px-2.5 py-1 rounded-md border border-zinc-800">
                                                        {p.transactionId.length > 20 ? `${p.transactionId.slice(0, 18)}...` : p.transactionId}
                                                    </span>
                                                ) : "N/A"}
                                            </td>
                                            <td className="py-4 px-5 text-xs text-zinc-400">
                                                <div className="flex items-center gap-1.5">
                                                    <FiClock className="w-3.5 h-3.5 text-zinc-500" />
                                                    {p.paymentDate || p.createdAt ? new Date(p.paymentDate || p.createdAt).toLocaleDateString('en-GB', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    }) : "N/A"}
                                                </div>
                                            </td>
                                            <td className="py-4 px-5 text-xs font-medium uppercase text-zinc-300">
                                                {p.paymentMethod || "Card"}
                                            </td>
                                            <td className="py-4 px-5 font-bold text-emerald-400 text-sm">
                                                ${Number(p.amount || 0).toFixed(2)}
                                            </td>
                                            <td className="py-4 px-5 text-center">
                                                <span className="inline-flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold px-3 py-1 rounded-full">
                                                    <IoCheckmarkCircle className="w-3.5 h-3.5" />
                                                    {p.paymentStatus || "Paid"}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="py-12 text-center text-zinc-500">
                                            <div className="max-w-sm mx-auto space-y-3">
                                                <IoReceiptOutline className="w-10 h-10 mx-auto text-zinc-600" />
                                                <p className="font-semibold text-zinc-400">No payment records found</p>
                                                <p className="text-xs text-zinc-500">
                                                    When you accept a freelancer proposal and pay via Stripe, your transaction receipts and invoices will appear here.
                                                </p>
                                                <Link href="/dashboard/client/proposal" className="inline-block mt-2 text-xs font-bold text-violet-400 hover:underline">
                                                    Review Incoming Proposals →
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

export default ClientPaymentPage;