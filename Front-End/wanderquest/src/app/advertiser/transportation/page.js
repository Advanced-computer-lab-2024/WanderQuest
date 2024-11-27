'use client';
import Activities from '../../../../components/Activities'; // Adjust the import path as needed
import CrudTransportation from '../../../../components/Transportation';
import Allcreated from '../../../../components/allcreated';
import Navbar from '../../../../components/Navbar'; // Assuming you have a Navbar component

const transportationpage = () => {
    return (
        <div>
            <Navbar />
            <h1>Transportation Page</h1>
            <CrudTransportation advertiserId={"672fca3f68a5a7588ed8ab0f"}></CrudTransportation>
        </div>
    );
};

export default transportationpage;