
const UserModel = require('../model/userModel')

const GetUserData = async (req, res, next) => {
    try {

        let allUsers = await UserModel.find({ _id: req.user.userId }).select('-password -_id ').lean()
        return res.json({
            status: 200,
            message: "Success",
            results: allUsers
        })
    } catch (err) {
        console.log("Error Occured During Get All User API :-", err)
        next(err)
    }
}

const UpdateUserData = async (req, res, next) => {
    try {
        let userInfo = await UserModel.findById({ _id: req.user.userId }).select('-password')
        if (!userInfo) return res.json({ status: 404, message: "Not Found !" })

        let { userName, profile, address, phone } = req.body;

        if (userName) userInfo.userName = userName;
        if (profile) userInfo.profile = profile;
        if (address) userInfo.address = address;
        if (phone) userInfo.phone = phone;

        await userInfo.save()
        return res.json({
            status: 200,
            success: true,
            message: "User Information Saved Successfully !",
            userInfo
        })

    } catch (err) {
        console.log("Error Occured During Update User Data API", err)
        next(err)
    }
}



module.exports = {
    GetUserData,
    UpdateUserData
}