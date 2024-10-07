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
import Link from 'next/link';
import Cruditinerary from "../../components/cruditinerary";
import Allcreated from "../../components/allcreated";
export default function Home() {
  return (<>
    <Navbar></Navbar>

    <Allcreated/>
  </>
  );
}