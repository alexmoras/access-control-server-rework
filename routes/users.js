const User = require('../models/user');

/* Users endpoint */

// RARELY USED - will list all users, mainly for debug.
const getAll = (req, res, next) => {

};

// Used to get one.
const getOne = (req, res, next) => {
    let self = false;

    // Check if user is requesting themself.
    if(req.user.sub === req.params.id){
        self = true;
    }

    User.findById(req.params.id)
        .then(user => {
            if (!user && !self) {
                //  User not found. Throw 404.
                let error = new Error("User was not found.");
                error.status = 404;
                throw error;
            } else if (!user && self) {
                // User not found. Create user.
                return User({
                    "_id": req.params.id,
                    "username": req.params.id,  // TODO: Change this to the actual username.
                    "offline": false  // TODO: Make this role based.
                }).save();
            } else {
                // Return user.
                return user;
            }
        })
        .then(user => {
            // User is finished. Send response.
            res.send(200, {
                success: true,
                message: "User fetched.",
                data: user
            });
        })
        .catch(error => {
            // Return error.
            res.send(error.status || 500, {
                success: false,
                message: error.message || "An unknown error occurred."
            });
        })
};

// No update function as everything is pulled from OIDC.

// Delete the user.
const deleteOne = (req, res, next) => {

};

module.exports = {
    getAll: getAll,
    getOne: getOne,
    deleteOne: deleteOne
};