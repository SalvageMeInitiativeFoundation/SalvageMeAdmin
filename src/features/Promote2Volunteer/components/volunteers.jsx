import { FaLinkedin } from "react-icons/fa";
import { useState } from "react";
import { AVATARS } from "../../../utils/constants";

function Volunteers({ user, updateUser }) {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedAccountType, setSelectedAccountType] = useState(user.accountType || "user");
  const [selectedStatus, setSelectedStatus] = useState(user.status || "active");

  const getAvatarForUser = (u) => {
    if (u && u.image) return u.image;
    const seed = (u && (u.email || u._id || u.username)) || "anon";
    let sum = 0;
    for (let i = 0; i < seed.length; i++) sum += seed.charCodeAt(i);
    const idx = AVATARS && AVATARS.length ? sum % AVATARS.length : 0;
    return AVATARS && AVATARS[idx] ? AVATARS[idx] : `https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(seed)}`;
  };

  const imgSrc = getAvatarForUser(user);

  const handleSave = async () => {
    // prevent changing accountType if user is blocked
    if (user.status === "blocked" && selectedAccountType !== user.accountType) {
      return;
    }
    const payload = { accountType: selectedAccountType, status: selectedStatus };
    if (updateUser) await updateUser(user._id, payload);
    setShowDetails(false);
  };

  return (
    <>
      <div className="cardItem">
        <img src={imgSrc} alt={user.username || user.email} />
        <p style={{ textAlign: "left", flex: "2", textOverflow: "ellipsis", overflow: "hidden" }}>{user.username || user.email}</p>
        <p className="staticColumnHeadTwo">{user.accountType}</p>

        <div className="cardItemDetails">
          <button className="PromoButtonSecondary" type="button" onClick={() => setShowDetails(true)}>
            View Details
          </button>
        </div>
      </div>

      {showDetails && (
        <div className="modalOverlay" onClick={() => setShowDetails(false)}>
          <div className="sideModal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="sideModalHeader">
              <h3>User Details</h3>
              <button className="PromoButtonTertiary" onClick={() => setShowDetails(false)}>Close</button>
            </div>
            <div className="sideModalBody">
              <img src={imgSrc} alt={user.username || user.email} className="modalImage" />
              <div className="detailRow"><strong>Email:</strong><span>{user.email}</span></div>
              <div className="detailRow"><strong>Account Type:</strong>
                <select value={selectedAccountType} onChange={(e) => setSelectedAccountType(e.target.value)} disabled={user.status === 'blocked'} className="statusSelect">
                  <option value="user">user</option>
                  <option value="volunteer">volunteer</option>
                  <option value="partner">partner</option>
                  <option value="org">org</option>
                </select>
              </div>
              <div className="detailRow"><strong>Status:</strong>
                <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="statusSelect">
                  <option value="active">active</option>
                  <option value="blocked">blocked</option>
                </select>
              </div>

              <div className="detailRow"><strong>Donation Count:</strong><span>{user.donationCount ?? 0}</span></div>
              <div className="detailRow"><strong>Receive Count:</strong><span>{user.recieveCount ?? user.receiveCount ?? 0}</span></div>
            </div>
            <div className="sideModalFooter">
              <button className="PromoButtonPrimary" onClick={handleSave}>Save</button>
              <button className="PromoButtonTertiary" onClick={() => setShowDetails(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Volunteers;
