const express = require('express');
const verifyToken = require('./../middlewares/verifyToken');
const User = require('./../models/Users');
const router = express.Router();

router.get('/', (request, response) => {
    console.log('Current User:', request.session.currentUser);
    User.find({}).exec(function (err, users) {
        response.send(users);
    });
});

module.exports = router;