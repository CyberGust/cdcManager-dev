const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Merchan = new Schema ({
    category: {
        type: Object,
        required: true
    },
    subcategory: {
        type: Object,
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
    status: {
        type: Boolean,
        required: true,
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now() 
    }
});

mongoose.model('merchan', Merchan);