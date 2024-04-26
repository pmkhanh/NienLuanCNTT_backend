const mongoose = require('mongoose');
const uesrSchema = new mongoose.Schema(
    {
        username: {type: String, required: true},
        email: {type: String, required: false}, 
        password: {type: String, required: true}, 
        isAdmin: {type: Boolean, default: false, required: true}, 
        phone: {type: String, required: false}, 
        address: {type: String, required: false}, 
        name: {type: String, required: false},
        avatar: {type: String, required: false},
        access_token: {type: String, required: false}, 
        refresh_token: {type: String, required: false}, 
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", uesrSchema);
module.exports = User;