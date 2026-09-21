"use server";

import { serverPatch } from "../core/server";
import { getUserSession } from "../core/session";

export const BlockUserFetch = async (userId, status) => {
  const user = await getUserSession();
  if (!user || user.role !== "admin") {
    return { success: false, message: "Unauthorized: Admin privileges required." };
  }
  return serverPatch(`/api/users/block/${userId}`, {
    status,
  });
};

export const updateUserRole = async (userId, role) => {
  const user = await getUserSession();
  if (!user || user.role !== "admin") {
    return { success: false, message: "Unauthorized: Admin privileges required." };
  }
  return serverPatch(`/api/users/role/${userId}`, {
    role,
  });
};