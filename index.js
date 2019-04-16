// implement your API here
const express = require('express');

const db = require('./data/db');
const server = express();
server.use(express.json());


server.post('/api/users', (req, res) => {
    const {name, bio} = req.body;
    
    
    if (!name  || !bio ) {
        return  res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
        return db.insert(req.body)
    .then(user => {
        res.status(201).json(user)
    })
    .catch(error => {
        res.status(500).json({ error: "There was an error while saving the user to the database" }) 
    })
        }
})

server.get('/api/users', (req, res) => {
    db.find()
    
    .then(users => {
        res.status(200).json(users)
    })
    .catch(error => {
        res.status(500).json({ error: "The users information could not be retrieved." })
    })
})

server.get('/api/users/:id', (req, res) => {
const {id}  = req.params;

    db.findById(id)
    
    .then(users => {
        res.status(200).json(users)
    })
    .catch(error => {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    })
})

server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params;

    if(!id) {
        return res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else {
        return db.remove(id)
        .then(deleted => {
            res.status(204).end()
        })
        .catch(error => {
            res.status(500).json({ error: "The user could not be removed" })
        })
    }

    
})

server.put('/api/users/:id', (req, res) => {
    const {id} = req.params;
    const {name, bio } = req.body;
    const changes = req.body
    if(!id) {
        return res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else if (!name || !bio) {
        return res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
        return db.update(id, changes)
        .then(updated => {
            res.status(200).json(updated)
        })
        .catch(error => {
            res.status(500).json({ error: "The user information could not be modified." })
        })
    }
   
    
})




server.listen(4000, () => {
    console.log('/n** API up and running on Port 4000**')
})