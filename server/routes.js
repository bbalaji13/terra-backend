"use strict";
let express = require('express');
const { route } = require('./apis/users');
let router = express.Router();



router.use('/self',require('./apis/users/index'));


module.exports = router;