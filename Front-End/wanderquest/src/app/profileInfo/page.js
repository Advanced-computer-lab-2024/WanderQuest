"use client"
import { useEffect, useState } from "react";
import TourGuideInfo from "../../../components/TourGuideInfo";
import CompanyInfo from "../../../components/CompanyInfo";
import SellerInfo from "../../../components/SellerInfo";
import TouristInfo from "../../../components/TouristInfo";
import Navbar from "../../../components/Navbar";


const ProfileInfo = () => {
  const [userType, setUserType] = useState('');

  // useEffect(() => {
  //   // Function to fetch user profile information from the backend
  //   const fetchUserProfile = async () => {
  //       try {
  //           const response = await fetch('/api/user/profile'); // Adjust the endpoint as needed
  //           const data = await response.json();
            
  //           // Assuming your backend returns an object with a userType field
  //           setUserType(data.userType);
  //       } catch (error) {
  //           console.error('Error fetching user profile:', error);
  //       }
  //   };

  //   fetchUserProfile();
  // }, []);
  return (
    <div>
        <Navbar />
        <div>
            
            {/* {userType === 'TourGuide' && <TourGuideInfo />}
            {userType === 'Company' && <CompanyInfo />}
            {userType === 'Seller' && <SellerInfo />}
            {userType === 'Tourist' && <TouristInfo />}
            {userType === '' && <p>Loading profile...</p>} */}
            <CompanyInfo/>
        </div>
    </div>
  );

}
export default ProfileInfo