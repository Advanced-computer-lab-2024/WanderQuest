'use client'
import styles from "./page.module.css";
import Navbar from "../../components/Navbar";
import Activities from "../../components/Activities";
import Activity from "../../components/activity";
import Itineraries from "../../components/Itineraries";
import Products from "../../components/Products";
import Museums from "../../components/Museums";
import Creatprod from "../../components/Creatprod";
export default function Home() {
  return (<>
    <Navbar></Navbar>
    {/* <Itineraries></Itineraries> */}
    <Products></Products>
    {/* <Museums></Museums> */}
    {/* <Creatprod></Creatprod> */}
    <div className={styles.container}>
    {/* <Activity></Activity> */}
      <div className={styles.content}>
        
        {/* <Activities></Activities> */}
      {/* <Itineraries/> */}
        {/* <h1>Welcome to WanderQuest</h1>
        <p>Where your dreams come true.</p> */}
      </div>
    </div>
    </>
  );
}