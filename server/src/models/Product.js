const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Product = new Schema({
    name: { type: String },
    price: { type: Number } ,
    image: { type: String } ,
    size: {type: String} ,
    color: {type: String}
  });

module.exports = mongoose.model('products', Product);