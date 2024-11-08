const express = require("express");
const { bookActivity, bookItinerary, cancelBooking, bookFlight } = require('../controllers/bookingController'); // Destructure the flightSearch function

const router = express.Router(); // Capitalize Router

router.post("/activity", bookActivity);
router.post("/itinerary", bookItinerary);
router.patch("/cancel", cancelBooking);
router.patch("/flight", bookFlight);

module.exports = router;