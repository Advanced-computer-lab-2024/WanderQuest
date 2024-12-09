'use client';
import CrudTransportation from '../../../../components/Transportation';
import Navbar from '../../../../components/Navbar'; // Assuming you have a Navbar component
import Foot from '../../../../components/foot';
import React from 'react';

const transportationpage = () => {
    return (
        <div>
            <Navbar />
            <CrudTransportation></CrudTransportation>
            <Foot />
        </div>
    );
};

export default transportationpage;