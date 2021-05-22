var express = require('express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Author = require('../models/author');

var bookSchema = new Schema({
    title:String,
    summary:String,
    pages:Number,
    publication:String,
    // cover_image:StyleMedia,
    category:[String],
    author:{type:Schema.Types.ObjectId, ref:'Author', required:true}
})

var Book = mongoose.model('Book',bookSchema);

module.exports = Book;