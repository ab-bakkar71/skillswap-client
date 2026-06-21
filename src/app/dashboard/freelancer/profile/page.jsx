import ProfilePage from '@/components/DashBoard/Profile';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const freelancerProfile = async() => {
    const user = await getUserSession();
    return (
        <div>
           <ProfilePage user={user} />
        </div>
    );
};

export default freelancerProfile;