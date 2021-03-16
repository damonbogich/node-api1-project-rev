// BUILD YOUR SERVER HERE
const express = require('express');
const server = express();
const User = require('./users/model');

server.use(express.json());

server.get("/", (req, res) => {
    res.send('hello world');
});

// GET	/api/users	Returns an array users.
server.get("/api/users", (req, res) => {
    User.find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).send(`${err}`)
    })
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
