const mongoose = require('mongoose');
const BookMarkScema = mongoose.Schema({
    carId:{
        type:String,
        required:false
    },
    userId:{
        type:String,
        required:false
    }    
});

module.exports = mongoose.model('BookMark',BookMarkScema);