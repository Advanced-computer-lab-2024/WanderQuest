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
    const handleRedirectProfile = () => {
        router.push('/tourguide/profile');
    };


    return (
        <div>
            <Navbar />
            <h1>Tour Guide Page</h1>
            <p>Welcome to the Tour Guide page!</p>
            <button onClick={handleRedirect}>View a list of all my created activities/ itineraries / museums and historical places</button>
            <button onClick={handleRedirectp}>crud iti</button>
            <button onClick={handleRedirectProfile}>Profile</button>
      
        </div>
    );
};
