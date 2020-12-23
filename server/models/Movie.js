const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    description: {
        type: String,
        required: true,
        min: 6,
        max: 10000
    },
    imageLink: {
        type: String,
    },
    movieLink: {
        type: String,
    }
});

module.exports = mongoose.model('Movie', movieSchema);