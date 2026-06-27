import { Card } from '@heroui/react';
import React from 'react';
import { BiSend } from 'react-icons/bi';
import { CgLock } from 'react-icons/cg';
import { FaDollarSign } from 'react-icons/fa';
import { MdCheckCircle } from 'react-icons/md';


const DashboardStatistics = ({proposal}) => {

    const totalProposalsCount = proposal?.length || 0;

  const pendingCount = Array.isArray(proposal)
    ? proposal.filter(p => p?.status?.toLowerCase() === 'pending').length
    : 0;

  const acceptedCount = Array.isArray(proposal)
    ? proposal.filter(p => p?.status?.toLowerCase() === 'accepted').length
    : 0;

  // ২. 
  const totalEarnings = Array.isArray(proposal)
    ? proposal
        .filter(p => p?.status?.toLowerCase() === 'accepted')
        .reduce((sum, p) => sum + (Number(p?.proposedBudget) || 0), 0)
    : 0;


    const stats = [
    {
      id: 1,
      title: "Total Proposals",
      value: totalProposalsCount,
      icon: <BiSend className="w-5 h-5 text-blue-400" />,
      glowColor: "hover:shadow-blue-500/5",
      accentColor: "text-zinc-100"
    },
    {
      id: 2,
      title: "Pending Proposals",
      value: pendingCount,
      icon: <CgLock className="w-5 h-5 text-amber-500 animate-pulse" />,
      glowColor: "hover:shadow-amber-500/5",
      accentColor: "text-amber-400"
    },
    {
      id: 3,
      title: "Accepted Proposals",
      value: acceptedCount,
      icon: <MdCheckCircle className="w-5 h-5 text-indigo-400" />,
      glowColor: "hover:shadow-indigo-500/5",
      accentColor: "text-indigo-400"
    },
    {
      id: 4,
      title: "Total Earnings (USD)",
      value: `$${totalEarnings.toLocaleString()}`, 
      icon: <FaDollarSign className="w-5 h-5 text-emerald-400" />,
      glowColor: "hover:shadow-emerald-500/5",
      accentColor: "text-emerald-400"
    }
  ];
    return (
        <div className="w-full font-manrope space-y-4">
     
      <h3 className="text-sm font-bold text-zinc-400 tracking-wider uppercase">
        Dashboard Main Statistics
      </h3>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full pr-10">
        {stats.map((item) => (
          <Card
            key={item.id}
            className={`group bg-zinc-900/30 border border-zinc-800/80 hover:border-zinc-700/60 rounded-2xl p-5 flex flex-row items-center justify-between backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 shadow-lg ${item.glowColor}`}
          >
       
            <div className="space-y-1">
              <p className="text-xs font-semibold text-zinc-500 tracking-wide uppercase">
                {item.title}
              </p>
              <p className={`text-2xl font-black tracking-tight ${item.accentColor}`}>
                {item.value}
              </p>
            </div>

       
            <div className="p-3 bg-zinc-950/80 border border-zinc-800/80 rounded-xl group-hover:scale-105 transition-transform duration-200">
              {item.icon}
            </div>
          </Card>
        ))}
      </div>
    </div>
    );
};

export default DashboardStatistics;