'use client';
import Navbar from '../../../../components/Navbar';
import Activity from '../../../../components/activity';
import Image from 'next/image';
import Foot from '../../../../components/foot';
import Waterfall from '../../../../imgs/activities.jpeg'


const createactivity = () => {
    return (
        <div>
            <Navbar />
            <Activity />
            <Foot />
        </div>
    );
};

export default createactivity;
