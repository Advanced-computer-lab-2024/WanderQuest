'use client';
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';

export default function governer() {
    const router = useRouter();

    const handleRedirect = () => {
        router.push('/governer/viewall');
    };
    const handleRedirectp = () => {
        router.push('/governer/tagm');
    };


    return (
        <div>
            <Navbar />
            <h1>governer Page</h1>
            <p>Welcome to the Tourist page!</p>
            <button onClick={handleRedirect}>View a list of all my created activities/ itineraries / museums and historical places</button>
            <button onClick={handleRedirectp}>tag Manager</button>
      
        </div>
    );
};
