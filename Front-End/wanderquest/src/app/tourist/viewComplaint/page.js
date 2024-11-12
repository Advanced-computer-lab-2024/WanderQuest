'use client';
import React from 'react';
import Complaints from '../../../../components/Complaints';
import Navbar from '../../../../components/Navbar';
const ViewComplaintPage = () => {
    // console.log(params);
    return (
        <div>
            <Navbar/>
            <Complaints role='Tourist' />
        </div>
    );
};

export default ViewComplaintPage;