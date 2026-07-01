"use server"

import { serverDelete, serverPatch, serverPost } from "../core/server"

// post task api
export const postTask = async(newTask)=>{
    return serverPost('/api/task', newTask)
}

export const postProposal = async(newProposal) => {
    return serverPost('/api/proposal', newProposal)
}

export const deleteTask = async (id) => {
  return serverDelete(`/api/client/task/${id}`);
};

export const editTask = async (id, updatedTask) => {
  return serverPatch(`/api/client/update/${id}`, updatedTask);
}