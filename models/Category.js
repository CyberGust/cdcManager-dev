const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Category = new Schema ({
    name: {
        type: Object,
        required: true
    },
    subcategory: {
        type: Array,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now() 
    }
});

mongoose.model('category', Category);