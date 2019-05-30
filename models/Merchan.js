const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Merchan = new Schema ({
    code: {
        type: Number,
        required: false
    },
    category: {
        type: String,
        required: false
    },
    sellPrice: {
        type: Number,
        require: true
    },
    buyPrice: {
        type: Number,
        required: false
    },
    status: {
        type: String,
        required: true,
        default: "available"
    },
    provider: {
        type: Object,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

mongoose.model('merchan', Merchan);
