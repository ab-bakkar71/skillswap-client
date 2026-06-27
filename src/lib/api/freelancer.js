
import { serverFetch } from "../core/server"

export const getTask = async()=>{
        return serverFetch('/api/tasks');
}

export const getTaskById = async(id)=>{
        return serverFetch(`/api/tasks/${id}`)
}

export const getFreelancer = async() => {
        return serverFetch('/api/freelancer');
}

export const getFreelancerById = async(id) => {
        return serverFetch(`/api/freelancer/${id}`)
}

export const getProposal = async(email) => {
        return serverFetch(`/api/proposal/freelancer/${email}`)
}

export const getActiveProposal = async(email)=>{
        return serverFetch(`/api/active-task/${email}`)
}