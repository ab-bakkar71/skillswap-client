"use client";

import { updateUserRole } from "@/lib/actions/admin";
import { AlertDialog, Button, Tooltip } from "@heroui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { toast } from "react-toastify";

const ChangeUserRole = ({ user, isCurrentUser }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const nextRole = user.role === "client" ? "freelancer" : "client";

  const handleRoleChange = async () => {
    setLoading(true);
    try {
      const result = await updateUserRole(user._id, nextRole);
      if (result.success) {
        toast.success(`Role changed to ${nextRole} successfully! ✅`);
        router.refresh();
      } else {
        toast.error(result.message || "Failed to update role");
      }
    } catch (err) {
      toast.error(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AlertDialog>
        <Tooltip content={`Change Role to ${nextRole}`}>
          <Button
            disabled={isCurrentUser || loading}
            variant="plain"
            className={`min-w-0 h-auto p-0 bg-transparent hover:bg-transparent ${
              isCurrentUser
                ? "opacity-40 cursor-not-allowed"
                : "text-zinc-500 hover:text-blue-400 cursor-pointer"
            }`}
          >
            <FiEdit2 className="text-lg" />
          </Button>
        </Tooltip>

        <AlertDialog.Backdrop className="bg-black/60 backdrop-blur-sm">
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-[430px] rounded-2xl border border-zinc-800 bg-zinc-950 text-white">
              <AlertDialog.CloseTrigger />

              <AlertDialog.Header>
                <AlertDialog.Icon status="info" />
                <AlertDialog.Heading>Change User Role?</AlertDialog.Heading>
              </AlertDialog.Header>

              <AlertDialog.Body>
                <p className="text-sm text-zinc-400 leading-6">
                  Are you sure you want to change the role of{" "}
                  <strong className="text-white">{user.name}</strong> from{" "}
                  <span className="font-semibold text-amber-400 uppercase">
                    {user.role}
                  </span>{" "}
                  to{" "}
                  <span className="font-semibold text-emerald-400 uppercase">
                    {nextRole}
                  </span>
                  ?
                </p>
              </AlertDialog.Body>

              <AlertDialog.Footer className="flex justify-end gap-3 pt-4 border-t border-zinc-900">
                <Button slot="close" variant="tertiary" className="rounded-xl">
                  Cancel
                </Button>
                <Button
                  slot="close"
                  onClick={handleRoleChange}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl px-4"
                  isDisabled={loading}
                >
                  {loading ? "Updating..." : `Switch to ${nextRole}`}
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </div>
  );
};

export default ChangeUserRole;
