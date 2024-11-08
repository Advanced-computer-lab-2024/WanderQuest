const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tourGovernorSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    role:{type:String,required:false,default:'Tourism Governor'}
}, { timestamps: true});

const tourGovernor = mongoose.model('TourGovernor',tourGovernorSchema);


module.exports = tourGovernor