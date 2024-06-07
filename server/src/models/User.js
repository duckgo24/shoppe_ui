const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
    name: { type: String },
    gender : { type: String },
    phone: { type: String },
    email: { type: String },
    birth: { type: Date },
    account: { type: Schema.Types.ObjectId, ref: 'accounts' }
  });

module.exports = mongoose.model('users', User);