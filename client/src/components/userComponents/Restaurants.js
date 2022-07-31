import React, {useState, useEffect} from 'react'
import Axios from 'axios';
import {useSelector} from 'react-redux';
import * as FaIcons from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';

function Restaurants() {
    const email = useSelector((state) => state.user.value.email);

    let navigate = useNavigate();

    const [profileRestaurants, setProfileRestaurants] = useState([]);
    const [allRestaurants, setAllRestaurants] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState("")
    const [visible, setVisible] = useState(false)
    const [hasOne, sethasOne] = useState(false)
    const [windowReload, setWindowReload] = useState(false)

    const [listOfProfiles, setListOfProfiles] = useState([]);
    const [name, setName] = useState("")
    const [listOfRestaurants, setListOfRestaurants] = useState([])
    const [reviews, setReviews] = useState([])
    const [review, setReview] = useState("")
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0);
    const [displayRating, setDisplayRating] = useState(0);


    useEffect(() => {
        Axios.get("http://localhost:3001/restaurantList").then((response) => {
            setProfileRestaurants(response.data)
        });
        setWindowReload(false);
    }, [])

    useEffect(() => {
        Axios.get("http://localhost:3001/getRestaurants").then((response) => {
            setAllRestaurants(response.data)
        });
    }, [])

    const seeMore = async (id) => {
        setSelectedRestaurant(id);
        await Axios.get(`http://localhost:3001/getRating/${selectedRestaurant}`).then((response) => {
            setDisplayRating(response.data)
        })
        await Axios.get(`http://localhost:3001/getReview/${selectedRestaurant}`).then((response) => {
            setReviews(response.data)
        })
         setVisible(prevState => !prevState)
    };
    
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
            itemId: selectedRestaurant,
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

    function seeLess(){
        setVisible(prevState => !prevState)
        setRating(0);
    }

    function hasEntries(){
        profileRestaurants.map((restaurant) => {
            if(restaurant.userEmail === email){
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
        fetch(`http://localhost:3001/restaurantList/${id}`, {
            method: 'DELETE'
        })
    }

    function deleteRestaurant(){
        let restaurantToDelete = ""
        profileRestaurants.map((restaurant) => {
            if(restaurant.restaurantId === selectedRestaurant){
                restaurantToDelete=restaurant._id;
            }
        })
        sendDeleteRequest(restaurantToDelete);
        refreshPage();
    }


  return (
    <div>
        <div>
            {
            hasOne &&
            
            <div className="card">
            <h1 className="card--category">Restaurants and Bars</h1>
                <div className="cards">
                    {
                    profileRestaurants.map((restaurant) => {
                        if(restaurant.userEmail === email) {
                            return(
                                <div>
                                    
                                    {
                                        allRestaurants.map((restaurantElement) => {
                                            if(restaurantElement._id===restaurant.restaurantId){
                                                return(
                                                    <div className="card--element" onClick={() => seeMore(restaurantElement._id)}>
                                                        <img className="card--image" src={restaurantElement.imageUrl} />
                                                        <span className="card--title" >{restaurantElement.name}</span>
                                                        <div className="city">
                                                        <FaIcons.FaMapMarkerAlt className="icon--location"/>
                                                        <span className="card--city">{restaurantElement.city}</span>
                                                        </div>
                                                        <span className="card--tags">{restaurantElement.tags}</span>
                                                        
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
                            allRestaurants.filter(restaurantElement => restaurantElement._id === selectedRestaurant).map(filteredRestaurant => {
                                return(
                                    <div className="details--element">
                                        <FaIcons.FaWindowClose onClick={seeLess} className="icon--close" />
                                        <div className="details--header">
                                        <img className="header--image" src={filteredRestaurant.imageUrl} />
                                        <div className="header--text">
                                        <span className="header--title" >{filteredRestaurant.name}</span>
                                        <div className="details--program">
                                        <span className="star--display">&#9733;</span>
                                        <span className="star--display">{displayRating}</span>
                                        </div>
                                        <div className="details--program">
                                            <FaIcons.FaClock className="icon--clock"/>
                                            <div className="header--program">{filteredRestaurant.program.openingTime} - {filteredRestaurant.program.closingTime}</div>
                                        </div>
                                        <div className="details--city">
                                        <FaIcons.FaMapMarkerAlt className="icon--location"/>
                                        <span className="header--city">{filteredRestaurant.city}</span>
                                        </div>
                                        <span className="header--tags">{filteredRestaurant.tags}</span>
                                        <div className="card--buttons--2">
                                        <FaIcons.FaHeart className="card--add--button" onClick={deleteRestaurant}/>
                                        <button className="card--more" onClick={deleteRestaurant}>remove from favourites</button>
                                        </div>
                                        </div>
                                        </div>
                                        <div className="details--main">
                                        <div className="main--text">
                                        <div className="details--website">
                                        <FaIcons.FaExternalLinkAlt className="icon--link"/>
                                        <a className="main--website" href={filteredRestaurant.website}>Website</a>
                                        </div> 
                                        <div className="details--contact">
                                        <FaIcons.FaAddressBook className="icon--contact" />
                                        <span className="main--contact">
                                            {filteredRestaurant.contact}
                                        </span>
                                        </div>
                                        <span className="main--description">
                                            {filteredRestaurant.description}
                                        </span>
                                        
                                        </div>
                                        <div className="main--location">
                                        <iframe className="location--map" src={filteredRestaurant.googleMaps} />
                                        <span className="location--address">
                                        {filteredRestaurant.address}
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

export default Restaurants