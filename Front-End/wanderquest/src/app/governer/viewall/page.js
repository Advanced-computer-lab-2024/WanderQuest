'use client';
import Activities from '../../../../components/Activities'; // Adjust the import path as needed
import Allcreated from '../../../../components/allcreated';
import Historicalplaces from '../../../../components/historicalplaces';
import Navbar from '../../../../components/Navbar'; // Assuming you have a Navbar component


//

const activitypage = () => {
    return (
        <div>
            <Navbar />
            {/* <h1>view all Page</h1> */}
            {/* <Allcreated></Allcreated> */}
            <Historicalplaces/>

        </div>
    );
};

export default activitypage;