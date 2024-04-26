const express = require('express');
const router = express.Router();
const ProductController = require('../controller/ProductController')
const { authMiddleWare, authUserMiddleWare } = require('../middleware/authMiddleWare');

router.post('/create', ProductController.createProduct)
router.put('/update/:id', authMiddleWare, ProductController.updateProduct)
router.get('/detail/:id', ProductController.detailProduct)
router.get('/getall', ProductController.getAll)
router.get('/getalltype', ProductController.getAllType)
router.delete('/delete/:id', authMiddleWare, ProductController.deleteProduct)
router.delete('/deleteall', authMiddleWare, ProductController.deleteAll)
router.post('/deletemany', authMiddleWare,ProductController.deleteMany)


module.exports = router;