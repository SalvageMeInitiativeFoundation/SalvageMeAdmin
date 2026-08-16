import React, { useEffect, useState } from "react";
import Volunteers from "../features/Promote2Volunteer/components/volunteers";
import axios from "axios";
import Spinner from "../shared/spinner";
import LineGraph from "../features/home/components/lineGraph";
import Pie from "../features/home/components/pieGraph";
import Pierecept from "../features/home/components/pierecept";
import { toast } from "react-toastify";

function Home() {
  const [isLoading, setIsloading] = useState(true);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    console.log("fetching");
    FetchData();
  }, []);

  const FetchData = async () => {
    try {
      setIsloading(true);
      const BookData = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/donation/`
      );
      setDonations(BookData.data);
      console.log(BookData.data);
      setIsloading(false);
    } catch (error) {
      setIsloading(false);
      console.log(error);
      toast.error(error.message)
    }
  };

  return (
    <>
      <div>
        <h1 className="pageTitle">Dashboard</h1>
        <p className="pageSubtitle">Overview of donation counts by category to help you monitor inventory distribution.</p>
        <div className="Dashboard" role="region" aria-label="Category summary">
          {[
            "language",
            "religion",
            "social science",
            "ap. science & technology",
            "art recreation",
            "science & math",
            "generalities",
            "literature",
            "geography & history",
            "philosophy & psychology",
          ].map((cat) => {
            const count = donations.filter(
              (donation) => donation.category && donation.category.toLowerCase() === cat.toLowerCase()
            ).length;
            const displayLabel = cat
              .split(/\s+/)
              .map((w) => (w.length ? w.charAt(0).toUpperCase() + w.slice(1) : w))
              .join(' ');
            return (
              <div className="DashboardMini" key={cat} aria-label={`${displayLabel}: ${count} items`} title={`${displayLabel}: ${count}`}>
                <div className="C1" aria-hidden="true"></div>
                <h3 aria-hidden="true">{count}</h3>
                <p>{displayLabel}</p>
              </div>
            );
          })}
        </div>
        <div className="GRAPHDashboardContainer">
          {isLoading ? (
            <Spinner></Spinner>
          ) : (
            <div className="DashboardFlex">
              <Pierecept data={donations}></Pierecept>
              <Pie data={donations}></Pie>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
