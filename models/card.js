let mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

let cardSchema = mongoose.Schema({
    _id: {
        type: String
    },
    secret: {
        type: String,
        default: () => {
            return uuidv4();
        }
    },
    owner: {
        type: String
    },
    description: {
        type: String
    },
    enabled: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model("Card", cardSchema);