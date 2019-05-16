const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Rent = new Schema ({
    task: {
        type: Object,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now() 
    },
    endAt: {
        type: Date,
        required: true
    }
});

mongoose.model('rent', Rent);