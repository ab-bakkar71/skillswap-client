import { serverPatch, serverPost } from "../core/server"

export const updateProfile = async (email, finalData) => {
    return serverPatch(`/api/freelancer/update/${email}`, finalData);
};

export const postProposal = async(newProposal) => {
    return serverPost('/api/proposal', newProposal)
}

export const submitTask = async (proposalId, deliverableUrl) => {
    return serverPatch(`/api/proposal/complete/${proposalId}`, { deliverableUrl });
}
