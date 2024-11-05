require('dotenv').config()
const cors = require('cors')
const bodyParser = require("body-parser")

const express = require('express')
const mongoose = require('mongoose')
const adminRoutes = require('./routes/adminRoutes')
const tourGovernerRoutes = require('./routes/tourGovernerRoutes')
const authenticationControllerRoutes = require('./routes/authenticationRoutes')
const advertiserRoutes = require('./routes/advertiserRoutes')
const sellerRoutes = require('./routes/sellerRoutes')
const touristRoutes = require('./routes/touristRoutes')
const tourGuideRoutes = require('./routes/tourGuideRoutes')
const activityRoutes = require('./routes/activityRoutes')
// const { itinerary } = require('./models/objectModel')
const itineraryRoutes = require('./routes/itineraryRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express()

// Middleware
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(req.method, req.path)
    next()
});

//Routes
app.use('/admin', adminRoutes)
app.use('/authentication', authenticationControllerRoutes)
app.use('/advertiser', advertiserRoutes)
app.use('/seller', sellerRoutes)
app.use('/tourist', touristRoutes)
app.use('/tourGuide', tourGuideRoutes)
app.use('/tourismGovernor', tourGovernerRoutes)
app.use('/activityRoutes', activityRoutes)
app.use('/itinerary', itineraryRoutes);
app.use('/booking', bookingRoutes);

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