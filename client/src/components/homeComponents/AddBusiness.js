import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

export default function AddBusiness(){

    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [tags, setTags] = useState("");
    const [description, setDescription] = useState("");
    const [website, setWebsite] = useState("");
    const [contact, setContact] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [googleMaps, setGoogleMaps] = useState("");

    const navigate = useNavigate(); 

    const addHotel = async () => {
        const res = await axios.post("http://localhost:3001/addNewRestaurant", {
            name,
            address,
            city,
            tags,
            description,
            website,
            contact,
            imageUrl,
            googleMaps
        }).catch(err=>console.log(err))
    }

    const addRestaurant = async () => {
        const res = await axios.post("http://localhost:3001/addNewHotel", {
            name,
            address,
            city,
            tags,
            description,
            website,
            contact,
            imageUrl,
            googleMaps
        }).catch(err=>console.log(err))
    }

    const addMuseum = async () => {
        const res = await axios.post("http://localhost:3001/addNewMuseum", {
            name,
            address,
            city,
            tags,
            description,
            website,
            contact,
            imageUrl,
            googleMaps
        }).catch(err=>console.log(err))
    }

    const addPark = async () => {
        const res = await axios.post("http://localhost:3001/addNewPark", {
            name,
            address,
            city,
            tags,
            description,
            website,
            contact,
            imageUrl,
            googleMaps
        }).catch(err=>console.log(err))
    }

    const addTouristAttraction = async () => {
        const res = await axios.post("http://localhost:3001/addNewTouristAttraction", {
            name,
            address,
            city,
            tags,
            description,
            website,
            contact,
            imageUrl,
            googleMaps
        }).catch(err=>console.log(err))
    }

    const sendRequest = async() => {
        switch(category){
            case "restaurant":
                addRestaurant();
                break;
            case "hotel":
                addHotel();
                break;
            case "museum": 
                addMuseum();
                break;
            case "park":
                addPark();
                break;
            case "touristAttraction":
                addTouristAttraction();
                break;
        }
    }

    const addBusinessHandler = (e) => {
        e.preventDefault();
        console.log(category)
        sendRequest().then(()=>navigate('/'))
    }

    function handleHomepage(){
        navigate('/')
    }

    return(
        <div>
            <div className="add--business--screen">
                <form onSubmit={addBusinessHandler} className="auth--form">
                    <img className="logo--img--auth" src="./images/applogo2.png" onClick={handleHomepage}/>
                    <h3 className="add--business--form--title">Add a new business</h3>
                    <div className="form--group">
                        <label className="form--label">Category</label>
                        <select className="form--input--select"
                        required
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="restaurant" >Restaurant</option>
                            <option value="hotel">Hotel</option>
                            <option value="museum">Museum</option>
                            <option value="park">Park</option>
                            <option value="touristAttraction">Tourist attraction</option>

                        </select>
                            
                    </div>
                    <div className="form--group">
                        <label className="form--label">Business Name</label>
                        <input
                            className="form--input"
                            type="text"
                            required
                            id="name"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form--group">
                        <label className="form--label">Adress</label>
                        <input
                            className="form--input"
                            type="text"
                            required
                            id="address"
                            placeholder="Enter business location"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div className="form--group">
                        <label className="form--label">City</label>
                        <input
                            className="form--input"
                            type="text"
                            required
                            id="city"
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>
                    <div className="form--group">
                        <label className="form--label">Tags</label>
                        <div className="form--label--small--text">such as cuisine type, location... </div>
                        <input
                            className="form--input"
                            type="text"
                            required
                            id="tags"
                            placeholder="Tags"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                        />
                    </div>
                    <div className="form--group">
                        <label className="form--label">Description of the business</label>
                        <input
                            className="form--input"
                            type="text"
                            required
                            id="description"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="form--group">
                        <label className="form--label">Website</label>
                        <input
                            className="form--input"
                            type="text"
                            
                            id="website"
                            placeholder="Website"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                        />
                    </div>
                    <div className="form--group">
                        <label className="form--label">Contact</label>
                        <input
                            className="form--input"
                            type="text"
                            
                            id="contact"
                            placeholder="Contact"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                        />
                    </div>
                    <div className="form--group">
                        <label className="form--label">Image</label>
                        <input
                            className="form--input"
                            type="text"
                            required
                            id="imageUrl"
                            placeholder="Image Url"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                        />
                    </div>
                    <div className="form--group">
                        <label className="form--label">Google Maps Link</label>
                        <input
                            className="form--input"
                            type="text"
                            required
                            id="googleMaps"
                            placeholder="Google Maps Link"
                            value={googleMaps}
                            onChange={(e) => setGoogleMaps(e.target.value)}
                        />
                    </div>
                    <button
                    type="submit"
                    className="form--button"
                    >
                    Submit request
                    </button>
                </form>
            </div>
        </div>
    )
}