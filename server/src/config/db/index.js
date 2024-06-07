const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/Shoppe')
        .then(() => console.log("Connected"))
    } catch(error) {
        throw new Error(error.message)
    }
}

module.exports = { connect };

