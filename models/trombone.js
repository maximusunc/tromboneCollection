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
    mouthpiece: {
        type: String
    },
    dimensions: {
        type: String
    },
    provenance: {
        type: String
    },
    literature: {
        type: String
    },
    external_link: {
        type: String
    },
    remarks: {
        type: String
    },
    images: {
        type: Array,
        items: {
            type: String
        }
    },
    footnotes: {
        type: Array,
        items: {
            type: String
        }
    }
});

const Trombone = mongoose.model("Trombone", tromboneSchema);

module.exports = Trombone;