const express = require("express");
const { flightSearch, bookActivity, bookItinerary } = require('../controllers/bookingController'); // Destructure the flightSearch function

const router = express.Router(); // Capitalize Router

router.get("/flightSearch", flightSearch);
router.post("/bookActivity", bookActivity);
router.post("/bookItinerary", bookItinerary);

module.exports = router;