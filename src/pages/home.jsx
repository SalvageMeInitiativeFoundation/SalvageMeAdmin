import React, { useEffect, useState } from "react";
import Heroes from "../components/heroes";
import Partners from "../components/partners";
import Volunteers from "../components/volunteers";
import axios from "axios";
import Spinner from "../shared/spinner";

function Home() {
  const [isLoading, setIsloading] = useState(true);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    console.log("fetching")
    FetchData();
  }, []);

  const FetchData = async () => {
    try {
      const BookData = await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/users`);
      setUsers(BookData.data);
      console.log(users);
    } catch (error) {}
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
        {users == null ? (
          <Spinner></Spinner>
        ) : (
          <div className="flexLayout">
            {users.map((user, index) => (
              <Heroes key={index} user={user} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
