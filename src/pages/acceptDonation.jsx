import React, { useState, useEffect, useContext, useRef } from "react";
import DonorBook from "../features/acceptDonation/components/donorBook";
import Filter from "../components/filter";
import axios from "axios";
import { toast } from "react-toastify";
import { MdCloudUpload } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { UserContext } from "../context/userContext/userContext";
import Spinner from "../shared/spinner";

function AcceptDonation() {
  const { setLocalUser, getLocalUser, setUser, user } = useContext(UserContext);

  const [donations, setDonations] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [allDonations, setAllDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const searchDebounceRef = useRef(null);
  const statusFilterRef = useRef(statusFilter);

  useEffect(() => {
    statusFilterRef.current = statusFilter;
  }, [statusFilter]);

  useEffect(() => {
    return () => {
      if (searchDebounceRef.current) {
        clearTimeout(searchDebounceRef.current);
        searchDebounceRef.current = null;
      }
    };
  }, []);

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
        const msg = error?.response?.data?.message || error?.message || 'Could not fetch donations';
        toast.error(msg, { position: 'top-right', autoClose: 5000 });
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value || '';
    setSearchTerm(term);
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }
    // Debounce search so filtering happens after typing pauses
    searchDebounceRef.current = setTimeout(() => {
      applyFilters(term, statusFilterRef.current);
      searchDebounceRef.current = null;
    }, 300);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (searchDebounceRef.current) {
        clearTimeout(searchDebounceRef.current);
        searchDebounceRef.current = null;
      }
      applyFilters(searchTerm, statusFilterRef.current);
    }
  };

  const applyFilters = (term = '', status = 'all') => {
    let result = allDonations || [];
    const s = (status || 'all').toString().toLowerCase();
    if (s && s !== 'all') {
      result = result.filter((it) => (it.status || '').toString().toLowerCase() === s);
    }
    if (term && term.trim() !== '') {
      const t = term.toString().toLowerCase();
      result = result.filter((it) => (it.title || '').toString().toLowerCase().includes(t));
    }
    setDonations(result);
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
        const msg = error?.response?.data?.message || error?.message || 'Could not update donation';
        toast.error(msg, { position: 'top-right', autoClose: 5000 });
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
        const msg = error?.response?.data?.message || error?.message || 'Could not update donation';
        toast.error(msg, { position: 'top-right', autoClose: 5000 });
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
      <h1 className="PageTitle">Accept Book Donation</h1>
      <p className="pageSubtitle">Review incoming donations and accept or reject books into inventory.</p>
      <div className="RequestSearch">
          <div className="SearchGroup" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input
              type="search"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
              className="searchInput"
            />
              <button type="button" className="SearchButton" onClick={() => { if (searchDebounceRef.current) { clearTimeout(searchDebounceRef.current); searchDebounceRef.current = null; } applyFilters(searchTerm, statusFilterRef.current); }}>
              Search
            </button>
            </div>
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
              items={allDonations}
              value={statusFilter}
              onChangeOption={(option) => {
                const val = (option.value || option.label || 'all').toString().toLowerCase();
                // cancel any pending search and apply immediately with new filter
                if (searchDebounceRef.current) {
                  clearTimeout(searchDebounceRef.current);
                  searchDebounceRef.current = null;
                }
                setStatusFilter(val);
                applyFilters(searchTerm, val);
              }}
            />
        
      </div>
      <div className="donationTable">
      <div className="cardItemListTitle donationTableHeader">
        <p style={{ width: "69px" }}>Image</p>
        <p style={{ textAlign: "left", flex: "2" }}>Title</p>
        <p className="staticColumnHead" >Donor</p>
        <p style={{ textAlign: "left", flex: "1" }}>Date</p>
        <div className="cardItemDetails">
          <p>Action</p>
        </div>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flexLayout">
          {donations && donations.length > 0 ? (
            donations.map((donation, index) => {
              if (donation.status !== "recieved") {
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
              return null;
            })
          ) : (
            <div className="emptyState">
                <FaBook size={48} style={{ color: 'var(--muted)', marginBottom: 12 }} />
                <p style={{ marginBottom: 12, fontWeight: 600 }}>No donations found matching your filters.</p>
                <p style={{ marginBottom: 12, color: 'var(--muted)' }}>Try clearing filters or adjusting your search term.</p>
                <button
                  className="PromoButtonPrimary"
                  style={{ fontWeight: 700 }}
                  onClick={() => {
                    if (searchDebounceRef.current) {
                      clearTimeout(searchDebounceRef.current);
                      searchDebounceRef.current = null;
                    }
                    setSearchTerm('');
                    setStatusFilter('all');
                    setDonations(allDonations);
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
}

export default AcceptDonation;
