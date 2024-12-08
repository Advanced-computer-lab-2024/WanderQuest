'use client';
import adminprod from '../../../../components/adminprod'; // Adjust the import path as needed
import Navbar from '../../../../components/AdminNavBar'; // Assuming you have a Navbar component
import Archive from '../../../../components/archiveProduct';

const Arch = () => {
    return (
        <div>
            <Navbar />
           <Archive role={"Admin"}></Archive>
        </div>
    );
};

export default Arch;