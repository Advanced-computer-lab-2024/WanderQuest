const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SellerModel = require('../models/userModel').Seller;
const AdvertiserModel = require('../models/userModel').Advertiser;


const tagSchema = new Schema
({// for the tags to be created independantly from the places
    type:[{type:String,required:true}],
    historicalPeriod:{type:String,required:false,default:null}
});
const Tags = mongoose.model('Tags',tagSchema);


const placeSchema = new Schema({
    description:
    {type:String,required: true},
    pictures:
    [{data:Buffer,type:String,required:true}],
    location:
    {type:String,required:true},
    openingHours:
    [{type:String,required:true}], // array of String to make it easier to specify a range
    ticketPrices:
    [{type:Number, required:true}], // array of Numbers as it differs from Foreigners,Students and Natives and can store Floating Numbers
    tags:
    {type:tagSchema,required:false,default:null} // tags are optional
});
const Places = mongoose.model('Places',placeSchema);

const productSchema = new Schema({
    name:
    {type:String,required:true},
    picture:
    [{data:Buffer,type:String,required:true}],
    price:
    {type:Number,required:true},
    description:
    {type:String,required:true},
    seller:
    {type:String,ref:SellerModel,required:false,default:null},
    ratings:
    [{type:Number,required:false,default:null}],
    reviews:
    [{type:String,required:false,default:null}],
    availableAmount:
    {type:Number,required:true}
});
const Product = mongoose.model('Product',productSchema);


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
    category: { type:String , required: true },
    tags: { type: [String], default: [] },
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

const Activity = mongoose.model('Activity' ,activitySchema);

//itinerary Schema
const itinerarySchema = new mongoose.Schema({
  activities:[{type:mongoose.Schema.Types.ObjectId, ref:'Activity',required: true}],
  locations: [{ type: String,required:true}],
  timeline: {type: String,required:true},
  duration: {type: String , required: true},
  language: {type: String, required:true},
  price: {type:Number, required:true},
  availableDates: [{type: Date, required:true}],
  time: [{type: String, required:true}],
  accessibility: {type: Boolean, required:true},
  pickUpLocation: {type: String, required: true},
  dropOffLocation: {type: String, required: true},
  ///??????????????default
  BookingAlreadyMade: {type: Boolean,default:false},
 
}, {timestamps:true}) ;

const itinerary = mongoose.model('itinerary',itinerarySchema);

module.exports = {Places, Tags, Product, Activity ,itinerary}