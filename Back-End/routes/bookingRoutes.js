const express = require("express");
const { flightSearch } = require('../controllers/bookingController'); // Destructure the flightSearch function

const router = express.Router(); // Capitalize Router

router.get("/flightSearch", flightSearch);

module.exports = router;