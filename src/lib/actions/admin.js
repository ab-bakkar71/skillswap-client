"use server";

import { serverPatch } from "../core/server";

export const BlockUserFetch = async (userId, status) => {
  return serverPatch(`/api/users/block/${userId}`, {
    status,
  });
};

export const updateUserRole = async (userId, role) => {
  return serverPatch(`/api/users/role/${userId}`, {
    role,
  });
};