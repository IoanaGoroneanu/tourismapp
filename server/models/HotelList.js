const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const hotelListSchema = new Schema({
    userEmail: {
        type: "String"
    },
    hotelId: {
        type: "String"
    }
});

module.exports = mongoose.model('HotelList', hotelListSchema);
