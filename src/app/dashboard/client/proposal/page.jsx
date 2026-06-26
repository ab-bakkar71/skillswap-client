
import ProposalClient from '@/components/DashBoard/Client/ProposalClient';
import { getProposal } from '@/lib/api/client';
import { getUserSession } from '@/lib/core/session';
import React from 'react';


const proposalPage = async () => {
    const user = await getUserSession();
    const email = user?.email;
    const proposals = await getProposal(email);

    return (
        <ProposalClient proposals={proposals}/>
    );
};

export default proposalPage;