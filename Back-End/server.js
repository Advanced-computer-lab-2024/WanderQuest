require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const adminRoutes = require('./routes/adminRoutes')
const tourGovernerRoutes = require('./routes/tourGovernerRoutes')
const registerationRoutes = require('./routes/registerationRoutes')
const advertiserRoutes = require('./routes/advertiserRoutes')


const app = express()

// Middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.method, req.path)
    next()
})

//Routes
app.use('/admin', adminRoutes)
app.use('/register', registerationRoutes)
app.use('/advertiser', advertiserRoutes)
app.use('/tourismGovernor', tourGovernerRoutes)

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, (req, res) => {
            console.log('Server is running on port', process.env.PORT)
        })
        console.log('MongoDB connected!')
    })
    .catch(err => console.log(err))