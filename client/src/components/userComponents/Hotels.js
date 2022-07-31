import React, {useState, useEffect} from 'react'
import Axios from 'axios';
import {useSelector} from 'react-redux';
import * as FaIcons from 'react-icons/fa';
import { Navigate, useNavigate } from 'react-router-dom';

function Hotels() {
    const email = useSelector((state) => state.user.value.email);

    const [profileHotels, setProfileHotels] = useState([]);
    const [allHotels, setAllHotels] = useState([]);
    const [selectedHotel, setSelectedHotel] = useState("")
    const [visible, setVisible] = useState(false)
    const [hasOne, sethasOne] = useState(false)
    const [windowReload, setWindowReload] = useState(false)

    let navigate = useNavigate();

    useEffect(() => {
        Axios.get("http://localhost:3001/hotelList").then((response) => {
            setProfileHotels(response.data)
        });
        setWindowReload(false);
    }, [])

    useEffect(() => {
        Axios.get("http://localhost:3001/getHotels").then((response) => {
            setAllHotels(response.data)
        });
    }, [])

    function seeMore(id) {
        setSelectedHotel(id);
        setVisible(prevState => !prevState)
    };

    function openLink(value) {
        const myLink = JSON.stringify(value);
        
    }

    function seeLess(){
        setVisible(prevState => !prevState)
    }

    function hasEntries(){
        profileHotels.map((hotel) => {
            if(hotel.userEmail === email){
                sethasOne(true);
            }
        })
    }

    useEffect(() => {
        hasEntries();
    })

    function refreshPage() {
        setWindowReload(true);
        if(windowReload){
            window.location.reload(false);
        }
    }

    function sendDeleteRequest(id){
        fetch(`http://localhost:3001/hotelList/${id}`, {
            method: 'DELETE'
        })
    }

    function deleteHotel(){
        let hotelToDelete = ""
        profileHotels.map((hotel) => {
            if(hotel.hotelId === selectedHotel){
                hotelToDelete=hotel._id;
            }
        })
        sendDeleteRequest(hotelToDelete);
        refreshPage()
    }

  return (
    <div>
        <div>
            {
            hasOne &&
            <div className="card">
                <h1 className="card--category">Hotels</h1>
                <div className="cards">
                {
                    profileHotels.map((hotel) => {
                        if(hotel.userEmail === email) {
                            return(
                                <div>
                                    
                                    {
                                        allHotels.map((hotelElement) => {
                                            if(hotelElement._id===hotel.hotelId){
                                                return(
                                                    <div className="card--element" onClick={() => seeMore(hotelElement._id)}>
                                                        <img className="card--image" src={hotelElement.imageUrl} />
                                                        <span className="card--title" >{hotelElement.name}</span>
                                                        <div className="city">
                                                        <FaIcons.FaMapMarkerAlt className="icon--location"/>
                                                        <span className="card--city">{hotelElement.city}</span>
                                                        </div>
                                                        <span className="card--tags">{hotelElement.tags}</span>
                                                        
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                </div>
                            )
                        
                        }
                    })
                }
                </div>
                {
                    visible &&
                    <div>
                        {
                            allHotels.filter(hotelElement => hotelElement._id === selectedHotel).map(filteredHotel => {
                                return(
                                    <div className="details--element">
                                        <FaIcons.FaWindowClose onClick={seeLess} className="icon--close" />
                                        <div className="details--header">
                                        <img className="header--image" src={filteredHotel.imageUrl} />
                                        <div className="header--text">
                                        <span className="header--title" >{filteredHotel.name}</span>
                                        <div className="details--city">
                                        <FaIcons.FaMapMarkerAlt className="icon--location"/>
                                        <span className="header--city">{filteredHotel.city}</span>
                                        </div>
                                        <span className="header--tags">{filteredHotel.tags}</span>
                                        <div className="card--buttons--2">
                                        <FaIcons.FaHeart className="card--add--button" onClick={deleteHotel}/>
                                        <button className="card--more" onClick={deleteHotel}>remove from favourites</button>
                                        </div>
                                        </div>
                                        </div>
                                        <div className="details--main">
                                        <div className="main--text">
                                        <div className="details--website">
                                        <FaIcons.FaExternalLinkAlt className="icon--link"/>
                                        <a className="main--website" href={filteredHotel.website}>Website</a>
                                        </div> 
                                        <div className="details--contact">
                                        <FaIcons.FaAddressBook className="icon--contact" />
                                        <span className="main--contact">
                                            {filteredHotel.contact}
                                        </span>
                                        </div>
                                        <span className="main--description">
                                            {filteredHotel.description}
                                        </span>
                                        
                                        </div>
                                        <div className="main--location">
                                        <iframe className="location--map" src={filteredHotel.googleMaps} />
                                        <span className="location--address">
                                        {filteredHotel.address}
                                        </span>
                                    </div>
                                </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                }

            </div>
            
            }
        </div>
    
    </div>
    
  )
    
}

export default Hotels