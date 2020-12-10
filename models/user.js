let mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

let userSchema = mongoose.Schema({
    _id: {
        type: String,
        default: () => {
            return uuidv4()
        }
    },
    username: {
        type: String,
        unique: true
    },
    offline: {
        type: Boolean
    }
});

module.exports = mongoose.model("User", userSchema);