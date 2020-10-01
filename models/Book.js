const { Mongoose } = require("mongoose");

const mongoose = require('mongoose');

const BookSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    isAvailable:{
        type:Boolean,
        required:true
    },
    isbn: String

    



}


);

module.exports=mongoose.model('Books', BookSchema);