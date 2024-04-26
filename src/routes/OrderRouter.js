const express = require("express");
const router = express.Router()
const OrderController = require('../controller/OrderController');
const { authUserMiddleWare, authMiddleWare } = require('../middleware/authMiddleWare')

router.post('/create/:id', authUserMiddleWare, OrderController.createOrder)
router.get('/getallorder/:id',authUserMiddleWare, OrderController.getAllOrderDetails)
router.get('/getdetailsorder/:id',OrderController.getDetailsOrder)
router.delete('/cancelorder/:id',authUserMiddleWare, OrderController.cancelOrderDetails)
router.put('/acceptorder/:id', authMiddleWare, OrderController.acceptOrderDetails)
router.get('/getallorder',authMiddleWare, OrderController.getAllOrder)

module.exports = router