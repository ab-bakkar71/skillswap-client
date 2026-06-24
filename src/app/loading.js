import React from 'react';
import { GridLoader } from 'react-spinners';

const loading = () => {
    return (
        <div className='flex flex-col items-center justify-center gap-2 min-h-screen'>
            <GridLoader color="#7c3aed" />
        </div>
    );
};

export default loading;