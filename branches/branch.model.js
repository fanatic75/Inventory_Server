const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    branchName: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    address: {
        trim: true,
        type: String
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        ref: 'Product'
    }],
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        trim: true
    }]
}, {
    timestamps: true
});
schema.pre('remove', function (next) {

    this.model('User').deleteMany({
        branch: this._id
    }, next);



});

schema.pre('remove', function (next) {

    this.model('Product').deleteMany({
        branch: this._id
    }, next);



});


module.exports = mongoose.model('Branch', schema);