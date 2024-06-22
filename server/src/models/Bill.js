
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Bill = new Schema({
    "product": { type: String } ,
    "color": {type: String} ,    
    "image": { type: String } ,
    "size": { type: String } ,   
    "price": { type: Number } ,
    "quantity": { type: Number } ,
    "total": { type: Number },
    "address": { type: String } ,
    "dayCreate" : { type: Date, default: Date.now } ,
    "payMethod": { type: String , default: "Thanh toán khi nhận hàng" },
    "isPaid": { type: Boolean, default: false } ,
    "account": { type: Schema.Types.ObjectId, ref: 'accounts' }
});

module.exports = mongoose.model('bills', Bill);