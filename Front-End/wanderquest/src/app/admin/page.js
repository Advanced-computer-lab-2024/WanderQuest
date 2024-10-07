import Admin from "../../../components/Admin";
import Navbar from "../../../components/Navbar";
import Link from 'next/link';
const AdminPage = () => {
    return (
        <div>
            <Navbar/>
            <Link href="/admin/acts"><button>Activities</button></Link>
        <Link href="/admin/pref"><button>Preference Tags</button></Link>
            <div>
                <Admin />
            </div>
        </div>
    );
};

export default AdminPage;