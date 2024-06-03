import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../../context/userContext/userContext";
import { Link } from "react-router-dom";

function ApproveDonorBook({ donation, ApprovalRejected, ApprovalAccepted }) {
  const message =
    "Hello %0D  We have approved your request for ............................. ";

  return (
    <div className="cardItem">
      <img src={donation.image} alt="Heroe's image" />
      <p style={{ textAlign: "left", flex: "2" }}>{donation.title}</p>
      <p className="staticColumnHead">
        { donation.currentReciever}
      </p>
      <p style={{ textAlign: "left", flex: "1" }}>
        {Date(donation.updatedAt).split("G")[0]}
      </p>
      <div className="cardItemDetails">
        <button
          className="PromoButtonPrimary"
          type="button"
          onClick={(e) => ApprovalAccepted(donation._id, e)}
        >
          Approve
        </button>
        <a
          href={`mailto:${donation.currentReciever}?subject=Acceptance of Request&body=${message}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button
            className="MailButton"
            type="button"
            onClick={(e) => console.log("mail sent")}
          >
            Mail
          </button>
        </a>
        <button
          className="PromoButtonTertiary"
          type="button"
          onClick={(e) => ApprovalRejected(donation._id, e)}
        >
          Reject
        </button>
      </div>
    </div>
  );
}
export default ApproveDonorBook;
