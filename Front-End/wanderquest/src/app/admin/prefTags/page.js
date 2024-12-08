'use client';
import Navbar from '../../../../components/AdminNavBar'; // Assuming you have a Navbar component
import PrefTags from '../../../../components/PrefTag';

const AdminPrefTags = () => {
    return (
        <div>
            <Navbar />
            <PrefTags/>
        </div>
    );
};

export default AdminPrefTags;