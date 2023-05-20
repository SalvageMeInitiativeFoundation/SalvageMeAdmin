import React,{useState,useEffect} from "react";
import axios from "axios";
import Spinner from "../shared/spinner";
import Heroes from "../components/heroes";
import Volunteers from "../components/volunteers";

const PromoteUsertoVolunteer=()=>{
    const [isLoading, setIsloading] = useState(true);
    const [users, setUsers] = useState(null);
    const [singleSearchValue, setSingleSearchValue] = useState("");
  
    useEffect(() => {
      console.log("fetching")
      FetchData();
    }, []);
  
    const FetchData = async () => {
      setIsloading(true);
  
      try {
        const BookData = await axios.get(`http://localhost:5000/salvageme/auth/users`);
        setUsers(BookData.data);
        console.log(users);
        setIsloading(false);
  
      } catch (error) {
          setIsloading(false);
  console.error(error);
      }
    };
  
  //   TODO:Test
    const FetchDataByTitle = async (title) => {
      setIsloading(true);
      const data={email:title}

      try {
        const BookData = await axios.get(
          `${process.env.REACT_APP_BASE_URL}auth/user`,data
        );
        setUsers(BookData.data);
        setIsloading((prev) => !prev);
        console.log(users);
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
        // updateDonationCount();
        setIsloading(false);
      }
    } catch (error) {
      setIsloading(false);
      console.log(error);
    }
  };

  return (
    <>
      <div>   
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
        <h3 className="HeroesTitle">Promote user to volunteer</h3>
        {users == null ? (
          <Spinner></Spinner>
        ) : (
          <div className="flexLayout">
            {users.map((user, index) => {
              if(user.accountType!='admin'){return (<Volunteers key={index} user={user} PromotionAccepted={PromotionAccepted} PromotionRejected={PromotionRejected} />)}
              
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default PromoteUsertoVolunteer;