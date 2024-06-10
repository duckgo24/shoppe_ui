const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Product = new Schema({
    name: { type: String },
    price: { type: Number } ,
    quantity: { type: Number } ,
    unit: { type: String } ,
    image: { type: String } ,
    size: {type: String} ,
    color: {type: String} ,
    category: {type: Schema.Types.ObjectId, ref: 'categories'}
  });

module.exports = mongoose.model('products', Product);