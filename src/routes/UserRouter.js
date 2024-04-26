const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');
const { authMiddleWare, authUserMiddleWare } = require('../middleware/authMiddleWare');

router.post('/signup', userController.createdUser);
router.post('/signin', userController.loginUser);
router.post('/logout', userController.logoutUser);
router.put('/updateuser/:id', authUserMiddleWare, userController.updateUser);
router.delete('/deleteuser/:id', authMiddleWare, userController.deleteUser);
router.get('/getalluser', authMiddleWare, userController.getAllUser);
router.get('/getuser/:id', authUserMiddleWare, userController.getUser);
router.post('/refreshtoken', userController.refreshToken);
router.post('/deletemany', authMiddleWare, userController.deleteMany)


module.exports = router;