import { Table } from '@heroui/react';
import React from 'react';
import { FiSend } from 'react-icons/fi';

const ActiveProposal = ({activeProposal}) => {
    return (
        <Table >
        <Table.ScrollContainer>
          <Table.Content aria-label="Freelancer Active Tasks" className="min-w-[600px]">
            
            {/* ১. টেবিল হেডার সেকশন */}
            <Table.Header>
              <Table.Column isRowHeader>Task Title</Table.Column>
              <Table.Column>Client Email</Table.Column>
              <Table.Column>Your Bid</Table.Column>
              <Table.Column>Duration</Table.Column>
              <Table.Column className="text-center">Action</Table.Column>
            </Table.Header>

            {/* ২. ডাইনামিক টেবিল বডি সেকশন */}
            <Table.Body>
              {Array.isArray(activeProposal) && activeProposal.length > 0 ? (
                activeProposal.map((proposal) => (
                  <Table.Row key={proposal._id}>
                    {/* কলাম ১: Task Title */}
                    <Table.Cell className="font-semibold text-white max-w-[220px] truncate">
                      {proposal.taskTitle}
                    </Table.Cell>
                    
                    {/* কলাম ২: Client Email */}
                    <Table.Cell className="text-zinc-400">
                      {proposal.clientEmail}
                    </Table.Cell>
                    
                    {/* কলাম ৩: Your Bid (বাজেট) */}
                    <Table.Cell className="font-black text-emerald-400">
                      ${proposal.proposedBudget}
                    </Table.Cell>
                    
                    {/* কলাম ৪: Duration */}
                    <Table.Cell className="text-zinc-500 text-xs">
                      {proposal.estimatedDays} {Number(proposal.estimatedDays) === 1 ? 'Day' : 'Days'}
                    </Table.Cell>
                    
                    {/* কলাম ৫: Action বাটন */}
                    <Table.Cell className="text-center">
                      <button 
                        // onClick={() => alert(`Submitting work for: ${task.taskTitle}`)}
                        className="inline-flex items-center gap-1.5 font-bold text-xs bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white rounded-xl transition-all duration-200 h-8 px-3 cursor-pointer"
                      >
                        <FiSend className="text-xs" />
                        Submit Work
                      </button>
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                /* ডাটা না থাকলে সেফটি মেসেজ */
                <Table.Row>
                  <Table.Cell colSpan={5} className="text-center py-8 text-zinc-500 text-sm">
                    No active tasks at the moment.
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>

          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    );
};

export default ActiveProposal;