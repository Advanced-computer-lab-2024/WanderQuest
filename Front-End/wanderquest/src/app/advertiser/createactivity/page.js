'use client';
import Navbar from '../../../../components/Navbar';
import Activity from '../../../../components/activity';
import Image from 'next/image';

const createactivity = () => {

    return(
        <div>
            <Navbar />
            <Image src="/imgs/types-of-tourism.jpg" alt="Activities" layout="responsive" width={1000} height={500} />
            <Activity></Activity>
        </div>
    );
};

export default createactivity;