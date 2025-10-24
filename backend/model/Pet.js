const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ownerUsername: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    neutered: {
        type: Boolean,
        required: true
    },
    indoor: {
        type: Boolean,
        required: true
    },
    bluetooth: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
})

module.exports = Pet = mongoose.model('pet', PetSchema);