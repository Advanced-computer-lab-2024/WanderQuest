'use client'
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import AcceptTerms from '../../../components/AcceptTerms';
import { FaUserCircle } from "react-icons/fa";
import styles from "../../../Styles/Advertiser.module.css";
import Foot from "../../../components/foot";
import Salesrepadv from '../../../components/Salesrepadv';


export default function advertiser() {

    return (
        <>
        <Navbar/>
            <AcceptTerms/>
            <div style={{marginTop: '80px'}}>
            <Salesrepadv/>
            </div>
        <Foot/>
        </>
        
    );
};
