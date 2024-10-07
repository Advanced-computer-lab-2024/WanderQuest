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
import Cruditinerary from "../../components/cruditinerary";
export default function Home() {
  return (<>
    <Navbar></Navbar>
    {/* <TagManager/>
    <PrefTag/> */}
    {/* <ActivityCategory /> */}
    {/* <Itineraries></Itineraries> */}
    {/* <Products></Products> */}
    {/* <Museums></Museums> */}
    {/* <Activities></Activities> */}
    {/* <Creatprod></Creatprod> */}

    <Cruditinerary></Cruditinerary>
    <div className={styles.container}>
      {/* <Activity></Activity> */}
      <div className={styles.content}>


        {/* <Itineraries/> */}
        {/* <h1>Welcome to WanderQuest</h1>
        <p>Where your dreams come true.</p> */}
      </div>
    </div>
  </>
  );
}