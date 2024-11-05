'use client';
import Museums from '../../../../components/Museums'; // Adjust the import path as needed
import Navbar from '../../../../components/Navbar'; // Assuming you have a Navbar component

const museumguestpage = () => {
    return (
        <div>
            <Navbar />
            <h1>museum Page</h1>
           <Museums></Museums>
        </div>
    );
};

export default museumguestpage;