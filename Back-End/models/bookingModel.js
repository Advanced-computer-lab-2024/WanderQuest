const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bookingType: {
        type: String,
        enum: ['flight', 'hotel', 'transportation', 'activity', 'itinerary'],
        required: true
    },
    itineraryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Itinerary',
        required: function (){
            return this.bookingType === 'itinerary';
        }
    },
    activityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity',
        required: function (){
            return this.bookingType === 'activity';
        }
    },
    details: {
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
    startDate: {
        type: Date,
        required: true
    }

}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;