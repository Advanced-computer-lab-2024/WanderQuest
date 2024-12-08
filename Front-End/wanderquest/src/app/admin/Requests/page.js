'use client';
import Pending from '../../../../components/Pending';
import Navbar from '../../../../components/Navbar';
import AdminNavbar from '../../../../components/AdminNavBar';

const PendingPage = () => {

  return(<div>
    <AdminNavbar />
    <div>
        <Pending/>
    </div>
</div>)
  };
  export default PendingPage;