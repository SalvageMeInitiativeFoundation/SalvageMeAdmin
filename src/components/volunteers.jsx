import { FaLinkedin } from "react-icons/fa";

function Volunteers({ user }) {

  // TODO:implement function
  
  const makeVolunteer=()=>{

  }


  const blockUser=()=>{

  }


  return (
    <div className="Heroes">
      <img src={user.image} alt="Heroe's image" />
      <p style={{ textAlign: "center" }}>{user.email}</p>
      <p style={{ textAlign: "center" }}>{user.accountType}</p>

      <div className="HeroesDetails">
        <button className={user.accountType!='volunteer'?"PromoButtonPrimary":"PromoButtonSecondary"} type="button" onClick={makeVolunteer} >
        {user.accountType=='volunteer'?"Volunteered":"Volunteer"}
         
        </button>
        
        <button className="PromoButtonTertiary" type="button" onClick={blockUser}>
          Block
        </button>
      </div>
    </div>
  );
}
export default Volunteers;
