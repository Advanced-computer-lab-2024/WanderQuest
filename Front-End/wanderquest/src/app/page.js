'use client'
import styles from "./page.module.css";
import Navbar from "../../components/Navbar";
import Activities from "../../components/Activities";
import Itineraries from "../../components/Itineraries";
import ActivityCategory from "../../components/ActivityCategory";
import Tag from "../../components/Tag";
import PrefTag from "../../components/PrefTag";
import TagManager from "../../components/TagManager";
export default function Home() {
  return (<>
    <Navbar></Navbar>
<TagManager/>
    <div className={styles.container}>
      <div className={styles.content}>
        <Activities></Activities>
      {/* <Itineraries/> */}
        <h1>Welcome to WanderQuest</h1>
        <p>Where your dreams come true.</p>
      </div>
    </div>
    </>
  );
}