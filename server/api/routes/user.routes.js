const userService = require('../services/user.service');
const express = require('express');
const user = express.Router();

user
    .get('/', (req, res) => {
        const users = userService.getAll();
        res.send(users);
    })
    .get('/:id', (req, res) => {
        const user = userService.getById();
        res.send(user);
    })
    .post('/', (req, res) => {
        const user = userService.addUser(req.body);
        res.send(user);
    });

module.exports = user;
