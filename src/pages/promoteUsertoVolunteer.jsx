import React, { useState, useEffect, useRef,useContext } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import Spinner from "../shared/spinner";
import { FaBook } from "react-icons/fa";
import Heroes from "../features/Promote2Org/components/heroes";
import Volunteers from "../features/Promote2Volunteer/components/volunteers";
import { UserContext } from "../context/userContext/userContext";


const PromoteUsertoVolunteer = () => {
  const { setLocalUser, getLocalUser, setUser, user } = useContext(UserContext);
  const [isLoading, setIsloading] = useState(true);
  const [users, setUsers] = useState(null);
  const [singleSearchValue, setSingleSearchValue] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const searchDebounceRef = useRef(null);

  useEffect(() => {
    return () => {
      if (searchDebounceRef.current) {
        clearTimeout(searchDebounceRef.current);
        searchDebounceRef.current = null;
      }
    };
  }, []);

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
      const msg = error?.response?.data?.message || error?.message || 'Could not fetch users';
      toast.error(msg, { position: 'top-right', autoClose: 5000 });
    }
  };

  const applyFilters = (term = '') => {
    let result = allUsers || [];
    if (term && term.trim() !== '') {
      const q = term.toString().toLowerCase();
      result = result.filter((u) => {
        const name = (u.username || u.email || "").toString().toLowerCase();
        return name.includes(q) || (u.email || "").toLowerCase().includes(q);
      });
    }
    setUsers(result);
  };

  const handleSingleSearch = (e) => {
    e.preventDefault();
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
      searchDebounceRef.current = null;
    }
    applyFilters(singleSearchValue);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const v = e.target.value || '';
    setSingleSearchValue(v);
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    searchDebounceRef.current = setTimeout(() => {
      applyFilters(v);
      searchDebounceRef.current = null;
    }, 300);
  };

  const updateUser = async (id, payload) => {
    setIsloading(true);
    try {
      const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/auth/updateAccountTypeBlockUser/${id}`, payload,
        { headers: { Authorization: `Bearer ${user[0].accessToken}` } }
      );
      if (res.status === 200) {
        // merge only updated fields into existing user
        setUsers((prev) => prev.map((u) => (u._id === id ? { ...u, ...(payload || {}), ...(res.data || {}) } : u)));
        setAllUsers((prev) => prev.map((u) => (u._id === id ? { ...u, ...(payload || {}), ...(res.data || {}) } : u)));
      }
    } catch (error) {
      console.error(error);
      const msg = error?.response?.data?.message || error?.message || 'Could not update user';
      toast.error(msg, { position: 'top-right', autoClose: 5000 });
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div>
      <h1 className="PageTitle">Promote User Account</h1>
      <p className="pageSubtitle">Review and promote user accounts to other roles, or block unsuitable accounts.</p>
      <div className="RequestSearch">
        <div className="SearchGroup" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input
            type="search"
            name="BooKName"
            id="bookName"
            placeholder="Search for user"
            onChange={handleChange}
            value={singleSearchValue}
            className="searchInput"
            onKeyDown={(e) => { if (e.key === 'Enter') { if (searchDebounceRef.current) { clearTimeout(searchDebounceRef.current); searchDebounceRef.current = null; } handleSingleSearch(e); } }}
          />
          <button type="button" className="SearchButton" onClick={handleSingleSearch}>
            Search
          </button>
        </div>
      </div>
      <div className="donationTable"> 
        <div className=" donationTableHeader">
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
            {users && users.length > 0 ? (
              users.map((user, index) => {
                if (user.accountType != "admin") {
                  return (
                    <Volunteers
                      key={index}
                      user={user}
                      updateUser={updateUser}
                    />
                  );
                }
                return null;
              })
            ) : (
              <div className="emptyState">
                <FaBook size={48} style={{ color: 'var(--muted)', marginBottom: 12 }} />
                <p style={{ marginBottom: 12, fontWeight: 600 }}>No users found matching your filters.</p>
                <p style={{ marginBottom: 12, color: 'var(--muted)' }}>Try clearing filters or adjusting your search term.</p>
                <button
                  className="PromoButtonPrimary"
                  style={{ fontWeight: 700 }}
                  onClick={() => {
                    if (searchDebounceRef.current) { clearTimeout(searchDebounceRef.current); searchDebounceRef.current = null; }
                    setSingleSearchValue('');
                    setUsers(allUsers);
                  }}
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PromoteUsertoVolunteer;
