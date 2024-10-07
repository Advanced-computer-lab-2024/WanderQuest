'use client';
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';

export default function TourGuide() {
    const router = useRouter();

    const handleRedirect = () => {
        router.push('/tourguide/viewall');
    };
    const handleRedirectp = () => {
        router.push('/tourguide/crud');
    };


    return (
        <div>
            <Navbar />
            <h1>Tourist Page</h1>
            <p>Welcome to the Tourist page!</p>
            <button onClick={handleRedirect}>View a list of all my created activities/ itineraries / museums and historical places</button>
            <button onClick={handleRedirectp}>crud iti</button>
      
        </div>
    );
};
