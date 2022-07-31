const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const museumListSchema = new Schema({
    userEmail: {
        type: "String"
    },
    museumId: {
        type: "String"
    }
});

module.exports = mongoose.model('MuseumList', museumListSchema);
