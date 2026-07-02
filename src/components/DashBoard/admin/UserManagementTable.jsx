"use client";

import { Avatar, Table, Tooltip } from "@heroui/react";
import React from "react";
import { FiClock, FiEdit2 } from "react-icons/fi";
import { ImBlocked } from "react-icons/im";
import { MdLockOpen } from "react-icons/md";
import BlockUser from "./BlockUser";

const UserManagementTable = ({ users, currentUser }) => {
    

    const handleRoleChange = (user) => {
        console.log("Change Role:", user);
        // API Call
    };

    return (
        <div className="w-full font-manrope space-y-4 pr-10">
            <Table>
                <Table.ScrollContainer>
                    <Table.Content
                        aria-label="User Management Table"
                        className="min-w-[850px]"
                    >
                        <Table.Header>
                            <Table.Column isRowHeader>NAME</Table.Column>
                            <Table.Column>EMAIL</Table.Column>
                            <Table.Column>ROLE</Table.Column>
                            <Table.Column>STATUS</Table.Column>
                            <Table.Column>JOINED</Table.Column>
                            <Table.Column className="text-center">ACTIONS</Table.Column>
                        </Table.Header>

                        <Table.Body>
                            {Array.isArray(users) && users.length > 0 ? (
                                users.map((user) => {

                                    const isCurrentUser =
                                        currentUser?.email === user.email;

                                    return (
                                        <Table.Row
                                            key={user._id}
                                            className="border-b border-zinc-900/60 hover:bg-zinc-900/20 transition-colors"
                                        >
                                            {/* Name */}
                                            <Table.Cell className="py-4">
                                                <div className="flex items-center gap-3">
                                                    <Avatar>
                                                        <Avatar.Image
                                                            src={user.image}
                                                            alt={user.name}
                                                        />
                                                        <Avatar.Fallback>
                                                            {user?.name?.[0]?.toUpperCase()}
                                                        </Avatar.Fallback>
                                                    </Avatar>

                                                    <span className="font-bold text-white text-sm">
                                                        {user.name}
                                                    </span>
                                                </div>
                                            </Table.Cell>

                                            {/* Email */}
                                            <Table.Cell className="text-blue-400 text-sm">
                                                {user.email}
                                            </Table.Cell>

                                            {/* Role */}
                                            <Table.Cell>
                                                <span
                                                    className={`text-[11px] font-bold px-3 py-1 rounded-md border${user.role === "admin"
                                                            ? "bg-purple-500/10 border-purple-500/30 text-purple-400"
                                                            : user.role === "client"
                                                                ? "bg-blue-500/10 border-blue-500/30 text-blue-400"
                                                                : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                                                        }`}
                                                >
                                                    {user.role}
                                                </span>
                                            </Table.Cell>

                                            {/* Status */}
                                            <Table.Cell>
                                                <div className="flex items-center gap-2">
                                                    <span
                                                        className={`h-2 w-2 rounded-full ${user.status === "block"
                                                            ? "bg-rose-500"
                                                            : "bg-emerald-500 animate-pulse"
                                                            }`}
                                                    />

                                                    <span
                                                        className={`text-xs font-semibold ${user.status === "block"
                                                            ? "text-rose-400"
                                                            : "text-emerald-400"
                                                            }`}
                                                    >
                                                        {user.status === "block"
                                                            ? "Blocked"
                                                            : "Active"}
                                                    </span>
                                                </div>
                                            </Table.Cell>

                                            {/* Joined */}
                                            <Table.Cell className="text-zinc-400 text-xs">
                                                <div className="flex items-center gap-2">
                                                    <FiClock />

                                                    {user.createdAt
                                                        ? new Date(
                                                            user.createdAt
                                                        ).toLocaleDateString("en-US", {
                                                            month: "short",
                                                            day: "numeric",
                                                            year: "numeric",
                                                        })
                                                        : "N/A"}
                                                </div>
                                            </Table.Cell>

                                            {/* Actions */}
                                            <Table.Cell>
                                                <div className="flex justify-center gap-4">

                                                    {/* Change Role */}

                                                    <Tooltip content="Change Role">
                                                        <button
                                                            disabled={isCurrentUser}
                                                            onClick={() =>
                                                                handleRoleChange(user)
                                                            }
                                                            className={`text-lg transition-colors ${isCurrentUser
                                                                ? "opacity-40 cursor-not-allowed"
                                                                : "text-zinc-500 hover:text-blue-400 cursor-pointer"
                                                                }`}
                                                        >
                                                            <FiEdit2 />
                                                        </button>
                                                    </Tooltip>

                                                    {/* Block / Unblock */}

                                                     <BlockUser user={user} isCurrentUser={isCurrentUser} />
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    );
                                })
                            ) : (
                                <Table.Row>
                                    <Table.Cell
                                        colSpan={6}
                                        className="text-center py-12 text-zinc-500"
                                    >
                                        No users found.
                                    </Table.Cell>
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>
        </div>
    );
};

export default UserManagementTable;