const express = require('express')
const router = express.Router()

const userController = require('../controller/userController')
const {verifyToken} = require('../middleware/authMiddleware')



router.get('/getUserData', verifyToken, userController.GetUserData)
router.put('/updateUserData', verifyToken, userController.UpdateUserData)

module.exports = router