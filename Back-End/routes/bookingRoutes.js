const express = require("express");
const { flightSearch, bookActivity } = require('../controllers/bookingController'); // Destructure the flightSearch function

const router = express.Router(); // Capitalize Router

router.get("/flightSearch", flightSearch);
router.post("/bookActivity", bookActivity);

module.exports = router;