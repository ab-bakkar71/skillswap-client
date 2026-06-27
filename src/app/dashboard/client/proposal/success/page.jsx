"use client";
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, Button, Spinner } from '@heroui/react';
import { IoCheckmarkSharp } from 'react-icons/io5';
import Link from 'next/link';
import { GridLoader } from 'react-spinners';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(null);

  useEffect(() => {
    if (!sessionId) return;

    fetch(`/api/verify_payment?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setDetails(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [sessionId]);

  if (loading) {
    return (
      <div className='flex flex-col items-center justify-center gap-2 min-h-screen'>
            <GridLoader color="#7c3aed" />
        </div>
    );
  }

  
  const txData = {
    transactionId: details?.transactionId || sessionId?.slice(0, 14) || "3561 4422 8732",
    date: details?.date || new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    type: details?.type || "Credit Card",
    amount: details?.amount || "160.00",
    total: details?.total || "168.00"
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
              Successfully Paid <span className="text-emerald-400">${txData.total}</span>
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
              <span className="text-zinc-300 font-medium">{txData.date}</span>
            </div>

        
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-500">Type of Transaction</span>
              <span className="text-zinc-300 font-medium">{txData.type}</span>
            </div>


            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-500">Amount</span>
              <span className="text-zinc-300 font-bold">${txData.amount}</span>
            </div>
    

           
            <div className="border-t border-zinc-800/80 my-2" />

            
            <div className="flex items-center justify-between text-sm pt-1">
              <span className="text-zinc-500">Status</span>
              <span className="text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-3 py-0.5 rounded-full text-xs uppercase tracking-wider">
                Success
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
}