'use client'
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';

export default function advertiser() {
    const router = useRouter();

    const handleRedirect = () => {
        router.push('/advertiser/viewall');
    };
    const handleRedirectp = () => {
        router.push('/advertiser/activitys');
    };


    return (
        <div>
            <Navbar />
            <h1>Advertiser Page</h1>
            <p>Welcome to the Advertiser page!</p>
            <button onClick={handleRedirect}>View a list of all my created activities/ itineraries / museums and historical places</button>
            <button onClick={handleRedirectp}>crud act</button>
      
        </div>
    );
};
