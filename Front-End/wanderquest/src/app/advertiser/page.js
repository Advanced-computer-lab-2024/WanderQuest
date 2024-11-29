'use client'
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import AcceptTerms from '../../../components/AcceptTerms';

export default function advertiser() {
    const router = useRouter();

    const handleRedirect = () => {
        router.push('/advertiser/viewall');
    };
    const handleRedirectp = () => {
        router.push('/advertiser/activitys');
    };
    const handleRedirecttransportation = () => {
        router.push('/advertiser/transportation');
    };
    const handleRedirectProfile = () => {
        router.push('/advertiser/profile');
    };


    return (
        <div>
            <Navbar />
            <AcceptTerms/>
            <h1>Advertiser Page</h1>
            <p>Welcome to the Advertiser page!</p>
            <button onClick={handleRedirect}>View a list of all my created activities/ itineraries / museums and historical places</button>
            <button onClick={handleRedirectp}>crud activity</button>
            <button onClick={handleRedirecttransportation}>crud Transportation</button>
            <button onClick={handleRedirectProfile}>Profile</button>
      
        </div>
    );
};
