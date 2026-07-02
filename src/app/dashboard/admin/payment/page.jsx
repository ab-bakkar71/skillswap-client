import { getPaymentData } from '@/lib/api/admin';
import { Table } from '@heroui/react';
import React from 'react';

const adminPaymentPage = async () => {
    const data = await getPaymentData();
    const paymentData = data?.data || [];
    console.log(paymentData);

    if (!paymentData?.length) {
        return (
            <div className="rounded-2xl border border-dashed border-zinc-800 py-16 text-center text-zinc-500">
                No payment history found.
            </div>
        );
    }

    return (
        <div>
            <div className="mb-6">
  <h1 className="text-3xl font-black text-white">
    Payment History
  </h1>
  <p className="text-zinc-400 mt-2">
    View all completed transactions across the platform.
  </p>
</div>
            <Table className="bg-zinc-950/40 border border-zinc-900 rounded-2xl p-4">
                <Table.ScrollContainer>
                    <Table.Content
                        aria-label="Payment History"
                        className="min-w-[1100px]"
                    >
                        <Table.Header>
                            <Table.Column isRowHeader>Transaction ID</Table.Column>
                            <Table.Column>Task</Table.Column>
                            <Table.Column>Client</Table.Column>
                            <Table.Column>Freelancer</Table.Column>
                            <Table.Column>Amount</Table.Column>
                            <Table.Column>Status</Table.Column>
                            <Table.Column>Date</Table.Column>
                        </Table.Header>

                        <Table.Body>
                            {paymentData?.map((payment) => (
                                <Table.Row
                                    key={payment._id}
                                    className="border-b border-zinc-900/60 hover:bg-zinc-900/20 transition-colors"
                                >
                                    {/* Transaction */}
                                    <Table.Cell className="font-mono text-xs text-blue-400">
                                        {payment.transactionId}
                                    </Table.Cell>

                                    {/* Task */}
                                    <Table.Cell className="font-semibold text-white max-w-[220px] truncate">
                                        {payment.taskTitle}
                                    </Table.Cell>

                                    {/* Client */}
                                    <Table.Cell className="text-zinc-300">
                                        {payment.clientEmail}
                                    </Table.Cell>

                                    {/* Freelancer */}
                                    <Table.Cell className="text-zinc-300">
                                        {payment.freelancerName}
                                    </Table.Cell>

                                    {/* Amount */}
                                    <Table.Cell>
                                        <span className="font-bold text-emerald-400">
                                            ${payment.amount}
                                        </span>
                                    </Table.Cell>

                                    {/* Status */}
                                    <Table.Cell>
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-bold border ${payment.paymentStatus === "paid"
                                                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                                                    : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                                                }`}
                                        >
                                            {payment.paymentStatus}
                                        </span>
                                    </Table.Cell>

                                    {/* Date */}
                                    <Table.Cell className="text-zinc-500 text-sm">
                                        {payment.paymentDate
                                            ? new Date(payment.paymentDate).toLocaleDateString(
                                                "en-GB",
                                                {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                }
                                            )
                                            : "N/A"}
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>
        </div>
    );
};

export default adminPaymentPage;