const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Task = new Schema ({
    customer: {
        type: String,
        required: true
    },
    merchandise: {
        type: Array,
        required: false
    },
    gender: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now() 
    }
});

mongoose.model('task', Task);