import React, { useState, useEffect, useContext } from "react";
import DonorBook from "../features/acceptDonation/components/donorBook";
import Dropdown from "../components/dropdown";
import axios from "axios";
import { MdCloudUpload } from "react-icons/md";
import { UserContext } from "../context/userContext/userContext";
import Spinner from "../shared/spinner";

function AcceptDonation() {
  const { setLocalUser, getLocalUser, setUser, user } = useContext(UserContext);

  const [donations, setDonations] = useState([]);
  const [isLoading, setIsloading] = useState(true);

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
        acceptedBy: user[0].email,
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
        setDonations(() => donations.filter((donation) => donation._id != id));
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
        acceptedBy: user[0].email,
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
        setDonations(() => donations.filter((donation) => donation._id != id));
        // updateDonationCount();
        setIsloading(false);
      }
    } catch (error) {
      setIsloading(false);
      console.log(error);
    }
  };

  const updateDonationCount = async () => {
    const updateDonationCountData = {
      email: user[0].email,
      donationCount: user[0].donationCount + 1,
    };
    try {
      const updateDonationResponse = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/auth/updateUserCount`,
        updateDonationCountData
      );
      if (updateDonationResponse.status == 200) {
        setLocalUser({ ...user[0], donationCount: user[0].donationCount + 1 });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3 className="cardItemTitle">Accept Donation</h3>
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
            if (donation.status == "pending") {
              console.log(donation);
              return (
                <DonorBook
                  key={index}
                  donation={donation}
                  user={user}
                  DonationAccepted={DonationAccepted}
                  DonationRejected={DonationRejected}
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
