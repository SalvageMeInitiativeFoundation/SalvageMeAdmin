import React, { useState, useEffect,useContext } from "react";
import DonorBook from "../components/donorBook";
import Dropdown from "../components/dropdown";
import axios from "axios";
import { MdCloudUpload } from "react-icons/md";
import {UserContext} from "../context/userContext/userContext";
import Spinner from "../shared/spinner";


function AcceptDonation() {
  const {setLocalUser,getLocalUser,setUser,user}=useContext(UserContext)

  const [donations,setDonations]=useState(null);
  const [isLoading, setIsloading] = useState(true);


  useEffect(() => {
    console.log('=====================useremail======================');
    console.log(user[0])
    getDonation()    
    
  }, []);

  const getDonation = async (File,e) => {
    e.preventDefault()
    setIsloading(true)
    try {
      
      const donationResponse = await axios.post(
        `${process.env.REACT_BASE_URL}/donation/` 
      );
      if (donationResponse.status == 200) {
        console.log(donationResponse);
        setDonations(donationResponse.data);
        setIsloading(false)
      }
    } catch (error) {
      setIsloading(false)
      console.log(error);
    }
  };

  const DonationAccepted = async (id,e) => {
    e.preventDefault()
    setIsloading(true)
    try {
      const recieved = {
        status:'recieved',
        acceptedBy:user[0].email,
      }
      // TODO:change function to put to update status
      const donationResponse = await axios.post(
        `${process.env.REACT_BASE_URL}/donation/createDonation`,
        recieved
      );
      if (donationResponse.status == 200) {
        // TODO:map through donations and remove donation aaccepted
        console.log(donationResponse);
        setDonations(donationResponse.data);
        // updateDonationCount();
        setIsloading(false)
      }
    } catch (error) {
      setIsloading(false)
      console.log(error);
    }
  };

  const DonationRejected = async (id,e) => {
    e.preventDefault()
    setIsloading(true)
    try {
      const recieved = {
        status:'rejected',
        acceptedBy:user[0].email,
      }
      // TODO:change function to put to update status
      const donationResponse = await axios.post(
        `${process.env.REACT_BASE_URL}/donation/createDonation`,
        recieved
      );
      if (donationResponse.status == 200) {
        // TODO:map through donations and remove donation aaccepted
        console.log(donationResponse);
        setDonations(donationResponse.data);
        // updateDonationCount();
        setIsloading(false)
      }
    } catch (error) {
      setIsloading(false)
      console.log(error);
    }
  };

  const updateDonationCount=async()=>{
    const updateDonationCountData={email:user[0].email,donationCount:user[0].donationCount+1}
    try {
          const updateDonationResponse=await axios.put(`${process.env.REACT_BASE_URL}/auth/updateUserCount`,updateDonationCountData);
          if(updateDonationResponse.status==200){
                setLocalUser({...user[0],donationCount:user[0].donationCount+1})

          }
    } catch (error) {
      console.log(error)
    }


  }


  return (
    <><h1 className="HeroesTitle">Accept Donation</h1>
        {isLoading ? (
          <Spinner></Spinner>
        ) : (
          <div className="flexLayout">
            {donations.map((donation, index) => (
              <DonorBook key={index} donation={donation} user={user} donationAccepted={DonationAccepted} DonationRejected={DonationRejected}/>
            ))}
          </div>
        )}</>
    
      
  );
}

export default AcceptDonation;
