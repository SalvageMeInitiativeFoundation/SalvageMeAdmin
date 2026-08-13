import "./index.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter , Routes, Route } from "react-router-dom";
import NavBar from "./components/navBar";
import SignUp from "./pages/signUp";
import Home from "./pages/home";
import AcceptDonation from "./pages/acceptDonation";
import ApproveDonation from "./pages/approveDonation";
import Login from "./pages/login";
import PrivateRoute from "./components/privateRoute";
import PrivateRoute1 from "./components/privateRoute1";
import AuthRoute from "./components/authRoute";
import UserContextProvider from "./context/userContext/userContext";
import SideBarLayout from "./shared/sideBarLayout";
import PromoteUsertoVolunteer from "./pages/promoteUsertoVolunteer";



function App() {
  return (
    
      <UserContextProvider>
      <ToastContainer />
      <BrowserRouter>
      <SideBarLayout>
      <NavBar />
        <Routes>
          <Route element={<AuthRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/approveDonation" element={<PrivateRoute />}>
            <Route path="/approveDonation" element={<ApproveDonation />} />
          </Route>
          <Route path="/acceptDonation" element={<PrivateRoute />}>
            <Route path="/acceptDonation" element={<AcceptDonation />} />
          </Route>
          <Route path="/promoteUsertoVolunteer" element={<PrivateRoute />}>
            <Route path="/promoteUsertoVolunteer" element={<PromoteUsertoVolunteer />} />
          </Route>
          
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </SideBarLayout>
      </BrowserRouter>
      </UserContextProvider>
   
  );
}

export default App;
