'use client';
import Activities from '../../../../components/Activities'; // Adjust the import path as needed
import Activity from '../../../../components/activity';
import Allcreated from '../../../../components/allcreated';
import Navbar from '../../../../components/Navbar'; // Assuming you have a Navbar component

const activitypage = () => {
    return (
        <div>
            <Navbar />
            <h1>Activity Page</h1>
            <Activity></Activity>
        </div>
    );
};

export default activitypage;