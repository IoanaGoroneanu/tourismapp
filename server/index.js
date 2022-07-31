require('dotenv').config({path: "./config.env"})
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const RestaurantModel = require('./models/Restaurants')
const HotelModel = require('./models/Hotels')
const MuseumModel = require('./models/Museums')
const RestaurantList = require('./models/RestaurantList');
const User = require('./models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const JWT_SECRET_KEY = "mykey";

const cors = require('cors');
const HotelList = require('./models/HotelList');
const MuseumList = require('./models/MuseumList');
const Review = require('./models/Review');
const { exist } = require('joi');
const ParkModel = require('./models/Parks');
const TouristAttractionModel = require('./models/TouristAttractions');

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://ioanagoroneanu:ioanagoroneanu123@cluster0.di6bn.mongodb.net/myApp?retryWrites=true&w=majority")

app.get("/getRestaurants", (req, res) => {
    RestaurantModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    })
});

app.post("/createRestaurant", async (req, res) => {
    const restaurant = req.body;
    const newRestaurant = new UserModel(user);
    await newRestaurant.save();

    res.json(user);
})

app.get('/getRestaurants/:id', (req, res) => {
    var id = req.params.id;
    RestaurantModel.findById(id, function (err, result) {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
})

app.get("/getHotels", (req, res) => {
    HotelModel.find({}, (err, result) => {
        if(err) {
            res.json(err);
        } else {
            res.json(result);
        }
    })
})

app.get("/getMuseums", (req, res) => {
    MuseumModel.find({}, (err, result) => {
        if(err) {
            res.json(err);
        } else {
            res.json(result);
        }
    })
})

app.get("/getParks", (req, res) => {
    ParkModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    })
})
app.get('/getParks/:id', (req, res) => {
    var id = req.params.id;
    ParkModel.findById(id, function (err, result) {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
})

app.get("/getTouristAttractions", (req, res) => {
    TouristAttractionModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    })
})
app.get('/getTouristAttractions/:id', (req, res) => {
    var id = req.params.id;
    TouristAttractionModel.findById(id, function (err, result) {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
})

/*app.get('/profile/:name', authenticateToken, (req, res) => {
    const name = req.params.name
    User.findOne({name: name}, (err, result) => {
        if(err) {
            res.json(err);
        } else {
            res.json(result);
        }
    })
})*/

/*app.get('/profile', authenticateToken, (req, res) => {
    const {email, password} = req.body;
    const user = {email:email, password:password}
    res.json(email);
    res.sendStatus(200).json({message: "it s working"})
})*/

/*app.get('/profile/:username', authenticateToken,async (req, res) => {
    const username = req.params.username

    let existingUser;
    try{
        existingUser = await User.findOne({username: username})
    } catch(error) {
        console.log(error)
    }

    if(existingUser){
        console.log({username: username})
    }
})*/


/*app.get('/profile/:email', (req, res) => {
    var id = req.params.email;
    User.findById(email, function (err, result) {
        if(err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
})*/

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }

let refreshTokens = []

app.post('/token', (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, JWT_SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAcessToken({ name: user.name })
        res.json({ accessToken: accessToken })
    })
})

app.put('/changeUsername', async(req, res) => {
    const {name, email} = req.body;

    let existingUser;
    try{
        existingUser = await User.findOne({email: email})
    }catch(error) {
        console.log(error)
    }

    existingUser.name = name;

    try {
        await existingUser.save();
    } catch (error) {
            console.log(error)
    }

    return res.status(201).json({message:existingUser})

} )

app.put('/changePassword', async(req, res) => {
    const {email} = req.body;

    let existingUser;
    try{
        existingUser = await User.findOne({email: email})
    }catch(error) {
        console.log(error)
    }

    const salt = await bcrypt.genSalt()
    hashedPassword = await bcrypt.hash(req.body.password, salt)

    existingUser.password = hashedPassword;

    try {
        await existingUser.save();
    } catch (error) {
            console.log(error)
    }

    return res.status(201).json({message:existingUser})
})


app.post('/signup', async (req, res) => {
    const {name, email, password} = req.body;

    let existingUser;
    try{
        existingUser = await User.findOne({email: email})
    } catch(error) {
        console.log(error)
    }
    if(existingUser){
        return res.status(400)
        .json({message: "user already exists"})
    }
    const salt = await bcrypt.genSalt()
    hashedPassword = await bcrypt.hash(req.body.password, salt)   
    const user = new User({
        name,
        email,
        password: hashedPassword
    });
    try {
        await user.save();
    } catch (error) {
            console.log(error)
    }
    return res.status(201).json({message:user})
})

app.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
})

app.delete('/restaurantList/:id', async function(req, res) {
    var id = req.param("id");
    RestaurantList.remove({
        _id: id
    }, function(err){
        if(err) {
            console.log(err)
        }
        else{
            return res.send("Removed");
        }
    })
})

app.delete('/hotelList/:id', async function(req, res) {
    var id = req.param("id");
    HotelList.remove({
        _id: id
    }, function(err){
        if(err) {
            console.log(err)
        }
        else{
            return res.send("Removed");
        }
    })
})

app.delete('/museumList/:id', async function(req, res) {
    var id = req.param("id");
    MuseumList.remove({
        _id: id
    }, function(err){
        if(err) {
            console.log(err)
        }
        else{
            return res.send("Removed");
        }
    })
})

/*app.get('/restaurantList/:userEmail', (req, res) => {
    var userEmail = req.params.userEmail;
    RestaurantList.find({userEmail:userEmail}, function(err, result){
        if(err){
            res.json(err)
        }else {
            res.json(result)
        } 
    })
})*/



app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const user = {email:email, password:password}

    let existingUser;

    try{
        existingUser = await User.findOne({email:email});
    }
    catch(error) {
        return new Error(error);
    }
    if(!existingUser) {
        return res.status(400).json({message: "User not found"});
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

    if(!isPasswordCorrect) {
        return res.status(400).json({message: "Invalid Email / Password"})
    }
   
    const accessToken = generateAcessToken(user)
    const refreshToken = jwt.sign(user, JWT_SECRET_KEY)
    refreshTokens.push(refreshToken)
    res.json({ accessToken: accessToken, refreshToken: refreshToken })
    
})

function generateAcessToken(user)
{
    return jwt.sign(user, JWT_SECRET_KEY, { expiresIn: '15m' })
}

app.post("/addRestaurant", async (req, res) => {
    const {userEmail, restaurantId} = req.body;
    const restaurantListItem = new RestaurantList({
       userEmail,
       restaurantId
    })
    let existingEntries = [];

    let restaurantExists = false;

    existingEntries = await RestaurantList.find({
            userEmail: userEmail}
    )

    existingEntries.map((entry) => {
        if(entry.restaurantId === restaurantId)
        {
            restaurantExists = true;
        }
        
    })

    if(restaurantExists){
        return res.status(400)
        .json({message: "entry already exists"})
    }
    
    await restaurantListItem.save();

    res.json(restaurantListItem);
})

app.post("/addHotel", async (req, res) => {
    const {userEmail, hotelId} = req.body;
    const hotelListItem = new HotelList({
       userEmail,
       hotelId
    })
    let existingEntries = [];

    let hotelExists = false;


    existingEntries = await HotelList.find({
            userEmail: userEmail}
    )

    

    existingEntries.map((entry) => {
        if(entry.hotelId === hotelId)
        {
            hotelExists = true;
        }
        
    })

    if(hotelExists){
        return res.status(400)
        .json({message: "entry already exists"})
    }
    
   
    await hotelListItem.save();

    res.json(hotelListItem);
})

app.post("/addMuseum", async (req, res) => {
    const {userEmail, museumId} = req.body;
    const museumListItem = new MuseumList({
       userEmail,
       museumId
    })
    let existingEntries = [];

    let museumExists = false;


    existingEntries = await MuseumList.find({
            userEmail: userEmail}
    )

    

    existingEntries.map((entry) => {
        if(entry.museumId === museumId)
        {
            museumExists = true;
        }
        
    })

    if(museumExists){
        return res.status(400)
        .json({message: "entry already exists"})
    }
    
   
    await museumListItem.save();

    res.json(museumListItem);
})

app.get('/restaurantList', (req, res) => {
    RestaurantList.find({}, (err, result) => {
        if(err) {
            res.json(err);
        }else {
            res.json(result);
        }
    })
})

app.get('/hotelList', (req, res) => {
    HotelList.find({}, (err, result) => {
        if(err){
            res.json(err);
        }else {
            res.json(result);
        }
    })
})

app.get('/museumList', (req, res) => {
    MuseumList.find({}, (err, result) => {
        if(err){
            res.json(err);
        }else {
            res.json(result);
        }
    })
})

app.get('/profile/:email', (req, res) => {
    var email = req.params.email;
    User.findOne({email:email}, function (err, result){
        if(err){
            res.json(err)
        }else {
            res.json(result)
        }
    })
})

app.get('/users', (req, res) => {
    User.find({}, (err, result) => {
        if(err) {
            res.json(err);
        } else {
            res.json(result);
        }
    })
})



app.post("/addReview", async (req, res) => {
    const {userEmail, name, itemId, rating, review} = req.body;
    
    const reviewItem = new Review({
        userEmail,
        name,
        itemId,
        rating,
        review
    })

    if(name){
    await reviewItem.save();
    }

    res.json(reviewItem);
})

app.get("/getReview/:id", (req, res) => {
    var id = req.params.id;
    Review.find({itemId: id}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    })
})

app.get("/getRating/:id", (req, res) => {
    var id = req.params.id;
    counter = 0;
    ratingSum = 0;
    Review.find({itemId:id}, (err, result) => {
        if(err){
            res.json(err);
        } else {
            result.map((result) => {
                counter ++;
                ratingSum = ratingSum + result.rating;
            })
            res.json(ratingSum/counter)
        }
    })
})

/*app.get("/user/:id", (req, res) => {
    var id = req.params.id;
    User.find({email: id}, (err, result) => {
        if(err) {
            res.json(err);
        } else {
            res.json(result.name);
        }
    })
})*/


app.post("/addNewRestaurant", async (req,res) => {
    const {name, address, city, tags, description, website, contact, imageUrl, googleMaps} = req.body;

    const restaurant = new RestaurantModel({
        name,
        address,
        city,
        tags,
        description,
        website,
        contact,
        imageUrl,
        googleMaps
    })
    restaurant.save();
    res.json(restaurant)

})

app.post("/addNewHotel", async (req,res) => {
    const {name, address, city, tags, description, website, contact, imageUrl, googleMaps} = req.body;

    const hotel = new HotelModel({
        name,
        address,
        city,
        tags,
        description,
        website,
        contact,
        imageUrl,
        googleMaps
    })
    hotel.save();
    res.json(hotel)

})

app.post("/addNewMuseum", async (req,res) => {
    const {name, address, city, openingTime, closingTime, tags, description, website, contact, imageUrl, googleMaps} = req.body;

    const museum = new MuseumModel({
        name,
        address,
        city,
        program:{
            openingTime,
            closingTime
        },
        tags,
        description,
        website,
        contact,
        imageUrl,
        googleMaps
    })
    museum.save();
    res.json(museum)
})

app.post("/addNewPark", async (req,res) => {
    const {name, address, city, tags, description, website, contact, imageUrl, googleMaps} = req.body;

    const park = new ParkModel({
        name,
        address,
        city,
        tags,
        description,
        website,
        contact,
        imageUrl,
        googleMaps
    })
    park.save();
    res.json(park)

})


app.post("/addNewTouristAttraction", async (req,res) => {
    const {name, address, city, tags, description, website, contact, imageUrl, googleMaps} = req.body;

    const touristAttraction = new TouristAttractionModel({
        name,
        address,
        city,
        tags,
        description,
        website,
        contact,
        imageUrl,
        googleMaps
    })
    touristAttraction.save();
    res.json(touristAttraction)

})


app.listen(3001, () => {
    console.log("server is running")
});