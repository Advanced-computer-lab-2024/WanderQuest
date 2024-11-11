'use client';
import React from 'react';
import Complaints from '../../../../components/Complaints';
import Navbar from '../../../../components/Navbar';

const ComplaintsPage = () => {
    return (
        <div>
            <Navbar/>
            <Complaints role='Admin' />
        </div>
    );
};

export default ComplaintsPage;