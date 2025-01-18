const express = require('express')
const router = express.Router()
const authController = require('../controller/authController')
const { verifyToken } = require('../middleware/authMiddleware')

router.post('/register', authController.RegisterUser)
router.post('/login', authController.LogIn)
router.post('/resetPassword', verifyToken, authController.ResetPassword)

module.exports = router