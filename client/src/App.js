import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home"
import "./styles.css"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import Login from "./components/authComponents/Login";
import Register from "./components/authComponents/Register";
import Profile from "./components/userComponents/Profile";
import Restaurants from "./components/userComponents/Restaurants";
import EditProfile from "./components/userComponents/EditProfile";
import ChangeUsername from "./components/userComponents/ChangeUsername";
import ChangePassword from "./components/userComponents/ChangePassword";
import AddBusiness from "./components/homeComponents/AddBusiness";

function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/editProfile" element={<EditProfile/>}/>
          <Route path="/changeUsername" element={<ChangeUsername/>}/>
          <Route path="/changePassword" element={<ChangePassword/>}/>
          <Route path="/addBusiness" element={<AddBusiness/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
 