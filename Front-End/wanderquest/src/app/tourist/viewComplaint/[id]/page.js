'use client';
import React from 'react';
import ViewComplaints from '../../../../../components/ViewComplaints';
const ViewComplaintsPage = ({params}) => {
    // console.log(params);
    return (
        <div>
            <ViewComplaints id = {React.use(params).id} role='Tourist' />
        </div>
    );
};

export default ViewComplaintsPage;