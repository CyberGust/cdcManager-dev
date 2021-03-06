const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Category = new Schema ({
    name: {
        type: String,
        required: true
    },
    providerID: {
        type: Array,
        required: false
    },
    gender: {
        type: String,
        required: true
    },
    mustHave: {
        type: Number,
        default: 0
    },
    has: {
        type: Number,
        default:0
    },
    createdAt: {
        type: Date,
        default: Date.now() 
    }
});

mongoose.model('category', Category);