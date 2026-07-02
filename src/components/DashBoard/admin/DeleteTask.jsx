"use client";
import { deleteTask } from '@/lib/actions/client';
import { AlertDialog, Button } from '@heroui/react';
import { useRouter } from 'next/navigation';

import React from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';


const DeleteTask = ({task}) => {
    const router = useRouter();
    const handleDeleteTask = async () => {
        const data = await deleteTask(task._id);
              if (data.deletedCount > 0) {
                toast.success("Task deleted successfully! 🗑️");
                router.refresh();
                
              } else {
                toast.error("Failed to delete the task.");
              }
    }
    return (
        <div>
            <AlertDialog>
                <Button
                    size="sm"
                    variant="flat"
                    color="danger"
                    className="font-bold text-xs bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white rounded-xl transition-all duration-200 h-8 px-3"
                >
                    <FiTrash2 className="text-sm" />
                    Delete Task
                </Button>
                <AlertDialog.Backdrop>
                    <AlertDialog.Container>
                        <AlertDialog.Dialog className="sm:max-w-[400px]">
                            <AlertDialog.CloseTrigger />
                            <AlertDialog.Header>
                                <AlertDialog.Icon status="danger" />
                                <AlertDialog.Heading>Delete Task</AlertDialog.Heading>
                            </AlertDialog.Header>
                            <AlertDialog.Body>
                                <p>
                                    This will permanently delete <strong>{task.title}</strong> and all of its
                                    data. This action cannot be undone.
                                </p>
                            </AlertDialog.Body>
                            <AlertDialog.Footer>
                                <Button slot="close" variant="tertiary">
                                    Cancel
                                </Button>
                                <Button onClick={handleDeleteTask} slot="close" variant="danger">
                                    Delete Task
                                </Button>
                            </AlertDialog.Footer>
                        </AlertDialog.Dialog>
                    </AlertDialog.Container>
                </AlertDialog.Backdrop>
            </AlertDialog>
        </div>
    );
};

export default DeleteTask;