import ProfilePage from '@/components/DashBoard/Profile';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const ClientProfilePage = async() => {
    const user = await getUserSession();
    return (
        <div>
            <ProfilePage user={user}/>
        </div>
    );
};

export default ClientProfilePage;