import React,{useState,useEffect} from "react";
import axios from "axios";
import Spinner from "../shared/spinner";
import Heroes from "../components/heroes";

const PromoteUsertoOrg=()=>{
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

//   TODO:change url to get single user
  const FetchDataByTitle = async (title) => {
    setIsloading(true);
    try {
      const BookData = await axios.get(
        `${process.env.REACT_BASE_URL}/donation/${title}`
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




  return (
    <>
      <div>
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
        
      </div>

        <h1 className="HeroesTitle">Promote user to Organization</h1>
        {isLoading ? (
          <Spinner></Spinner>
        ) : (
          <div className="flexLayout">
            {users.map((user, index) =>{
              if(user.accountType!='admin'){
              return <Heroes key={index} user={user} />
            }})}
          </div>
        )}
      </div>
    </>
  );
}
export default PromoteUsertoOrg