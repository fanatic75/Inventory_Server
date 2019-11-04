const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String},
    createdDate: { type: Date, default: Date.now },
    role:{type: String, required:true, default:'User'},
    branch:{type:Schema.Types.ObjectId ,ref:'Branch'}
});


module.exports = mongoose.model('User', schema);