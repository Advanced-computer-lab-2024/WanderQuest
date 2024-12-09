'use client'
import Navbar from "../../../../components/Navbar";
import TourGuideInfo from "../../../../components/TourGuideInfo";
import styles from "../../../../Styles/TourGuide.module.css";
import {useRouter} from "next/navigation";


const ProfileInfo = () => {

  const router = useRouter();

  const handleBack = () => {
    router.back();
  }

  return (
    <div>
        <Navbar />
        <div>
          <br />
          <br />
          <br />
            <button onClick={handleBack}>Back</button>
            <TourGuideInfo/>
        </div>
    </div>
  );

}
export default ProfileInfo