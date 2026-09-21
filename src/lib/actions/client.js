"use server";

import { serverDelete, serverPatch, serverPost } from "../core/server";
import { getUserSession } from "../core/session";

// post task api
export const postTask = async (newTask) => {
  const user = await getUserSession();
  if (!user || !user.email) {
    return { success: false, message: "Unauthorized: Please log in to post a task." };
  }
  if (user.status === "block") {
    return { success: false, message: "Your account has been blocked." };
  }

  // Ensure clientEmail strictly matches the authenticated session user
  const sanitizedTask = {
    ...newTask,
    clientEmail: user.email,
    clientName: user.name || newTask.clientName || "Client",
  };

  return serverPost("/api/task", sanitizedTask);
};

export const deleteTask = async (id) => {
  const user = await getUserSession();
  if (!user || !user.email) {
    return { success: false, message: "Unauthorized: Please log in." };
  }

  return serverDelete(`/api/client/task/${id}`, {
    clientEmail: user.email,
    userRole: user.role,
  });
};

export const editTask = async (id, updatedTask) => {
  const user = await getUserSession();
  if (!user || !user.email) {
    return { success: false, message: "Unauthorized: Please log in." };
  }

  return serverPatch(`/api/client/update/${id}`, {
    ...updatedTask,
    clientEmail: user.email,
    userRole: user.role,
  });
};

export const rejectProposal = async (proposalId) => {
  const user = await getUserSession();
  if (!user || !user.email) {
    return { success: false, message: "Unauthorized: Please log in." };
  }

  return serverPatch(`/api/proposal/reject/${proposalId}`, {
    clientEmail: user.email,
  });
};

export const approveDeliverable = async (proposalId) => {
  const user = await getUserSession();
  if (!user || !user.email) {
    return { success: false, message: "Unauthorized: Please log in." };
  }

  return serverPatch(`/api/proposal/approve/${proposalId}`, {
    clientEmail: user.email,
    userRole: user.role,
  });
};

export const requestRevision = async (proposalId, revisionNotes) => {
  const user = await getUserSession();
  if (!user || !user.email) {
    return { success: false, message: "Unauthorized: Please log in." };
  }

  if (!revisionNotes || !String(revisionNotes).trim()) {
    return { success: false, message: "Please provide revision notes explaining what needs improvement." };
  }

  return serverPatch(`/api/proposal/revision/${proposalId}`, {
    revisionNotes: String(revisionNotes).trim(),
    clientEmail: user.email,
    userRole: user.role,
  });
};