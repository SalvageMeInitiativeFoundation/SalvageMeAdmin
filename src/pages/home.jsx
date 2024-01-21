import React, { useEffect, useState } from "react";
import Heroes from "../features/Promote2Org/components/heroes";
import Partners from "../components/partners";
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
        <div className="Dashboard">
          <div className="DashboardMini">
            <div className="C1"></div>
            <h3>
              {
                donations.filter(
                  (donation) => donation.category == "Philosophy & Psychology"
                ).length
              }
            </h3>
            <p>Philosophy & Psychology</p>
          </div>
          <div className="DashboardMini">
            <div className="C1"></div>
            <h3>
              {
                donations.filter((donation) => donation.category == "Religion")
                  .length
              }
            </h3>
            <p>Religion</p>
          </div>
          <div className="DashboardMini">
            <div className="C1"></div>
            <h3>
              {
                donations.filter(
                  (donation) => donation.category == "Geography & History"
                ).length
              }
            </h3>
            <p>Geography & History</p>
          </div>
          <div className="DashboardMini">
            <div className="C1"></div>
            <h3>
              {
                donations.filter(
                  (donation) => donation.category == "Literature"
                ).length
              }
            </h3>
            <p>Literature</p>
          </div>
          <div className="DashboardMini">
            <div className="C1"></div>
            <h3>
              {
                donations.filter(
                  (donation) => donation.category == "Science & Math"
                ).length
              }
            </h3>
            <p>Science & Math</p>
          </div>
          <div className="DashboardMini">
            <div className="C1"></div>
            <h3>
              {
                donations.filter(
                  (donation) => donation.category == "Social Science"
                ).length
              }
            </h3>
            <p>Social Science</p>
          </div>
        </div>
        <h4 className="HeroesTitle">Growth graph totally donated</h4>
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
