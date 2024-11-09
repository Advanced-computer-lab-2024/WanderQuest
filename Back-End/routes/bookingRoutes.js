const express = require("express");
const {
    bookActivity,
    bookItinerary,
    cancelBooking,
    bookFlight,
    bookHotel
} = require('../controllers/bookingController'); // Destructure the flightSearch function

const router = express.Router(); // Capitalize Router

router.post("/activity", bookActivity);
router.post("/itinerary", bookItinerary);
router.patch("/cancel", cancelBooking);
router.post("/flight", bookFlight);
router.post("/hotel", bookHotel);

module.exports = router;