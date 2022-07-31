import React from "react"
import { useState, useEffect} from "react"
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Axios from 'axios'
import * as FaIcons from "react-icons/fa";

export default function Museums(){

    const [listOfMuseums, setListOfMuseums] = useState([])

    const [selectedMuseum, setSelectedMuseum] = useState("")

    const [listOfProfiles, setListOfProfiles] = useState([]);

    const [name, setName] = useState("")

    const [reviews, setReviews] = useState([])

    const [visible, setVisible] = useState(false)

    const [review, setReview] = useState("")

    const [rating, setRating] = useState(0)

    const [hover, setHover] = useState(0);

    const [displayRating, setDisplayRating] = useState(0);

    const [windowReload, setWindowReload] = useState(false)

    const searchValue = useSelector((state) => state.search.value.searchValue);

    let navigate = useNavigate();

    const email = useSelector((state) => state.user.value.email);

    useEffect(() => {
        Axios.get("http://localhost:3001/getMuseums").then((response) => {
            setListOfMuseums(response.data)
        }, [])
    })

    const seeMore = async (id) => {
        setSelectedMuseum(id);
        await Axios.get(`http://localhost:3001/getRating/${selectedMuseum}`).then((response) => {
            setDisplayRating(response.data)
        })
        await Axios.get(`http://localhost:3001/getReview/${selectedMuseum}`).then((response) => {
            setReviews(response.data)
        })
        setVisible(prevState => !prevState)
    };

    function seeLess(){
        setVisible(prevState => !prevState)
    }

    function refreshPage() {
        setWindowReload(true);
        if(windowReload){
            window.location.reload(false);
        }
    }

    const filteredMuseums = listOfMuseums.filter((museum) => {
        return museum.name.toLowerCase().includes(searchValue.toLowerCase()) || museum.city.toLowerCase().includes(searchValue.toLowerCase()) || museum.tags.toLowerCase().includes(searchValue.toLowerCase()) || museum.description.toLowerCase().includes(searchValue.toLowerCase())
    })

    useEffect(() => {
        Axios.get("http://localhost:3001/users").then((response) => {
            setListOfProfiles(response.data)
        })
    }, [])

    function getUsername(){
        listOfProfiles.map((profile) => {
            if(profile.email === email){
                setName(profile.name)
            }
        })
    }

    const sendReviewRequest = async () => {
        getUsername();
        const res = await Axios.post("http://localhost:3001/addReview", {
            userEmail: email,
            name: name,
            itemId: selectedMuseum,
            rating: rating,
            review: review
        }).catch(err=>console.log(err))  
    }

    const sendReview = (e) => {
        e.preventDefault();
        if(email){
            sendReviewRequest();
        }
        else {
            navigate('/login')
        }
        refreshPage();
    }

    return(
        <div>
        {
        !searchValue &&
        <div className="card">
            <h1 className="card--category">Museums</h1>
        <div className="cards">
            {
                listOfMuseums.map((museum) => {
                    return(
                        <div className="card--element" onClick={() => seeMore(museum._id)}>
                            <img className="card--image" src={museum.imageUrl} />
                            <span className="card--title" >{museum.name}</span>
                            <div className="city">
                            <FaIcons.FaMapMarkerAlt className="icon--location"/>
                            <span className="card--city">{museum.city}</span>
                            </div>
                            <span className="card--tags">{museum.tags}</span>
                            
                        </div>
                    )
                })
            }
           
           
        </div>
        
        </div>
        }
        {
        searchValue &&
        <div className="card">
            <h1 className="card--category">Museums</h1>
            <div className="cards">
                {
                    filteredMuseums.map((museum) => {
                        return(
                            <div className="card--element" onClick={() => seeMore(museum._id)}>
                            <img className="card--image" src={museum.imageUrl} />
                            <span className="card--title" >{museum.name}</span>
                            <div className="city">
                            <FaIcons.FaMapMarkerAlt className="icon--location"/>
                            <span className="card--city">{museum.city}</span>
                            </div>
                            <span className="card--tags">{museum.tags}</span>                                                     
                       </div> 
                        )
                    })
                }
            </div>
        </div>
        }
        {visible && 
        <div>
             <div className="cards">
            {
                listOfMuseums.filter(museum => museum._id === selectedMuseum).map(filteredMuseum => {
                    return(
                        <div className="details--element">
                            
                            <div className="card--details">
                            <FaIcons.FaWindowClose onClick={seeLess} className="icon--close" />
                                <div className="details--header">
                                <img className="header--image" src={filteredMuseum.imageUrl} />
                                <div className="header--text">
                                    <span className="header--title" >{filteredMuseum.name}</span>
                                    <div className="details--program">
                                        <span className="star--display">&#9733;</span>
                                        <span className="star--display">{displayRating}</span>
                                        </div>
                                    
                                    <div className="details--city">
                                    <FaIcons.FaMapMarkerAlt className="icon--location"/>
                                    <span className="header--city">{filteredMuseum.city}</span>
                                    </div>
                                    <span className="header--tags">{filteredMuseum.tags}</span>
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
                                <div className="add--review">
                                    <span className="add--a--review">Add a review</span>
                                    <div className="star--rating">
                                    {[...Array(5)].map((star, index) => {
                                    index += 1;
                                    return (
                                    <button
                                    type="button"
                                    key={index}
                                    className={index <= (hover || rating) ? "on" : "off"}
                                    onClick={() => setRating(index)}
                                    onMouseEnter={() => setHover(index)}
                                    onMouseLeave={() => setHover(rating)}
                                    >
                                    <span className="star">&#9733;</span>
                                    </button>
                                    );
                                    })}
                                    </div>
                                    <input
                                    className='review--input'
                                    type="review"
                                    required
                                    id="review"
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                    />
                                    <button onClick={sendReview}>
                                        send
                                    </button>
                                </div>
                                <div className="review--list">
                                    <div className="review--list">
                                        {
                                            reviews.map((review) => {
                                                return(
                                                    <div className="review--box">
                                                        <span className="review--element">{review.name}</span>
                                                        <div className="review--element">
                                                           <span className="review--element">{review.rating}
                                                           <span className="star">&#9733;</span>
                                                           </span>
                                                        </div>
                                                        <span className="review--element">{review.review}</span>
                                              
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                
                })
            } 
        </div>
        </div>}

        </div>
    )
}