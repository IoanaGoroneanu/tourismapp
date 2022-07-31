const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const restaurantListSchema = new Schema({
    userEmail: {
        type: "String"
    },
    restaurantId: {
        type: "String"
    }
    /*restaurants: [{
        restaurantId: {
            type: String
        }
    }]*/
});

module.exports = mongoose.model('RestaurantList', restaurantListSchema);
