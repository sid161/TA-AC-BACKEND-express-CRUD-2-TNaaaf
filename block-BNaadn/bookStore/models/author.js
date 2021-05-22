var express = require('express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var authorSchema = new Schema({
    name:String,
    email:String,
    country:String,
    booksId:[{type:Schema.Types.ObjectId, ref:"Book"}],
},{timestamps:true})

var Author = mongoose.model('Author',authorSchema);
module.exports = Author;