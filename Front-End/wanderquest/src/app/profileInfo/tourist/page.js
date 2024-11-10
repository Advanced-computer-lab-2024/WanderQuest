import ChangePassword from "../../../../components/ChangePassword";
import Navbar from "../../../../components/Navbar";
import TouristInfo from "../../../../components/TouristInfo";


const ProfileInfo = () => {
  

  return (
    <div>
        <Navbar />
        <div>
        <TouristInfo/>
        <ChangePassword/>
        </div>
    </div>
  );

}
export default ProfileInfo