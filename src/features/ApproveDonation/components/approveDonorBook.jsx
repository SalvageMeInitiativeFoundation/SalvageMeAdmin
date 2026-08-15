import React, { useState } from "react";

function ApproveDonorBook({ donation, updateRequestStatus }) {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(donation.status || "pending");

  const statuses = ["pending", "approved", "rejected", "fulfilled", "returned", "delivering"];

  const handleSave = async () => {
    if (updateRequestStatus) await updateRequestStatus(donation._id, selectedStatus);
    setShowDetails(false);
  };

  const recipientName = donation.recipient_id && donation.recipient_id.username ? donation.recipient_id.username : 'N/A';
  const book = donation.book_id || {};

  return (
    <>
      <div className="cardItem">
        <div className="thumb" style={{ backgroundImage: `url(${book.image})` }} role="img" aria-label={book.title} />
        <p className="cardTitle">
          <span className="cardTitleText">{book.title}</span>
          <span className={`statusBadge ${(donation.status || '').toLowerCase().replace(/\s+/g,'')}`}>
            {donation.status}
          </span>
        </p>
        <p className="staticColumnHead">{recipientName}</p>
        <p style={{ textAlign: "left", flex: "1" }}>{new Date(donation.updatedAt).toLocaleString()}</p>
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
              <h3>Request Details</h3>
              <button className="PromoButtonTertiary" onClick={() => setShowDetails(false)}>Close</button>
            </div>
            <div className="sideModalBody">
              <img src={book.image} alt={book.title} className="modalImage" />

              <div className="detailRow">
                <strong>Status:</strong>
                <select className="statusSelect" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                  {statuses.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="detailRow"><strong>Recipient:</strong><span>{recipientName}</span></div>
              <div className="detailRow"><strong>Delivery Location:</strong><span>{donation.delivery_location || 'N/A'}</span></div>
              <div className="detailRow"><strong>Return Due:</strong><span>{donation.return_due_date ? new Date(donation.return_due_date).toLocaleString() : 'N/A'}</span></div>
              <div className="detailRow"><strong>Request Date:</strong><span>{donation.request_date ? new Date(donation.request_date).toLocaleString() : 'N/A'}</span></div>
              <div className="detailRow"><strong>Created At:</strong><span>{new Date(donation.createdAt).toLocaleString()}</span></div>
              <div className="detailRow"><strong>Updated At:</strong><span>{new Date(donation.updatedAt).toLocaleString()}</span></div>
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

export default ApproveDonorBook;
