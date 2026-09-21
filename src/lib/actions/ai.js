"use server";

import { serverPost } from "../core/server";
import { getUserSession } from "../core/session";

/**
 * Auto-generate task content from a brief prompt using AI
 */
export const generateAITask = async ({ prompt, category, budget }) => {
  const user = await getUserSession();
  if (!user || !user.email) {
    return { success: false, message: "Please log in to use AI assistant." };
  }
  if (user.status === "block") {
    return { success: false, message: "Your account is blocked." };
  }

  if (!prompt || !prompt.trim()) {
    return { success: false, message: "Please provide a short prompt or idea." };
  }

  return serverPost("/api/ai/generate-task", {
    prompt: prompt.trim(),
    category,
    budget,
  });
};

/**
 * Auto-generate proposal cover note and estimates using AI
 */
export const generateAIProposal = async ({
  taskTitle,
  taskDescription,
  category,
  budget,
}) => {
  const user = await getUserSession();
  if (!user || !user.email) {
    return { success: false, message: "Please log in to use AI assistant." };
  }

  return serverPost("/api/ai/generate-proposal", {
    taskTitle,
    taskDescription,
    category,
    budget,
    freelancerName: user.name || "Freelancer",
  });
};

/**
 * Auto-summarize a submitted proposal and analyze win strategy using AI
 */
export const summarizeAIProposal = async ({
  taskTitle,
  proposedBudget,
  estimatedDays,
  coverNote,
  status,
}) => {
  const user = await getUserSession();
  if (!user || !user.email) {
    return { success: false, message: "Please log in to use AI assistant." };
  }

  return serverPost("/api/ai/summarize-proposal", {
    taskTitle,
    proposedBudget,
    estimatedDays,
    coverNote,
    status,
  });
};

/**
 * Auto-summarize a task, analyze scope, and recommend whether freelancer should bid
 */
export const summarizeAITask = async ({
  title,
  description,
  category,
  budget,
  deadline,
}) => {
  return serverPost("/api/ai/summarize-task", {
    title,
    description,
    category,
    budget,
    deadline,
  });
};

