'use client';
import React from 'react';
import ViewComplaints from '../../../../../components/ViewComplaints';
import Navbar from '../../../../../components/AdminNavBar';
const ViewComplaintsPage = ({ params }) => {
    // console.log(params);
    return (
        <div>
            <Navbar />
            <ViewComplaints id={React.use(params).id} role='Admin' />
        </div>
    );
};

export default ViewComplaintsPage;