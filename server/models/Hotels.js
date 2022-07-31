const mongoose = require ('mongoose');

const HotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    googleMaps: {
        type: String,
        required: true
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

const HotelModel = mongoose.model("hotels", HotelSchema)
module.exports = HotelModel