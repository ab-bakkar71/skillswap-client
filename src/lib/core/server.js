"use server";

import { getUserSession } from "./session";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8000";

const getAuthHeaders = async (customHeaders = {}) => {
  const headers = {
    "content-type": "application/json",
    "x-internal-secret": process.env.INTERNAL_API_SECRET || "",
    ...customHeaders,
  };

  try {
    const user = await getUserSession();
    if (user) {
      if (user.email) headers["x-user-email"] = user.email;
      if (user.role) headers["x-user-role"] = user.role;
    }
  } catch (_e) {
    // Proceed with internal secret if outside request context
  }

  return headers;
};

export const serverFetch = async (path, customHeaders = {}) => {
  try {
    const headers = await getAuthHeaders(customHeaders);
    const res = await fetch(`${baseUrl}${path}`, {
      cache: "no-store",
      headers,
    });
    if (!res.ok) {
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error(`serverFetch error on ${path}:`, error.message);
    return null;
  }
};

export const serverPost = async (path, data, customHeaders = {}) => {
  try {
    const headers = await getAuthHeaders(customHeaders);
    const res = await fetch(`${baseUrl}${path}`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error) {
    console.error(`serverPost error on ${path}:`, error.message);
    return { success: false, message: error.message };
  }
};

export const serverPatch = async (path, data, customHeaders = {}) => {
  try {
    const headers = await getAuthHeaders(customHeaders);
    const res = await fetch(`${baseUrl}${path}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error) {
    console.error(`serverPatch error on ${path}:`, error.message);
    return { success: false, message: error.message };
  }
};

export const serverDelete = async (path, data, customHeaders = {}) => {
  try {
    const headers = await getAuthHeaders(customHeaders);
    const res = await fetch(`${baseUrl}${path}`, {
      method: "DELETE",
      headers,
      body: data ? JSON.stringify(data) : undefined,
    });
    return await res.json();
  } catch (error) {
    console.error(`serverDelete error on ${path}:`, error.message);
    return { success: false, message: error.message };
  }
};
