require('dotenv').config();
const restify = require('restify');
const server = restify.createServer();
const mongoose = require('mongoose');
const fs = require("fs");
const jwt = require('restify-jwt-community');
const config = require('./config');

/* JWT Configuration */
const jwtConfig = {
    secret: fs.readFileSync("./" + config.oidc.publicKey),
    audience: config.oidc.audience,
    issuer: config.oidc.issuer,
    algorithms: config.oidc.algorithms
}

/* Database Initialisation */
const dbUrl = "mongodb+srv://" + config.database.user + ":" + config.database.pass + "@" + config.database.host +
    "/" + config.database.name;
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,
    useFindAndModify: false })
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("Database connected successfully.");
});

/* Import Routes */
const usersRoute = require('./routes/users');
//const cardsRoute = require('./routes/cards');
//const clientsRoute = require('./routes/clients');
//const logRoute = require('./routes/log');

/* User Endpoint */
server.get('/users',  usersRoute.getAll);
server.get('/users/:id', jwt(jwtConfig), usersRoute.getOne);
server.del('/users/:id', usersRoute.deleteOne);

/* Test Endpoint */
server.get("/test/:name", jwt(jwtConfig), (req, res, next) => {
    let user = req.user.sub;
    res.send("Parameter: " + req.params.name + " | User is " + user);
    next();
});

/* Server Start */
server.listen(3000, () => {
    console.log("Server is ready on %s.", server.url);
})