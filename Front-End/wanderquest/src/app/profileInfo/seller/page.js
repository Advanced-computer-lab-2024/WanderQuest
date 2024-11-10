import ChangePassword from "../../../../components/ChangePassword";
import Navbar from "../../../../components/Navbar";
import SellerInfo from "../../../../components/SellerInfo";


const ProfileInfo = () => {
  

  return (
    <div>
        <Navbar />
        <div>
            <SellerInfo/>
            <ChangePassword/>
        </div>
    </div>
  );

}
export default ProfileInfo