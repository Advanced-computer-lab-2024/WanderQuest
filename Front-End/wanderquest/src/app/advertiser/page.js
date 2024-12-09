'use client'
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import AcceptTerms from '../../../components/AcceptTerms';
import { FaUserCircle } from "react-icons/fa";
import styles from "../../../Styles/Advertiser.module.css";
import Foot from "../../../components/foot";


export default function advertiser() {

    return (
        <>
        <Navbar/>
        <div>
            <AcceptTerms/>
            <h1>Advertiser Page</h1>
            <p>Welcome to the Advertiser page!</p>
        </div>
        <Foot/>
        </>
        
    );
};
