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
import LandingPage from "../../components/LandingPage";

export default function Home() {
   return (
   <>
      <Navbar></Navbar>
      <LandingPage></LandingPage>
   </>
   );
}