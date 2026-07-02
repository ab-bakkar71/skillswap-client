"use client";

import {
  Button,
  Modal,
  Surface,
} from "@heroui/react";

const ViewSubmission = ({ proposal }) => {
  return (
    <Modal>
      <Button
        variant="secondary"
        className="inline-flex items-center gap-2 font-bold text-xs
        bg-sky-500/10 border border-sky-500/20
        text-sky-400 hover:bg-sky-500 hover:text-white
        rounded-xl transition-all duration-200 h-8 px-3 cursor-pointer"
      >
        View
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-lg bg-zinc-950 border border-zinc-800 rounded-2xl">

            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Heading className="text-white">
                Submitted Deliverable
              </Modal.Heading>
            </Modal.Header>

            <Modal.Body className="space-y-5">

              <Surface
                variant="default"
                className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4"
              >
                <h4 className="text-sm font-semibold text-white mb-2">
                  Task
                </h4>

                <p className="text-zinc-400">
                  {proposal.taskTitle}
                </p>
              </Surface>

              <Surface
                variant="default"
                className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4"
              >
                <h4 className="text-sm font-semibold text-white mb-2">
                  Deliverable URL
                </h4>

                <a
                  href={proposal.deliverableUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-accent break-all hover:underline"
                >
                  {proposal.deliverableUrl}
                </a>
              </Surface>

              {proposal.completedAt && (
                <Surface
                  variant="default"
                  className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4"
                >
                  <h4 className="text-sm font-semibold text-white mb-2">
                    Submitted On
                  </h4>

                  <p className="text-zinc-400">
                    {new Date(proposal.completedAt).toLocaleString()}
                  </p>
                </Surface>
              )}

            </Modal.Body>

            <Modal.Footer>

              <Button slot="close" variant="secondary">
                Close
              </Button>

            </Modal.Footer>

          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default ViewSubmission;