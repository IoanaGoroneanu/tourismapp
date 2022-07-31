import React, {useState, useEffect} from 'react'
import Axios from 'axios';
import {useSelector} from 'react-redux';
import * as FaIcons from 'react-icons/fa';

function Museums() {
    const email = useSelector((state) => state.user.value.email);

    const [profileMuseums, setProfileMuseums] = useState([]);
    const [allMuseums, setAllMuseums] = useState([]);
    const [selectedMuseum, setSelectedMuseum] = useState("")
    const [visible, setVisible] = useState(false)
    const [hasOne, sethasOne] = useState(false)
    const [windowReload, setWindowReload] = useState(false)

    useEffect(() => {
        Axios.get("http://localhost:3001/museumList").then((response) => {
            setProfileMuseums(response.data)
        });
        setWindowReload(false);
    }, [])

    useEffect(() => {
        Axios.get("http://localhost:3001/getMuseums").then((response) => {
            setAllMuseums(response.data)
        });
    }, [])

    function seeMore(id) {
        setSelectedMuseum(id);
        setVisible(prevState => !prevState)
    };

    function openLink(value) {
        const myLink = JSON.stringify(value);
        
    }

    function seeLess(){
        setVisible(prevState => !prevState)
    }

    function hasEntries(){
        profileMuseums.map((museum) => {
            if(museum.userEmail === email){
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
        fetch(`http://localhost:3001/museumList/${id}`, {
            method: 'DELETE'
        })
    }

    function deleteMuseum(){
        let museumToDelete = ""
        profileMuseums.map((museum) => {
            if(museum.museumId === selectedMuseum){
                museumToDelete=museum._id;
            }
        })
        sendDeleteRequest(museumToDelete);
        refreshPage();
    }



  return (
    <div>
        <div>
            {
            hasOne &&
            <div className="card">
            <h1 className="card--category">Museums</h1>
                <div className="cards--profile">
                    {
                    profileMuseums.map((museum) => {
                        if(museum.userEmail === email) {
                            return(
                                <div>
                                    
                                    {
                                        allMuseums.map((museumElement) => {
                                            if(museumElement._id===museum.museumId){
                                                return(
                                                    <div className="card--element" onClick={() => seeMore(museumElement._id)}>
                                                        <img className="card--image" src={museumElement.imageUrl} />
                                                        <span className="card--title" >{museumElement.name}</span>
                                                        <div className="city">
                                                        <FaIcons.FaMapMarkerAlt className="icon--location"/>
                                                        <span className="card--city">{museumElement.city}</span>
                                                        </div>
                                                        <span className="card--tags">{museumElement.tags}</span>
                                                        
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                </div>
                            )
                                }
                        }
                    )
                    }
                </div>
                {
                    visible &&
                    <div>
                        {
                            allMuseums.filter(museumElement => museumElement._id === selectedMuseum).map(filteredMuseum => {
                                return(
                                    <div className="details--element">
                                        <FaIcons.FaWindowClose onClick={seeLess} className="icon--close" />
                                        <div className="details--header">
                                        <img className="header--image" src={filteredMuseum.imageUrl} />
                                        <div className="header--text">
                                        <span className="header--title" >{filteredMuseum.name}</span>
                                        <div className="details--city">
                                        <FaIcons.FaMapMarkerAlt className="icon--location"/>
                                        <span className="header--city">{filteredMuseum.city}</span>
                                        </div>
                                        <span className="header--tags">{filteredMuseum.tags}</span>
                                        <div className="card--buttons--2">
                                        <FaIcons.FaHeart className="card--add--button" onClick={deleteMuseum}/>
                                        <button className="card--more" onClick={deleteMuseum}>remove from favourites</button>
                                        </div>
                                        </div>
                                        </div>
                                        <div className="details--main">
                                        <div className="main--text">
                                        <div className="details--website">
                                        <FaIcons.FaExternalLinkAlt className="icon--link"/>
                                        <a className="main--website" href={filteredMuseum.website}>Website</a>
                                        </div> 
                                        <div className="details--contact">
                                        <FaIcons.FaAddressBook className="icon--contact" />
                                        <span className="main--contact">
                                            {filteredMuseum.contact}
                                        </span>
                                        </div>
                                        <span className="main--description">
                                            {filteredMuseum.description}
                                        </span>
                                        
                                        </div>
                                        <div className="main--location">
                                        <iframe className="location--map" src={filteredMuseum.googleMaps} />
                                        <span className="location--address">
                                        {filteredMuseum.address}
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

export default Museums