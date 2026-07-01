import { rejectProposal } from '@/lib/actions/client';
import { AlertDialog, Button } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaXmark } from 'react-icons/fa6';
import { toast } from 'react-toastify';

const RejectProposal = ({ proposal, isProcessing }) => {
    const router = useRouter();
    const handleReject = async () => {
        const response = await rejectProposal(proposal._id);
        console.log(response);

        if (response && (response.modifiedCount > 0 || response.matchedCount > 0)) {
            toast.success("Proposal successfully rejected! ✖️");
            router.refresh();
        } else {
            toast.error("Failed to update status or already rejected.");
        }

    }
    return (
        <div>
            <AlertDialog>
                <Button isDisabled={proposal.status !== "pending" || isProcessing}
                    variant="danger"
                    className="font-bold text-xs bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white rounded-xl transition-all duration-200 h-9 px-4" >
                    <FaXmark className="text-xs" />
                    Reject
                </Button>
                <AlertDialog.Backdrop>
                    <AlertDialog.Container>
                        <AlertDialog.Dialog className="sm:max-w-[400px]">
                            <AlertDialog.CloseTrigger />
                            <AlertDialog.Header>
                                <AlertDialog.Icon status="danger" />
                                <AlertDialog.Heading>Reject Proposal?</AlertDialog.Heading>
                            </AlertDialog.Header>
                            <AlertDialog.Body>
                                <p>
                                    This will permanently reject the proposal for <strong>{proposal?.taskTitle || 'Unknown Task'}</strong> and all of its
                                    data. This action cannot be undone.
                                </p>
                            </AlertDialog.Body>
                            <AlertDialog.Footer>
                                <Button slot="close" variant="tertiary">
                                    Cancel
                                </Button>
                                <Button slot="close" variant="danger" onClick={handleReject}>
                                    Reject Proposal
                                </Button>
                            </AlertDialog.Footer>
                        </AlertDialog.Dialog>
                    </AlertDialog.Container>
                </AlertDialog.Backdrop>
            </AlertDialog>
        </div>
    );
};

export default RejectProposal;