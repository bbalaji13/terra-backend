"use strict";
const express = require('express');
let router = express.Router();
const usersController = require("./controller");


router.get('/profile', ((req, res) => {
    usersController.selfProfile(req).then((response) => {
        res.status(response.statusCode).json(response);
    }).catch((err) => {
        res.status(err.statusCode).json(err);
    });
}));




module.exports = router;