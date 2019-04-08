const express = require('express');
const userService = require('../services/user.service');

const router = express.Router();

router
    .get('/', (req, res) => {
        userService.getAll().then((users) => {
            res.send(users);
        });
    })
    .get('/:uid', (req, res) => {
        userService.getById(req.params.uid).then((user) => {
            res.send(user);
        });
    })
    .post('/', (req, res) => {
        userService.addUser(req.body).then((user) => {
            res.send(user);
        });
    });

module.exports = router;
