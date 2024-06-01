import React, { useEffect, useState, useContext } from "react";
import DonorBook from "../features/acceptDonation/components/donorBook";
import { IoIosFunnel } from "react-icons/io";
import Filter from "../components/filter";
import axios from "axios";
import Spinner from "../shared/spinner";
import ApproveDonorBook from "../features/ApproveDonation/components/approveDonorBook";
import { UserContext } from "../context/userContext/userContext";

function ApproveDonation() {
  const { setLocalUser, getLocalUser, setUser, user } = useContext(UserContext);

  const [singleSearchValue, setSingleSearchValue] = useState("");
  const [isLoading, setIsloading] = useState(true);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    console.log("fetching");
    FetchData();
  }, []);

  const FetchData = async () => {
    setIsloading(true);
    try {
      const BookData = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/donation/`
      );
      setDonations(BookData.data);
      setIsloading(false);
      console.log(donations);
    } catch (error) {
      setIsloading(false);
    }
  };

  const FetchDataByTitle = async (title) => {
    setIsloading(true);
    try {
      const BookData = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/donation/${title}`
      );
      setDonations(BookData.data);
      setIsloading((prev) => !prev);
      console.log(donations);
    } catch (error) {
      console.error(error);
      setIsloading((prev) => !prev);
    }
  };

  const handleSingleSearch = (e) => {
    e.preventDefault();
    if (singleSearchValue.length > 0) {
      FetchDataByTitle(singleSearchValue);
    }
    FetchData();
  };

  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setSingleSearchValue(e.target.value);
  };

  const options = [
    { value: "all Categories", label: "All Categories" },
    { value: "Language", label: "Language" },
    { value: "religion", label: "Religion" },
    { value: "Social Science", label: "Social Science" },
    { value: "Ap. Science & Technology", label: "Ap. Science & Technology" },
    { value: "Art Recreation", label: "Art Recreation" },
    { value: "Science & Math", label: "Science & Math" },
    { value: "Generalities", label: "Generalities" },
    { value: "Literature", label: "Literature" },
    { value: "Geography & History", label: "Geography & History" },
    { value: "Philosophy & Psychology", label: "Philosophy & Psychology" },
  ];

  const ApprovalAccepted = async (id, e) => {
    e.preventDefault();
    setIsloading(true);
    try {
      const recieved = {
        status: "donated",
        acceptedBy: user[0].email,
      };
      // TODO:change function to put to update status
      const donationResponse = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/donation/updateDonation/${id}`,
        recieved
      );
      if (donationResponse.status == 200) {
        // TODO:map through donations and remove donation aaccepted
        console.log(donationResponse);
        setDonations(() => donations.filter((donation) => donation._id != id));
        // updateDonationCount();
        setIsloading(false);
      }
    } catch (error) {
      setIsloading(false);
      console.log(error);
    }
  };

  const ApprovalRejected = async (id, e) => {
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
        console.log("============Rejecting Approval===============");
        // TODO:map through donations and remove donation aaccepted
        console.log(donationResponse);
        setDonations(() => donations.filter((donation) => donation._id != id));
        // updateDonationCount();
        setIsloading(false);
      }
    } catch (error) {
      setIsloading(false);
      console.log(error);
    }
  };

  return (
    <div>
      <div className="RequestSearch">
        <div className="RequestSearchOne">
          <input
            type="text"
            name="BooKName"
            id="bookName"
            placeholder="Search for book"
            onChange={handleChange}
            value={singleSearchValue}
          />
          <button type="button" onClick={handleSingleSearch}>
            Search
          </button>
        </div>
        <div>
          <Filter
            placeHolder={"Filter by category..."}
            options={options}
            setDonations={setDonations}
            setIsloading={setIsloading}
          />
        </div>
      </div>
      <h3 className="cardItemTitle">Approve Users Request</h3>
      <div className="cardItemListTitle">
        <p style={{ width: "69px" }}>Image</p>
        <p style={{ textAlign: "left", flex: "2" }}>Title</p>
        <p className="staticColumnHead" >Receiver</p>
        <p style={{ textAlign: "left", flex: "1" }}>Date</p>
        <div className="cardItemDetails">
          <p>Action</p>
        </div>
      </div>
      {isLoading ? (
        <Spinner></Spinner>
      ) : donations.length < 1 ? (
        <div className="flexLayout">
          <p>No books available</p>
        </div>
      ) : (
        <div className="flexLayout">
          {donations.map((donation, index) => {
            console.log("==============================");

            if (donation.status == "processing") {
              console.log(donation);
              return (
                <ApproveDonorBook
                  key={index}
                  donation={donation}
                  ApprovalRejected={ApprovalRejected}
                  ApprovalAccepted={ApprovalAccepted}
                />
              );
            }
          })}
        </div>
      )}
    </div>
  );
}

export default ApproveDonation;
