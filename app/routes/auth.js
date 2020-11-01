const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/AuthControllers')

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)

router.get('/register', (req, res) => res.render('register'))
router.get('/login', (req, res) => res.render('login'))

module.exports = router