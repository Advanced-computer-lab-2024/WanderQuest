'use client';
import Navbar from '../../../../components/AdminNavBar'; // Assuming you have a Navbar component
import CreatePromo from '../../../../components/CreatePromoCodes';

const AdminCreatePromo = () => {
    return (
        <div>
            <Navbar />
           <CreatePromo/>
        </div>
    );
};

export default AdminCreatePromo;