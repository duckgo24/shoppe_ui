
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Bill = new Schema({
    "product": { type: Schema.Types.ObjectId, ref: 'products' },    
    "color": { type: String },
    "size": { type: String },   
    "price": { type: Number },
    "quantity": { type: Number },
    "total": { type: Number },
    "dayCreate" : { type: Date, default: Date.now } ,
    "isPaid": { type: Boolean, default: false } ,
    "user": { type: Schema.Types.ObjectId, ref: 'users' }
});

module.exports = mongoose.model('bills', Bill);