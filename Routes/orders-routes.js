const express = require('express');
const ordersController = require('../controllers/orders-controller');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get("/:userId", ordersController.showAllOrdersByUser);

module.exports = router;