const Product = require('../models/ProductModel');

const create = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { name, image, type, price, countInStock, description, status, sell } = newProduct

            const checkProduct = await Product.findOne({
                name: name
            })

            if (checkProduct !== null) {
                resolve({
                    status: 'ERR',
                    message: 'Tên sản phẩm đã tồn tại'
                })
            }
            const createProduct = await Product.create({
                name,
                image,
                type,
                price,
                countInStock,
                rating: 0,
                description,
                status,
                sell: 0
            })
            if (createProduct) {
                resolve({
                    status: 'OK',
                    message: 'Sản phẩm tạo thành công',
                    data: createProduct
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const update = (idProduct, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: idProduct
            })
            if (checkProduct === null) {
                resolve({
                    status: 'ERR',
                    message: 'Không tìm thấy sản phẩm'
                })
            }
            const updateProduct = await Product.findByIdAndUpdate(
                idProduct,
                data,
                { new: true }
            )
            resolve({
                status: 'OK',
                message: 'Cập nhật sản phẩm thành công',
                data: updateProduct
            })
        } catch (error) {
            reject(error)
        }
    })
}

const detail = (idProduct) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: idProduct
            })

            if (checkProduct == null) {
                resolve({
                    status: 'ERR',
                    message: 'Không tìm thấy sản phẩm'
                })
            }
            resolve({
                status: 'OK',
                message: 'Chi tiết sản phẩm',
                data: checkProduct
            })
        } catch (error) {
            reject(error)
        }
    })
}

const getAll = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.countDocuments()
            let allProduct = []
            if (sort || filter) {
                if (filter) {
                    const label = filter[0];
                    const allObjectFilter = await Product.find({ [label]: { '$regex': filter[1] } }).limit(limit).skip(page * limit).sort({ createdAt: -1, updatedAt: -1 })
                    resolve({
                        status: 'OK',
                        message: 'Success',
                        data: allObjectFilter,
                        total: totalProduct,
                        pageCurrent: Number(page + 1),
                        totalPage: Math.ceil(totalProduct / limit)
                    })
                }
                if (sort) {
                    const objectSort = {}
                    objectSort[sort[1]] = sort[0]
                    const allProductSort = await Product.find().limit(limit).skip(page * limit).sort(objectSort).sort({ createdAt: -1, updatedAt: -1 })
                    resolve({
                        status: 'OK',
                        message: 'Success',
                        data: allProductSort,
                        total: totalProduct,
                        pageCurrent: Number(page + 1),
                        totalPage: Math.ceil(totalProduct / limit)
                    })
                }

            } else {
                const getAllProduct = await Product.find().limit(limit).skip(page * limit).sort({
                    createdAt: 'desc'
                })

                if (getAllProduct) {
                    resolve({
                        status: 'OK',
                        message: 'Tất cả sản phẩm asc',
                        data: getAllProduct,
                        total: totalProduct,
                        pageCurrent: page + 1,
                        totalPage: Math.ceil(totalProduct / limit)
                    })
                } else {
                    resolve({
                        status: 'ERR',
                        message: 'Không lấy được tất cả sản phẩm'
                    })
                }
            }
        } catch (error) {
            reject(error)
        }
    })
}

const getAllType = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const getAllProductType = await Product.distinct('type');

            if (getAllProductType) {
                resolve({
                    status: 'OK',
                    message: 'Tất cả loại sản phẩm',
                    data: getAllProductType,
                })
            } else {
                resolve({
                    status: 'ERR',
                    message: 'Không lấy loại sản phẩm'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const deletedProduct = (idProduct) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: idProduct
            })

            if (checkProduct === null) {
                resolve({
                    status: 'ERR',
                    message: 'Không tìm thấy sản phẩm'
                })
            }
            const deleteProduct = await Product.findByIdAndDelete(idProduct)
            if (deleteProduct) {
                resolve({
                    status: 'OK',
                    message: 'Xóa sản phẩm thành công',
                })
            } else {
                resolve({
                    status: 'ERR',
                    message: 'Kiểm tra lại sản phẩm',
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}
const deletedProductMany = (idProducts) => {
    return new Promise(async (resolve, reject) => {
        try {
            const deleteProducts = await Product.deleteMany({
                _id: idProducts
            })
            if (deleteProducts) {
                resolve({
                    status: 'OK',
                    message: 'Xóa sản phẩm thành công',
                })
            } else {
                resolve({
                    status: 'ERR',
                    message: 'Kiểm tra lại sản phẩm',
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}

const deleteAll = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const deleteAlProduct = await Product.deleteMany()

            if (deleteAlProduct) {
                resolve({
                    status: 'OK',
                    message: 'Xóa sản phẩm thành công',
                })
            } else {
                resolve({
                    status: 'ERR',
                    message: 'Xóa thất bại',
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}



module.exports = {
    create,
    update,
    detail,
    getAll,
    getAllType,
    deletedProduct,
    deleteAll,
    deletedProductMany,
}