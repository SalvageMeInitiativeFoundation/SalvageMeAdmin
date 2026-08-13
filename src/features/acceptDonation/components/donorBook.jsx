import React, { useState } from "react";

function DonorBook({ donation, user, DonationAccepted, DonationRejected, updateDonationStatus }) {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(donation.status || "pending");
  const message = "Hello, Thanks Donating a book to.......................... ";

  const statuses = [
    "pending",
    "recieved",
    "processing",
    "delivering",
    "available",
    "returned",
    "rejected",
  ];

  const handleSave = async () => {
    if (updateDonationStatus) {
      await updateDonationStatus(donation._id, selectedStatus);
    }
    setShowDetails(false);
  };

  const acceptedByName =
    donation.acceptedBy || (donation.currentReciever && donation.currentReciever.username) ||
    (donation.listRecievers && donation.listRecievers[0] && donation.listRecievers[0].username) ||
    "N/A";

  return (
    <>
      <div className="cardItem">
        <div
          className="thumb"
          role="img"
          aria-label={donation.title}
          style={{ backgroundImage: `url(${donation.image})` }}
        />
        <p style={{ textAlign: "left", flex: "2" }}>
          {donation.title}
          <span className={`statusBadge ${(donation.status || '').toLowerCase().replace(/\s+/g,'')}`}>
            {donation.status}
          </span>
        </p>
        <p className="staticColumnHead">{donation.donor}</p>
        <p style={{ textAlign: "left", flex: "1" }}>
          {new Date(donation.updatedAt).toLocaleString()}
        </p>

        <div className="cardItemDetails">
          {/* <button
            className="PromoButtonPrimary "
            type="button"
            onClick={(e) => DonationAccepted(donation._id, e)}
          >
            Accept
          </button> */}
          <a
            href={`mailto:${donation.donor}?subject=Appreciation for Donation&body=${message}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="MailButton" type="button" onClick={(e) => console.log("mail sent")}>
              Initiate Manual Mail
            </button>
          </a>
          {/* <button
            className="PromoButtonTertiary"
            type="button"
            onClick={(e) => DonationRejected(donation._id, e)}
          >
            Reject
          </button> */}
          <button className="PromoButtonSecondary" type="button" onClick={() => setShowDetails(true)}>
            View Details
          </button>
        </div>
      </div>

      {showDetails && (
        <div className="modalOverlay" onClick={() => setShowDetails(false)}>
          <div className="sideModal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="sideModalHeader">
              <h3>Donation Details</h3>
              <button className="PromoButtonTertiary" onClick={() => setShowDetails(false)}>
                Close
              </button>
            </div>

            <div className="sideModalBody">
              <img src={donation.image} alt={donation.title} className="modalImage" />
              <div className="detailRow">
                <strong>Status:</strong>
                <select
                  className="statusSelect"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="detailRow">
                <strong>Accepted By:</strong>
                <span>{acceptedByName}</span>
              </div>

              <div className="detailRow">
                <strong>Condition:</strong>
                <span>{donation.condition || 'N/A'}</span>
              </div>

              <div className="detailRow">
                <strong>With Owner:</strong>
                <span>{donation.withOwner ? 'Yes' : 'No'}</span>
              </div>

              <div className="detailRow">
                <strong>Created At:</strong>
                <span>{new Date(donation.createdAt).toLocaleString()}</span>
              </div>

              <div className="detailRow">
                <strong>Updated At:</strong>
                <span>{new Date(donation.updatedAt).toLocaleString()}</span>
              </div>

              <div className="detailRow">
                <strong>Receivers:</strong>
                <div>
                  {donation.listRecievers && donation.listRecievers.length > 0 ? (
                    donation.listRecievers.map((r) => (
                      <div key={r.recipient_id}>{r.username} ({r.status})</div>
                    ))
                  ) : (
                    <div>N/A</div>
                  )}
                </div>
              </div>
            </div>

            <div className="sideModalFooter">
              <button className="PromoButtonPrimary" onClick={handleSave}>
                Save
              </button>
              <button className="PromoButtonTertiary" onClick={() => setShowDetails(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DonorBook;
