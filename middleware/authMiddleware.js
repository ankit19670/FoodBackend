const JWT = require('jsonwebtoken')


const verifyToken = (req, res, next) => {
    try {
        let token = req.headers?.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized Access!" });
        }
        JWT.verify(token, process.env.JWT_SCREAT, (error, decodeValue) => {
            if (error) {
                if (error.name === "TokenExpiredError") return res.json({ status: 401, success: false, message: "Token has expired! Please login again." })
                return res.json({ status: 401, success: false, message: "Unauthrized User! Token Not Valid !" })
            }
            req.user = decodeValue
            next()
        })
    
    } catch (err) {
        console.log("Error Occured During Verifying Token :-", err)
        next(err)
    }
}


module.exports = { verifyToken }
