const Booking = require('../models/bookingModel');
const axios = require('axios');
const { User, Tourist } = require('../models/userModel');
const Activity = require('../models/objectModel').Activity;
const Itinerary = require('../models/objectModel').itinerary;
const mongoose = require('mongoose');
const Tourist = require('../models/userModel').Tourist;


const bookActivity = async (req, res) => {
    const { bookingType, activityId } = req.body;
    const userId = req.user._id;

    const booking = await Booking.findOne({ userId, activityId });
    if (booking && booking.status === 'booked') {
        return res.status(400).json({ error: 'Activity already booked by this user' });
    }

    if (bookingType !== 'activity') {
        return res.status(400).json({ error: 'Can only book an activity' });
    }

    try {
        // Check if userId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid userId format" });
        }

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

        
        if (retUser.wallet < retActivity.price) {
            return res.status(400).json({ error: 'Insufficient funds' });
        }

        const newBooking = new Booking({
            userId,
            bookingType,
            activityId,
            details: retActivity,
            paid: true,
            startDate: retActivity.date
        });

        if (booking && booking.status === 'cancelled') {
            await Booking.findOneAndDelete({ _id: booking._id });
            console.log("Deleted booking");
        }
        const savedBooking = await newBooking.save();
        retUser.deduceFromWallet(retActivity.price);

        //increment no.of booking of activities
        retActivity.NoOfBooking += 1;
        retActivity.touristsCount = (retActivity.touristsCount || 0) + 1;
        // Recalculate revenue assuming that all bookings are online
        const appFee = retActivity.price * 0.10;
        retActivity.revenue = (retActivity.revenue || 0) + (retActivity.price - appFee);
        await retActivity.save();
        res.status(201).json(savedBooking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const activityBookings = async (req, res) => {
    const id = req.user._id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid user id" });
    }
    try {
        const retUser = await User.findById(id);
        if (!retUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const bookings = await Booking.find({ userId: id, bookingType: 'activity' });
        if (bookings.length === 0) {
            return res.status(404).json({ message: "User has no activity bookings" });
        }
        res.status(200).json(bookings);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const bookItinerary = async (req, res) => {
    const { bookingType, itineraryId, startDate } = req.body;
    const userId = req.user._id;

    const booking = await Booking.findOne({ userId, itineraryId });
    if (booking && booking.status === 'booked') {
        return res.status(400).json({ error: 'Itinerary already booked by this user' });
    }

    if (bookingType !== 'itinerary') {
        return res.status(400).json({ error: 'Can only book an itinerary' });
    }

    try {
        // Check if userId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid userId format" });
        }

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

        if (retUser.wallet < retItinerary.price) {
            return res.status(400).json({ error: 'Insufficient funds' });
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
        if (booking && booking.status === 'cancelled') {
            await Booking.findOneAndDelete({ _id: booking._id });
            console.log("Deleted booking");
        }
        retUser.deduceFromWallet(retItinerary.price);
        const savedBooking = await newBooking.save();
        // Increment the number of bookings for the itinerary
        retItinerary.NoOfBookings += 1;
        retItinerary.touristsCount = (retItinerary.touristsCount || 0) + 1;

        // Recalculate revenue
        const appFee = retItinerary.price * 0.10;
        retItinerary.revenue = (retItinerary.revenue || 0) + (retItinerary.price - appFee);
        await retItinerary.save();

        res.status(201).json(savedBooking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

const itineraryBookings = async (req, res) => {
    const id = req.user._id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid user id" });
    }
    try {
        const retUser = await User.findById(id);
        if (!retUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const bookings = await Booking.find({ userId: id, bookingType: 'itinerary' });
        if (bookings.length === 0) {
            return res.status(404).json({ message: "User has no itinerary bookings" });
        }
        res.status(200).json(bookings);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const cancelBooking = async (req, res) => {
    const { bookingId } = req.body;
    const userId = req.user._id;
    try {
        // Check if userId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid userId format" });
        }

        const booking = await Booking.findById(bookingId);
        const user = await Tourist.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        if (booking.userId.toString() !== userId.toString()) {
            console.log(booking.userId.toString(), userId.toString());
            return res.status(403).json({ error: 'Unauthorized action: cannot delete the booking of another user' });
        }
        if (booking.status === 'cancelled') {
            return res.status(400).json({ error: 'Booking already cancelled' });
        }
        if (booking.startDate < new Date()) {
            return res.status(400).json({ error: 'Cannot cancel this booking' });
        }
        const retUser = await Tourist.findById(userId);
        const currentDate = new Date();
        const startDate = new Date(booking.startDate);
        const hoursDifference = (startDate - currentDate) / (1000 * 60 * 60);

        if (hoursDifference < 48) {
            console.log(hoursDifference);
            return res.status(400).json({ error: 'Cannot cancel a booking within 48 hours of the start date' });

        }
        const prevWallet = retUser.wallet;
        retUser.wallet += booking.details.price;
        await retUser.save();
        if(prevWallet === retUser.wallet){
            return res.status(500).json({ error: 'Failed to refund the user' });
        }
        booking.status = 'cancelled';
        user.wallet += booking.details.price;
        await booking.save();
        await user.save();
        res.status(200).json({ message: 'Booking successfully cancelled' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const bookFlight = async (req, res) => {
    const { bookingType, from, fromAir, toAir, price, companyName } = req.body;
    const userId = req.user._id;

    if (bookingType != "flight") {
        res.status(400).json({ message: "Can only book a flight" });
    }
    try {
        // Check if userId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid userId format" });
        }

        const retuser = await User.findById(userId);
        if (!retuser) {
            res.status(404).json({ message: "User not found" });
        }
        if (retuser.role != "tourist") {
            res.status(403).json({ message: "Only tourists can book flights" });
        }
        const currentDate = new Date();
        const fromDate = new Date(from);

        if (fromDate <= currentDate) {
            return res.status(400).json({ message: "From date must be a future date" });
        }

        const newBooking = new Booking({
            userId,
            bookingType,
            details: { from, fromAir, toAir, price, companyName },
            paid: true,
            startDate: fromDate
        });
        await newBooking.save();
        return res.status(201).json(newBooking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const flightBookings = async (req, res) => {
    const id = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid user id" });
    }
    try {
        const retUser = await User.findById(id);
        if (!retUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const bookings = await Booking.find({ userId: id, bookingType: 'flight' });
        if (bookings.length === 0) {
            return res.status(404).json({ message: "User has no flight bookings" });
        }
        res.status(200).json(bookings);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const bookHotel = async (req, res) => {
    const { bookingType, hotelName, rating, description, price, stars, checkIn, checkOut } = req.body;
    const userId = req.user._id;

    if (bookingType !== "hotel") {
        return res.status(400).json({ message: "Can only book a hotel" });
    }

    try {

        // Check if userId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid userId format" });
        }

        const retUser = await User.findById(userId);
        if (!retUser) {
            return res.status(404).json({ message: "User not found" });
        }

        if (retUser.role !== "tourist") {
            return res.status(403).json({ message: "Only tourists can book hotels" });
        }

        if (checkIn >= checkOut) {
            return res.status(400).json({ message: "Check-in date must be before check-out date" });
        }

        const currentDate = new Date();
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);

        if (checkInDate <= currentDate) {
            return res.status(400).json({ message: "Check-in date must be a future date" });
        }

        if (checkOutDate <= currentDate) {
            return res.status(400).json({ message: "Check-out date must be a future date" });
        }

        const newBooking = new Booking({
            userId,
            bookingType,
            details: { hotelName, rating, description, price, stars, checkIn, checkOut },
            paid: true,
            startDate: checkInDate
        });

        await newBooking.save();
        return res.status(201).json(newBooking);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const hotelBookings = async (req, res) => {
    const id = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid user id" });
    }
    try {
        const retUser = await User.findById(id);
        if (!retUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const bookings = await Booking.find({ userId: id, bookingType: 'hotel' });
        if (bookings.length === 0) {
            return res.status(404).json({ message: "User has no hotel bookings" });
        }
        res.status(200).json(bookings);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const bookTransportation = async (req, res) => {
    const { bookingType, company, type, price, departure, arrival, date, pickUpLocation, dropOffLocation } = req.body;
    const userId = req.user._id;

    if (bookingType !== "transportation") {
        return res.status(400).json({ message: "Can only book transportation" });
    }
    if (!company || !type || !price || !departure || !arrival || !date || !pickUpLocation || !dropOffLocation) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        // Check if userId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid userId format" });
        }

        const retUser = await User.findById(userId);
        if (!retUser) {
            return res.status(404).json({ message: "User not found" });
        }

        if (retUser.role !== "tourist") {
            return res.status(403).json({ message: "Only tourists can book transportation" });
        }

        const currentDate = new Date();
        const transportationDate = new Date(date);

        if (transportationDate <= currentDate) {
            return res.status(400).json({ message: "From date must be a future date" });
        }

        const newBooking = new Booking({
            userId,
            bookingType,
            details: { company, type, price, departure, arrival, transportationDate, bookingAlreadyMade: true, pickUpLocation, dropOffLocation },
            paid: true,
            startDate: transportationDate
        });

        await newBooking.save();
        return res.status(201).json(newBooking);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const transportationBookings = async (req, res) => {
    const id = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid user id" });
    }
    try {
        const retUser = await User.findById(id);
        if (!retUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const bookings = await Booking.find({ userId: id, bookingType: 'transportation' });
        if (bookings.length === 0) {
            return res.status(404).json({ message: "User has no transportation bookings" });
        }
        res.status(200).json(bookings);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = {
    bookActivity,
    bookItinerary,
    cancelBooking,
    bookFlight,
    bookHotel,
    hotelBookings,
    flightBookings,
    itineraryBookings,
    activityBookings,
    bookTransportation,
    transportationBookings
};