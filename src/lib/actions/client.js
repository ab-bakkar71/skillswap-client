"use server"

import { serverDelete, serverPatch, serverPost } from "../core/server"

// post task api
export const postTask = async(newTask)=>{
    return serverPost('/api/task', newTask)
}

export const deleteTask = async (id) => {
  return serverDelete(`/api/client/task/${id}`);
};

export const editTask = async (id, updatedTask) => {
  return serverPatch(`/api/client/update/${id}`, updatedTask);
}

export const rejectProposal = async (proposalId) => {
  return serverPatch(`/api/proposal/reject/${proposalId}`);
}