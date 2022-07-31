import React from "react"
import { useState, useEffect} from "react"
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Axios from 'axios'
import * as FaIcons from "react-icons/fa";

export default function Parks(){

    const [listOfParks, setListOfParks] = useState([])

    const [selectedPark, setSelectedPark] = useState("")

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
        Axios.get("http://localhost:3001/getParks").then((response) => {
            setListOfParks(response.data)
        }, [])
    })

    const seeMore = async (id) => {
        setSelectedPark(id);
        await Axios.get(`http://localhost:3001/getRating/${selectedPark}`).then((response) => {
            setDisplayRating(response.data)
        })
        await Axios.get(`http://localhost:3001/getReview/${selectedPark}`).then((response) => {
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

    const filteredParks = listOfParks.filter((park) => {
        return park.name.toLowerCase().includes(searchValue.toLowerCase()) || park.city.toLowerCase().includes(searchValue.toLowerCase()) || park.tags.toLowerCase().includes(searchValue.toLowerCase()) || park.description.toLowerCase().includes(searchValue.toLowerCase())
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
            itemId: selectedPark,
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
            <h1 className="card--category">Parks</h1>
        <div className="cards">
            {
                listOfParks.map((park) => {
                    return(
                        <div className="card--element" onClick={() => seeMore(park._id)}>
                            <img className="card--image" src={park.imageUrl} />
                            <span className="card--title" >{park.name}</span>
                            <div className="city">
                            <FaIcons.FaMapMarkerAlt className="icon--location"/>
                            <span className="card--city">{park.city}</span>
                            </div>
                            <span className="card--tags">{park.tags}</span>
                            
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
            <h1 className="card--category">Parks</h1>
            <div className="cards">
                {
                    filteredParks.map((park) => {
                        return(
                            <div className="card--element" onClick={() => seeMore(park._id)}>
                            <img className="card--image" src={park.imageUrl} />
                            <span className="card--title" >{park.name}</span>
                            <div className="city">
                            <FaIcons.FaMapMarkerAlt className="icon--location"/>
                            <span className="card--city">{park.city}</span>
                            </div>
                            <span className="card--tags">{park.tags}</span>                                                     
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
                listOfParks.filter(park => park._id === selectedPark).map(filteredParks => {
                    return(
                        <div className="details--element">
                            
                            <div className="card--details">
                            <FaIcons.FaWindowClose onClick={seeLess} className="icon--close" />
                                <div className="details--header">
                                <img className="header--image" src={filteredParks.imageUrl} />
                                <div className="header--text">
                                    <span className="header--title" >{filteredParks.name}</span>
                                    <div className="details--program">
                                        <span className="star--display">&#9733;</span>
                                        <span className="star--display">{displayRating}</span>
                                        </div>
                                    <div className="details--city">
                                    <FaIcons.FaMapMarkerAlt className="icon--location"/>
                                    <span className="header--city">{filteredParks.city}</span>
                                    </div>
                                    <span className="header--tags">{filteredParks.tags}</span>
                                </div>
                                </div>
                                <div className="details--main">
                                    <div className="main--text"> 
                                        <div className="details--contact">
                                        </div>
                                        <span className="main--description">
                                            {filteredParks.description}
                                        </span>
                                        
                                    </div>
                                    <div className="main--location">
                                        <iframe className="location--map" src={filteredParks.googleMaps} />
                                        <span className="location--address">
                                        {filteredParks.address}
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