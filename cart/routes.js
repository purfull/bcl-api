const express = require('express');

const router = express.Router();

const controller = require('../cart/controller')

const upload = require('../multer/multer');

// router.post(
//     '/create-user',
//     upload.single('image'), 
//     controller.createNewUser
//   );
// router.post(
//     '/create-user',
//     upload.single('image'), 
//     controller.createNewUser
//   );

router.post('/getcart', controller.getCartById );
router.post('/createcart', controller.addToCart );
// router.post('/reset-password/:user_id', controller.updatePassword );
// router.put('/update-user/:id', controller.updateUser );
// router.post('/login', controller.userLogin );


module.exports = router;
