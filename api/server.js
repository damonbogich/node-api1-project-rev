// BUILD YOUR SERVER HERE
const express = require('express');
const server = express();
const User = require('./users/model');

server.use(express.json());

server.get("/", (req, res) => {
    res.send('hello world');
});

// POST	/api/users	Creates a user using the information sent inside the request body.
server.post('/api/users', (req, res) => {
    const newUser = req.body;

    if(!newUser.name || !newUser.bio) {
        res.status(400).json({message: 'please provide name and bio for user'})
    } else {
        User.insert(newUser)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(() => {
            res.status(500).json({message: "Server error"})
        })
    }
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

// DELETE	/api/users/:id	Removes the user with the specified id and returns the deleted user.\
server.delete('/api/users/:id', (req, res) => {
    let id = req.params.id;
    User.remove(id)
    .then(user => {
        if(!user) {
            res.status(404).json({message: 'id does not exist'})
        } else {
            res.status(200).json(user)
        }
    })
    .catch(err => {
        res.status(500).json({message: err})
    })
})

// PUT	/api/users/:id	Updates the user with the specified id using data from the request body. Returns the modified user
server.put('/api/users/:id', (req, res) => {
    let id = req.params.id;
    let newUser = req.body;
    if(!newUser.name || !newUser.bio) {
        res.status(400).json({message: 'provide name and bio'})
    }
    User.update(id, newUser)
    .then(user => {
        if(!user){
            res.status(404).json({message: 'does not exist'})
        } else {
            res.status(200).json(user)
        }
    })
    .catch(() => {
        res.status(500)
    })

});

module.exports = server; // EXPORT YOUR SERVER instead of {}
