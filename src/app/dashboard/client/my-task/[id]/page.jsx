
import ProposalClient from '@/components/DashBoard/Client/ProposalClient';
import { getProposalById } from '@/lib/api/client';
import { getTaskById } from '@/lib/api/freelancer';
import { Button, Card } from '@heroui/react';
import { BiGlobe } from 'react-icons/bi';
import { FaRegEdit, FaRegUserCircle } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import { IoLogoUsd } from 'react-icons/io';
import { IoCalendarNumberOutline, IoCheckmarkSharp, IoTrashBin } from 'react-icons/io5';
import { MdDeleteForever } from 'react-icons/md';

const taskIdPage = async ({ params }) => {
    const { id } = await params;
    const task = await getTaskById(id);
    const proposals = await getProposalById(id);


    return (
        <section className='max-w-5xl mx-auto'>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white leading-tight mb-6">{task.title}</h1>
            <Card className='w-full bg-zinc-900/20 border border-zinc-800/80 hover:border-brand-accent/40 rounded-2xl p-5 md:p-6 backdrop-blur-xl hover:shadow-xl hover:shadow-violet-500/5  transition-all duration-300 flex flex-col justify-between gap-4 group cursor-pointer'>
                <div className="flex flex-wrap items-center gap-3 md:gap-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border shadow-sm transition-all duration-200 ${task.status === 'open'
                        ? 'bg-blue-500/10 border-blue-500/30 text-blue-400 animate-pulse'
                        : task.status === 'in-progress'
                            ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                            : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                        }`}>
                        {task.status === 'open' && 'Open'}
                        {task.status === 'in-progress' && 'In Progress'}
                        {task.status === 'completed' && 'Completed'}
                    </span>

                    <span className="text-xs font-semibold bg-zinc-800/40 border border-zinc-700/50 text-zinc-300 px-2.5 py-1 rounded-md capitalize">
                        {task.category.replace('-', ' ')}
                    </span>


                    <div className="text-xs flex items-center gap-1 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md">
                        <IoLogoUsd />
                        <span>{task.budget}</span>
                    </div>


                    <div className="flex items-center gap-1.5 text-zinc-400 text-xs">
                        <IoCalendarNumberOutline className="w-3.5 h-3.5 text-zinc-500" />
                        <span>{task.deadline}</span>
                    </div>

                </div>
                <p className="text-xs md:text-sm text-zinc-400 leading-relaxed line-clamp-1">
                    {task.description}
                </p>
                <div className="flex flex-wrap items-center justify-start gap-3 pt-3 border-t border-zinc-800/40 w-full mt-auto">
                    {
                        task.status === 'open' ? (

                            <div className="flex items-center gap-2">
                                <Button
                                    size="sm"
                                    variant="bordered"
                                    className="border-zinc-800 text-zinc-300 hover:border-brand-accent hover:text-white rounded-xl font-bold text-xs h-9 px-4"
                                >
                                    <FaRegEdit className="text-sm" />
                                    Edit
                                </Button>

                                <Button
                                    size="sm"
                                    color="danger"
                                    variant="flat"
                                    className="bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white rounded-xl font-bold text-xs h-9 px-4"
                                >
                                    <MdDeleteForever className="text-base" />
                                    Delete
                                </Button>
                            </div>
                        ) : (

                            <div className="flex items-center gap-2 opacity-40 cursor-not-allowed">
                                <Button size="sm" variant="bordered" isDisabled className="rounded-xl font-bold text-xs h-9 px-4">
                                    <FaRegEdit className="text-sm" />
                                    Edit
                                </Button>

                                <Button size="sm" variant="flat" isDisabled className="rounded-xl font-bold text-xs h-9 px-4">
                                    <MdDeleteForever className="text-base" />
                                    Delete
                                </Button>
                            </div>
                        )
                    }
                </div>
            </Card>
            {/* for proposal */}

                   <ProposalClient proposals={proposals}/>
      
        </section>
    );
};

export default taskIdPage;