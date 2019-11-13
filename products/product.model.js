const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,

    },
    branch: {
        type: Schema.Types.ObjectId,
        ref: 'Branch',
        trim: true,
        required: true,
    },
    quantity: {
        type: Number,
        require: true,

    },
    price: {
        type: Number,
        required: true,
    }



}, {
    timestamps: true
});
schema.index({
    name: 1,
    branch: 1
}, {
    unique: true
});

module.exports = mongoose.model('Product', schema);