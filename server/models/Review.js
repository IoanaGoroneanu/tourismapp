const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    userEmail: {
        type: "String"
    },
    name: {
        type: "String"
    },
    itemId: {
        type: "String"
    },
    rating:{
        type: "Number"
    },
    review: {
        type: "String"
    }
})

module.exports = mongoose.model('Review', reviewSchema);

