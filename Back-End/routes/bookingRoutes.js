const express = require("express");
const requireAuth = require('../middleware/requireAuth');
const {
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
} = require('../controllers/bookingController'); // Destructure the flightSearch function

const router = express.Router(); // Capitalize Router


router.use(requireAuth({ role: "tourist" }));

router.post("/activity", bookActivity);

router.post("/itinerary", bookItinerary);

router.patch("/cancel", cancelBooking);

router.post("/flight", bookFlight);

router.post("/hotel", bookHotel);

router.post("/transportation", bookTransportation);

router.get("/activities", activityBookings);

router.get("/itineraries", itineraryBookings);

router.get("/flights", flightBookings);

router.get("/hotels", hotelBookings);
router.get("/transportations", transportationBookings);

module.exports = router;