import React from 'react'
import {useState, useEffect} from 'react' 
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios'
import ProfileHeader from '../homeComponents/ProfileHeader';
import * as FaIcons from "react-icons/fa";
import Restaurants from './Restaurants';
import Hotels from './Hotels';
import Museums from './Museums';
import axios from 'axios';

function ChangePassword() {
    const email = useSelector((state) => state.user.value.email);

    const navigate = useNavigate(); 

    const [listOfProfiles, setListOfProfiles] = useState([])

    const [username, setUsername] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [password, setPassword] = useState("");
    const [successfulLogin, setSuccessfulLogin] = useState(false);

    useEffect(() => {
        Axios.get("http://localhost:3001/users").then((response) => {
            setListOfProfiles(response.data)
        })
    }, [])

    const changePasswordRequest = async () => {
        const res = await Axios.put("http://localhost:3001/changePassword", {
            email:email,
            password: password
        }).catch(err=>console.log(err))
    }

    const submitChanges = (e) => {
        e.preventDefault();
        changePasswordRequest().then(alert("Changes saved"))
        navigate('/profile')
    }

    return (
    <div>
        <ProfileHeader/>
        <div className='profile--elements'>
                {
                    listOfProfiles.map((profile) => {
                        if(profile.email === email){
                            return(
                                <div className='profile--details'>
                                    
                                    <form className='profile--title' onSubmit={submitChanges}>
                                    <div className='profile--title'>Profile</div>

                                        <div className='edit--profile'>
                                            <label className='edit--profile--title'>Password</label>
                                            <input
                                                className='edit--profile--input' 
                                                type="password" 
                                                required
                                                id="password"
                                                placeholder="Enter new password"
                                                
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                       
                                        <button type='submit' className='profile--edit--button' >Save</button>

                                    </form>
                                    </div>
                            )
                        }
                    })
                }
            
        </div>
        
        
        
    </div>
  )
}

export default ChangePassword