const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const documentSchema = new mongoose.Schema({
    filename: String,
    contentType: String,
    fileID: String,
});

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
    accepted: { type: Boolean, default: function () { return this.role == 'tourist'; } },
    isTermsAccepted: { type: Boolean, default: function () { return this.role == 'tourist'; } },
    documents: [documentSchema],
}, options);

<<<<<<< Updated upstream
=======
// // Middleware to exclude users with requestToBeDeleted set to true
// UserSchema.pre('find', function (next) {
//     if (!this.getQuery().includeDeleted) {
//         this.where({ requestToBeDeleted: { $ne: true } });
//     } else {
//         delete this.getQuery().includeDeleted;
//     }
//     next();
// });

// UserSchema.pre('findOne', function (next) {
//     if (!this.getQuery().includeDeleted) {
//         this.where({ requestToBeDeleted: { $ne: true } });
//     } else {
//         delete this.getQuery().includeDeleted;
//     }
//     next();
// });

// UserSchema.pre('findById', function (next) {
//     if (!this.getQuery().includeDeleted) {
//         this.where({ requestToBeDeleted: { $ne: true } });
//     } else {
//         delete this.getQuery().includeDeleted;
//     }
//     next();
// });


>>>>>>> Stashed changes
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

    // Check if email or username already exists
    const exists = await User.findOne({
        $or: [
            { email: email },
            { username: username }
        ]
    });

    if (exists) {
        throw new Error('Email or username already exists');
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
    wallet: { type: Number, default: 0 },
    preferredCurrency: { type: String, enum: ['USD', 'EGP', 'EUR'], default: 'USD' },
});

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

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
    if (getAge(dob) < 18) {
        throw new Error('Tourist must be at least 18 years old');
    }

    // Check if email or username already exists
    const exists = await User.findOne({
        $or: [
            { email: email },
            { username: username }
        ]
    });

    if (exists) {
        throw new Error('Email or username already exists');
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
    photo: { type: documentSchema, default: undefined },
});

const TourGuide = User.discriminator('tourGuide', TourGuideSchema);

// Advertiser schema
const AdvertiserSchema = new Schema({
    companyName: { type: String, default: undefined },
    companyDescription: { type: String, default: undefined },
    companyAddress: { type: String, default: undefined },
    websiteLink: { type: String, default: undefined },
    hotline: { type: String, default: undefined },
    logo: { type: documentSchema, default: undefined },
});

const Advertiser = User.discriminator('advertiser', AdvertiserSchema);

// Seller schema
const SellerSchema = new Schema({
    sellerDescription: { type: String, default: undefined },
    sellerName: { type: String, default: undefined },
    logo: { type: documentSchema, default: undefined },
});

const Seller = User.discriminator('seller', SellerSchema);

module.exports = {
    User,
    Tourist,
    TourGuide,
    Advertiser,
    Seller
};
