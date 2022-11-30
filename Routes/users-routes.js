const express = require('express');
const usersController = require('../controllers/users-controllers');


const router = express.Router();


router.get('/user/:uid', usersController.getUserById);
router.post('/createdUser', usersController.createUser);


module.exports = router;