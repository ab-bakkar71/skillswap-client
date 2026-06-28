import { getUserSession } from '@/lib/core/session';
import { Card } from '@heroui/react';
import React from 'react';
import { BiBriefcase } from 'react-icons/bi';
import { BsActivity } from 'react-icons/bs';
import { FaDollarSign, FaUser, FaUserSecret } from 'react-icons/fa';

const AdminStatics = async({data}) => {

    const stats = [
    {
      id: 1,
      title: "Total Users",
      value: data?.totalUsers || 0,
      percentage: "+12%",
      timeline: "vs last month",
      isPositive: true,
      icon: <FaUser className="w-5 h-5 text-blue-400" />,
      bgIcon: "bg-blue-500/10 border-blue-500/20",
      glowColor: "hover:shadow-blue-500/5"
    },
    {
      id: 2,
      title: "Total Tasks",
      value: data?.totalTasks,
      percentage: "+8%",
      timeline: "vs last month",
      isPositive: true,
      icon: <BiBriefcase className="w-5 h-5 text-amber-500" />,
      bgIcon: "bg-amber-500/10 border-amber-500/20",
      glowColor: "hover:shadow-amber-500/5"
    },
    {
      id: 3,
      title: "Total Revenue (USD)",

      percentage: "82%",
      timeline: "adoption rate",
      isPositive: null,
      icon: <FaDollarSign className="w-5 h-5 text-emerald-400" />,
      bgIcon: "bg-emerald-500/10 border-emerald-500/20",
      glowColor: "hover:shadow-emerald-500/5"
    },
    {
      id: 4,
      title: "Active Tasks",
      value: data?.activeTasks,
      percentage: "+15%",
      timeline: "vs last week",
      isPositive: true,
      icon: <BsActivity className="w-5 h-5 text-purple-400" />,
      bgIcon: "bg-purple-500/10 border-purple-500/20",
      glowColor: "hover:shadow-purple-500/5"
    }
  ];
    return (
        <div className="w-full font-manrope space-y-4">
   
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full p-10">
        {stats.map((item) => (
          <Card
            key={item.id}
            className={`group bg-zinc-900/30 border border-zinc-800/80 hover:border-zinc-700/60 rounded-2xl p-6 flex flex-col justify-between backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 shadow-lg min-h-[160px] ${item.glowColor}`}
          >
            <div className={`w-10 h-10 ${item.bgIcon} border rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200 mb-4`}>
              {item.icon}
            </div>

            <div className="space-y-1 mt-auto">
              <p className="text-2xl font-black text-white tracking-tight">
                {item.value}
              </p>
              <p className="text-xs font-semibold text-zinc-400 tracking-wide">
                {item.title}
              </p>
              
              <p className="text-[11px] font-medium text-zinc-500 mt-1 flex items-center gap-1 flex-wrap">
                <span className={item.isPositive === true || item.isPositive === null ? "text-emerald-400 font-bold" : "text-zinc-400"}>
                  {item.percentage}
                </span>
                <span>{item.timeline}</span>
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
    );
};

export default AdminStatics;