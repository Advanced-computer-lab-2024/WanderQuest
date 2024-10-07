import Admin from "../../../components/Admin";
import Navbar from "../../../components/Navbar";
import Link from 'next/link';
const AdminPage = () => {
    return (
        <div>
            <Navbar/>
            <div>
                <Admin />
            </div>
        </div>
    );
};

export default AdminPage;