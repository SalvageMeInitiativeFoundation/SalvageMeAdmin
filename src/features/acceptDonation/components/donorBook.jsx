import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

function DonorBook({ donation, user, DonationAccepted, DonationRejected, updateDonationStatus }) {
  const [showDetails, setShowDetails] = useState(false);
  const [showMailModal, setShowMailModal] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const [isSendingMail, setIsSendingMail] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(donation.status || "pending");

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

  const handleManualMail = (e) => {
    e.preventDefault();
    setShowMailModal(true);
  };

  const handleSendMail = async (e) => {
    e.preventDefault();
    const accessToken = user?.[0]?.accessToken || user?.accessToken;
    if (!accessToken) {
      toast.error('Your session has expired. Please sign in again.', { position: 'top-right', autoClose: 5000 });
      return;
    }

    setIsSendingMail(true);
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/sendemail/send`,
        {
          to: donation.donor,
          template: 'donationStatus',
          payload: {
            name: donation.donorUsername || donation.donorId?.username || donation.donor,
            bookTitle: donation.title,
            status: selectedStatus,
            customMessage: customMessage.trim(),
          },
        },
        { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` } }
      );
      toast.success('Email sent successfully.', { position: 'top-right', autoClose: 4000 });
      setCustomMessage('');
      setShowMailModal(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message || 'Could not send email.', {
        position: 'top-right',
        autoClose: 5000,
      });
    } finally {
      setIsSendingMail(false);
    }
  };

  const acceptedByName = (() => {
    // acceptedBy can be an object { _id, username } or a string/null
    if (donation.acceptedBy) {
      if (typeof donation.acceptedBy === 'object') return donation.acceptedBy.username || 'N/A';
      return donation.acceptedBy;
    }
    if (donation.currentReciever && donation.currentReciever.username) return donation.currentReciever.username;
    if (donation.listRecievers && donation.listRecievers[0] && donation.listRecievers[0].username) return donation.listRecievers[0].username;
    return 'N/A';
  })();

  return (
    <>
      <div className="cardItem">
        <div
          className="thumb"
          role="img"
          aria-label={donation.title}
          style={{ backgroundImage: `url(${donation.image})` }}
        />
        <p className="cardTitle">
          <span className="cardTitleText">{donation.title}</span>
          <span className={`statusBadge ${(donation.status || '').toLowerCase().replace(/\s+/g,'')}`}>
            {donation.status}
          </span>
        </p>
        <p className="staticColumnHead">{donation.donor}</p>
        <p style={{ textAlign: "left", flex: "1" }}>
          {new Date(donation.updatedAt).toLocaleString()}
        </p>
        <div className="cardItemDetails">
          <button className="MailButton" type="button" onClick={handleManualMail}>
            Initiate Manual Mail
          </button>
          <button className="PromoButtonSecondary" type="button" onClick={() => setShowDetails(true)}>
            View Details
          </button>
        </div>
      </div>

      {showMailModal && (
        <div className="modalOverlay" onClick={() => !isSendingMail && setShowMailModal(false)}>
          <form className="sideModal" onSubmit={handleSendMail} onClick={(e) => e.stopPropagation()}>
            <div className="sideModalHeader">
              <h3>Send Donor Email</h3>
              <button className="PromoButtonTertiary" type="button" onClick={() => setShowMailModal(false)} disabled={isSendingMail}>
                Close
              </button>
            </div>

            <div className="sideModalBody">
              <div className="detailRow">
                <strong>To:</strong>
                <span>{donation.donor}</span>
              </div>
              <div className="detailRow">
                <strong>Book:</strong>
                <span>{donation.title}</span>
              </div>
              <div className="detailRow">
                <strong>Status:</strong>
                <span>{selectedStatus}</span>
              </div>
              <label htmlFor={`custom-message-${donation._id}`} style={{ display: 'block', marginTop: 16, marginBottom: 8, fontWeight: 600 }}>
                Custom message
              </label>
              <textarea
                id={`custom-message-${donation._id}`}
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Write a message to the donor..."
                rows={8}
                required
                style={{ width: '100%', boxSizing: 'border-box', resize: 'vertical', padding: 10, border: '1px solid #e5e5e5', borderRadius: 6, font: 'inherit' }}
              />
            </div>

            <div className="sideModalFooter">
              <button className="PromoButtonPrimary" type="submit" disabled={isSendingMail}>
                {isSendingMail ? 'Sending...' : 'Send Email'}
              </button>
              <button className="PromoButtonTertiary" type="button" onClick={() => setShowMailModal(false)} disabled={isSendingMail}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

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
