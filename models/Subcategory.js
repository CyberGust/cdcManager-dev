const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Subcategory = new Schema ({
    name: {
        type: Object,
        required: true
    },
    description: {
        type: String,
        require: false
    },
    createdAt: {
        type: Date,
        default: Date.now() 
    }
});

mongoose.model('subcategory', Subcategory);