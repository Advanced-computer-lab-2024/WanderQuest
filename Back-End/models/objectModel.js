const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const tagSchema = new Schema
({// for the tags to be created independantly from the places
    type:[{type:String,required:true}],
    historicalPeriod:{type:String,required:true}
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
    details:
    {type:String,required:true},
    price:
    {type:Number,required:true},
    availableAmount:
    {type:Number,required:true}
});
const Product = mongoose.model('Product',productSchema);
module.exports = {Places, Tags,Product }