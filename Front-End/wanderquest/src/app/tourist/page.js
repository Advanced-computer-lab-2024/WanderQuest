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
<<<<<<< HEAD
    const handleRedirectcomp = () => {
        router.push('/tourist/complaint');
    };
    const handleRedirectviewcomp = () => {
        router.push('/tourist/viewComplaint');
=======
    const handleRedirectHist = () => {
        router.push('/tourist/history');
>>>>>>> ab515562d2dc429166800a2e7dbeebb8ec3c1b02
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
<<<<<<< HEAD
            <button onClick={handleRedirectcomp}>File a complaint</button>
            <button onClick={handleRedirectviewcomp}>View Complaint</button>

=======
            <button onClick={handleRedirectHist}>Go to History</button>
>>>>>>> ab515562d2dc429166800a2e7dbeebb8ec3c1b02
        </div>
    );
};
