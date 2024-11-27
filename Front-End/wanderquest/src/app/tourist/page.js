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
    const handleRedirectcomp = () => {
        router.push('/tourist/complaint');
    };
    const handleRedirectviewcomp = () => {
        router.push('/tourist/viewComplaint');

    };
    const handleRedirectHist = () => {
        router.push('/tourist/history');
    };
    const handleRedirec = () => {
        router.push('/tourist/mybookings');
    };
    const handleRedirechotel = () => {
        router.push('/tourist/Hotels');
    };
    const handleRedirecflight = () => {
        router.push('/tourist/Flights');
    };
    const handleRedirectransport = () => {
        router.push('/tourist/transportation');
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
            <button onClick={handleRedirectcomp}>File a complaint</button>
            <button onClick={handleRedirectviewcomp}>View Complaint</button>
            <button onClick={handleRedirectHist}>Go to History</button>
            <button onClick={handleRedirec}>my bookings</button>
            <button onClick={handleRedirechotel}>Hotels</button>
            <button onClick={handleRedirecflight}>Flights</button>
            <button onClick={handleRedirectransport}>Transportaiton</button>

        </div>
    );

};
