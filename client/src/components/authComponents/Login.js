import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {login, logout, loginFailed} from "../features/user"

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    const navigate = useNavigate(); 

    const dispatch = useDispatch();

    const displayError = (err) => {
        alert("Incorrect email or password")
        
        console.log(err);
    }

    const sendRequest = async () => {
        const res = await axios.post("http://localhost:3001/login", {
            email: email,
            password: password
        }).catch(err => displayError(err))
        const data = await res.data;
        return data;
    }

    
    const loginHandler = (e) => {
        e.preventDefault();
        sendRequest().then(()=>dispatch(login({email: email}))).then(()=>navigate('/'))
    }

    function handleHomepage(){
        navigate('/')
    }

    return(
        <div>
            <div className="auth--screen">
                <form onSubmit={loginHandler} className="auth--form">
                    <img className="logo--img--auth" src="./images/applogo2.png" onClick={handleHomepage}/>
                    <h3 className='auth--form--title'> Login </h3>
                    <div className="form--group">
                        <label className="form--label">Email</label>
                        <input
                            className='form--input'
                            type="email"
                            required
                            id="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form--group">
                        <label className="form--label"> Password </label>
                        <input
                            className='form--input' 
                            type="password" 
                            required 
                            id="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    <button
                    type="submit"
                    className="form--button"
                    >
                    Login
                    </button>

                    <span className="form--subtext">
                        Do not have an account? <Link to="/register">Register</Link>
                    </span>
                    </div>
                    </form>

            </div>
        </div>
    )
}