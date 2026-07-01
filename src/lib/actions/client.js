"use server"

import { serverDelete, serverPost } from "../core/server"

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