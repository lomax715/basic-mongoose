const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    year: String,
    genre: [String],
    cast: [String]
});

module.exports = mongoose.model('Movie', schema);