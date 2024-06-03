import axios from "axios";
import React, { useState, useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import {UserContext} from "../context/userContext/userContext";
import AuthBackDrop from "../components/authbackdrop";


function Login(){
    const {setLocalUser,getLocalUser,setUser,user}=useContext(UserContext)
    const [isLoading,setIsLoading]=useState(false);
    const [error,setError] = useState(false);
    const [loginData,setLoginData]=useState({email:"",password:""})
    const navigate=useNavigate()
    const handleChange=(e)=>{
        e.preventDefault();
        setLoginData((prev)=>({...prev,[e.target.id]:e.target.value}))
        console.log(loginData)
    }

    const LoginUser=async(e)=>{
        e.preventDefault();
        setIsLoading(true)
        // console.log('loggiiiiiiiiiiiiiiiiiiiiiiiiiiiiiin')
        try {
           const loginResponse= await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/loginUser`,loginData) ;
           console.log(loginResponse.data)
           if(loginResponse.status==200){

            setLocalUser(loginResponse.data);
            // console.log('==============================')
            // console.log(user)
        
            // TODO:Write implementaion to store value in local storage
            navigate('/');

           }
           else{
            setError(true);
            // setTimeout(3000,()=>setError(false))
           }
        } catch (error) {
            console.log(error);
            setError(true);
        }finally{
                      setTimeout(3000,()=>setError(false))
                      setIsLoading(false)
  
        }
    }
    const {email,password}=loginData;
    return (<>
        
       <AuthBackDrop><div className="LoginForm">  
        <h3 style={{textAlign:"center"}}>Welcome Back</h3>
        {error&& <p style={{color:"red"}}>Incorrect Username or Passowrd</p>}
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
        <button  className="LogInButton" type="submit">{`${isLoading?'Logging in': 'Login'}`}</button>
        <p  style={{textAlign:"center"}}>Don't have an account?<Link to='/signUp' style={{color:'#9747ff'}}>SignUp</Link></p>
        </form>
        </div></AuthBackDrop>
        

        
    </>)
}

export default Login;