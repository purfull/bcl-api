const express = require('express');

const router = express.Router();
const controller = require('./controller')

const upload = require('../multer/multer');

router.post(
    '/create-product',
    upload.single('image'), 
    controller.createNewProduct
  );

router.get('/get-all-product', controller.getAllProduct );
router.post('/get-product/:id', controller.getProductById );
// router.post('/reset-password/:product_id', controller.updatePassword ); 
router.put('/update-product/:id', controller.updateProduct );  // admin 
router.delete('')  // admin


module.exports = router;
