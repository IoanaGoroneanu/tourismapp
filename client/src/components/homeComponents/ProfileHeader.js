import React from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom"
import search, { setSearchFalse, setSearchTrue } from "../features/search";
import { login, logout } from "../features/user";

export default function Header(){
    const email = useSelector((state) => state.user.value.email);

    const dispatch = useDispatch();

    let navigate = useNavigate();

    function handleLogin(){
        navigate('/login')
    }

    function handleRegister(){
        navigate('/register')
    }

    function handleProfile(){
        navigate('/profile')
    }

    function handleLogout(){
        dispatch(logout());
        navigate('/')
    }

    function handleHomepage(){
        navigate('/')
    }

    function addBusiness(){
        navigate('/addBusiness')
    }


    return(
        <div>
        {email==="" &&
        <div className="header">
            <img className="logo--img" onClick={handleHomepage} src="./images/applogo2.png"/>
            <div className="header--elements">
                <button onClick={addBusiness} className="header--button">
                    Add a new business
                </button>
                <button onClick={handleLogin} className="header--button">
                    Log in
                </button>
                <button onClick={handleRegister} className="header--button">
                    Sign up
                </button>
            </div>
        </div>
        }
        {!(email==="") &&
         <div className="header">
         <img className="logo--img" onClick={handleHomepage} src="./images/applogo2.png"/>
                    
         <div className="header--elements">
         <button onClick={addBusiness} className="header--button">
                    Add a new business
                </button>
             <button onClick={handleProfile} className="header--button">
                 Profile
             </button>
             <button onClick={handleLogout} className="header--button">
                 Log Out
             </button>
         </div>
     </div>
        }
        </div>
    )
}