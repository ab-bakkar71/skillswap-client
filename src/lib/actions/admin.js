import { serverPatch } from "../core/server"

export const BlockUserFetch = async (userId, status) => {
  return serverPatch(`/api/users/block/${userId}`, {
    status,
  });
};