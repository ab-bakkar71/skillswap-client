import { serverPatch } from "../core/server"

export const updateProfile = async (email, finalData) => {
    return serverPatch(`/api/freelancer/update/${email}`, finalData);
};


