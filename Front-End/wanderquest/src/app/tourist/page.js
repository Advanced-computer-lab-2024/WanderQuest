'use client';
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';

export default function Tourist() {
    const router = useRouter();

    const handleRedirect = () => {
        router.push('/tourist/iti');
    };

    return (
        <div>
            <Navbar />
            <h1>Tourist Page</h1>
            <p>Welcome to the Tourist page!</p>
            <button onClick={handleRedirect}>Go to Itinerary</button>
        </div>
    );
};