'use client';
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';

export default function guest() {
    const router = useRouter();

    const handleRedirect = () => {
        router.push('/guest/iti');
    };

    const handleRedirectm = () => {
        router.push('/guest/musuem');
    };
    const handleRedirectac = () => {
        router.push('/guest/activity');
    };

    return (
        <div>
            <Navbar />
            <h1>guest Page</h1>
            <p>Welcome to the guest page!</p>
            <button onClick={handleRedirect}>Go to Itinerary</button>
            <button onClick={handleRedirectac}>Go to activity</button>
     
            <button onClick={handleRedirectm}>Go to museums</button>
        </div>
    );
};
