import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../shared/spinner";
import Heroes from "../features/Promote2Org/components/heroes";
import Volunteers from "../features/Promote2Volunteer/components/volunteers";

const PromoteUsertoVolunteer = () => {
  const [isLoading, setIsloading] = useState(true);
  const [users, setUsers] = useState(null);
  const [singleSearchValue, setSingleSearchValue] = useState("");
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    console.log("fetching");
    FetchData();
  }, []);

  const FetchData = async () => {
    setIsloading(true);

    try {
      const BookData = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/auth/users`
      );
      setUsers(BookData.data);
      setAllUsers(BookData.data);
      console.log(BookData.data);
      setIsloading(false);
    } catch (error) {
      setIsloading(false);
      console.error(error);
    }
  };

  const handleSingleSearch = (e) => {
    e.preventDefault();
    const q = singleSearchValue.trim().toLowerCase();
    if (q.length > 0) {
      const filtered = allUsers.filter((u) => {
        const name = (u.username || u.email || "").toString().toLowerCase();
        return name.includes(q) || (u.email || "").toLowerCase().includes(q);
      });
      setUsers(filtered);
    } else {
      setUsers(allUsers);
    }
  };
  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setSingleSearchValue(e.target.value);
  };

  const PromotionAccepted = async (id, e) => {
    e.preventDefault();
    setIsloading(true);
    try {
      const recieved = {
        accountType: "volunteer",
      };
      // TODO:Test this section
      const donationResponse = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/auth/updateAccountTypeBlockUser/${id}`,
        recieved
      );
      if (donationResponse.status == 200) {
        console.log(donationResponse);
        setUsers(() => users.filter((user) => user._id != id));
        setAllUsers((prev) => prev.filter((user) => user._id != id));
        // updateDonationCount();
        setIsloading(false);
      }
    } catch (error) {
      setIsloading(false);
      console.log(error);
    }
  };

  const PromotionRejected = async (id, e) => {
    e.preventDefault();
    setIsloading(true);
    try {
      const recieved = {
        status: "blocked",
      };
      // TODO:Test this section
      const donationResponse = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/auth/updateAccountTypeBlockUser/${id}`,
        recieved
      );
      if (donationResponse.status == 200) {
        console.log("============Rejecting Approval===============");
        console.log(donationResponse);
        setUsers(() => users.filter((user) => user._id != id));
        setAllUsers((prev) => prev.filter((user) => user._id != id));
        // updateDonationCount();
        setIsloading(false);
      }
    } catch (error) {
      setIsloading(false);
      console.log(error);
    }
  };

  const updateUser = async (id, payload) => {
    setIsloading(true);
    try {
      const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/auth/updateAccountTypeBlockUser/${id}`, payload);
      if (res.status === 200) {
        // merge only updated fields into existing user
        setUsers((prev) => prev.map((u) => (u._id === id ? { ...u, ...(payload || {}), ...(res.data || {}) } : u)));
        setAllUsers((prev) => prev.map((u) => (u._id === id ? { ...u, ...(payload || {}), ...(res.data || {}) } : u)));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div>
      <h3 className="cardItemTitle">Promote user Account</h3>
      <div className="RequestSearch">
        <div className="RequestSearchOne">
          <input
            type="text"
            name="BooKName"
            id="bookName"
            placeholder="Search for user"
            onChange={handleChange}
            value={singleSearchValue}
          />
          <button type="button" onClick={handleSingleSearch}>
            Search
          </button>
        </div>
      </div>
      <div className="cardItemListTitle">
        <p style={{ width: "69px" }}>Image</p>
        <p style={{ textAlign: "left", flex: "2" }}>User</p>
        <p className="staticColumnHeadTwo">Role</p>
        <div className="cardItemDetails">
          <p>Action</p>
        </div>
      </div>
      {users == null ? (
        <Spinner></Spinner>
      ) : (
        <div className="flexLayout">
          {users.map((user, index) => {
            if (user.accountType != "admin") {
              return (
                <Volunteers
                  key={index}
                  user={user}
                  updateUser={updateUser}
                />
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default PromoteUsertoVolunteer;
