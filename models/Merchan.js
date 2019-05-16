const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Merchan = new Schema ({
    category: {
        type: Array,
        required: true
    },
    subcategory: {
        type: Array,
        required: false
    },
    details: {
        type: String,
        required: true
    },
    id: {
        type: String,
        require: false
    },
    createdAt: {
        type: Date,
        default: Date.now() 
    }
});

mongoose.model('merchan', Merchan);