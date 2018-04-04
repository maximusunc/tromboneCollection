const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tromboneSchema = new Schema({
    maker: {
        type: String
    },
    date: {
        type: String
    },
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
    },
    image: {
        data: Buffer,
        type: String
    }
});

const Trombone = mongoose.model("Trombone", tromboneSchema);

module.exports = Trombone;