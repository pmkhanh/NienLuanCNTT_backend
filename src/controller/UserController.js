const UserService = require('../services/UserService')
const JWTService = require('../services/JWTService')
const User = require('../models/UserModel')

const createdUser = async (req, res) => {
    try {
        const { username, email, password, confirmpassword, phone, name, avatar } = req.body;
        if (password) {
            if (!username || !password || !confirmpassword || !phone) {
                return res.status(200).json({
                    satus: 'ERR',
                    message: 'Dữ liệu còn trống'
                })
            }
            if (password != confirmpassword) {
                return res.status(200).json({
                    satus: 'ERR',
                    message: 'Mật khẩu và nhập lại mật khẩu phải giống nhau'
                })
            }
            const result = await UserService.createUser(req.body)
            return res.status(200).json(result)
        } else if (!password && !username) {
            if (!email || !name || !avatar) {
                return res.status(200).json({
                    satus: 'ERR',
                    message: 'Dữ liệu còn trống'
                })
            }
            else if (email && name && avatar) {
                const result = await UserService.createGG(req.body)
                return res.status(200).json(result)
            }
        }

    } catch (e) {
        return res.status(404).json({
            message: e,

        })
    }
}
const loginUser = async (req, res) => {
    try {

        const { username, email, password, name } = req.body;
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if (username) {
            if (!username && !password) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'Tên đăng nhập hoặc mật khẩu trống'
                })
            } if (email && !isCheckEmail) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'Kiểm tra lại email'
                })
            } if (!password) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'Mật khẩu nhập không chính xác'
                })
            }

            const result = await UserService.loginUser(req.body)
            const { refresh_token, ...newResult } = result
            res.cookie('refresh_token', refresh_token, {
                httpOnly: true,
                secure: false,
                samesite: 'strict'
            })
            return res.status(200).json(newResult)
        } else if (email && name) {
            const result = await UserService.loginUser(req.body)
            const { refresh_token, ...newResult } = result
            res.cookie('refresh_token', refresh_token, {
                httpOnly: true,
                secure: false,
                samesite: 'strict'
            })
            return res.status(200).json(newResult)
        }
    } catch (e) {
        return res.status(404).json({
            message: e

        })
    }
}

const logoutUser = async (req, res) => {
    try {
        res.clearCookie('refresh_token')
        return res.status(200).json({
            status: 'OK',
            message: 'Đăng xuất thành công',
        })
    } catch (e) {
        return res.status(404).json({
            message: e

        })
    }
}

const updateUser = async (req, res) => {
    try {
        const idUser = req.params.id
        const data = req.body

        if (!idUser) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Không tìm thấy idUser'
            })
        }
        const result = await UserService.updateUser(idUser, data)
        return res.status(200).json(
            result
        )
    } catch (e) {
        return res.status(404).json({
            message: e,

        })
    }
}
const deleteUser = async (req, res) => {
    try {
        const idUser = req.params.id

        if (!idUser) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Không tìm thấy idUser'
            })
        }
        const result = await UserService.deleteUser(idUser)
        return res.status(200).json(
            result
        )
    } catch (e) {
        return res.status(404).json({
            message: e,

        })
    }
}
const deleteMany = async (req, res) => {
    try {
        const idUsers = req.body.ids

        if (!idUsers) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Không tìm thấy idUser'
            })
        }
        const result = await UserService.deleteUserMany(idUsers)
        return res.status(200).json(
            result
        )
    } catch (e) {
        return res.status(404).json({
            message: e,

        })
    }
}
const getAllUser = async (req, res) => {
    try {
        const result = await UserService.getAllUser()
        return res.status(200).json(result)
    } catch (e) {
        return res.status(404).json({
            message: e,

        })
    }
}
const getUser = async (req, res) => {
    try {
        const idUser = req.params.id
        const result = await UserService.getUser(idUser)

        return res.status(200).json(
            result
        )
    } catch (e) {
        return res.status(404).json({
            message: e,

        })
    }
}
const refreshToken = async (req, res) => {

    try {
        const token = req.cookies.refresh_token
        if (!token) {
            return res.satus(200).json({
                status: 'ERR',
                message: 'The token is required'
            })
        }
        const result = await JWTService.refreshTokenJWT(token)
        return res.status(200).json(
            result
        )
    } catch (e) {
        return res.status(404).json({
            message: e,

        })
    }
}




module.exports = {
    createdUser,
    loginUser,
    logoutUser,
    updateUser,
    deleteUser,
    deleteMany,
    getAllUser,
    getUser,
    refreshToken,
}