"use server"

import { serverPost } from "../core/server"

// post task api
export const postTask = async(newTask)=>{
    return serverPost('/api/task', newTask)
}