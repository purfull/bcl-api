const express = require('express');
const router = express.Router();
const deliveryController = require('./controller');

router.get('/get-all-delivery', deliveryController.getAllDeliveries);
router.get('/get-delivery/:id', deliveryController.getDeliveryById);
router.post('/create-delivery', deliveryController.createDelivery);
router.put('/update-delivery/:id', deliveryController.updateDelivery);
router.delete('/delete-delivery/:id', deliveryController.deleteDelivery);

module.exports = router;
