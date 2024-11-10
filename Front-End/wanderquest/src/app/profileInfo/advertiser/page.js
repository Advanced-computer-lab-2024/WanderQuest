import CompanyInfo from "../../../../components/CompanyInfo";
import AcceptTerms from "../../../../components/AcceptTerms";
import Navbar from "../../../../components/Navbar";
import ChangePassword from "../../../../components/ChangePassword";


const ProfileInfo = () => {
  

  return (
    <div>
        <Navbar />
        <div>
            <CompanyInfo/>
            <ChangePassword/>
        </div>
    </div>
  );

}
export default ProfileInfo