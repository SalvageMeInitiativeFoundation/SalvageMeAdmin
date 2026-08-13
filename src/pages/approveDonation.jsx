import React, { useEffect, useState, useContext } from "react";
import DonorBook from "../features/acceptDonation/components/donorBook";
import { IoIosFunnel } from "react-icons/io";
import Filter from "../components/filter";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../shared/spinner";
import ApproveDonorBook from "../features/ApproveDonation/components/approveDonorBook";
import { UserContext } from "../context/userContext/userContext";
import { GiGameConsole } from "react-icons/gi";

function ApproveDonation() {
  const { setLocalUser, getLocalUser, setUser, user } = useContext(UserContext);

  const [singleSearchValue, setSingleSearchValue] = useState("");
  const [isLoading, setIsloading] = useState(true);
  const [donations, setDonations] = useState([]);
  const [allDonations, setAllDonations] = useState([]);

  useEffect(() => {
    FetchData();
  }, []);

  const FetchData = async () => {
    setIsloading(true);
    try {
      const BookData = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/request/`,
        {headers: {Authorization: `Bearer ${user[0].accessToken}`}}
      );
      console.log("===found requests===");
      console.log(BookData.data);
      setDonations(BookData.data);
      setAllDonations(BookData.data);
      setIsloading(false);
    } catch (error) {
      console.log(error);
      const msg = error?.response?.data?.message || error?.message || "Could not fetch requests";
      toast.error(msg, { position: "top-right", autoClose: 5000 });
    }finally {
      setIsloading(false);
    }
  };
  const handleSingleSearch = (e) => {
    e.preventDefault();
    const q = singleSearchValue.trim().toLowerCase();
    if (q.length > 0) {
      const filtered = allDonations.filter((d) => {
        const title = (d.book_id && d.book_id.title) || d.title || "";
        return title.toLowerCase().includes(q);
      });
      setDonations(filtered);
    } else {
      setDonations(allDonations);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setSingleSearchValue(e.target.value);
  };

  const options = [
    { value: "all", label: "All Statuses" },
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
    { value: "fulfilled", label: "Fulfilled" },
    { value: "returned", label: "Returned" },
    { value: "delivering", label: "Delivering" },
  ];

  // Generic request status updater
  const updateRequestStatus = async (id, status) => {
    setIsloading(true);
    try {
      const payload = { status };
      const res = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/request/updateRequest/${id}`,
        payload,
        { headers: { Authorization: `Bearer ${user[0].accessToken}` } }
      );
      if (res.status === 200) {
        const newStatus = res.data?.status || status;
        setDonations((d) => d.map((item) => (item._id === id ? { ...item, status: newStatus } : item)));
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || error?.message || "Could not update request status", { position: "top-right", autoClose: 5000 });
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div>
      <h3 className="cardItemTitle">Approve Users Request</h3>
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
            placeHolder={"Filter by status..."}
            options={options}
            setDonations={setDonations}
            items={allDonations}
          />
        </div>
      </div>
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
        <div className="flexLayout" style={{ padding: 20 }}>
          <div style={{ textAlign: "center", maxWidth: 480, margin: "40px auto", background: "#fff", borderRadius: 12, padding: 24, boxShadow: "rgba(99, 99, 99, 0.12) 0px 2px 8px" }}>
            <div style={{ fontSize: 48 }}>📭</div>
            <h4 style={{ marginTop: 8 }}>No requests found</h4>
            <p style={{ color: "var(--muted)", marginTop: 8 }}>There are no matching book requests. Try changing your filters or search.</p>
            <div style={{ marginTop: 16, display: "flex", justifyContent: "center", gap: 8 }}>
              <button className="PromoButtonPrimary" onClick={FetchData}>Refresh</button>
              <button className="PromoButtonTertiary" onClick={() => { setDonations(allDonations); setSingleSearchValue(""); }}>Clear</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flexLayout">
          {donations.map((donation, index) => {
            console.log("==============================");
              console.log(donation);
              return (
                <ApproveDonorBook
                  key={index}
                  donation={donation}
                  
                  updateRequestStatus={updateRequestStatus}
                />
              );
            
          })}
        </div>
      )}
    </div>
  );
}

export default ApproveDonation;
