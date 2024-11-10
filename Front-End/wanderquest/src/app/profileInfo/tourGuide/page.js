import ChangePassword from "../../../../components/ChangePassword";
import Navbar from "../../../../components/Navbar";
import TourGuideInfo from "../../../../components/TourGuideInfo";


const ProfileInfo = () => {
  

  return (
    <div>
        <Navbar />
        <div>
            <TourGuideInfo/>
            <ChangePassword/>
        </div>
    </div>
  );

}
export default ProfileInfo