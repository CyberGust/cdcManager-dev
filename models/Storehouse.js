const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Merchan = new Schema ({
    name: {
        type: Array,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    merchan: {
        type: Array,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now() 
    }
});

mongoose.model('merchan', Merchan);