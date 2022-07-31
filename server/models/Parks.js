const mongoose = require('mongoose')

const ParkSchema = new mongoose.Schema({
    id: {
        type:Number
    },
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
        required: false
    },
    tags: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
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

const ParkModel = mongoose.model("parks", ParkSchema)
module.exports = ParkModel