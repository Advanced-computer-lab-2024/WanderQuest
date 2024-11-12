'use client';
import Activities from '../../../../components/Activities'; // Adjust the import path as needed
import Navbar from '../../../../components/Navbar'; // Assuming you have a Navbar component

const activityguestpage = () => {
    return (
        <div>
            <Navbar />
            <h1>Activity/events Page</h1>
            <Activities role={"Admin"}></Activities>
        </div>
    );
};

export default activityguestpage;