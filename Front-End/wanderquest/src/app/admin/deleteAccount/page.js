'use client';

import AdminDeleteAccount from '../../../../components/AdminDeleteAcc';
import AdminNavbar from '../../../../components/AdminNavBar'; // Assuming you have a Navbar component

const AdminDeleteAccountPage = () => {
    return (
        <div>
            <AdminNavbar />
            <AdminDeleteAccount/>
        </div>
    );
};

export default AdminDeleteAccountPage;