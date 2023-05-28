import React, { useContext, useEffect } from "react";
import { Outlet,Navigate } from "react-router-dom";
import {UserContext} from "../context/userContext/userContext";

function PrivateRoute(){
    const {getLocalUser,setUser,user}=useContext(UserContext)
    console.log('====================================current user==================')
    console.log(user)
    // useEffect(()=>{
    //     getLocalUser();
    //    },[])
    return((user.length>0 && (user[0].isAdmin==true||user[0].accountType!='user'))?<Outlet/>:<Navigate to='/login'/>)

}
export default PrivateRoute;