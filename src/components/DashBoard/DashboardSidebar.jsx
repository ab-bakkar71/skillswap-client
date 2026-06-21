"use client"
import { authClient } from "@/lib/auth-client";
import { Avatar, Button, Drawer } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CiCirclePlus } from "react-icons/ci";
import { FaRegFileAlt, FaRegUserCircle } from "react-icons/fa";
import { GoProjectRoadmap, GoTasklist } from "react-icons/go";
import { IoIosLogOut, IoIosSearch } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { LuUsers } from "react-icons/lu";
import { MdOutlineDashboard } from "react-icons/md";
import { PiCurrencyDollarBold } from "react-icons/pi";

export function DashboardSidebar() {
    const router = useRouter();

    const { data: session } = authClient.useSession();
    const user = session?.user;
    const role = user?.role || 'buyer'


    const dashBoardItems = {
        "freelancer":
            [
                { icon: MdOutlineDashboard, href: "/dashboard/freelancer", label: "Overview" },
                { icon: IoIosSearch, href: "/tasks", label: "Browse Tasks" },
                { icon: GoProjectRoadmap, href: "/dashboard/freelancer/active-project", label: "Active Project" },
                { icon: FaRegFileAlt, href: "/dashboard/freelancer/Proposals", label: "My Proposals" },
                { icon: PiCurrencyDollarBold, href: "/dashboard/freelancer/earn", label: "Earn" },
                { icon: FaRegUserCircle, href: "/dashboard/freelancer/profile", label: "Profile" },
            ],
        "client":
            [
                { icon: MdOutlineDashboard, href: "/dashboard/client", label: "Overview" },
                { icon: CiCirclePlus, href: "/dashboard/client/post-task", label: "Post Task" },
                { icon: GoTasklist, href: "/dashboard/client/my-task", label: "My Task" },
                { icon: PiCurrencyDollarBold, href: "/dashboard/client/proposal", label: "Proposals" },
                { icon: PiCurrencyDollarBold, href: "/dashboard/client/payment", label: "Payment" },
                { icon: FaRegUserCircle, href: "/dashboard/client/profile", label: "Profile" },
            ],
        "admin":
            [
                { icon: MdOutlineDashboard, href: "/dashboard/admin", label: "Overview" },
                { icon: LuUsers, href: "/dashboard/admin/user", label: "user" },
                { icon: GoTasklist, href: "/dashboard/admin/task", label: "Task" },
                { icon: PiCurrencyDollarBold, href: "/dashboard/admin/payment", label: "Payment" },

            ],

    }

    const navItems = dashBoardItems[role]

    const roleStyles = {
        admin: "bg-pink-500/15 text-pink-400",
        freelancer: "bg-violet-500/15 text-violet-400",
        client: "bg-emerald-500/15 text-emerald-400",
    };

    const handelLogOut = async () => {
        await authClient.signOut();
        router.refresh(); 
        router.push("/");
    };

    const navContent = (
        <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
                <Link
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                    href={item.href}
                >
                    <item.icon className="size-5 text-muted" />
                    {item.label}
                </Link>
            ))}
        </nav>
    );

    const profileBlock = (
        <div className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-2xl bg-zinc-900/40 border border-default">
            <div className="flex items-center gap-3">
                <Avatar className="bg-amber-200/90 text-amber-700 font-semibold">
                    <Avatar.Image alt={user?.name} src={user?.image} />
                    <Avatar.Fallback>{user?.name ? user.name[0].toUpperCase() : "U"}</Avatar.Fallback>
                </Avatar>
                <div>
                    <h3 className="text-sm font-medium text-foreground leading-tight">{user?.name}</h3>
                    <span
                        className={`inline-block mt-1 text-[11px] font-medium px-2 py-0.5 rounded-full capitalize ${roleStyles[role] ?? "bg-zinc-500/15 text-zinc-400"
                            }`}
                    >
                        {role}
                    </span>
                </div>
            </div>

            <Button onClick={handelLogOut} variant="tertiary" className="text-muted hover:text-red-500 p-1.5">
                <IoIosLogOut className="size-5" />
            </Button>
        </div>
    );



    const logo = (
        <div>
            <Link href="/" className="flex items-center gap-2 group select-none">
                <svg width="240" height="40" viewBox="0 0 240 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-9 transition-transform duration-300 group-hover:scale-105">
                    <g className="transition-transform duration-500 group-hover:rotate-12">
                        <path d="M15.5 2L29 11v18L15.5 38 2 29V11L15.5 2z" stroke="url(#violet-gradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M11 16h9m0 0l-3-3m3 3l-3 3M20 24H11m0 0l3-3m-3 3l3 3" stroke="#f8fafc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                    <text x="42" y="28" fill="#f8fafc" className="font-manrope font-extrabold text-[24px] tracking-wide">
                        SkillSwap
                    </text>
                    <defs>
                        <linearGradient id="violet-gradient" x1="2" y1="2" x2="29" y2="38" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#d946ef" />
                        </linearGradient>
                    </defs>
                </svg>
            </Link>
        </div>
    );

    return (
        <>
            {/* for small devices */}
            <div className="lg:hidden h-screen w-full flex items-center gap-3 px-4 py-3 border-b border-default bg-background">
                <Drawer>
                    <Drawer.Trigger className="p-1.5 rounded-lg hover:bg-default transition-colors">
                        <IoMenu className="size-6" />
                    </Drawer.Trigger>
                    <Drawer.Backdrop>
                        <Drawer.Content placement="left">
                            <Drawer.Dialog className="flex flex-col h-full justify-between w-72">
                                <div>
                                    <Drawer.Header className="flex items-center justify-between px-4 py-3">
                                        <Drawer.Heading>
                                            <span className="font-manrope font-extrabold text-lg tracking-wide bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                                                SkillSwap
                                            </span>
                                        </Drawer.Heading>
                                        <Drawer.CloseTrigger className="p-1.5 rounded-lg hover:bg-default transition-colors" />
                                    </Drawer.Header>
                                    <Drawer.Body className="px-4">
                                        {navContent}
                                    </Drawer.Body>
                                </div>

                                <div className="p-4">
                                    {profileBlock}
                                </div>
                            </Drawer.Dialog>
                        </Drawer.Content>
                    </Drawer.Backdrop>
                </Drawer>

                <Link href="/" className="flex items-center select-none">
                    <span className="font-manrope font-extrabold text-lg tracking-wide bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                        SkillSwap
                    </span>
                </Link>
            </div>

            {/* for desktop */}
            <div className="hidden lg:flex h-screen flex-col justify-between border-r border-default w-64 shrink-0 p-4">
                <div>
                    {logo}
                    <aside className="mt-6">
                        {navContent}
                    </aside>
                </div>

                {profileBlock}
            </div>
        </>
    );
}