import { FaLinkedin } from "react-icons/fa";
import { MdOutlineFavoriteBorder, MdCloudUpload } from "react-icons/md";
import { BsArrowDownLeft } from "react-icons/bs";

function Heroes({ user, PromotionAccepted, PromotionRejected }) {
  console.log(user);

  // TODO:write function to update org and block org
  

  return (
    <div className="Heroes">
      <img src={user.image} alt="Heroe's image" />
      <p style={{ textAlign: "center" }}>{user.email}</p>
      <p style={{ textAlign: "center" }}>{user.accountType}</p>

      <div className="HeroesDetails">
        <button
          className={
            user.accountType != "org"
              ? "PromoButtonPrimary"
              : "PromoButtonSecondary"
          }
          type="button"
          onClick={(e)=>PromotionAccepted(user._id,e)}
        >
          {user.accountType == "org" ? "Org" : "promote"}
        </button>

        <button
          className="PromoButtonTertiary"
          type="button"
          onClick={(e)=>PromotionRejected(user._id,e) }
        >
          {user.status == "active" ? "Block" : "Blocked"}
        </button>
      </div>
    </div>
  );
}
export default Heroes;
