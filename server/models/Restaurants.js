const mongoose = require('mongoose')

const RestaurantSchema = new mongoose.Schema({
    id: {
        type:Number
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: true
    },
    googleMaps: {
        type: String,
        required: false
    },
    program: {
        openingTime:{
            type: String
        },
        closingTime:{
            type: String
        }
    },
    tags: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: false
    },
    contact: {
        type: String
    },
    rating: {
        type: Number,
        required: false
    },
    numberOfReviews: {
        type: Number,
        required: false
    },
    imageUrl: {
        type: String,
        required: true
    }
})

const RestaurantModel = mongoose.model("restaurants", RestaurantSchema)
module.exports = RestaurantModel