const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Provider = new Schema ({
    name: {
        type: Object,
        required: true
    },
    address: {
        type: Array,
        required: false
    },
    document: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    merchandise: {
        type: Array,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now() 
    }
});

mongoose.model('provider', Provider);