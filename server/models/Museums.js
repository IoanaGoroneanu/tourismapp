
const mongoose = require('mongoose')

const MuseumSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: false
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

const MuseumModel = mongoose.model("museums", MuseumSchema)
module.exports = MuseumModel