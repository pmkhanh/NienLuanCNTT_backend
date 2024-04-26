const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()

const genneralAccessToken = async (payload) => {
    const accessToken = jwt.sign({
        ...payload
    }, process.env.ACCESS_TOKEN, { expiresIn: '3d' })

    return accessToken;
}
const genneralRefreshToken = async (payload) => {
    const refreshToken = jwt.sign({
        ...payload
    }, process.env.REFRESH_TOKEN, { expiresIn: '365d' })

    return refreshToken;
}
const refreshTokenJWT = async (token) => {
    return new Promise(async (resolve, reject) => {
        try {

            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                if (err) {
                    resolve({
                        status: 'ERR',
                        message: 'Tài khoản không có quyền'
                    })
                }
                const access_token = await genneralAccessToken({
                    _id: user?.id,
                    isAdmin: user?.isAdmin
                })

                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    access_token
                })
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    genneralAccessToken,
    genneralRefreshToken,
    refreshTokenJWT
}