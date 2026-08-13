import React, { useEffect, useState } from "react";
import Heroes from "../features/Promote2Org/components/heroes";
import Volunteers from "../features/Promote2Volunteer/components/volunteers";
import axios from "axios";
import Spinner from "../shared/spinner";
import LineGraph from "../features/home/components/lineGraph";
import Pie from "../features/home/components/pieGraph";
import Pierecept from "../features/home/components/pierecept";

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
    }
  };

  return (
    <>
      <div>
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
            return (
              <div className="DashboardMini" key={cat}>
                <div className="C1"></div>
                <h3>{count}</h3>
                <p>{cat.charAt(0).toUpperCase() + cat.slice(1)}</p>
              </div>
            );
          })}
        </div>
        <h4 className="cardItemTitle">SalvageMe Analytics</h4>
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
