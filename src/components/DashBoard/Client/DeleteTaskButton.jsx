"use client";
import React, { useState } from 'react';
import { AlertDialog, Button, Tooltip } from '@heroui/react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { IoTrashBin } from 'react-icons/io5';
import { deleteTask } from '@/lib/actions/client';

export default function DeleteTaskButton({ taskId, hasProposals }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);


  const handelDelete = async () => {
    if (hasProposals) return;

    setIsDeleting(true);
    try {
      const data = await deleteTask(taskId);
      if (data.deletedCount > 0) {
        toast.success("Task deleted successfully! 🗑️");
        router.push('/dashboard/client/my-task');
        
      } else {
        toast.error("Failed to delete the task.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Tooltip 
      content={hasProposals ? "Cannot delete: Proposals already submitted!" : "Delete Task permanently"} 
      color={hasProposals ? "danger" : "default"}
      className="text-xs rounded-md"
    >
      <span>
        <AlertDialog>
          <Button 
            className="w-full font-bold rounded-xl h-9" 
            variant="danger" 
            isDisabled={hasProposals}
          > 
            <IoTrashBin className="size-4 mr-1" /> Delete Task
          </Button>
          
          <AlertDialog.Backdrop>
            <AlertDialog.Container>
              <AlertDialog.Dialog className="sm:max-w-[400px] bg-zinc-950 border border-zinc-900 text-white p-6 rounded-2xl font-manrope">
                <AlertDialog.CloseTrigger />
                <AlertDialog.Header className="flex flex-col items-center gap-2">
                  <AlertDialog.Icon status="danger" />
                  <AlertDialog.Heading className="text-lg font-black text-zinc-100">Delete Task?</AlertDialog.Heading>
                </AlertDialog.Header>
                
                <AlertDialog.Body className="text-center">
                  <p className="text-sm text-zinc-400">
                    Are you sure you want to permanently delete this task? This platform action cannot be undone.
                  </p>
                </AlertDialog.Body>
                
                <AlertDialog.Footer className="flex items-center justify-center gap-3 mt-4">
                  <Button slot="close" variant="bordered" className="border-zinc-800 text-zinc-300 rounded-xl font-bold text-xs h-9">
                    Cancel
                  </Button>
                  <Button 
                    onClick={handelDelete} 
                    slot="close" 
                    variant="danger"
                    isLoading={isDeleting}
                    className="bg-rose-600 text-white hover:bg-rose-700 rounded-xl font-bold text-xs h-9"
                  >
                    Delete Permanently
                  </Button>
                </AlertDialog.Footer>
              </AlertDialog.Dialog>
            </AlertDialog.Container>
          </AlertDialog.Backdrop>
        </AlertDialog> 
      </span>
    </Tooltip>
  );
}