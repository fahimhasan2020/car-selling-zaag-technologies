const mongoose = require('mongoose');
const CarScema = mongoose.Schema({
    price:{
        type:String,
        required:false
    },
    carId:{
        type:String,
        required:false
    },
    userId:{
        type:String,
        required:false
    },
    comment:{
        type:String,
        required:false
    }
    
});

module.exports = mongoose.model('Offer',OfferScema);