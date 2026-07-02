import { Button, Table, Tooltip } from '@heroui/react';
import React from 'react';
import { FiActivity, FiCheckCircle, FiClock, FiTrash2 } from 'react-icons/fi';
import DeleteTask from './DeleteTask';

const TaskManagement = ({tasks}) => {
    return (
        <Table removeWrapper className="bg-zinc-950/40 border border-zinc-900 rounded-2xl p-4 backdrop-blur-xl">
        <Table.ScrollContainer>
          <Table.Content aria-label="Task Management Table" className="min-w-[850px]">
            
            <Table.Header >
              <Table.Column isRowHeader className="bg-zinc-900/60 text-zinc-400 font-bold text-xs uppercase py-4">TASK TITLE</Table.Column>
              <Table.Column className="bg-zinc-900/60 text-zinc-400 font-bold text-xs uppercase py-4">POSTED BY</Table.Column>
              <Table.Column className="bg-zinc-900/60 text-zinc-400 font-bold text-xs uppercase py-4">BUDGET</Table.Column>
              <Table.Column className="bg-zinc-900/60 text-zinc-400 font-bold text-xs uppercase py-4">LIVE STATUS</Table.Column>
              <Table.Column className="bg-zinc-900/60 text-zinc-400 font-bold text-xs uppercase py-4 text-center">ACTIONS</Table.Column>
            </Table.Header>

            <Table.Body>
              {Array.isArray(tasks) && tasks.length > 0 ? (
                tasks.map((task) => {
                  const currentStatus = task.status?.toLowerCase() || 'open';
                

                  return (
                    <Table.Row key={task._id} className="border-b border-zinc-900/60 hover:bg-zinc-900/20 transition-colors">
                      
                 
                      <Table.Cell className="py-4 font-bold text-zinc-100 max-w-[280px] truncate">
                        {task.title}
                      </Table.Cell>
                      
                 
                      <Table.Cell className="text-zinc-400 text-sm font-medium">
                        {task.clientEmail}
                      </Table.Cell>
                      
                  
                      <Table.Cell className="font-black text-emerald-400">
                        ${task.budget || task.proposedBudget || "0"}
                      </Table.Cell>
                      
                  
                      <Table.Cell>
                        <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full border shadow-sm transition-all duration-200 ${
                          currentStatus === 'open' || currentStatus === 'pending'
                            ? 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                            : currentStatus === 'in-progress'
                              ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 animate-pulse'
                              : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                        }`}>
                          {currentStatus === 'open' && <FiClock />}
                          {currentStatus === 'in-progress' && <FiActivity />}
                          {currentStatus === 'completed' && <FiCheckCircle />}
                          <span className="capitalize">{currentStatus}</span>
                        </span>
                      </Table.Cell>
                      
                    
                      <Table.Cell className="text-center">
                        <Tooltip content="Delete for Bad Text/Safety Violation" color="danger" className="rounded-md text-xs">
                          <DeleteTask task={task} />
                        </Tooltip>
                      </Table.Cell>

                    </Table.Row>
                  );
                })
              ) : (
               
                <Table.Row>
                  <Table.Cell colSpan={5} className="text-center py-12 text-zinc-500 text-sm">
                    No tasks found on the platform.
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>

          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    );
};

export default TaskManagement;