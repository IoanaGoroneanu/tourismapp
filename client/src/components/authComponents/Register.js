import React from "react"
import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';

export default function Register()
{
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    let navigate = useNavigate();

    const displayError = (err) => {
        alert("A user already exists with this email")
        navigate('/register')
        console.log(err);
    }

    const sendRequest = async () => {
        const res = await axios.post("http://localhost:3001/signup", {
            name: username,
            email: email,
            password: password
        }).catch(err=>displayError(err))
        const data = await res.data;
        return data;
    }

    const registerHandler = (e) => {
        e.preventDefault();
        sendRequest().then(()=>navigate('/login'));
    }

    function handleHomepage(){
        navigate('/')
    }

    return(
        <div>
            <div className="auth--screen--register">
                <form onSubmit={registerHandler} className='auth--form'>
                <img className="logo--img--auth" src="./images/applogo2.png" onClick={handleHomepage}/>
                    <h3 className='auth--form--title'> Register </h3>

                    <div className='form--group'>
                    <label className="form--label">Username</label>
                    <input
                    className='form--input'
                    type="text"
                    required
                    id="name"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className='form--group'>
                    <label className="form--label">Email</label>
                    <input
                    className='form--input'
                    type="email"
                    required
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='form--group'>
                    <label className="form--label">Password</label>
                    <input
                    className='form--input'
                    type="password"
                    required
                    id="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                type="submit"
                className="form--button"
                >
                Register
                </button>

                <span className="form--subtext">
                Already have an account? <Link to="/login">Login</Link>
                </span>
                </form>

            </div>

        </div>
    )
}