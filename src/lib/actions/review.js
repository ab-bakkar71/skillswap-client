"use server";

import { serverPost } from "../core/server";
import { getUserSession } from "../core/session";

export const submitReview = async ({ proposalId, rating, comment }) => {
  const user = await getUserSession();
  if (!user || !user.email) {
    return { success: false, message: "Unauthorized: Please log in to submit a review." };
  }

  if (user.status === "block") {
    return { success: false, message: "Your account has been restricted." };
  }

  if (!proposalId) {
    return { success: false, message: "Proposal ID is required." };
  }

  const numRating = Number(rating);
  if (isNaN(numRating) || numRating < 1 || numRating > 5) {
    return { success: false, message: "Please select a rating between 1 and 5 stars." };
  }

  if (!comment || !String(comment).trim()) {
    return { success: false, message: "Please provide a feedback comment describing your experience." };
  }

  return serverPost("/api/reviews", {
    proposalId,
    rating: numRating,
    comment: String(comment).trim(),
    clientEmail: user.email,
    clientName: user.name || "Client",
    clientImage: user.image || "",
  });
};
