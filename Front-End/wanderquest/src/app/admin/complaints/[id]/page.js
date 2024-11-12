'use client';
import React from 'react';
import ViewComplaints from '../../../../../components/ViewComplaints';
import Navbar from '../../../../../components/Navbar';
const ViewComplaintsPage = ({ params }) => {
    // console.log(params);
    return (
        <div>
            <Navbar />
            <ViewComplaints id={params.id} role='Admin' />
        </div>
    );
};

export default ViewComplaintsPage;