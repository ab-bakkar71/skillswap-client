import { serverPatch, serverPost } from "../core/server"

export const updateProfile = async (email, finalData) => {
    return serverPatch(`/api/freelancer/update/${email}`, finalData);
};

export const postProposal = async(newProposal) => {
    return serverPost('/api/proposal', newProposal)
}
