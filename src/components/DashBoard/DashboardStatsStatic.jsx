import { Card } from '@heroui/react';
import React from 'react';
import { BiBriefcase, BiFolderOpen } from 'react-icons/bi';
import { FaDollarSign } from 'react-icons/fa';
import { RiLoader2Fill } from 'react-icons/ri';

const DashboardStatsStatic = ({ task }) => {


  const openTasksCount = Array.isArray(task)
    ? task.filter(t => t?.status?.toLowerCase() === 'open').length
    : 0;

  const inProgressTasksCount = Array.isArray(task)
    ? task.filter(t => t?.status?.toLowerCase() === 'in-progress').length
    : 0;


  const stats = [
    {
      id: 1,
      title: "Total Tasks",
      value: task?.length || 0,
      icon: <BiBriefcase className="w-5 h-5 text-blue-400" />,
      glowColor: "hover:shadow-blue-500/5",
      accentColor: "text-zinc-100"
    },
    {
      id: 2,
      title: "Open Tasks",
      value: openTasksCount || 0,
      icon: <BiFolderOpen className="w-5 h-5 text-amber-500" />,
      glowColor: "hover:shadow-amber-500/5",
      accentColor: "text-amber-400"
    },
    {
      id: 3,
      title: "Tasks In Progress",
      value: inProgressTasksCount || 0,
      icon: <RiLoader2Fill className="w-5 h-5 text-indigo-400 animate-spin [animation-duration:4s]" />,
      glowColor: "hover:shadow-indigo-500/5",
      accentColor: "text-indigo-400"
    },
    {
      id: 4,
      title: "Total Spent (USD)",
      value: "$5,500",
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
            className={`group bg-zinc-900/30 border border-zinc-800/80 hover:border-zinc-700/60 rounded-2xl p-5 flex flex-row items-center justify-between backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 shadow-lg ${item.glowColor}`}>

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

export default DashboardStatsStatic;