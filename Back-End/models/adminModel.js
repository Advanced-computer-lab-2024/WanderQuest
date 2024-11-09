const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
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
    role:{type:String,required:false,default:'Admin'}
}, { timestamps: true});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin