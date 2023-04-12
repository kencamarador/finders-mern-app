const express = require('express')

const router = express.Router()
const usersCtrl = require('../controllers/usersController')


//login route
router.post('/login', usersCtrl.login)
//signup route
router.post('/register', usersCtrl.register)


module.exports = router