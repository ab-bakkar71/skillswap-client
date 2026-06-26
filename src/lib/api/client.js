import { serverFetch } from "../core/server";

export const getMyTask = async (email) => {
  return serverFetch(`/api/task/${email}`);
};

export const getFeaturedTasks = async () => {
  return serverFetch("/api/featured-task/open");
};

export const getProposal = async (email) => {
  return serverFetch(`/api/proposal/client/${email}`);
};

export const getProposalById = async (id) => {
  return serverFetch(`/api/proposals/task/${id}`);
};
