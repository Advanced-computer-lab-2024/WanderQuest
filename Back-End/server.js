require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')


const app = express()

// Middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.method, req.path)
    next()
})

//Routes

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, (req, res) => {
            console.log('Server is running on port', process.env.PORT)
        })
        console.log('MongoDB connected!')
    })
    .catch(err => console.log(err))

