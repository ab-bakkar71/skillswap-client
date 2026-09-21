"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { FiAlertTriangle, FiRefreshCw } from "react-icons/fi";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Application error boundary caught an error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 py-20 font-manrope text-white">
      <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl mb-6 text-rose-400">
        <FiAlertTriangle className="w-12 h-12" />
      </div>
      <h1 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400 mb-3">
        Something went wrong
      </h1>
      <p className="text-sm md:text-base text-zinc-400 max-w-md mb-8 leading-relaxed">
        An unexpected error occurred while loading this page. Our team has been notified.
      </p>
      <div className="flex items-center gap-3">
        <button
          onClick={() => reset()}
          className="flex items-center gap-2 px-6 py-2.5 bg-brand-accent hover:bg-violet-600 text-white rounded-xl text-xs font-semibold shadow-lg shadow-violet-500/20 transition-all cursor-pointer"
        >
          <FiRefreshCw className="w-3.5 h-3.5" />
          Try Again
        </button>
        <Link
          href="/"
          className="px-6 py-2.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white rounded-xl text-xs font-semibold transition-all"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
