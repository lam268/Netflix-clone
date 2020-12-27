const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('./../models/Users');
const { registerValidator } = require('./../validations/auth');

router.get('/test', async (request, response) => {
    console.log('Current User:', request.session.currentUser);

    response.json({
        success: true,
    });
});

router.post('/register', async (request, response) => {
    const { error } = registerValidator(request.body);

    if (error) return response.send(registerValidator(request.body));

    const checkEmailExist = await User.findOne({ email: request.body.email });

    if (checkEmailExist) return response.status(422).send('Email is exist');

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(request.body.password, salt);

    const user = new User({
        name: request.body.name,
        email: request.body.email,
        password: hashPassword,
    });

    request.session.currentUser = {
        _id: user._id,
        name: user.name,
        email: user.email   
    };

    try {
        const newUser = await user.save();
        response.send({
            newUser,
            message: 'Register successful'
        });
    } catch (err) {
        response.status(400).send(err);
    }
});

router.post('/login', async (request, response) => {
    const user = await User.findOne({ email: request.body.email });
    if (!user) return response.status(422).send('Email or Password is not correct');

    const checkPassword = await bcrypt.compare(request.body.password, user.password);

    if (!checkPassword) return response.status(422).send('Email or Password is not correct');
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 * 24 });

    request.session.currentUser = {
        _id: user._id,
        name: user.name,
        email: user.email   
    };

    return response.status(200).send({
        token,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email
        },
        message: 'Login successful'
    });
});

router.get('/logout', async (request, response) => {
    response.cookie('jwt', '')
    request.session.destroy((err) => {
        if (err) {
            response.status(500).json({
              success: false,
              message: err.message,
            });
          } else {
            response.status(200).json({
              success: true,
              message: 'Logout success',
            });
          }
    })
})

module.exports = router;