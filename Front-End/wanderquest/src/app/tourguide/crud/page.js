'use client';
import Activities from '../../../../components/Activities'; // Adjust the import path as needed
import Cruditinerary from '../../../../components/cruditinerary';
import Navbar from '../../../../components/Navbar'; // Assuming you have a Navbar component

const activitypage = () => {
    return (
        <div>
            <Navbar />
            <h1>Activity Page</h1>
           <Cruditinerary></Cruditinerary>
        </div>
    );
};

export default activitypage;