const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Category = new Schema({
    name: { type: String },
    desc: { type: String } ,
  });

module.exports = mongoose.model('categories', Category);