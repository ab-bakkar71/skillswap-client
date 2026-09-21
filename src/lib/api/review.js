import { serverFetch } from "../core/server";

// Fetch reviews for a specific freelancer
export const getFreelancerReviews = async (email) => {
  if (!email) return { success: false, reviews: [], stats: { averageRating: 0, totalReviews: 0, distribution: {} } };
  return serverFetch(`/api/reviews/freelancer/${encodeURIComponent(email)}`);
};

// Check if a proposal has already been reviewed
export const getProposalReview = async (proposalId) => {
  if (!proposalId) return { success: false, isReviewed: false };
  return serverFetch(`/api/reviews/proposal/${proposalId}`);
};
