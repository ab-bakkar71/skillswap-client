"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  IoNotificationsOutline,
  IoNotifications,
  IoCheckmarkDoneOutline,
  IoPaperPlaneOutline,
  IoCheckmarkCircleOutline,
  IoTimeOutline,
  IoSparklesOutline,
  IoAlertCircleOutline,
} from "react-icons/io5";
import {
  getNotificationsAction,
  markNotificationReadAction,
  markAllNotificationsReadAction,
} from "@/lib/actions/notification";

function formatTimeAgo(dateString) {
  if (!dateString) return "recently";
  const now = new Date();
  const past = new Date(dateString);
  const diffInSeconds = Math.floor((now - past) / 1000);

  if (diffInSeconds < 60) return "just now";
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
}

function getNotificationIcon(type) {
  switch (type) {
    case "proposal_received":
      return <IoPaperPlaneOutline className="w-4 h-4 text-violet-400" />;
    case "proposal_accepted":
      return <IoCheckmarkCircleOutline className="w-4 h-4 text-emerald-400" />;
    case "work_submitted":
      return <IoSparklesOutline className="w-4 h-4 text-blue-400" />;
    case "work_approved":
      return <IoCheckmarkCircleOutline className="w-4 h-4 text-amber-400" />;
    case "revision_requested":
      return <IoAlertCircleOutline className="w-4 h-4 text-orange-400" />;
    default:
      return <IoNotificationsOutline className="w-4 h-4 text-brand-accent" />;
  }
}

export default function NotificationBell({ userEmail }) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();

  // Initial fetch deferred + interval polling every 25 seconds
  useEffect(() => {
    let isMounted = true;

    const loadNotifications = async () => {
      try {
        const res = await getNotificationsAction();
        if (isMounted && res?.success) {
          setNotifications(res.notifications || []);
          setUnreadCount(res.unreadCount || 0);
        }
      } catch (_err) {
        // silent fail on polling error
      }
    };

    const timer = setTimeout(loadNotifications, 0);
    const interval = setInterval(loadNotifications, 25000);

    return () => {
      isMounted = false;
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      fetchNotifications();
    }
  };

  const handleNotificationClick = async (notif) => {
    if (!notif.isRead) {
      // Optimistic update
      setNotifications((prev) =>
        prev.map((n) => (n._id === notif._id ? { ...n, isRead: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
      await markNotificationReadAction(notif._id);
    }

    setIsOpen(false);
    if (notif.link) {
      router.push(notif.link);
    }
  };

  const handleMarkAllAsRead = async () => {
    if (unreadCount === 0) return;
    setIsLoading(true);
    // Optimistic update
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setUnreadCount(0);

    await markAllNotificationsReadAction();
    setIsLoading(false);
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {/* Bell Trigger Button */}
      <button
        type="button"
        onClick={handleToggle}
        aria-label="Notifications"
        className="relative p-2 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-colors focus:outline-none cursor-pointer"
      >
        {unreadCount > 0 ? (
          <IoNotifications className="w-5 h-5 text-brand-accent animate-pulse" />
        ) : (
          <IoNotificationsOutline className="w-5 h-5" />
        )}

        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full border border-zinc-950 shadow-md animate-bounce">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Popover */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 max-w-[calc(100vw-24px)] bg-zinc-950/95 border border-zinc-800/80 rounded-2xl shadow-2xl backdrop-blur-2xl z-50 overflow-hidden font-manrope animate-in fade-in zoom-in-95 duration-200">
          
          {/* Popover Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/60 bg-zinc-900/40">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">Notifications</h3>
              {unreadCount > 0 && (
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-brand-accent/20 text-brand-accent border border-brand-accent/30">
                  {unreadCount} new
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllAsRead}
                disabled={isLoading}
                className="text-xs text-zinc-400 hover:text-brand-accent transition-colors flex items-center gap-1 font-medium cursor-pointer"
              >
                <IoCheckmarkDoneOutline className="w-3.5 h-3.5" />
                <span>Mark all read</span>
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-[380px] overflow-y-auto divide-y divide-zinc-900/80">
            {notifications.length === 0 ? (
              <div className="py-10 px-4 text-center">
                <div className="w-10 h-10 mx-auto mb-2.5 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-500">
                  <IoNotificationsOutline className="w-5 h-5" />
                </div>
                <p className="text-xs font-semibold text-zinc-300">All caught up!</p>
                <p className="text-[11px] text-zinc-500 mt-0.5">
                  No notifications to show right now.
                </p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif._id}
                  onClick={() => handleNotificationClick(notif)}
                  className={`px-4 py-3 flex items-start gap-3 transition-colors cursor-pointer hover:bg-zinc-900/60 ${
                    !notif.isRead
                      ? "bg-violet-950/20 hover:bg-violet-950/30"
                      : "opacity-75 hover:opacity-100"
                  }`}
                >
                  <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800/80 shrink-0 mt-0.5">
                    {getNotificationIcon(notif.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <p className="text-xs font-bold text-white truncate">
                        {notif.title}
                      </p>
                      <span className="text-[10px] text-zinc-500 shrink-0 flex items-center gap-0.5">
                        <IoTimeOutline className="w-2.5 h-2.5" />
                        {formatTimeAgo(notif.createdAt)}
                      </span>
                    </div>

                    <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                      {notif.message}
                    </p>
                  </div>

                  {!notif.isRead && (
                    <span className="w-2 h-2 rounded-full bg-brand-accent shrink-0 mt-2 ring-2 ring-violet-400/20" />
                  )}
                </div>
              ))
            )}
          </div>

          {/* Footer note */}
          {notifications.length > 0 && (
            <div className="px-4 py-2 border-t border-zinc-800/40 bg-zinc-900/20 text-center">
              <span className="text-[10px] text-zinc-500">
                Live updates enabled • SkillSwap Real-time
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
