import React, { useEffect, useState } from "react";
import Heroes from "../components/heroes";
import Partners from "../components/partners";
import Volunteers from "../components/volunteers";
import axios from "axios";
import Spinner from "../shared/spinner";
import LineGraph from "../components/lineGraph";
import Pie from "../components/pieGraph";

function Home() {
  const [isLoading, setIsloading] = useState(true);
  const [donations, setDonations] = useState(null);

  useEffect(() => {
    console.log("fetching");
    FetchData();
  }, []);

  const FetchData = async () => {
    try {
      setIsloading(true)
      const BookData = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/Donation/`
      );
      setDonations(BookData.data);
      console.log(donations);
      setIsloading(false);
    } catch (error) {
      setIsloading(false)
      console.log(error);
    }
  };


  return (
    <>
      <div>
        <div className="Dashboard">
          <div className="DashboardMini">
            <div className="C1"></div>
            <h3>1000</h3>
            <p>Religion</p>
          </div>
          <div className="DashboardMini">
            <div className="C1"></div>
            <h3>1000</h3>
            <p>Religion</p>
          </div>
          <div className="DashboardMini">
            <div className="C1"></div>
            <h3>1000</h3>
            <p>Religion</p>
          </div>
          <div className="DashboardMini">
            <div className="C1"></div>
            <h3>1000</h3>
            <p>Religion</p>
          </div>
          <div className="DashboardMini">
            <div className="C1"></div>
            <h3>1000</h3>
            <p>Religion</p>
          </div>
          <div className="DashboardMini">
            <div className="C1"></div>
            <h3>1000</h3>
            <p>Religion</p>
          </div>
        </div>
        <h3 className="HeroesTitle">Growth graph totally donated</h3>
        <div lassName="flexLayout"> 
        {isLoading?<Spinner></Spinner>:<LineGraph data={donations} ></LineGraph>}  
        <Pie></Pie>   
        
        </div>

      </div>
    </>
  );
}

export default Home;
