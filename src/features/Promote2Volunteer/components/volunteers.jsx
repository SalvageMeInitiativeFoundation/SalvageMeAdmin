import { FaLinkedin } from "react-icons/fa";

function Volunteers({ user,PromotionAccepted, PromotionRejected }) {


  return (
    <div className="cardItem">
      <img src={user.image} alt="Heroe's image" />
      <p style={{ textAlign: "left",flex:'2' }}>{user.email}</p>
      <p style={{ textAlign: "left",width:"100px" }}>{user.accountType}</p>

      <div className="cardItemDetails">
        <button className={user.accountType!='volunteer'?"PromoButtonPrimary":"PromoButtonSecondary"} type="button" onClick={(e)=>PromotionAccepted(user._id,e)} >
        {user.accountType=='volunteer'?"Volunteered":"Volunteer"}
         
        </button>
        
        <button className="PromoButtonTertiary" type="button" onClick={(e)=>PromotionRejected(user._id,e) }>
          Block
        </button>
      </div>
    </div>
  );
}
export default Volunteers;
