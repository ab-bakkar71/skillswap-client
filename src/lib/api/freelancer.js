
import { serverFetch } from "../core/server"

export const getTask = async()=>{
        return serverFetch('/api/tasks');
}

export const getTaskById = async(id)=>{
        return serverFetch(`/api/tasks/${id}`)
}