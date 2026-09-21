import ProfilePage from '@/components/DashBoard/Profile';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

export const metadata = {
  title: "Admin Profile - SkillSwap",
  description: "View and manage your administrator profile on SkillSwap.",
};

const AdminProfilePage = async () => {
    const user = await getUserSession();
    return (
        <div>
            <ProfilePage user={user} />
        </div>
    );
};

export default AdminProfilePage;
