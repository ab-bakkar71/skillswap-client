"use server";

import { serverFetch, serverPatch } from "../core/server";
import { getUserSession } from "../core/session";

/**
 * Fetch latest notifications and unread count for current logged-in user
 */
export const getNotificationsAction = async () => {
  const user = await getUserSession();
  if (!user || !user.email) {
    return { success: false, unreadCount: 0, notifications: [] };
  }

  const data = await serverFetch(`/api/notifications/${encodeURIComponent(user.email)}`);
  if (!data || !data.success) {
    return { success: false, unreadCount: 0, notifications: [] };
  }

  return {
    success: true,
    unreadCount: data.unreadCount || 0,
    notifications: data.notifications || [],
  };
};

/**
 * Mark a single notification as read
 */
export const markNotificationReadAction = async (notificationId) => {
  const user = await getUserSession();
  if (!user || !user.email) {
    return { success: false, message: "Unauthorized" };
  }

  return serverPatch(`/api/notifications/read/${notificationId}`, {});
};

/**
 * Mark all notifications as read for current user
 */
export const markAllNotificationsReadAction = async () => {
  const user = await getUserSession();
  if (!user || !user.email) {
    return { success: false, message: "Unauthorized" };
  }

  return serverPatch(`/api/notifications/read-all/${encodeURIComponent(user.email)}`, {});
};
