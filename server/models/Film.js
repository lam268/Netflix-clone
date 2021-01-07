const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({    
    title: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    imageURL: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        max: 255,
        required: false,
    },
    gerne: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Film', filmSchema);