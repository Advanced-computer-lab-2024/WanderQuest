'use client'
import styles from "./page.module.css";
import Navbar from "../../components/Navbar";
import Activities from "../../components/Activities";
import Activity from "../../components/activity";
import Itineraries from "../../components/Itineraries";
import Products from "../../components/Products";
import Museums from "../../components/Museums";
import Creatprod from "../../components/Creatprod";
import TagManager from "../../components/TagManager";
import PrefTag from "../../components/PrefTag";
import ActivityCategory from "../../components/ActivityCategory";
import ComplaintCard from "../../components/ComplaintCard";
import Link from 'next/link';
import Allcreated from "../../components/allcreated";
import Historicalplaces from "../../components/historicalplaces";
import Signin from "../../components/Signin";
import Foot from "../../components/foot";
import { Chart } from 'chart.js'
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import { motion } from 'framer-motion';
import Salesrep from "../../components/Salesrep";
import Salesrepseller from "../../components/Salesrepseller";
import Salesrepadv from "../../components/Salesrepadv";
import Authentication from "../../components/Authentication";
import Salesreptour from "../../components/Salesreptour";
import LandingPage from "../../components/LandingPage";
import { useEffect } from 'react';

export default function Home() {
   return (
   <>
      <Navbar></Navbar>

{/* 
      <Salesreptour></Salesreptour> */}
{/* 
      <Foot></Foot>   */}


            {/* <Salesrep></Salesrep> */}

     
{/* <Salesrepseller></Salesrepseller> */}
      {/* <Signin></Signin>

    


      {/* <Link href="/admin">
         <button className='admin'>Admin</button>
      </Link> */}
      {/* <Salesrep></Salesrep> */}
      {/* <Link href="/guest">
         <button className='guest'>Guest</button>
      </Link>
      <Link href="/seller">
         <button className='seller'>Seller</button>
      </Link>
      <Link href="/advertiser">
         <button className='advertiser'>Advertiser</button>
      </Link>
      <Link href="/governer">
         <button className='governer'>Tourism Governer</button>
      </Link>
      <Link href="/tourguide">
         <button className='tour-guide'>Tour Guide</button>
      </Link>
      <Link href="/tourist">
         <button className='tourist'>Tourist</button>
      </Link>
      <motion.h1
         initial={{ opacity: 0, x: 10, y: 150 }}
         animate={{ scale: 1, opacity: 1, x: 20 }}
         transition={{ duration: 1 }}
         style={{ border: '0px solid black', width: 800 }}
      >
         Welcome to WanderQuest

      </motion.h1> */}
      {/* </div> */}
      {/* <TagManager/>
    <PrefTag/> */}
      {/* <ActivityCategory /> */}
      {/* <Itineraries></Itineraries> */}
      {/* <Products></Products> */}
      {/* <Museums></Museums> */}
      {/* <Activities></Activities> */}
      {/* <Creatprod></Creatprod> */}

      {/* <Cruditinerary></Cruditinerary> */}
      {/* <Activity></Activity> */}
      {/* <Historicalplaces></Historicalplaces> */}


      {/* <Itineraries/> */}
      {/* <h1>Welcome to WanderQuest</h1>
        <p>Where your dreams come true.</p> */}

      <LandingPage></LandingPage>

   </>
   );
}