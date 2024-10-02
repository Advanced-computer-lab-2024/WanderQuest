const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

// Base schema
const options = { discriminatorKey: 'role', collection: 'users' };

const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['tourist', 'tourGuide', 'advertiser', 'seller'],
        required: true,
    },
    accepted: { type: Boolean, default: false },
}, options);

UserSchema.statics.signup = async function (username, email, password, role) {

    // validation
    if (!email || !password || !username) {
        throw new Error('All fields must be filled');
    }
    if (!validator.isEmail(email)) {
        throw new Error('Invalid email');
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error('Password must be strong, must contain uppercase, number, and special character');
    }

    // check if email already exists
    const exists = await this.findOne({ email });

    if (exists) {
        throw new Error('Email already exists');
    }

    // hash the password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const user = await this.create({ username, email, password: hashedPassword, role });

    return user;
}

const User = mongoose.model('User', UserSchema);


// Disciminator schemas

// Tourist schema
const TouristSchema = new Schema({
    nationality: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    dob: { type: Date, required: true },
    job: { type: String, required: true },
});

// override the signup method
TouristSchema.statics.signup = async function (username, email, password, role, nationality, mobileNumber, dob, job) {
    // validation
    if (!email || !password || !username || !nationality || !mobileNumber || !dob || !job) {
        throw new Error('All fields must be filled');
    }
    if (!validator.isEmail(email)) {
        throw new Error('Invalid email');
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error('Password must be strong, must contain uppercase, number, and special character');
    }

    // check if email already exists
    const exists = await this.findOne({ email });

    if (exists) {
        throw new Error('Email already exists');
    }

    // hash the password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const user = await this.create({ username, email, password: hashedPassword, role, nationality, mobileNumber, dob, job });

    return user;

}

const Tourist = User.discriminator('tourist', TouristSchema);

// Tour Guide schema
const TourGuideSchema = new Schema({
    yearsOfExperience: { type: Number, default: undefined },
    mobileNumber: { type: String, default: undefined },
    previousWork: { type: [String], default: undefined },
});

const TourGuide = User.discriminator('tourGuide', TourGuideSchema);

// Advertiser schema
const AdvertiserSchema = new Schema({
    companyName: { type: String, default: undefined },
    companyDescription: { type: String, default: undefined },
    companyAddress: { type: String, default: undefined },
    websiteLink: { type: String, default: undefined },
    hotline: { type: String, default: undefined },
});

const Advertiser = User.discriminator('advertiser', AdvertiserSchema);

// Seller schema
const SellerSchema = new Schema({
    sellerDescription: { type: String, default: undefined },
    sellerName: { type: String, default: undefined },
});

const Seller = User.discriminator('seller', SellerSchema);

module.exports = {
    User,
    Tourist,
    TourGuide,
    Advertiser,
    Seller
};
