import AdminStatics from '@/components/DashBoard/admin/AdminStatics';
import { getStaticData } from '@/lib/api/admin';
import React from 'react';

const adminDashboardPage = async() => {
    const data = await getStaticData();
    
    return (
        <div>
            <AdminStatics data={data}/>
        </div>
    );
};

export default adminDashboardPage;