import axios from "axios";
import React, { useState, useContext, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext/userContext";
import { EMAIL_REG_EXP } from "../utils/constants";
import AuthBackDrop from "../components/authbackdrop";
import { toast } from "react-toastify";


function Login(){
    const {setLocalUser,getLocalUser,setUser,user}=useContext(UserContext)
    const [isLoading,setIsLoading]=useState(false);
    const [error,setError] = useState("");
    const [emailError,setEmailError] = useState("");
    const [loginData,setLoginData]=useState({email:"",password:""})
    const navigate=useNavigate()
    const handleChange=(e)=>{
        e.preventDefault();
                const value = e.target.value;
                setLoginData((prev)=>({...prev,[e.target.id]:value}))
                // validate email live
                if(e.target.id === 'email'){
                    if(!EMAIL_REG_EXP.test(value)){
                        setEmailError('Please enter a valid email address');
                    } else {
                        setEmailError('');
                    }
                }
    }

        // Delayed portal redirect with cancel-on-toast-close behavior
        const redirectTimerRef = useRef(null);
        const redirectToastIdRef = useRef(null);
        const redirectedRef = useRef(false);

        useEffect(()=>{
            return ()=>{
                if(redirectTimerRef.current) clearTimeout(redirectTimerRef.current);
            }
        },[])

        const handlePortalRedirect = (portal, message) => (e) => {
            e.preventDefault();
            if(!portal){
                toast.info('Client portal is not configured.', { position: 'top-right', autoClose: 5000 });
                return;
            }
            // Show a toast that auto-closes in 3 seconds while we redirect after 3s.
            const toastId = toast.info(message || 'Redirecting to client portal in 3 seconds.', {
                autoClose: 3000,
                closeButton: true,
                position: 'top-right'
            });
            redirectToastIdRef.current = toastId;
            // Always redirect after 3 seconds; closing the toast does NOT cancel.
            if (redirectTimerRef.current) clearTimeout(redirectTimerRef.current);
            redirectTimerRef.current = setTimeout(()=>{
                window.open(portal, '_blank');
                // toast will auto-close, but ensure it's dismissed after redirect
                toast.dismiss(toastId);
            }, 3000);
        }

    const LoginUser=async(e)=>{
        e.preventDefault();
        setIsLoading(true)
        // console.log('loggiiiiiiiiiiiiiiiiiiiiiiiiiiiiiin')
        try {
                     // client-side email validation
                     if(!EMAIL_REG_EXP.test(loginData.email)){
                         setError('Please enter a valid email address');
                         setIsLoading(false);
                         setTimeout(()=>setError(''),3000);
                         return;
                     }

                     const loginResponse = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/loginUser`, loginData);
                     const userData = loginResponse.data;
                     console.log(userData);
                     if (loginResponse.status == 200) {
                        // Block non-admin users from accessing this portal
                        if (userData && userData.isAdmin === false) {
                            toast.error('This account is not allowed to access this portal.');
                        } else {
                            setLocalUser(userData);
                            navigate('/');
                        }
                     } else {
                        setError('Incorrect Email or Password');
                     }
        } catch (error) {
            console.log(error);
            const msg = error?.response?.data?.message || error?.message || 'Incorrect Email or Password';
            toast.error(msg, { position: 'top-right', autoClose: 5000 });
                        setError('Incorrect Email or Password');
        }finally{
                                            setTimeout(()=>setError(''),3000)
                                            setIsLoading(false)
  
        }
    }
    const {email,password}=loginData;
    return (<>
        
       <AuthBackDrop><div className="LoginForm">  
        <h3 className="loginTitle">Welcome Back</h3>
        <p className="loginSubtitle">Enter your credentials to access admin portal</p>
        {error && <p className="formError">{error}</p>}
        <form onSubmit={LoginUser}>
        <div>
        <label htmlFor="Email">Email</label><br></br>
        <input type="email" name="Email" id="email" placeholder="Enter email address" required={true} value={email} onChange={handleChange} className={emailError? 'inputInvalid':''}/>
        {emailError && <p className="inputErrorText">{emailError}</p>}
        </div>
        <div>
        <label htmlFor="Password">Password</label><br></br>
        <input type="password" name="Password" id="password" placeholder="Enter your password" required={true} value={password} onChange={handleChange}/><br></br>
        </div>
        <p style={{textAlign:"right",color:"#fd7e14",cursor:"pointer", fontWeight:700,}} onClick={handlePortalRedirect(`${process.env.REACT_APP_CLIENT_PORTAL}/login`, 'Reset password is handled on the client portal. Redirecting in 3 seconds...')}>Forgot password?</p>
        <button  className="LogInButton" type="submit">{`${isLoading?'Logging in...': 'Login'}`}</button>
        <p  style={{textAlign:"center", margin:"5px 0"}}>Don't have an account? <a href="#" onClick={handlePortalRedirect(`${process.env.REACT_APP_CLIENT_PORTAL}/signup`, 'Please sign up via the client portal. Redirecting in 3 seconds...')} style={{color:'#fd7e14', fontWeight:700}}>SignUp</a></p>
        </form>
        </div></AuthBackDrop>
        

        
    </>)
}

export default Login;