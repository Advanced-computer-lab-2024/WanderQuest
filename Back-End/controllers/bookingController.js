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
        if(booking.startDate < new Date()) {
            return res.status(400).json({ error: 'Cannot cancel this booking' });
        }
        const currentDate = new Date();
        const startDate = new Date(booking.startDate);
        const hoursDifference = (startDate - currentDate) / (1000 * 60 * 60);

        if (hoursDifference < 48) {
            return res.status(400).json({ error: 'Cannot cancel a booking within 48 hours of the start date' });
        }
        booking.status = 'cancelled';
        await booking.save();
        res.status(200).json({ message: 'Booking successfully cancelled' });
    } catch(error){
        res.status(500).json({ error: error.message });
    }
}

const bookFlight = async (req, res) => {
    const {userId, bookingType, from, to, price, companyName} = req.body;
    if(bookingType != "flight"){
        res.status(400).json({ message : "Can only book a flight" });
    }
    try{
        const retuser = await User.findById(userId);
        if(!retuser){
            res.status(404).json({ message : "User not found" });
        }
        if(retuser.role != "tourist"){
            res.status(403).json({ message : "Only tourists can book flights" });
        }
        if(from == to){
            res.status(400).json({ message : "From and To cannot be the same" });
        }
        const currentDate = new Date();
        const fromDate = new Date(from);
        const toDate = new Date(to);

        if (fromDate <= currentDate) {
            return res.status(400).json({ message: "From date must be a future date" });
        }

        if (toDate <= currentDate) {
            return res.status(400).json({ message: "To date must be a future date" });
        }

        const newBooking = new Booking({
            userId,
            bookingType,
            details: { from, to, price, companyName },
            paid: true,
            startDate: fromDate
        });
    } catch (error){
        res.status(500).json({ error: error.message });
    }
}

const bookTransportation = async (req, res) => {

}

const bookHotel = async (req, res) => {

}


module.exports = {
    bookActivity,
    bookItinerary,
    cancelBooking,
    bookFlight,
};