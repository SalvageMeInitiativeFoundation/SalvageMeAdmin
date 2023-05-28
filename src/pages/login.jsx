import axios from "axios";
import React, { useState, useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import {UserContext} from "../context/userContext/userContext";


function Login(){
    const {setLocalUser,getLocalUser,setUser,user}=useContext(UserContext)
    const [isLoading,setIsLoading]=useState(false);
    const [loginData,setLoginData]=useState({email:"",password:""})
    const navigate=useNavigate()
    const handleChange=(e)=>{
        e.preventDefault();
        setLoginData((prev)=>({...prev,[e.target.id]:e.target.value}))
        console.log(loginData)
    }

    const LoginUser=async(e)=>{
        e.preventDefault();
        console.log('loggiiiiiiiiiiiiiiiiiiiiiiiiiiiiiin')
        try {
           const loginResponse= await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/loginUser`,loginData) ;
           console.log(loginResponse.data)
           if(loginResponse.status==200){

            setLocalUser(loginResponse.data);
            console.log('==============================')
            console.log(user)
        
            // TODO:Write implementaion to store value in local storage
            navigate('/');

           }
        } catch (error) {
            console.log(error);
        }
    }
    const {email,password}=loginData;
    return (<>
        
       
        <div className="LoginForm">  
        <h3 style={{textAlign:"center"}}>Welcome Back</h3>
        <form onSubmit={LoginUser}>
        <div>
        <label htmlFor="Email">Email</label><br></br>
        <input type="email" name="Email" id="email" placeholder="Enter email address or username" required={true} value={email} onChange={handleChange}/>
        </div><br></br>
        <div>
        <label htmlFor="Password">Password</label><br></br>
        <input type="password" name="Password" id="password" placeholder="Enter your password" required={true} value={password} onChange={handleChange}/><br></br>
        </div>
        <p style={{textAlign:"right",color:"#9747ff",cursor:"pointer"}}>Forgot password?</p>
        <button  className="LogInButton" type="submit">Login</button>
        <p  style={{textAlign:"center"}}>Already have an account?<Link to='/signUp'>SignUp</Link></p>
        </form>
        </div>

        
    </>)
}

export default Login;