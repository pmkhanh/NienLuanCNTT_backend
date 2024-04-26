const OrderService = require('../services/OrderService');

const createOrder = async (req, res) => {
    try {
        const { paymentMethod, itemsPrice, shippingPrice, totalPrice, fullname, address, phone } = req.body
        if (!paymentMethod || !itemsPrice || !shippingPrice || !totalPrice || !fullname || !address || !phone) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Dữ liệu không được để trống'
            })
        }
        const response = await OrderService.createOrder(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllOrderDetails = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Không tìm thấy người dùng'
            })
        }
        const response = await OrderService.getAllOrderDetails(userId)
        return res.status(200).json(response)
    } catch (e) {

        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsOrder = async (req, res) => {
    try {
        const orderId = req.params.id

        if (!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Không tìm thấy người dùng'
            })
        }
        const response = await OrderService.getOrderDetails(orderId)
        return res.status(200).json(response)
    } catch (e) {

        return res.status(404).json({
            message: e
        })
    }
}

const cancelOrderDetails = async (req, res) => {
    try {
        const data = req.body.orderItems
        const orderId = req.body.orderId
        if (!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Không tìm thấy đơn đặt hàng'
            })
        }
        const response = await OrderService.cancelOrderDetails(orderId, data)
        return res.status(200).json(response)
    } catch (e) {

        return res.status(404).json({
            message: e
        })
    }
}
const acceptOrderDetails = async (req, res) => {
    try {
        const data = req.body.data.orderItems
        const state = req.body.data.statusOrder

        const ship = req.body.data.isDelivered
        const orderId = req.params.id
        if (!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Không tìm thấy đơn đặt hàng'
            })
        }
        const response = await OrderService.acceptOrder(orderId, data, state, ship)
        return res.status(200).json(response)
    } catch (e) {

        return res.status(404).json({
            message: e
        })
    }
}

const getAllOrder = async (req, res) => {
    try {
        const data = await OrderService.getAllOrder()
        return res.status(200).json(data)
    } catch (e) {

        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createOrder,
    getAllOrderDetails,
    getDetailsOrder,
    cancelOrderDetails,
    getAllOrder,
    acceptOrderDetails
}