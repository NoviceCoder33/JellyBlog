const express = require('express');
const { getAllUsers, registerController, loginController } = require('../controllers/user.controller');
const router = express.Router();

//get all users
router.get('/users',getAllUsers)

//create user
router.post('/register',registerController)

//login user
router.post('/login', loginController)

module.exports= router;