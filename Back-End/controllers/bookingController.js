const Booking = require('../models/bookingModel');
const axios = require('axios');
const { User } = require('../models/userModel');
const Activity = require('../models/objectModel').Activity;
const Itinerary = require('../models/objectModel').itinerary;


const bookActivity = async (req, res) => {
    const { userId, bookingType, activityId } = req.body;

    const booking = await Booking.findOne({ userId, activityId });
    if(booking && booking.status === 'booked') {
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

        if(booking && booking.status === 'cancelled') {
            await Booking.findOneAndDelete({ _id: booking._id });
            console.log("Deleted booking");
        }
        const savedBooking = await newBooking.save();
        retUser.deduceFromWallet(retActivity.price);
        res.status(201).json(savedBooking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const bookItinerary = async (req, res) => {
    const { userId, bookingType, itineraryId, startDate } = req.body;

    const booking = await Booking.findOne({ userId, itineraryId });
    if(booking && booking.status === 'booked') {
        return res.status(400).json({ error: 'Activity already booked by this user' });
    }

    if (bookingType !== 'itinerary') {
        return res.status(400).json({ error: 'Can only book an itinerary' });
    }

    try {
        const retUser = await User.findById(userId);
        if (!retUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (retUser.role !== 'tourist') {
            return res.status(403).json({ error: 'Only tourists can book itineraries' });
        }

        const retItinerary = await Itinerary.findById(itineraryId);
        if (!retItinerary) {
            return res.status(404).json({ error: 'Itinerary not found' });
        }

        // Convert startDate to ISO string without time part
        const startDateISO = new Date(startDate).toISOString().split('T')[0];

        // Check if startDate is in availableDates
        const isDateAvailable = retItinerary.availableDates.some(date => 
            new Date(date).toISOString().split('T')[0] === startDateISO
        );

        if (!isDateAvailable) {
            return res.status(400).json({ error: 'Itinerary not available on this date' });
        }

        const newBooking = new Booking({
            userId,
            bookingType,
            itineraryId,
            details: retItinerary,
            paid: true,
            startDate: startDate
        });
        if(booking && booking.status === 'cancelled') {
            await Booking.findOneAndDelete({ _id: booking._id });
            console.log("Deleted booking");
        }
        retUser.deduceFromWallet(retItinerary.price);
        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

const cancelBooking = async (req, res) => {
    const { userId, bookingId } = req.body;
    try{
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        if(booking.userId != userId) {
            console.log(booking.userId, userId);
            return res.status(403).json({ error: 'Unauthorized action: can not delete the booking of another user' });
        }
        if(booking.status === 'cancelled') {
            return res.status(400).json({ error: 'Booking already cancelled' });
        }
        booking.status = 'cancelled';
        await booking.save();
        res.status(200).json({ message: 'Booking successfully cancelled' });
    } catch(error){
        res.status(500).json({ error: error.message });
    }
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
    bookItinerary,
    cancelBooking
};