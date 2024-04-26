const Order = require('../models/OrderProduct');
const Product = require('../models/ProductModel');

const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        const { orderItems, paymentMethod, itemsPrice, shippingPrice, totalPrice, fullname, address, phone, user, isPaid, paidAt, email } = newOrder
        try {
            const createdOrder = await Order.create({
                orderItems,
                shippingAddress: {
                    fullname,
                    address,
                    phone,
                },
                paymentMethod,
                itemsPrice,
                shippingPrice,
                totalPrice,
                user: user,
                statusOrder: 'Chưa được duyệt'
            })
            if (createdOrder) {
                resolve({
                    status: 'OK',
                    message: 'Đặt hàng thành công',
                    data: createdOrder,
                })
            }
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}



const getAllOrderDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.find({
                user: id
            }).sort({ createdAt: -1, updatedAt: -1 })
            if (order === null) {
                resolve({
                    status: 'ERR',
                    message: 'Đơn hàng không tìm thấy'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCESSS',
                data: order
            })
        } catch (e) {

            reject(e)
        }
    })
}

const getOrderDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findById({
                _id: id
            })
            if (order === null) {
                resolve({
                    status: 'ERR',
                    message: 'Đơn hàng không tồn tại'
                })
            }

            resolve({
                status: 'OK',
                message: 'Chi tiết đơn hàng',
                data: order
            })
        } catch (e) {

            reject(e)
        }
    })
}

const cancelOrderDetails = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let order = []
            const promises = data.map(async (order) => {
                const productData = await Product.findOneAndUpdate(
                    {
                        _id: order.product,
                        countInStock: { $gte: order.amount }
                    },
                    {
                        $inc: {
                            countInStock: +order.amount,
                            sell: -order.amount
                        }
                    },
                    { new: true }
                )
                if (productData) {
                    order = await Order.findByIdAndDelete(id)
                    if (order === null) {
                        resolve({
                            status: 'ERR',
                            message: 'Đơn hàng không tìm thấy'
                        })
                    }
                } else {
                    return {
                        status: 'OK',
                        message: 'ERR',
                        id: order.product
                    }
                }
            })
            const results = await Promise.all(promises)
            const newData = results && results[0] && results[0].id

            if (newData) {
                resolve({
                    status: 'ERR',
                    message: `Sản phẩm id: ${newData} không tồn tại`
                })
            }
            resolve({
                status: 'OK',
                message: 'success',
                data: order
            })
        } catch (e) {
            reject(e)
        }
    })
}

const acceptOrder = (id, data, state, ship) => {
    return new Promise(async (resolve, reject) => {
        try {
            let order = []
            const promises = data.map(async (order) => {
                const productData = await Product.findOneAndUpdate(
                    {
                        _id: order.product,
                        countInStock: { $gte: order.amount }
                    },
                    {
                        $inc: {
                            sell: +order.amount,
                            countInStock: -order.amount
                        },
                    },

                    { new: true }
                )
                const orderUpdate = await Order.findByIdAndUpdate(
                    id,
                    {
                        $set: {
                            statusOrder: 'Đã duyệt',
                            isDelivered: true
                        }
                    },
                    { new: true }

                )

            })
            const results = await Promise.all(promises)
            const newData = results && results[0] && results[0].id

            if (newData) {
                resolve({
                    status: 'ERR',
                    message: `Sản phẩm với id: ${newData} không tồn tại`
                })
            }
            resolve({
                status: 'OK',
                message: 'success',
                data: order
            })
        } catch (e) {
            reject(e)
        }
    }
    )
}

const getAllOrder = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allOrder = await Order.find().sort({ createdAt: -1, updatedAt: -1 })
            resolve({
                status: 'OK',
                message: 'Success',
                data: allOrder
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createOrder,
    getAllOrderDetails,
    getOrderDetails,
    cancelOrderDetails,
    getAllOrder,
    acceptOrder
}