const express = require("express");
const {
    bookActivity,
    bookItinerary,
    cancelBooking,
    bookFlight,
    bookHotel,
    hotelBookings,
    flightBookings,
    itineraryBookings,
    activityBookings
} = require('../controllers/bookingController'); // Destructure the flightSearch function

const router = express.Router(); // Capitalize Router

router.post("/activity", bookActivity);
router.post("/itinerary", bookItinerary);
router.patch("/cancel", cancelBooking);
router.post("/flight", bookFlight);
router.post("/hotel", bookHotel);
router.get("/activities/:id", activityBookings);
router.get("/itineraries/:id", itineraryBookings);
router.get("/flights/:id", flightBookings);
router.get("/hotels/:id", hotelBookings);

module.exports = router;