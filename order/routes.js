const express = require('express');
const router = express.Router();
const orderController = require('./controller');

// Get all orders
router.get('/get-all-orders', orderController.getAllOrders);

// Get one order by ID
router.get('/get-order/:id', orderController.getOrderById);

// Create a new order
router.post('/create-order', orderController.createOrder);

// Update an order (e.g., status or payment)
router.patch('update-orders/:id', orderController.updateOrder);

module.exports = router;
