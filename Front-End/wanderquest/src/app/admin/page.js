'use client'
import Admin from "../../../components/AdminReport";
import { useRouter } from 'next/navigation';
import AdminNavBar from "../../../components/AdminNavBar";
import Link from 'next/link';
import styles from "../page.module.css";
import Salesrep from "../../../components/Salesrep";
const AdminPage = () => {
    const router = useRouter();

    
    return (
        <div className={styles.adminPageContainer}>
            {/* AdminNavBar - Sidebar */}
            <AdminNavBar />


            {/* Admin - Main Content */}
            <div className={styles.mainContentContainer}>
                <Admin />
            </div>
        </div>
    );
};

export default AdminPage;