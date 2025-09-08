const express = require('express');
const router = express.Router();
const cartController = require('./controller');

// POST: Add to cart
router.post('/add-to-cart', cartController.createCartItem);

// GET: Get all items in user's cart
router.get('/get-cart', cartController.getAllCartItems);

// PUT: Update cart item quantity
router.put('/update-cart/:id', cartController.updateCartItem);

// DELETE: Remove one item from cart
router.delete('/delete-item/:id', cartController.deleteCartItem);

// DELETE: Clear cart for a user
router.delete('/clear/:userId', cartController.clearCartForUser);

module.exports = router;
