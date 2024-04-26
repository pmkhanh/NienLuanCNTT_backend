const Product = require('../models/ProductModel')
const ProductService = require('../services/ProductService')

const createProduct = async (req, res) => {
    try {
        const { name, image, type, price, countInStock, rating, description } = req.body
        if (!name || !image || !type || !price || !countInStock || !description) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Dữ liệu còng trống'
            })
        }

        const result = await ProductService.create(req.body)
        return res.status(200).json(result)
    } catch (err) {
        return res.status(404).json({
            message: err
        })
    }

}

const updateProduct = async (req, res) => {
    try {
        const idProduct = req.params.id
        const data = req.body
        if (data == null) {
            return res.status(200).json({
                message: 'Không có dữ liệu cập nhật'
            })
        }
        const result = await ProductService.update(idProduct, data)
        return res.status(200).json(result)
    } catch (err) {
        return res.status(404).json({
            message: err
        })
    }

}

const detailProduct = async (req, res) => {
    try {
        const idProduct = req.params.id
        if (idProduct == null) {
            return res.status(200).json({
                message: 'Không lấy được id sản phẩm'
            })
        }
        const result = await ProductService.detail(idProduct)
        return res.status(200).json(result)
    } catch (err) {
        return res.status(404).json({
            message: err
        })
    }

}

const getAll = async (req, res) => {
    try {
        const { page, sort, filter, limit } = req.query
        const result = await ProductService.getAll(Number(limit), Number(page) || 0, sort, filter)
        return res.status(200).json(result)
    } catch (err) {
        return res.status(404).json({
            message: err
        })
    }

}

const getAllType = async (req, res) => {
    try {
        const result = await ProductService.getAllType()
        return res.status(200).json(result)
    } catch (err) {
        return res.status(404).json({
            message: err
        })
    }

}
const deleteProduct = async (req, res) => {
    try {
        const idProduct = req.params.id

        if (idProduct == null) {
            return res.status(200).json({
                message: 'Không lấy được id sản phẩm'
            })
        }
        const result = await ProductService.deletedProduct(idProduct)
        return res.status(200).json(result)
    } catch (err) {
        return res.status(404).json({
            message: err
        })
    }

}
const deleteMany = async (req, res) => {
    try {
        const idProducts = req.body.ids

        if (idProducts == null) {
            return res.status(200).json({
                message: 'Không lấy được id sản phẩm'
            })
        }
        const result = await ProductService.deletedProductMany(idProducts)
        return res.status(200).json(result)
    } catch (err) {
        return res.status(404).json({
            message: err
        })
    }

}

const deleteAll = async (req, res) => {
    try {
        const result = await ProductService.deleteAll()
        return res.status(200).json(result)
    } catch (err) {
        return res.status(404).json({
            message: err
        })
    }

}


module.exports = {
    createProduct,
    updateProduct,
    detailProduct,
    getAll,
    deleteProduct,
    deleteAll,
    deleteMany,
    getAllType,
}