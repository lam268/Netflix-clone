const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        unique: true,
        min: 6,
        max: 225
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 255
    }
});

const filmSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        index: {
            unique: true,
        }
    },
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

})

module.exports = mongoose.model('User', userSchema);
module.exports = mongoose.model('Film', filmSchema);