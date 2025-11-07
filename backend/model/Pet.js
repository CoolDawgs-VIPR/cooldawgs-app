const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ownerUsername: {
        type: String,
    },
    ownerEmail: {
        type: String,
    },
    breed: {
        type: String,
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
    },
    image: {
        type: String,
    },
})

module.exports = Pet = mongoose.model('pet', PetSchema);