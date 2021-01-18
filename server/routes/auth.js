const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const session = require('express-session');
const User = require('./../models/Users');
const { registerValidator } = require('./../validations/auth');
const sgMailer = require('@sendgrid/mail');
require('dotenv').config();

router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: 60 * 60 * 24,
     },
  }));

router.get('/currentUser', async (request, response) => {
    console.log('Current User:', request.session.currentUser);
    if (request.session.currentUser) {
        response.send({
            loggedIn: true,
            user: request.session.currentUser
        })
    } else {
        response.send({
            loggedIn: false
        })
    }
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
        confirmed: false,
    });
    const emailToken = bcrypt.hash(user.email, salt);

    try {
        const newUser = await user.save();
        response.send({
            newUser,
            message: 'Register successful'
        });
    } catch (err) {
        response.status(400).send(err);
    }

    let mailOptions = {
        from: process.env.EMAIL,
        to: user.email,
        subject: 'Welcome to Moiflix',
        text: `Welcome to Moiflix
        Please copy and paste the address below to verify your email address.
        https://${request.headers.host}/verify-email?token=${emailToken}
        `,
        html: `
            <h1>Hello</h1>
            <p>Thanks for signing up Moiflix</p>
            <p>Please click this link to verify your email address.</p>
            <a href="https://https://${request.headers.host}/verify-email?token=${emailToken}">Verify your email</a> 
        `
    }
    try {
        await sgMailer.send(mailOptions);

    } catch (error) {
        console.log(error);
    }
});

router.post('/login', async (request, response) => {
    const user = await User.findOne({ email: request.body.email });
    if (!user) return response.status(422).send('Email or Password is not correct');
    const checkPassword = await bcrypt.compare(request.body.password, user.password);

    if (!checkPassword) return response.status(422).send('Email or Password is not correct');
    // if (!user.confirmed) return response.status(422).send('Please confirmed your email');
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 * 24 });

    request.session.currentUser = await {
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