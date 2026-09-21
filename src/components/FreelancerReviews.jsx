"use client";

import React from "react";
import { FaCheckCircle, FaRegStar, FaStar } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";

const FreelancerReviews = ({ reviews = [], stats = null }) => {
  const totalReviews = stats?.totalReviews ?? reviews.length;
  const averageRating = stats?.averageRating ?? 0;
  const distribution = stats?.distribution ?? { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

  const renderStars = (score) => {
    const rounded = Math.round(Number(score) || 0);
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) =>
          star <= rounded ? (
            <FaStar key={star} className="text-amber-400 text-sm" />
          ) : (
            <FaRegStar key={star} className="text-zinc-600 text-sm" />
          )
        )}
      </div>
    );
  };

  return (
    <div className="mt-8 bg-zinc-900/40 border border-brand-border/60 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl font-manrope">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-border/30 pb-5 mb-6">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <span>Client Reviews & Ratings</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent">
              {totalReviews} {totalReviews === 1 ? "Review" : "Reviews"}
            </span>
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Genuine verified feedback from clients on completed deliverables.
          </p>
        </div>
      </div>

      {totalReviews === 0 ? (
        <div className="py-12 flex flex-col items-center justify-center text-center px-4 rounded-2xl bg-zinc-950/40 border border-dashed border-zinc-800">
          <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 mb-3">
            <FiMessageSquare className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-zinc-300">No Reviews Yet</h4>
          <p className="text-xs text-zinc-500 max-w-sm mt-1">
            This freelancer hasn&apos;t received any project reviews yet. Post a task and be the first client to work together!
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Rating Summary & Distribution Overview */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-5 rounded-2xl bg-zinc-950/60 border border-zinc-800/80">
            {/* Left: Big Score */}
            <div className="md:col-span-4 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-zinc-800/80 pb-5 md:pb-0 md:pr-6">
              <span className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                {averageRating.toFixed(1)}
              </span>
              <div className="my-2">{renderStars(averageRating)}</div>
              <span className="text-xs text-zinc-400 font-medium">
                Based on {totalReviews} client {totalReviews === 1 ? "rating" : "ratings"}
              </span>
            </div>

            {/* Right: Star Bars */}
            <div className="md:col-span-8 space-y-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = distribution[star] || 0;
                const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;

                return (
                  <div key={star} className="flex items-center gap-3 text-xs">
                    <span className="w-12 font-medium text-zinc-400 flex items-center gap-1">
                      <span>{star}</span>
                      <FaStar className="text-amber-400 text-[10px]" />
                    </span>
                    <div className="flex-1 h-2 rounded-full bg-zinc-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="w-8 text-right font-medium text-zinc-400">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Individual Review Cards */}
          <div className="space-y-4">
            {reviews.map((review, idx) => (
              <div
                key={review._id || idx}
                className="p-5 rounded-2xl bg-zinc-900/30 border border-zinc-800/60 hover:border-zinc-700/80 transition-all duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-accent/30 to-violet-600/30 border border-brand-accent/40 flex items-center justify-center text-sm font-bold text-white uppercase">
                      {review.clientName ? review.clientName[0] : "C"}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-zinc-200">
                          {review.clientName || "Verified Client"}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                          <FaCheckCircle className="text-[9px]" /> Verified
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-0.5">
                        Project: {review.taskTitle || "Completed Task"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end gap-1">
                    {renderStars(review.rating)}
                    <span className="text-[11px] text-zinc-400">
                      {review.createdAt
                        ? new Date(review.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "Recent"}
                    </span>
                  </div>
                </div>

                <p className="text-xs md:text-sm text-zinc-300 leading-relaxed pl-1 sm:pl-13 whitespace-pre-line border-t border-zinc-900/60 pt-3">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FreelancerReviews;
