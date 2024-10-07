'use client'
import { useState } from "react";
import { getNames } from "country-list";




const Footer = () => {
    const[email,setEmail] = useState('')
    const[username,setUsername] = useState('')
    const[password,setPassword]=useState('')
    const[mobileNo,setMobileNo] = useState('')
    const[userType,setUserType]=useState('')
    const[nationality,setNatonality] = useState('')
    const[dateOfBirth,setDateOfBirth] = useState('')
    const[occupation,setOccupation] = useState('')


    const countries = getNames();


    return(<form className="Registration">
        <h3>Register</h3>
        <label>Email: </label>
        <input type="text"
            required
            onChange={(e)=>setEmail(e.target.value)}
            value={email}/>

        <label>Username: </label>
        <input type="text"
            required
            onChange={(e)=>setUsername(e.target.value)}
            value={username}/>

        <label>Password: </label>
        <input type="text"
            required
            onChange={(e)=>setPassword(e.target.value)}
            value={password}/>
        
        <label>You are a: </label>
        <select
        required
        value={userType}
        onChange={(e) => setUserType(e.target.value)}
        >
        <option value="">Select</option>
        <option value="tourist">Tourist</option>
        <option value="tourGuide">Tour Guide</option>
        <option value="advertiser">Advertiser</option>
        <option value="seller">Seller</option>
        </select>
    

        {userType === 'tourist' && (
        <>
          <label>Mobile Number: </label>
          <input
            type="number"
            required
            onChange={(e) => setMobileNo(e.target.value)}
            value={mobileNo}
          />

        <label>Nationality: </label>
        <select
            required
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
        >
        <option value=""></option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>

          <label>Date of Birth: </label>
          <input
            type="date"
            required
            onChange={(e) => setDateOfBirth(e.target.value)}
            value={dateOfBirth}
          />
        <select
            required
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
        >
            <option value="">Select your occupation</option>
            <option value="student">Student</option>
            <option value="job">Job</option>
          </select>
        </>
      )}
      <button>Submit</button>
    </form>)



}

export default Footer