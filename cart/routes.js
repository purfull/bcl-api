const express = require('express');

const router = express.Router();
const controller = require('./controller')

const upload = require('../multer/multer');

// router.post(
//     '/create-user',
//     upload.single('image'), 
//     controller.createNewUser
//   );

router.get('/getcart', controller.getCartById );
router.post('/addToCart', controller.addToCart );
// router.post('/reset-password/:user_id', controller.updatePassword );
// router.put('/update-user/:id', controller.updateUser );
// router.post('/login', controller.userLogin );


module.exports = router;
