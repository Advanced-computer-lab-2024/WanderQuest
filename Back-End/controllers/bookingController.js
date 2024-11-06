const Booking = require('../models/bookingModel');
const axios = require('axios');
const { User } = require('../models/userModel');
const Activity = require('../models/objectModel').Activity;


const bookActivity = async (req, res) => {
    const { userId, bookingType, activityId } = req.body;

    const booking = await Booking.findOne({ userId, activityId });
    if(booking) {
        return res.status(400).json({ error: 'Activity already booked by this user' });
    }

    if (bookingType !== 'activity') {
        return res.status(400).json({ error: 'Can only book an activity' });
    }

    try {
        const retUser = await User.findById(userId);
        if (!retUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (retUser.role !== 'tourist') {
            return res.status(403).json({ error: 'Only tourists can book activities' });
        }

        const retActivity = await Activity.findById(activityId);
        if (!retActivity) {
            return res.status(404).json({ error: 'Activity not found' });
        }

        const newBooking = new Booking({
            userId,
            bookingType,
            activityId,
            details: retActivity,
            paid: true,
            startDate: retActivity.date
        });

        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const bookItinerary = async (req, res) => {

}

const bookTransportation = async (req, res) => {

}

const bookHotel = async (req, res) => {

}

const bookFlight = async (req, res) => {

}

// Flight search
const flightSearch = async (req, res) => {
    const { fromId, toId, departDate, returnDate, adults = '1', children = '0', sort = 'BEST', cabinClass = 'ECONOMY', currency_code = 'USD' } = req.query;

    // Validate input dates
    const now = new Date();
    const outboundDate = new Date(departDate);
    const returnDateObj = new Date(returnDate);

    if (outboundDate < now || returnDateObj < now) {
        return res.status(400).json({ error: '`departDate` and `returnDate` must be in the future.' });
    }

    const options = {
        method: 'GET',
        url: 'https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlights',
        params: {
            fromId,
            toId,
            departDate,
            returnDate,
            pageNo: '1',
            adults,
            children,
            sort,
            cabinClass,
            currency_code
        },
        headers: {
            'x-rapidapi-key': '6c33650851msh45e5c5726fd40fap186e97jsnd692a76b08c6',
            'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    flightSearch,
    bookActivity,
};