const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const morgan = require('morgan')

const PORT = process.env.PORT


const dbConnection = require('./config/db')
dbConnection()

const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/user', userRoutes)

app.get('/', (req, res) => {
    return res.status(200).send("Food Backend Project!")
})

app.listen(PORT, () => {
    console.log(`Server is Running on port :${PORT}`)
})