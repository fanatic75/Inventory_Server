const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String},
    role:{type: String, required:true, default:'User'},
    branch:{type:Schema.Types.ObjectId ,required:true,ref:'Branch'}
},{
    timestamps:true
});


module.exports = mongoose.model('User', schema);