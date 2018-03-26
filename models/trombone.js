const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tromboneSchema = new Schema({
    type: {
        type: String
    },
    location: {
        type: String
    },
    signature: {
        type: String
    },
    pitch: {
        type: String
    },
    dimensions: {
        type: String
    },
    found: {
        type: String
    },
    literature: {
        type: String
    },
    remarks: {
        type: String
    }
});

const Trombone = mongoose.model("Trombone", tromboneSchema);

module.exports = Trombone;