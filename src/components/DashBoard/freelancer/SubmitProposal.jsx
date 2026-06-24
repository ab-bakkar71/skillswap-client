import { Button, Card, Input, TextArea } from '@heroui/react';
import React from 'react';
import { IoPaperPlaneOutline } from 'react-icons/io5';

const SubmitProposal = () => {
    return (
        <Card className="bg-zinc-950/40 border border-zinc-900 p-6 rounded-2xl backdrop-blur-xl space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-lg border-b border-zinc-900 pb-3">
              <IoPaperPlaneOutline className="text-brand-accent w-5 h-5" />
              <h2>Submit a Proposal</h2>
            </div>
            
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Input 
                  type="number" 
                  label="Proposed Budget (USD)" 
                  placeholder="e.g. 50" 
                  labelPlacement="outside"
                  variant="bordered"
                  className="w-full text-white"
                />
                <Input 
                  type="number" 
                  label="Estimated Days" 
                  placeholder="e.g. 3" 
                  labelPlacement="outside"
                  variant="bordered"
                  className="w-full text-white"
                />
              </div>

              <TextArea
                label="Cover Note"
                placeholder="Explain why you're the best fit for this task..."
                labelPlacement="outside"
                variant="bordered"
                rows={4}
                className="w-full text-white"
              />

              <Button className="w-full bg-brand-accent hover:bg-violet-600 text-white font-bold h-11 rounded-xl transition-all duration-200 shadow-lg shadow-violet-500/10 active:scale-98">
                Submit Proposal
              </Button>
            </form>
          </Card>
    );
};

export default SubmitProposal;