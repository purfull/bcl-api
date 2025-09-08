const express = require('express');

const router = express.Router();
const controller = require('./controller')

const upload = require('../multer/multer');

router.post(
  '/create-product',
  upload.fields([
    { name: 'thumbnailImage', maxCount: 1 },
    { name: 'galleryImage', maxCount: 10 }
  ]),
  controller.createNewProduct
);


router.get('/get-all-product', controller.getAllProduct );
router.get('/get-product/:id', controller.getProductById );
// router.post('/reset-password/:product_id', controller.updatePassword ); 
router.put(
  '/update-product/:id',
  upload.fields([
    { name: 'thumbnailImage', maxCount: 1 },
    { name: 'galleryImage', maxCount: 10 }
  ]),
  controller.updateProduct
);


module.exports = router;
