const mongoose = require('mongoose')
const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected To Mongo Host :-${mongoose.connection.host}`)
    } catch(err){
        console.log("ERROR OCCURED DURING DB CONNECTION :-", err)
    }
}

module.exports = dbConnection