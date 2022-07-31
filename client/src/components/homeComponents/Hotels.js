import React from "react"
import { useState, useEffect} from "react"
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Axios from 'axios'
import * as FaIcons from "react-icons/fa";


export default function Hotels(){

    const [listOfProfiles, setListOfProfiles] = useState([]);

    const [listOfHotels, setListOfHotels] = useState([])

    const [selectedHotel, setSelectedHotel] = useState("")

    const [visible, setVisible] = useState(false)

    const [name, setName] = useState("")

    const [reviews, setReviews] = useState([])

    const [review, setReview] = useState("")

    const [rating, setRating] = useState(0)

    const [hover, setHover] = useState(0);

    const [displayRating, setDisplayRating] = useState(0);

    const [windowReload, setWindowReload] = useState(false)

    let navigate = useNavigate();

    const email = useSelector((state) => state.user.value.email);

    const searchValue = useSelector((state) => state.search.value.searchValue);

    useEffect(() => {
        Axios.get("http://localhost:3001/getHotels").then((response) => {
            setListOfHotels(response.data)
        }, [])
    })

    const seeMore = async (id) => {
        setSelectedHotel(id);
        await Axios.get(`http://localhost:3001/getRating/${selectedHotel}`).then((response) => {
            setDisplayRating(response.data)
        })
        await Axios.get(`http://localhost:3001/getReview/${selectedHotel}`).then((response) => {
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
    
    const filteredHotels = listOfHotels.filter((hotel) => {
        return hotel.name.toLowerCase().includes(searchValue.toLowerCase()) || 
        hotel.city.toLowerCase().includes(searchValue.toLowerCase()) || 
        hotel.tags.toLowerCase().includes(searchValue.toLowerCase()) || 
        hotel.description.toLowerCase().includes(searchValue.toLowerCase())
    })

    useEffect(() => {
        Axios.get("http://localhost:3001/users").then((response) => {
            setListOfProfiles(response.data)
        })
    }, [])

    const sendReviewRequest = async () => {
        getUsername();
        const res = await Axios.post("http://localhost:3001/addReview", {
            userEmail: email,
            name: name,
            itemId: selectedHotel,
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

    function getUsername(){
        listOfProfiles.map((profile) => {
            if(profile.email === email){
                setName(profile.name)
            }
        })
    }

    return(
        <div>
        {
        !searchValue &&
        <div className="card">
            <h1 className="card--category">Hotels</h1>
        <div className="cards">
            {
                listOfHotels.map((hotel) => {
                    return(
                        <div className="card--element" onClick={() => seeMore(hotel._id)}>
                            <img className="card--image" src={hotel.imageUrl} />
                            <span className="card--title" >{hotel.name}</span>
                            <div className="city">
                            <FaIcons.FaMapMarkerAlt className="icon--location"/>
                            <span className="card--city">{hotel.city}</span>
                            </div>
                            <span className="card--tags">{hotel.tags}</span>
                            
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
            <h1 className="card--category">Hotels</h1>
            <div className="cards">
                {
                    filteredHotels.map((hotel) => {
                        return(
                            <div className="card--element" onClick={() => seeMore(hotel._id)}>
                            <img className="card--image" src={hotel.imageUrl} />
                            <span className="card--title" >{hotel.name}</span>
                            <div className="city">
                            <FaIcons.FaMapMarkerAlt className="icon--location"/>
                            <span className="card--city">{hotel.city}</span>
                            </div>
                            <span className="card--tags">{hotel.tags}</span>                                                     
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
                listOfHotels.filter(hotel => hotel._id === selectedHotel).map(filteredHotel => {
                    return(
                        <div className="details--element">
        
                            <div className="card--details">
                            <FaIcons.FaWindowClose onClick={seeLess} className="icon--close" />
                                <div className="details--header">
                                <img className="header--image" src={filteredHotel.imageUrl} />
                                <div className="header--text">
                                    <span className="header--title" >{filteredHotel.name}</span>
                                    <div className="details--program">
                                    <span className="star--display">&#9733;</span>
                                    <span className="star--display">{displayRating}</span>
                                    </div>
                                    <div className="details--city">
                                    <FaIcons.FaMapMarkerAlt className="icon--location"/>
                                    <span className="header--city">{filteredHotel.city}</span>
                                    </div>
                                    <span className="header--tags">{filteredHotel.tags}</span>
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