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
        console.log(users)
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).send(`${err}`)
    })
});

// GET	/api/users/:id	Returns the user object with the specified id.
server.get('/api/users/:id', (req, res) => {
    let id = req.params.id
    User.findById(id)
    .then(user => {
        if(!user) {
            res.status(404).json({message: 'user with given id does not exist'})
        }
        res.status(200).json(user)
    })
    .catch(err => {
        res.status(500).json({message: err})
    })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
