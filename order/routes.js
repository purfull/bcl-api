const express = require('express');
const router = express.Router();
const orderController = require('./controller');

// Get all orders
router.get('/', orderController.getAllOrders);

// Get one order by ID
router.get('/:id', orderController.getOrderById);

// Create a new order
router.post('/', orderController.createOrder);

// Update an order (e.g., status or payment)
router.patch('/:id', orderController.updateOrder);

module.exports = router;
