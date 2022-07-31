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

function Profile() {
    const email = useSelector((state) => state.user.value.email);

    const navigate = useNavigate(); 

    const [listOfProfiles, setListOfProfiles] = useState([])

    useEffect(() => {
        Axios.get("http://localhost:3001/users").then((response) => {
            setListOfProfiles(response.data)
        })
    }, [])

    function changeUsername(){
        navigate('/changeUsername')
    }

    function changePassword(){
        navigate('/changePassword')
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
                                    <div className='profile--title'>Profile</div>
                                    <div className='profile--name'>{profile.name}</div>
                                    <div className='profile--name'>{profile.email}</div>
                                    <div className='profile--buttons'>
                                    <button className='profile--edit--button' onClick={changePassword}>change password</button>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
            
        </div>
        
        
        
    </div>
  )
}

export default Profile