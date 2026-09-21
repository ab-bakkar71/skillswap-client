"use client";

import { submitReview } from "@/lib/actions/review";
import { Button, Modal, Surface } from "@heroui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { toast } from "react-toastify";

const RATING_LABELS = {
  1: "1 - Needs Improvement",
  2: "2 - Fair Quality",
  3: "3 - Good & Satisfactory",
  4: "4 - Very Good / Exceeded Expectations",
  5: "5 - Outstanding & Exceptional Work! 🌟",
};

const ReviewModal = ({ proposal }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error("Please write a short review comment.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitReview({
        proposalId: proposal._id,
        rating,
        comment,
      });

      if (res && res.success) {
        toast.success(res.message || "Review submitted successfully! 🎉");
        setIsOpen(false);
        router.refresh();
      } else {
        toast.error(res?.message || "Failed to submit review.");
      }
    } catch (_err) {
      toast.error("Something went wrong while submitting review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (proposal?.isReviewed) {
    return (
      <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-xl">
        <FaStar className="text-amber-400 text-xs" />
        <span>Reviewed</span>
      </div>
    );
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button
        onPress={() => setIsOpen(true)}
        variant="secondary"
        className="inline-flex items-center gap-1.5 font-bold text-xs bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500 hover:text-white rounded-xl transition-all duration-200 h-9 px-3.5 cursor-pointer shadow-sm"
      >
        <FaStar className="text-xs" />
        Leave Review
      </Button>

      <Modal.Backdrop className="bg-black/60 backdrop-blur-sm">
        <Modal.Container placement="center">
          <Modal.Dialog className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-950 text-white shadow-2xl">
            <Modal.CloseTrigger className="absolute right-5 top-5 rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-900 hover:text-white transition-colors cursor-pointer" />

            <Modal.Header className="border-b border-zinc-900 px-6 pt-6 pb-4">
              <Modal.Heading className="text-xl font-bold text-white flex items-center gap-2">
                Rate & Review Freelancer
              </Modal.Heading>
              <p className="mt-1 text-xs text-zinc-400">
                Share your feedback about working with this talent. Your review helps build community trust.
              </p>
            </Modal.Header>

            <form onSubmit={handleSubmit}>
              <Modal.Body className="px-6 py-5 space-y-4">
                {/* Project Summary */}
                <Surface variant="default" className="rounded-xl border border-zinc-900 bg-zinc-900/40 p-4">
                  <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider block mb-1">
                    Completed Project
                  </span>
                  <p className="text-sm font-bold text-zinc-200">{proposal.taskTitle}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">Freelancer: {proposal.freelancerEmail}</p>
                </Surface>

                {/* Star Rating Picker */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-300 block">
                    Rating (1 to 5 Stars) <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex items-center gap-2 bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-3 justify-between">
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const active = (hoverRating || rating) >= star;
                        return (
                          <button
                            key={star}
                            type="button"
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setRating(star)}
                            className="p-1 text-2xl transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                          >
                            {active ? (
                              <FaStar className="text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                            ) : (
                              <FaRegStar className="text-zinc-600 hover:text-zinc-400" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                    <span className="text-xs font-semibold text-amber-400">
                      {RATING_LABELS[hoverRating || rating]}
                    </span>
                  </div>
                </div>

                {/* Comment Textarea */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-300 block">
                    Detailed Feedback <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Describe your experience: code quality, communication, adherence to deadlines, and overall satisfaction..."
                    className="w-full text-xs bg-zinc-900/70 border border-zinc-800 rounded-xl p-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-500/60 transition-colors resize-y min-h-[100px]"
                    rows={4}
                  />
                  <p className="text-[11px] text-zinc-500">
                    Your review will be displayed publicly on the freelancer&apos;s profile.
                  </p>
                </div>
              </Modal.Body>

              <Modal.Footer className="flex gap-2.5 border-t border-zinc-900 px-6 py-4 justify-end">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl text-xs h-10 px-4 border border-zinc-800 text-zinc-400 hover:text-white"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  isDisabled={isSubmitting}
                  className="h-10 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs px-5 shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  {isSubmitting ? "Submitting Review..." : "Submit Review ⭐"}
                </Button>
              </Modal.Footer>
            </form>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default ReviewModal;
