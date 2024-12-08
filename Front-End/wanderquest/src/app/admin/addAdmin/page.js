'use client';

import AddAdmin from '../../../../components/AddAdmin';
import AdminNavbar from '../../../../components/AdminNavBar'; // Assuming you have a Navbar component

const AdminAddAdmin = () => {
    return (
        <div>
            <AdminNavbar />
            <AddAdmin/>
        </div>
    );
};

export default AdminAddAdmin;