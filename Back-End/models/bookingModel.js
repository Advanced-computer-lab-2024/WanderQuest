const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel',
        required: true
    },
    flight: {
        type: Object,
        required: false
    },
    hotel: {
        type: Object,
        required: false
    },
    transportation: {
        type: Object,
        required: false
    },
    ticket: {
        type: Object,
        required: false
    },
    paid: {
        type: Boolean,
        required: true
    },
    status: {
        type: String,
        enum: ['booked', 'cancelled'],
        default: 'booked'
    },

});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;