import UserManagementTable from '@/components/DashBoard/admin/UserManagementTable';
import { getUserData } from '@/lib/api/admin';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const UserManagementPage = async () => {
    const users = await getUserData();
    const currentUser = await getUserSession();
    

    return (

      <>
        <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-bold text-zinc-400 tracking-wider uppercase">
                User Directory
            </h3>
        </div>

        <UserManagementTable users= {users} currentUser={currentUser}/>
      </>
    );
};

export default UserManagementPage;