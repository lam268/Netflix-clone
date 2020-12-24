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

module.exports = mongoose.model('Film', filmSchema);