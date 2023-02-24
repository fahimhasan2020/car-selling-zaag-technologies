const mongoose = require('mongoose');

const CarScema = mongoose.Schema({
    name:{
        type:String,
        required:false
    },
    details:{
        type:String,
        required:false
    },
    brand:{
        type:String,
        required:false
    },
    price:{
        type:String,
        required:false
    },
    buyingDate:{
        type:String,
        required:false
    },
    seat:{
        type:String,
        required:false
    },
    ac:{
        type:String,
        required:false
    },
    user:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:false
    },
    offer:{
        type:Number,
        default:0
    },
    view:{
        type:Number,
        default:0
    },
    
});

module.exports = mongoose.model('Car',CarScema);