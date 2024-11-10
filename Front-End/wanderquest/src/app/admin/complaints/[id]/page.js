'use client';
import React from 'react';
import ViewComplaints from '../../../../../components/ViewComplaints';
const ViewComplaintsPage = ({params}) => {
    // console.log(params);
    return (
        <div>
            <ViewComplaints id = {params.id} role='Admin' />
        </div>
    );
};

export default ViewComplaintsPage;