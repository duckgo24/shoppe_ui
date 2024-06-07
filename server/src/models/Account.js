const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Account = new Schema({
    username: { type: String },
    password: { type: String } ,
    role: {type: String, default: 'customer'},
  });

module.exports = mongoose.model('accounts', Account);