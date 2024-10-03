require('dotenv').config()
const cors = require('cors')

const express = require('express')
const mongoose = require('mongoose')
const adminRoutes = require('./routes/adminRoutes')
const tourGovernerRoutes = require('./routes/tourGovernerRoutes')
const registerationRoutes = require('./routes/registerationRoutes')
const advertiserRoutes = require('./routes/advertiserRoutes')
const sellerRoutes = require('./routes/sellerRoutes')
const touristRoutes = require('./routes/touristRoutes')
const tourGuideRoutes = require('./routes/tourGuideRoutes')
const activityRoutes = require('./routes/activityRoutes')
// const { itinerary } = require('./models/objectModel')
const itineraryRoutes = require('./routes/itineraryRoutes');

const app = express()

// Middleware
app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
    console.log(req.method, req.path)
    next()
})

//Routes
app.use('/admin', adminRoutes)
app.use('/register', registerationRoutes)
app.use('/advertiser', advertiserRoutes)
app.use('/seller', advertiserRoutes)
app.use('/tourist', touristRoutes)
app.use('/tourGuide', tourGuideRoutes)
app.use('/tourismGovernor', tourGovernerRoutes)
app.use('/activityRoutes', activityRoutes)
app.use('/itinerary', itineraryRoutes);  // This sets the base path for itinerary routes

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, (req, res) => {
            console.log('Server is running on port', process.env.PORT)
        })
        console.log('MongoDB connected!')
    })
    // .catch(err => console.log('MongoDB connection error:', err));
    .catch(err => console.log(err))