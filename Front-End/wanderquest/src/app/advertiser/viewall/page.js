'use client';
import Activities from '../../../../components/Activities'; // Adjust the import path as needed
import Allcreated from '../../../../components/allcreated';
import Navbar from '../../../../components/Navbar'; // Assuming you have a Navbar component

const activitypagew = () => {
    return (
        <div>
            <Navbar />
            <h1>Activity Page</h1>
            <Allcreated></Allcreated>
        </div>
    );
};

export default activitypagew;