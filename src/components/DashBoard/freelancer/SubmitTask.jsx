"use client"
import { submitTask } from '@/lib/actions/freelancer';
import { Button, Input, Label, Modal, Surface, TextField } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';

const SubmitTask = ({proposal}) => {
    const router = useRouter();
    const handleSubmit = async(e) => {
        e.preventDefault();
        // Handle form submission logic here
        const formData = new FormData(e.currentTarget);
        const deliveryUrl = Object.fromEntries(formData.entries());
        
        const result = await submitTask(proposal._id, deliveryUrl.deliverableUrl);
        if (result && (result.modifiedCount > 0 || result.matchedCount > 0)) { 
                  
                  toast.success("Task marked as completed successfully!"); 
                  
                  router.push('/freelancer/dashboard/proposals');
               }


    }
    return (
        <div>
            <Modal>
                <Button
                    variant="secondary"
                    className="inline-flex items-center gap-1.5 font-bold text-xs bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white rounded-xl transition-all duration-200 h-8 px-3 cursor-pointer"
                >
                    Submit Task
                </Button>

                <Modal.Backdrop className="bg-black/60 backdrop-blur-sm">
                    <Modal.Container placement="center">
                        <Modal.Dialog className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-950 text-white shadow-2xl">

                            <Modal.CloseTrigger className="absolute right-5 top-5 rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-900 hover:text-white transition-colors cursor-pointer" />

                            <Modal.Header className="border-b border-zinc-900 px-6 pt-6 pb-4">
                                <Modal.Heading className="text-xl font-bold text-white">
                                    Submit Deliverable
                                </Modal.Heading>

                                <p className="mt-2 text-sm leading-6 text-zinc-400">
                                    Provide a link to your completed work for this task.
                                    This can be a Google Docs link, GitHub repository,
                                    Figma design, or any publicly accessible URL.
                                </p>
                            </Modal.Header>

                            <Modal.Body className="px-6 py-5">

                                <Surface variant="default" className="bg-transparent shadow-none p-0">

                                    <form className="space-y-5" onSubmit={handleSubmit}>

                                        <TextField
                                            className="w-full"
                                            name="deliverableUrl"
                                            type="text"
                                            variant="secondary"
                                        >
                                            <Label className="mb-2 text-sm font-semibold text-zinc-300">
                                                Deliverable URL
                                            </Label>

                                            <Input
                                                placeholder="https://docs.google.com/document/d/..."
                                                className="w-full"
                                            />
                                        </TextField>

                                        <p className="text-xs text-zinc-500">
                                            Paste a link to Google Docs, GitHub, Figma, or any
                                            other deliverable that demonstrates your completed
                                            work.
                                        </p>
                                        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
                                            <p className="text-sm leading-6 text-amber-300">
                                                <span className="font-semibold">Note:</span> Once
                                                you mark this task as completed, the task status
                                                cannot be reverted. Make sure your work is ready
                                                before submitting.
                                            </p>
                                        </div>
                                        <Modal.Footer className="flex gap-3 border-t border-zinc-900 px-6 py-5">
                                            <Button
                                                slot="close"
                                                variant="secondary"
                                                className="flex-1 h-11 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800">
                                                Cancel
                                            </Button>
                                            <Button
                                                slot="close"
                                                type="submit"
                                                className="flex-1 h-11 rounded-xl bg-emerald-600 font-semibold text-white hover:bg-emerald-500">
                                                ✓ Mark as Completed
                                            </Button>
                                        </Modal.Footer>
                                    </form>
                                </Surface>
                            </Modal.Body>


                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </div>
    );
};

export default SubmitTask;