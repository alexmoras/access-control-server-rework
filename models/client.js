const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const generator = require('generate-password');

let clientSchema = mongoose.Schema({
    _id: {
        type: String,
        default: () => {
            return uuidv4()
        }
    },
    secret: {
        type: String,
        default: () => {
            return generator.generate({
                length: 16,
                numbers: true
            });
        }
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model("Client", clientSchema);