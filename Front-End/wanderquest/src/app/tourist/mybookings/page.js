'use client'
import React from 'react'
import { useRouter } from 'next/navigation';
function mybookingspage() {
    const router = useRouter();



    const handleRedirectiti = () => {
        router.push('/tourist/mybookings/itiniraries');
    };
    const handleRedirecttrans = () => {
        router.push('/tourist/mybookings/transportation');
    };
    const handleRedirectactivit = () => {
        router.push('/tourist/mybookings/activities');
    };
    const handleRedirectflight = () => {
        router.push('/tourist/mybookings/flights');
    };
    const handleRedirecthotel = () => {
        router.push('/tourist/mybookings/myhotels');
    };

  return (<>
    <div>mybookingspage</div>
    <button onClick={handleRedirectflight} >flights</button>
    <button onClick={handleRedirecttrans} >transportation</button>
    <button onClick={handleRedirectactivit} >activities</button>
    <button onClick={handleRedirectiti} >itiniraties</button>
    <button onClick={handleRedirecthotel} >Hotels</button>
  
    </>)
}

export default mybookingspage;