"use client"

import { Avatar, Table, Tooltip } from '@heroui/react';
import React from 'react';
import { FiClock, FiEdit2 } from 'react-icons/fi';
import { ImBlocked } from 'react-icons/im';

const UserManagementTable = ({ users }) => {
    return (
        <div className="w-full font-manrope space-y-4 pr-10">
            <Table>
                <Table.ScrollContainer>
                    <Table.Content aria-label="User Management Table" className="min-w-[800px]">


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
                                users.map((user) => (
                                    <Table.Row key={user._id || user.email} className="border-b border-zinc-900/60 hover:bg-zinc-900/20 transition-colors">


                                        <Table.Cell className="py-4">
                                            <div className="flex items-center gap-3">
                                                <Avatar>
                                                    <Avatar.Image alt={user?.name} src={user?.image} />
                                                    <Avatar.Fallback>{user?.name ? user.name[0].toUpperCase() : "U"}</Avatar.Fallback>
                                                </Avatar>
                                                <span className="font-bold text-zinc-100 text-sm tracking-tight">{user.name || "Sarah Chen"}</span>
                                            </div>
                                        </Table.Cell>


                                        <Table.Cell className="text-blue-400/90 text-sm font-medium hover:underline cursor-pointer">
                                            {user.email || "sarah.chen@company.com"}
                                        </Table.Cell>


                                        <Table.Cell>
                                            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border shadow-sm ${user.role?.toLowerCase() === 'admin'
                                                ? 'bg-purple-500/10 border-purple-500/20 text-purple-400'
                                                : user.role?.toLowerCase() === 'client'
                                                    ? 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                                                    : 'bg-zinc-500/10 border-zinc-800 text-zinc-400'
                                                }`}>
                                                {user.role || "client"}
                                            </span>
                                        </Table.Cell>


                                        <Table.Cell>
                                            <div className="flex items-center gap-1.5">
                                                <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'block' ? 'bg-zinc-500' : 'bg-emerald-500 animate-pulse'}`} />
                                                <span className={`text-xs font-semibold ${user.status === 'block' ? 'text-zinc-500' : 'text-emerald-400'}`}>
                                                    {user.status === 'block' ? 'Block' : 'Active'}
                                                </span>
                                            </div>
                                        </Table.Cell>


                                        <Table.Cell className="text-zinc-400 text-xs font-medium">
                                            <div className="flex items-center gap-1.5">
                                                <FiClock className="text-zinc-600" />
                                                <span>{user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "Jan 15, 2024"}</span>
                                            </div>
                                        </Table.Cell>


                                        <Table.Cell className="text-center">
                                            <div className="flex items-center justify-center gap-3">
                                                <Tooltip content="Edit user" delay={0} closeDelay={0} className="bg-zinc-900 text-white rounded-md text-xs">
                                                    <button
                                                        onClick={() => alert(`Edit user: ${user.name}`)}
                                                        className="text-zinc-500 hover:text-zinc-100 transition-colors cursor-pointer text-base"
                                                    >
                                                        <FiEdit2 />
                                                    </button>
                                                </Tooltip>

                                                <Tooltip content="Delete user" color="danger" delay={0} closeDelay={0} className="rounded-md text-xs">
                                                    <button
                                                        onClick={() => alert(`Delete user: ${user.name}`)}
                                                        className="text-zinc-500 hover:text-rose-400 transition-colors cursor-pointer text-base"
                                                    >
                                                        <ImBlocked />
                                                    </button>
                                                </Tooltip>
                                            </div>
                                        </Table.Cell>

                                    </Table.Row>
                                ))
                            ) : (
                                /* ডাটা না থাকলে সেফটি মেসেজ */
                                <Table.Row>
                                    <Table.Cell colSpan={6} className="text-center py-12 text-zinc-500 text-sm">
                                        No users found in the system.
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