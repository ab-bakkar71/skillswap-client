import { serverFetch } from "../core/server"


export const getMyTask = async(email) => {
    return serverFetch(`/api/task/${email}`)
}