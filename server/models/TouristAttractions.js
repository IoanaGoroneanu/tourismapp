const mongoose = require('mongoose')

const TouristAttractionSchema = new mongoose.Schema({
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
    website: {
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

const TouristAttractionModel = mongoose.model("tourists", TouristAttractionSchema)
module.exports = TouristAttractionModel