const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Customer = new Schema ({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    phone: {
        type: Number,
        required: true
    },
    document: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now() 
    }
});

mongoose.model('customer', Customer);