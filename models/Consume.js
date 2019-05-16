const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Consume = new Schema ({
    task: {
        type: Object,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now() 
    }
});

mongoose.model('consume', Consume);