import { serverFetch } from "../core/server";

export const getStaticData = async()=>{
        return serverFetch('/api/admin/dashboard-summary');
}
export const getUserData = async()=>{
        return serverFetch('/api/admin/user');
}


