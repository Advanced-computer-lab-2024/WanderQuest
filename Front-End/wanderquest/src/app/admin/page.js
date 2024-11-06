'use client'
import Admin from "../../../components/Admin";
import Navbar from "../../../components/Navbar";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
const AdminPage = () => {
    const router = useRouter();

    const handleRedirect = () => {
        router.push('/admin/products');
    };
    const handleRedirectedit = () => {
        router.push('/admin/editprod');
    };
    const handleRedirectediti = () => {
        router.push('/admin/iti');
    };
    const handleRedirectedevent = () => {
        router.push('/admin/event');
    };
    return (
        <div>
            <Navbar/>
            <button onClick={handleRedirect}>go to products</button>
            <button onClick={handleRedirectedit}>add products</button>
            <button onClick={handleRedirectediti}>Itineraries</button>
            <button onClick={handleRedirectedevent}>events</button>
            <div>
                <Admin />
            </div>
        </div>
    );
};

export default AdminPage;