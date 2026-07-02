"use client";

import { BlockUserFetch } from '@/lib/actions/admin';
import { AlertDialog, Button, Tooltip } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { ImBlocked } from 'react-icons/im';
import { MdLockOpen } from 'react-icons/md';

const BlockUser = ({ user, isCurrentUser }) => {
    const router = useRouter();

   const handleBlockUser = async (user) => {
  const newStatus = user.status === "block" ? "active" : "block";

  const result = await BlockUserFetch(user._id, newStatus);

  if (result.success) {
    
    router.refresh();
  } else {
    console.error("Failed to update user status:", result.message);
  }
};
    
    return (
        <div>
            <AlertDialog>
                <Tooltip
                    content={user.status === "block" ? "Unblock User" : "Block User"}
                    placement="top"
                >
                    <Button
                        variant="plain"
                        className="min-w-0 h-auto p-0 bg-transparent hover:bg-transparent"
                    >
                        {user.status === "block" ? (
                            <MdLockOpen className="text-lg text-emerald-500 hover:text-emerald-400 transition-colors" />
                        ) : (
                            <ImBlocked className="text-lg text-rose-500 hover:text-rose-400 transition-colors" />
                        )}
                    </Button>
                </Tooltip>



                <AlertDialog.Backdrop className="bg-black/60 backdrop-blur-sm">
                    <AlertDialog.Container>
                        <AlertDialog.Dialog className="sm:max-w-[430px] rounded-2xl border border-zinc-800 bg-zinc-950 text-white">

                            <AlertDialog.CloseTrigger />

                            <AlertDialog.Header>
                                <AlertDialog.Icon
                                    status={user.status === "block" ? "success" : "danger"}
                                />

                                <AlertDialog.Heading>
                                    {user.status === "block"
                                        ? "Unblock this user?"
                                        : "Block this user?"}
                                </AlertDialog.Heading>
                            </AlertDialog.Header>

                            <AlertDialog.Body>
                                <p className="text-sm text-zinc-400 leading-6">
                                    {user.status === "block" ? (
                                        <>
                                            Are you sure you want to <strong>unblock</strong>{" "}
                                            <span className="text-white">{user.name}</span>?
                                            <br />
                                            They will be able to log in and use the platform again.
                                        </>
                                    ) : (
                                        <>
                                            Are you sure you want to <strong>block</strong>{" "}
                                            <span className="text-white">{user.name}</span>?
                                            <br />
                                            The user will no longer be able to log in or use the platform
                                            until unblocked.
                                        </>
                                    )}
                                </p>
                            </AlertDialog.Body>

                            <AlertDialog.Footer className="gap-3">
                                <Button slot="close" variant="secondary">
                                    Cancel
                                </Button>

                                <Button
                                    slot="close"
                                    isDisabled={isCurrentUser.email === user.email}
                                    variant={user.status === "block" ? "primary" : "danger"}
                                onClick={() => handleBlockUser(user)}
                                >
                                    {user.status === "block" ? "Unblock User" : "Block User"}
                                </Button>
                            </AlertDialog.Footer>

                        </AlertDialog.Dialog>
                    </AlertDialog.Container>
                </AlertDialog.Backdrop>
            </AlertDialog>
        </div>
    );
};

export default BlockUser;