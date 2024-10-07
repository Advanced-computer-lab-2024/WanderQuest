const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SellerModel = require('../models/userModel').Seller;
const AdvertiserModel = require('../models/userModel').Advertiser;
const TourGuideModel = require('../models/userModel').TourGuide;
const TourismGovernorModel = require('../models/tourGovernerModel');

const tagSchema = new Schema
({// for the tags to be created independantly from the places
    type:{type:String,required:true}
});
const Tags = mongoose.model('Tags',tagSchema);

const PreferencedTagSchema = new Schema
({// for the tags to be created independantly from the places
    type:{type:String,required:true}
});
const PrefTag = mongoose.model('Preference Tags',PreferencedTagSchema);

const placeSchema = new Schema({
    title:
    {type:String,required:true},
    description:
    {type:String,required: true},
    pictures: [
        {
            data: { type: Buffer, required: true },
            type: { type: String, required: true }
        }
    ],
    location:
    {type:String,required:true},
    openingHours:
    {type:String,required:true},
    ticketPrices:
    [{type:Number, required:true}], // array of Numbers as it differs from [Foreigners,Students and Natives] and can store Floating Numbers
    tags:
    [{type:tagSchema,required:false,default:null}] ,// tags are optional
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,  //???color?
        ref: TourismGovernorModel ,
        required: false,
    },
});
const Places = mongoose.model('Places',placeSchema);

const productSchema = new Schema({
    name:
    {type:String,required:true},
    picture:
        {
            data: { type: Buffer, required: true },
            type: { type: String, required: true }
        },
    price:
    {type:Number,required:true},
    description:
    {type:String,required:true},
    seller:
    {type: mongoose.Schema.Types.ObjectId,  //???color?
        ref: SellerModel },
    ratings:
    [{type:Number,required:false,default:null}],
    rating:
    {type:Number, required:false,default:null},
    reviews:
    [{type:String,required:false,default:null}],
    availableAmount:
    {type:Number,required:true}
});
productSchema.pre('save', function(next) {
    if (this.ratings && this.ratings.length > 0) {
        const total = this.ratings.reduce((acc, val) => acc + val, 0);
        this.rating = total / this.ratings.length; // Calculate average
    } else {
        this.rating = null; // Set to null if no ratings
    }
    next(); // Proceed with the save operation
});
const Product = mongoose.model('Product',productSchema);

//category Schema
const activityCategorySchema = new Schema({
    category:{type:String,required:true}
    
})
const ActivityCategory = mongoose.model('Category',activityCategorySchema);

//activity schema
const activitySchema = new Schema({
    title: { type: String , required: true },
    date: { type: Date, required: true },
    time: { type: String , required: true },
    //????????????google maps? --> front end
    location: { type: String, required: true },
    price: { type: Number, required: true },
    //?????????????????????????????//
    priceRange: { type: String ,required:false},
    ratings:[{type:Number,required:false,default:null}],
    rating:{type:Number,required:false,default:null},
    category: { type:String ,ref:ActivityCategory, required: true },
    tags: { type: [PreferencedTagSchema], default: [] },
    specialDiscounts: { type: String },
    //??????????????default true???????????
    bookingIsOpen: { type: Boolean, default: true },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,  //???color?
        ref: AdvertiserModel ,
        required: false,
    },
    
},{timestamps: true});

// Virtual property to format the date without the time zone
activitySchema.virtual('formattedDate').get(function() {
    return this.date.toISOString().split('T')[0];
});

// Ensure virtual fields are serialized
activitySchema.set('toJSON', { virtuals: true });
activitySchema.set('toObject', { virtuals: true });
activitySchema.pre('save', function(next) {
    if (this.ratings && this.ratings.length > 0) {
        const total = this.ratings.reduce((acc, val) => acc + val, 0);
        this.rating = total / this.ratings.length; // Calculate average
    } else {
        this.rating = null; // Set to null if no ratings
    }
    next(); // Proceed with the save operation
});
const Activity = mongoose.model('Activity' ,activitySchema);

//itinerary Schema
const itinerarySchema = new mongoose.Schema({
    title: {type: String,required: true},
  activities:[{type:mongoose.Schema.Types.ObjectId, ref:'Activity',required: true}],
  locations: [{ type: String,required:true}],
  timeline: {type: String,required:true},
  duration: {type: String , required: true},
  language: {type: String, required:true},
  price: {type:Number, required:true},
  ratings:[{type:Number,required:false,default:null}],
  rating:{type:Number,required:false,default:null},
  availableDates: [{type: Date, required:true}],
  time: [{type: String, required:true}],
  accessibility: {type: Boolean, required:true},
  pickUpLocation: {type: String, required: true},
  dropOffLocation: {type: String, required: true},
  tags:
  [{type:PreferencedTagSchema,required:false,default:null}],
  ///??????????????default
  BookingAlreadyMade: {type: Boolean,default:false},
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,  //???color?
    ref: TourGuideModel ,
    required: false,
    }
}, {timestamps:true}) ;

itinerarySchema.pre('save', function(next) {
    if (this.ratings && this.ratings.length > 0) {
        const total = this.ratings.reduce((acc, val) => acc + val, 0);
        this.rating = total / this.ratings.length; // Calculate average
    } else {
        this.rating = null; // Set to null if no ratings
    }
    next(); // Proceed with the save operation
});
const itinerary = mongoose.model('itinerary',itinerarySchema);

module.exports = {Places, Tags, Product, Activity ,itinerary,ActivityCategory,PrefTag}