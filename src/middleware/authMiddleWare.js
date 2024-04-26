const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config()

const authMiddleWare = (req, res, next) => {
    const token = req.headers.token?.split(" ")[1];


    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Tài khoản không có quyền admin'
            })
        }
        if (user?.isAdmin) {
            next()
        } else {
            return res.status(404).json({
                status: 'ERR',
                message: 'Tài khoản không có quyền admin'
            })
        }
    });
}
const authUserMiddleWare = (req, res, next) => {
    const token = req?.headers?.token?.split(" ")[1];
    const idUser = req.params.id
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Tài khoản không có quyền admin'
            })
        }
        if (user?.isAdmin || user?.id == idUser) {
            next()
        } else {
            return res.status(404).json({
                status: 'ERR',
                message: 'Tài khoản không có quyền admin'
            })
        }
    });
}

module.exports = {
    authMiddleWare,
    authUserMiddleWare
}