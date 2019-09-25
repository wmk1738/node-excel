const mongoose = require('mongoose'),
    stuSchems = new mongoose.Schema({
        info: Object
    });

module.exports = mongoose.model("Students", stuSchems);