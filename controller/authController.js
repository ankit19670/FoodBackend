
const userModel = require('../model/userModel')
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')


const RegisterUser = async(req, res, next) => {
    try {
        let {userName , email, password, phone, address, userType} = req.body;
    
        if(!userName || !password || !email) {
            return res.status(400).send({
                Success : false,
                message : "userName, email, and password are required!"
            });
        }
        let isExist = await userModel.findOne({email: email})
        if(isExist) {
            return res.json({
                    status : 400,
                    Success : false,
                    message : "User Already Exists!"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
   
        let userInfo = {
            userName,
            email,
            password : hashedPassword,
            phone,
            address,
            userType
        }
        let newUser = (await userModel.create(userInfo)).toObject();
        delete newUser.password 
        return res.json({
                status : 201,
                Success : true,
                message : "User Registered Successfully!",
                user: newUser 
            }
        )
    } catch (err) {
        console.log("Error Occured during RegisterUser API :-", err)
        next(err)
    }
}

const LogIn = async(req, res, next) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            return res.status(500).send({
                success: false,
                message: "email or password fields are required !"
            })
        }

        const userInfo = await userModel.findOne({ email })
        if (!userInfo) {
            return res.status(404).send({
                success: false,
                message: "USER NOT FOUND !"
            })
        }

        const isMatched = await bcrypt.compare(password, userInfo.password)
        if (!isMatched) {
            return res.status(404).send({
                success: false,
                message: "Incorrect Credentials !"
            })
        }

        const token = JWT.sign({userId : userInfo._id, email : userInfo.email}, process.env.JWT_SCREAT, {expiresIn : "35m"})
        return res.json({
            status: 200,
            success: true,
            token,
            message: "USER LOG IN SUCCESSFULLY !"
        })
    } catch (err) {
        console.log("Error Occured In LogIn API !", err)
        next(err)
    }
}

const ResetPassword = async (req, res, next) => {
    try {
        let { oldPassword, newPassword } = req.body;
        let userInfo = await userModel.findById({ _id: req.user.userId })
        if (!userInfo) return res.json({ status: 404, success: false, message: "User Not Found !" })
        const isMatched = await bcrypt.compare(oldPassword, userInfo.password)
        if (!isMatched) return res.json({ status: 403, success: false, message: "Password Not Matched !" });

        const newHashedPassword = await bcrypt.hash(newPassword, 10)
        userInfo.password = newHashedPassword
        await userInfo.save();

        return res.json({
            status: 200,
            success: true,
            message: "Password Reset Successfully !"
        })


    } catch (err) {
        console.log("Error Occured During Reset Password :-", err)
    }
}


module.exports = {
    RegisterUser,
    ResetPassword,
    LogIn
}