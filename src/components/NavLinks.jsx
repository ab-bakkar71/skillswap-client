import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const NavLinks = () => {
    const pathName = usePathname()
    return (
        
              <div>
            <Link href="/" className={`text-[16px] py-2 px-4 rounded-sm mx-2 font-semibold ${pathName === "/" ? "text-violet-600 underline" : "hover:text-violet-600 hover:underline transition duration-300"}`}> Home
            </Link>
            <Link href="/tasks" className={`text-[16px] py-2 px-4 rounded-sm mr-2 font-semibold ${pathName === "/tasks" ? "text-violet-600 underline" : "hover:text-violet-600 hover:underline transition duration-300"}`}> Browse Tasks
            </Link>
            
            <Link href="/freelancers" className={`text-[16px] py-2 px-4 rounded-sm mr-2 font-semibold ${pathName === "/freelancers" ? "text-violet-600 underline" : "hover:text-violet-600 hover:underline transition duration-300"}`}> Browse Freelancers
            </Link>
            
        
        </div>
    );
};

export default NavLinks;