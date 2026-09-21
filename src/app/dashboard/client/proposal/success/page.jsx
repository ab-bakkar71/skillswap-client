import { stripe } from '@/lib/stripe';
import { Button, Card } from '@heroui/react';
import Link from 'next/link';
import React from 'react';
import { IoCheckmarkSharp } from 'react-icons/io5';

const paymentSuccessPage = async ({ searchParams }) => {
  const { session_id } = await searchParams;

  if (!session_id) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 font-manrope text-white">
        <h2 className="text-xl font-bold mb-2">Invalid Session</h2>
        <p className="text-zinc-400 text-sm">No checkout session ID provided.</p>
        <Link href="/dashboard/client" className="mt-4 text-violet-400 hover:underline text-sm font-semibold">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  });

  if (session.payment_status !== "paid") {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 font-manrope text-white">
        <h2 className="text-xl font-bold text-rose-500 mb-2">Payment Incomplete</h2>
        <p className="text-zinc-400 text-sm">Your payment was not completed or has been cancelled.</p>
        <Link href="/dashboard/client" className="mt-4 text-violet-400 hover:underline text-sm font-semibold">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const paymentData = {
    proposalId: session.metadata?.proposalId,
    taskId: session.metadata?.taskId,
    taskTitle: session.metadata?.taskTitle,
    clientName: session.metadata?.clientName,
    clientEmail: session.customer_email,
    freelancerName: session.metadata?.freelancerName,
    amount: (session.amount_total || 0) / 100,
    transactionId: session.payment_intent?.id || session.id,
    paymentMethod: session.payment_method_types?.[0] || "card",
    currency: (session.currency || "USD").toUpperCase(),
    paymentStatus: session.payment_status,
  };

  try {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/confirm-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(paymentData)
    });
  } catch (err) {
    console.error("Failed to confirm session on server:", err);
  }

  const txData = {
    transactionId: session?.payment_intent?.id || session?.id || "N/A",
    date: new Date(session.created * 1000).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    type: session.payment_method_types?.[0] || "Credit Card",
    amount: `$${((session.amount_total || 0) / 100).toFixed(2)}`,
    status: session.payment_status || "paid"
  };
  return (
    <div className="min-h-[90vh] w-full flex items-center justify-center px-4 py-10 font-manrope selection:bg-emerald-500/30">
      <div className="w-full max-w-md text-center space-y-8 relative">


        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl -z-10" />


        <div className="flex flex-col items-center justify-center space-y-5">
          <div className="relative">

            <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-md scale-125 animate-pulse" />
            <div className="w-20 h-20 bg-emerald-500 text-zinc-950 rounded-full flex items-center justify-center text-3xl font-bold border-4 border-zinc-950 shadow-xl relative z-10">
              <IoCheckmarkSharp />
            </div>
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Payment Successful
            </h1>
            <p className="text-zinc-400 text-sm font-semibold">
              Successfully Paid <span className="text-emerald-400">{txData?.amount}</span>
            </p>
          </div>
        </div>


        <div className="text-left space-y-3">
          <h3 className="text-sm font-bold text-zinc-400 tracking-wide uppercase px-1">
            Payment methods
          </h3>

          <Card className="bg-zinc-900/30 border border-zinc-800/60 rounded-2xl p-5 backdrop-blur-xl shadow-xl space-y-4">

            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-500">Transaction ID</span>
              <span className="font-mono text-zinc-300 font-medium">{txData.transactionId}</span>
            </div>


            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-500">Date</span>
              <span className="text-zinc-300 font-medium">{txData?.date}</span>
            </div>


            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-500">Payment methods</span>
              <span className="text-zinc-300 font-medium">{txData?.type}</span>
            </div>


            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-500">Amount</span>
              <span className="text-zinc-300 font-bold">{txData?.amount}</span>
            </div>



            <div className="border-t border-zinc-800/80 my-2" />


            <div className="flex items-center justify-between text-sm pt-1">
              <span className="text-zinc-500">Status</span>
              <span className="text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-3 py-0.5 rounded-full text-xs uppercase tracking-wider">
                {txData?.status}
              </span>
            </div>

          </Card>
        </div>
        <div className="pt-2">
          <Link href="/dashboard/client">
            <Button
              className="w-full font-bold text-sm bg-gradient-to-r from-brand-accent to-violet-600 hover:opacity-90 text-white rounded-xl h-12 shadow-lg shadow-brand-accent/10 transition-all duration-200"
            >
              Back Home
            </Button>
          </Link>
        </div>

      </div>
    </div>

  );
};

export default paymentSuccessPage;