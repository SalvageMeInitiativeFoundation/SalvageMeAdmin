import axios from "axios";
import React, { useState,useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {MdCloudUpload} from 'react-icons/md';
import {UserContext} from "../context/userContext/userContext";



function SignUp() {
  const {setLocalUser,getLocalUser,setUser,user}=useContext(UserContext)
  const [selectedImage,setSelectedImage]=useState(null);
  const [preview, setPreview] = useState(null)
  const [picFile,setPicFile]=useState(null);

  useEffect(() => {
    
    if (!selectedImage) {
      setPreview(null)
      console.log('se'+ selectedImage)
      return
  }
    // create the preview
    const objectUrl = URL.createObjectURL(selectedImage)
    setPreview(objectUrl)
 
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
 }, [selectedImage])


 
  const navigate = useNavigate();
  const [SignUpForm, setSignUpForm] = useState(
    {
      email: "",
      username: "",
      password: "",
      linkedin: "",
      image: "",
      confirmPassword: "",
      accountType:"user"
    }
    // aacount type can be user,volunteer or partner
  );

  const acceptedExt = ["image/png", "image/jpg", "image/jpeg"];

  async function handleUpload (e){
    e.preventDefault();
    console.log(e.target.files[0]);
  
    if (acceptedExt.includes(e.target.files[0].type)) {
      console.log('uploading')
      setPicFile(e.target.files[0]);
    //   for (var key of mypic.entries()) {
    //     console.log(key[0]+'-'+ key[1]);
    // }
    }
    
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files) {
      console.log('file')
      setSelectedImage(e.target.files[0])
      handleUpload(e);
      // setSelectedImage(null)   
    }

    setSignUpForm((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));

  };

  const { email, username, password, linkedin, confirmPassword } =
    SignUpForm;

    async function  signUpUser (File,e){
    e.preventDefault();
    const mypic = new FormData()
    if (password === confirmPassword) {
      delete SignUpForm.confirmPassword;
      try {
        
        mypic.append('mypic',File);
        const urlResponse = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/picture/image-upload`,
          mypic,{
            headers: {
              // 'Accept-Language': 'en-US,en;q=0.8',
              'Content-Type': 'multipart/form-data',
            }
          },
         
        );
        console.log(urlResponse.data.imageUrl);
        const signUpData = { ...SignUpForm, image: urlResponse.data.imageUrl };
        const signUpUserResponse = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/auth/createUser`,
          signUpData
        );
        if (signUpUserResponse.status== 200) {
          console.log(signUpUserResponse.data);
          setLocalUser(signUpUserResponse.data)
          // TODO:write implementation to store data locally  for future reference
          
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="SignUpForm">
        <h3 style={{ textAlign: "center" }}>Create Account</h3>

        <form >
          <div className="SignUpFormInput">
            <div>
              <div className="ProfileImageContainer">
              <label for='image'>
              {selectedImage!= null ?<img src={preview} alt="Profile image" className="ProfileImage"/>:<MdCloudUpload size={80} className="CloudImage"/> } 
              </label>
              </div>

              <input
                type="file"
                name="ProfileImage"
                id="image"
                onChange={handleChange}
                accept="image/*"
                hidden
              />
            </div>
            <div className="SignUpFormInputFormColumn">
              <div>
                <label htmlFor="username">Profile Name</label>
                <br></br>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter your profile name"
                  required={true}
                  onChange={handleChange}
                  value={username}
                />
              </div>
              
              <div>
                <label htmlFor="Email">Email</label>
                <input
                  type="email"
                  name="Email"
                  id="email"
                  placeholder="Enter email address or username"
                  required={true}
                  onChange={handleChange}
                  value={email}
                />
              </div>
              <div>
                <label htmlFor="Password">Password</label>
                <br></br>
                <input
                  type="password"
                  name="Password"
                  id="password"
                  placeholder="Enter your password"
                  required={true}
                  onChange={handleChange}
                  value={password}
                />
              </div>
              <div>
                <label htmlFor=" ConfirmPassword"> Confirm password</label>
                <input
                  type="password"
                  name="ConfirmPassword"
                  id="confirmPassword"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  value={confirmPassword}
                />
              </div>
              <div>
                <label htmlFor=" LinkedIn"> LinkedIn profile</label>
                <input
                  type="Link"
                  name="LinkedIn"
                  id="linkedin"
                  placeholder="Enter your LinkedIn Profile Link"
                  required={true}
                  onChange={handleChange}
                  value={linkedin}
                />
              </div>
            </div>
          </div>

          <button className="SignUpButton" type="button" onClick={(e)=>signUpUser(picFile,e)}>
            SignUp
          </button>
        </form>
        <p style={{ textAlign: "center" }}>
          Already have an account?<Link to="/login">Login</Link>
        </p>
      </div>
    </>
  );
}

export default SignUp;
