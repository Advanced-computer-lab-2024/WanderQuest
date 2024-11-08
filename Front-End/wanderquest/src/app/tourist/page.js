'use client';
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';

export default function Tourist() {
    const router = useRouter();

    const handleRedirect = () => {
        router.push('/tourist/iti');
    };
    const handleRedirectp = () => {
        router.push('/tourist/products');
    };
    const handleRedirectm = () => {
        router.push('/tourist/musuem');
    };
    const handleRedirectac = () => {
        router.push('/tourist/activity');
    };
    const handleRedirectHist = () => {
        router.push('/tourist/history');
    };

    return (
        <div>
            <Navbar />
            <h1>Tourist Page</h1>
            <p>Welcome to the Tourist page!</p>
            <button onClick={handleRedirect}>Go to Itinerary</button>
            <button onClick={handleRedirectac}>Go to activity</button>
            <button onClick={handleRedirectp}>Go to products</button>
            <button onClick={handleRedirectm}>Go to museums</button>
            <button onClick={handleRedirectHist}>Go to History</button>
        </div>
    );
};
