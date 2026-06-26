
import ProposalTable from '@/components/DashBoard/freelancer/ProposalTable';
import { getProposal } from '@/lib/api/freelancer';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const ProposalMangePage = async() => {
        const user = await getUserSession();
        const email = user?.email;
        const proposals = await getProposal(email);
    
    return (
        <div>
            <ProposalTable proposals={proposals}/>
        </div>
    );
};

export default ProposalMangePage;