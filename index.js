// implement your API here
const express = require('express');

const db = require('./data/db');
const server = express();
server.use(express.json());




server.listen(4000, () => {
    console.log('/n** API up and running on Port 4000**')
})