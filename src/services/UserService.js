const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const { genneralAccessToken, genneralRefreshToken } = require('./JWTService');
const jwt = require('jsonwebtoken');

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { username, password, phone, avatar } = newUser;


        try {
            const hash = bcrypt.hashSync(password, 12)
            const createdUser = await User.create({
                username,
                password: hash,
                email: username + '@gmail.com',
                address: '',
                phone: phone,
                avatar: avatar || '',
                gender: '',
            })
            if (createUser) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdUser
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
const createGG = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, avatar, email } = newUser;


        try {
            const createdUser = await User.create({
                name: name,
                password: '',
                email: email,
                address: '',
                phone: '',
                avatar: avatar || '',
            })
            if (createUser) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdUser
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { username, email, password, name } = userLogin;
        try {
            if (username) {
                const checkUsername = await User.findOne({
                    username: username
                })
                const comparePassusername = bcrypt.compareSync(password, checkUsername.password)
                if (comparePassusername) {
                    const access_token = await genneralAccessToken({
                        id: checkUsername.id,
                        isAdmin: checkUsername.isAdmin
                    })
                    const refresh_token = await genneralRefreshToken({
                        id: checkUsername.id,
                        isAdmin: checkUsername.isAdmin
                    })
                    resolve({
                        status: 'OK',
                        message: 'Đăng nhập bằng tên thành công',
                        access_token,
                        refresh_token
                    })
                }
                if (!comparePassusername) {
                    resolve({
                        status: 'ERR',
                        message: 'Mật khẩu không đúng'
                    })
                }
            } else if (email && name) {
                const checkEmail = await User.findOne({
                    email: email
                })
                if (checkEmail) {
                    const access_token = await genneralAccessToken({
                        id: checkEmail.id,
                        isAdmin: checkEmail.isAdmin
                    })
                    const refresh_token = await genneralRefreshToken({
                        id: checkEmail.id,
                        isAdmin: checkEmail.isAdmin
                    })
                    resolve({
                        status: 'OK',
                        message: 'Đăng nhập bằng email thành công',
                        access_token,
                        refresh_token
                    })
                } else {
                    resolve({
                        status: 'ERR',
                        message: 'Mật khẩu không đúng'
                    })
                }
            } else {
                resolve({
                    status: 'ERR',
                    message: 'Đăng nhập thất bại'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
const updateUser = (idUser, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: idUser
            })

            if (!checkUser) {
                resolve({
                    status: 'OK',
                    message: 'id không tồn tại'
                })
            } else {
                // const updatedUser = await User.findByIdAndUpdate(id, data, {new: true})
                const updatedUser = await User.findByIdAndUpdate(
                    idUser,
                    data,
                    { new: true }
                )
                resolve({
                    status: 'OK',
                    message: 'Dữ liệu đã được cập nhật',
                    updatedUser
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
const deleteUser = (idUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: idUser
            })

            if (!checkUser) {
                resolve({
                    status: 'OK',
                    message: 'id không tồn tại'
                })
            } else {
                // const updatedUser = await User.findByIdAndUpdate(id, data, {new: true})
                await User.findByIdAndDelete(
                    idUser
                )
                resolve({
                    status: 'OK',
                    message: 'Tài khoản đã được xóa'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
const deleteUserMany = (idUsers) => {
    return new Promise(async (resolve, reject) => {
        try {
            const users = await User.deleteMany({
                _id: idUsers
            })
            resolve({
                status: 'OK',
                message: 'Tài khoản đã được xóa'
            })

        } catch (error) {
            reject(error)
        }
    })
}
const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find()
            resolve({
                status: 'Ok',
                message: 'Tất cả tài khoản',
                data: allUser
            })
        } catch (error) {
            reject(error)
        }
    })
}
const getUser = (idUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: idUser
            })
            if (checkUser != null) {
                resolve({
                    status: 'Ok',
                    message: 'Chi tiết tài khoản',
                    data: checkUser
                })
            } else {
                resolve({
                    status: 'ERR',
                    message: 'Tài khoản không tồn tại'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}




module.exports = {
    createUser,
    createGG,
    loginUser,
    updateUser,
    deleteUser,
    deleteUserMany,
    getAllUser,
    getUser,
}