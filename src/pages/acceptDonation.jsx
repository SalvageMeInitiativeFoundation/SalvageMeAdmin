import React, { useState, useEffect, useContext } from "react";
import DonorBook from "../features/acceptDonation/components/donorBook";
import Filter from "../components/filter";
import axios from "axios";
import { toast } from "react-toastify";
import { MdCloudUpload } from "react-icons/md";
import { UserContext } from "../context/userContext/userContext";
import Spinner from "../shared/spinner";

function AcceptDonation() {
  const { setLocalUser, getLocalUser, setUser, user } = useContext(UserContext);

  const [donations, setDonations] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [allDonations, setAllDonations] = useState([]);

  useEffect(() => {
    console.log("=====================acceptDonation======================");
    console.log(user[0]);
    getDonation();
  }, []);

  const getDonation = async () => {
    setIsloading(true);
    try {
      const donationResponse = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/donation/`
      );
      if (donationResponse.status == 200) {
        console.log(donationResponse);
        setDonations(donationResponse.data);
        setAllDonations(donationResponse.data);
        setIsloading(false);
      }
    } catch (error) {
      setIsloading(false);
      console.log(error);
    }
  };

  const DonationAccepted = async (id, e) => {
    e.preventDefault();
    setIsloading(true);
    try {
      const recieved = {
        status: "recieved",
        acceptedBy: user[0]._id,
      };
      // TODO:change function to put to update status
      const donationResponse = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/donation/updateDonation/${id}`,
        recieved
      );
      if (donationResponse.status == 200) {
        console.log("===============recieving donation==============");
        // TODO:map through donations and remove donation aaccepted
        console.log(donationResponse.data);
        setDonations((d) => d.map((item) => (item._id === id ? donationResponse.data : item)));
        // updateDonationCount();
        setIsloading(false);
      }
    } catch (error) {
      setIsloading(false);
      console.log(error);
    }
  };

  const DonationRejected = async (id, e) => {
    e.preventDefault();
    setIsloading(true);
    try {
      const recieved = {
        status: "rejected",
        acceptedBy: user[0]._id,
      };
      // TODO:change function to put to update status
      const donationResponse = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/donation/updateDonation/${id}`,
        recieved
      );
      if (donationResponse.status == 200) {
        console.log("===============Rejected=================");
        // TODO:map through donations and remove donation aaccepted
        console.log(donationResponse.data);
        setDonations((d) => d.map((item) => (item._id === id ? donationResponse.data : item)));
        // updateDonationCount();
        setIsloading(false);
      }
    } catch (error) {
      setIsloading(false);
      console.log(error);
    }
  };

  // Generic status updater
  const updateDonationStatus = async (id, status) => {
    setIsloading(true);
    try {
      const payload = { status };
      if (user && user[0] && user[0]._id) payload.acceptedBy = user[0]._id;
      const donationResponse = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/donation/updateDonation/${id}`,
        payload,
        {headers:{"Authorization": `Bearer ${user[0].accessToken}`}}
      );
      if (donationResponse.status === 200) {
        setDonations((d) => d.map((item) => (item._id === id ? donationResponse.data : item)));
      }
    } catch (error) {
      console.log(error);
      const msg = error?.response?.data?.message || error?.message || 'Could not fetch donations';
      toast.error(msg);
    } finally {
      setIsloading(false);
    }
  };

  

  return (
    <div>
      <h3 className="cardItemTitle">Accept Donation</h3>
      <div className="RequestSearch">
        <div>
          <Filter
            placeHolder={"Filter by status..."}
            options={[
              { value: "all", label: "All Statuses" },
              { value: "pending", label: "Pending" },
              { value: "available", label: "Available" },
              { value: "processing", label: "Processing" },
              { value: "delivering", label: "Delivering" },
              { value: "returned", label: "Returned" },
              { value: "fulfilled", label: "Fulfilled" },
              { value: "donated", label: "Donated" },
              { value: "rejected", label: "Rejected" },
            ]}
            setDonations={setDonations}
            items={allDonations}
          />
        </div>
      </div>
      <div className="cardItemListTitle">
        <p style={{ width: "69px" }}>Image</p>
        <p style={{ textAlign: "left", flex: "2" }}>Title</p>
        <p className="staticColumnHead" >Donor</p>
        <p style={{ textAlign: "left", flex: "1" }}>Date</p>
        <div className="cardItemDetails">
          <p>Action</p>
        </div>
      </div>
      {isLoading ? (
        <Spinner></Spinner>
      ) : (
        <div className="flexLayout">
          {donations.map((donation, index) => {
            console.log(donation);
            if (donation.status != "recieved") {
              console.log(donation);
              return (
                <DonorBook
                  key={index}
                  donation={donation}
                  user={user}
                  DonationAccepted={DonationAccepted}
                  DonationRejected={DonationRejected}
                  updateDonationStatus={updateDonationStatus}
                />
              );
            }
          })}
        </div>
      )}
    </div>
  );
}

export default AcceptDonation;
