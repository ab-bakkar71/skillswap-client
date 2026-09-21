"use server";

import { revalidatePath } from "next/cache";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const serverFetch = async (path) => {
  try {
    const res = await fetch(`${baseUrl}${path}`, { cache: "no-store" });
    if (!res.ok) {
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error(`serverFetch error on ${path}:`, error.message);
    return null;
  }
};

export const serverPost = async (path, data) => {
  try {
    const res = await fetch(`${baseUrl}${path}`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error) {
    console.error(`serverPost error on ${path}:`, error.message);
    return { success: false, message: error.message };
  }
};

export const serverPatch = async (path, data) => {
  try {
    const res = await fetch(`${baseUrl}${path}`, {
      method: "PATCH",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error) {
    console.error(`serverPatch error on ${path}:`, error.message);
    return { success: false, message: error.message };
  }
};

export const serverDelete = async (path, data) => {
  try {
    const res = await fetch(`${baseUrl}${path}`, {
      method: "DELETE",
      headers: {
        "content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : undefined,
    });
    return await res.json();
  } catch (error) {
    console.error(`serverDelete error on ${path}:`, error.message);
    return { success: false, message: error.message };
  }
};
