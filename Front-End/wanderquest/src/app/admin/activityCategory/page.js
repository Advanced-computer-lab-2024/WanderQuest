'use client';
import Navbar from '../../../../components/AdminNavBar'; // Assuming you have a Navbar component
import ActivityCategory from '../../../../components/ActivityCategory';

const AdminActivityCategory = () => {
    return (
        <div>
            <Navbar />
            <ActivityCategory/>
        </div>
    );
};

export default AdminActivityCategory;