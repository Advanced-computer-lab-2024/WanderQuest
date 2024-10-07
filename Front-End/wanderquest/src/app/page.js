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
export default function Home() {
  return (<>
    <Navbar></Navbar>
    <PrefTag/>
    {/* <Itineraries></Itineraries> */}
    {/* <Products></Products> */}
    {/* <Museums></Museums> */}
    {/* <Creatprod></Creatprod> */}
    <div className={styles.container}>
      {/* <Activity></Activity> */}
      <div className={styles.content}>

        {/* <Activities></Activities> */}
        <Creatprod></Creatprod>
        {/* <Itineraries/> */}
        {/* <h1>Welcome to WanderQuest</h1>
        <p>Where your dreams come true.</p> */}
      </div>
    </div>
  </>
  );
}