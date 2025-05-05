const express = require('express');

const router = express.Router();
const controller = require('./controller')

const upload = require('../multer/multer');

router.post(
    '/create-user',
    upload.single('image'), 
    controller.createNewUser
  );

router.post('/get-all-user', controller.getAllUsers );
router.get('/get-user/:id', controller.getUserById );
router.post('/reset-password/:user_id', controller.updatePassword );
router.put('/update-user', controller.updateUser );
router.post('/login', controller.userLogin );


module.exports = router;
