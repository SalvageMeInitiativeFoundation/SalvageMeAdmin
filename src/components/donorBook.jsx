import axios from "axios";
import React,{useEffect, useState,useContext } from "react";
import {UserContext} from "../context/userContext/userContext";


function DonorBook({donation,user,DonationAccepted,DonationRejected}) {  
  const message="Hello, Thanks Donating a book to.......................... "  
  
  return (
    <div className="Heroes">
      <img src={donation.image} alt="Heroe's image" />
      <p style={{ textAlign: "left",flex:'2' }}>{donation.title}</p>
      <p style={{ textAlign: "left",flex:'2' }}>{donation.donor}</p>
      <p style={{ textAlign: "left",flex:'1' }}>{Date(donation.updatedAt).split("G")[0]}</p>
      
      <div className="HeroesDetails">
        <button className="PromoButtonPrimary " type="button" onClick={(e)=>DonationAccepted(donation._id,e)}>
          Accept
        </button>
        <a href={`mailto:${donation.donor}?subject=Appreciation for Donation&body=${message}`} target="_blank" rel="noopener noreferrer">
          <button
            className="PromoButtonTertiary"
            type="button"
            onClick={(e) => console.log("mail sent")}
          >
            Mail
          </button>
        </a>
        <button className="PromoButtonTertiary" type="button" onClick={(e)=>DonationRejected(donation._id,e)}>
          Reject
        </button>
      </div>
    </div>
  );
}
export default DonorBook;
