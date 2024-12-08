'use client';
import ChangePassword from '../../../../components/ChangePassword';
import AdminNavbar from '../../../../components/AdminNavBar'; // Assuming you have a Navbar component

const AdminChangePassword = () => {
    return (
        <div>
            <AdminNavbar />
            <ChangePassword/>
        </div>
    );
};

export default AdminChangePassword;