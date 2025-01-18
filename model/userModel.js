const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
    userName: {
        type: String,
        required: [true, "userName is required !"]
    },
    email: {
        type: String,
        unique : true,
        required: [true, "email is required !"]
    },
    password: {
        type: String,
        required: [true, "password is required !"]
    },
    phone: String,
    address: {
        type: Array
    },
    userType: {
        type: String,
        required: [true, "userType is required !"],
        default: "client",
        enum: ["admin", "client", "vendor", "driver"]
    },
    profile: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png"
    }
}, { timestamps: true })


const mongo_collection = mongoose.model('users', userSchema)
module.exports = mongo_collection