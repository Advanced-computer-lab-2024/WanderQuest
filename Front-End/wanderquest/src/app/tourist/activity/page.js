'use client';
import Activities from '../../../../components/Activities'; // Adjust the import path as needed
import Navbar from '../../../../components/Navbar'; // Assuming you have a Navbar component

const activitypage = () => {
    return (
        <div>
            <Navbar />
            <h1>Activity Page</h1>
            <Activities role={"Tourist"}></Activities>
        </div>
    );
};

export default activitypage;