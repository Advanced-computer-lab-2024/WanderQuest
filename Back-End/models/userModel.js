const mongoose = require('mongoose');
const becrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

// Base schema
const options = { discriminatorKey: 'role', collection: 'users' };

const UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    mobileNumber: String,
    role: {
        type: String,
        enum: ['tourist', 'tourGuide', 'advertiser', 'seller', 'admin'],
        required: true,
    },
    accepted: { type: Boolean, default: false },
}, options);

const User = mongoose.model('User', UserSchema);

// Tourist schema
const TouristSchema = new Schema({
    nationality: { type: String, required: true },
    dob: { type: Date, required: true },
    job: { type: String, required: true },
});

const Tourist = User.discriminator('tourist', TouristSchema);

// Tour Guide schema
const TourGuideSchema = new Schema({
    yearsOfExperience: { type: Number, required: true },
    previousWork: { type: [String], required: true },
});

const TourGuide = User.discriminator('tourGuide', TourGuideSchema);

// Advertiser schema
const AdvertiserSchema = new Schema({
    companyName: { type: String, required: true },
    companyDescription: { type: String, required: true },
    companyAddress: { type: String, required: true },
    websiteLink: { type: String, required: true },
    hotline: { type: String, required: true },
});

const Advertiser = User.discriminator('advertiser', AdvertiserSchema);

// Seller schema
const SellerSchema = new Schema({
    sellerDescription: { type: String, required: true },
    sellerName: { type: String, required: true },
});

const Seller = User.discriminator('seller', SellerSchema);

module.exports = {
    Tourist,
    TourGuide,
    Advertiser,
    Seller
};
