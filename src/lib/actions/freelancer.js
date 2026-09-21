"use server";

import { serverPatch, serverPost } from "../core/server";
import { getUserSession } from "../core/session";

export const updateProfile = async (email, finalData) => {
  const user = await getUserSession();
  if (!user || !user.email) {
    return { success: false, message: "Unauthorized: Please log in." };
  }

  // Only allow self-update or admin
  if (user.email !== email && user.role !== "admin") {
    return { success: false, message: "Forbidden: You cannot edit another user's profile." };
  }

  // Prevent modifying sensitive fields like role or status via profile update
  const sanitizedData = {
    name: finalData.name,
    image: finalData.image,
    skills: finalData.skills,
    bio: finalData.bio,
    hourlyRate: finalData.hourlyRate,
  };

  return serverPatch(`/api/freelancer/update/${email}`, sanitizedData);
};

export const postProposal = async (newProposal) => {
  const user = await getUserSession();
  if (!user || !user.email) {
    return { success: false, message: "Unauthorized: Please log in." };
  }
  if (user.status === "block") {
    return { success: false, message: "Your account has been blocked." };
  }
  if (user.role === "client") {
    return { success: false, message: "Client accounts cannot submit proposals." };
  }

  const sanitizedProposal = {
    ...newProposal,
    freelancerEmail: user.email,
    freelancerName: user.name || newProposal.freelancerName || "Freelancer",
  };

  return serverPost("/api/proposal", sanitizedProposal);
};

export const submitTask = async (proposalId, deliverableUrl, submissionNotes = "") => {
  const user = await getUserSession();
  if (!user || !user.email) {
    return { success: false, message: "Unauthorized: Please log in." };
  }

  if (!deliverableUrl || typeof deliverableUrl !== "string" || !deliverableUrl.trim().startsWith("http")) {
    return { success: false, message: "A valid deliverable URL (starting with http:// or https://) is required." };
  }

  return serverPatch(`/api/proposal/submit-work/${proposalId}`, {
    deliverableUrl: deliverableUrl.trim(),
    submissionNotes: submissionNotes ? String(submissionNotes).trim() : "",
    freelancerEmail: user.email,
  });
};
