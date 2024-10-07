'use client'
import styles from "./page.module.css";
import Navbar from "../../components/Navbar";

import Historicalplaces from "../../components/historicalplaces";
export default function Home() {
  return (<>
    <Navbar></Navbar>
   <Historicalplaces></Historicalplaces>
  </>
  );
}