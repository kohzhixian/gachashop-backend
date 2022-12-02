const express = require('express');
const usersController = require('../controllers/users-controllers');


const router = express.Router();


router.get('/:uid', usersController.getUserById);
router.post('/createdUser', usersController.createUser);
router.patch('/:uid', usersController.updateUser);
router.delete('/:uid', usersController.deleteUser);


module.exports = router;