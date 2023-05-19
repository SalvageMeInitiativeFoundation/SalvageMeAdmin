import axios from "axios";
import React,{useEffect, useState,useContext } from "react";
import {UserContext} from "../context/userContext/userContext";


function ApproveDonorBook({donation,user}) {    
  
  return (
    <div className="Heroes">
      <img src={donation.image} alt="Heroe's image" />
      <p style={{ textAlign: "center" }}>{donation.title}</p>
      <p style={{ textAlign: "center" }}>{donation.currentReciever}</p>
      <p style={{ textAlign: "center" }}>{donation.updatedAt}</p>
      <div className="HeroesDetails">
        <button className="PromoButtonPrimary" type="button">
          Approve
        </button>
        <button className="PromoButtonTertiary" type="button">
          Reject
        </button>
      </div>
    </div>
  );
}
export default ApproveDonorBook;
